(function (S, C, Y) {
    Y.AccountManager = function ($q, yazilServiceClient, metadataService) {
        var bankAccounts = [], loadedAt, summaryCache, maxCacheAge = 5 /*minutes*/;

        metadataService.getMetadata().then(function (metadata) {
            if (metadata && metadata.MaxCacheAge) {
                maxCacheAge = metadata.MaxCacheAge;
            }
        });

        function getAccounts() {

            var result = $q.defer();
            result.resolve(bankAccounts);
            return result.promise;
        }

        function accountsCacheValid() {
            var now = new Date();
            return summaryCache && bankAccounts && loadedAt && now < moment(loadedAt).add("m", maxCacheAge);
        }
        function getAccountSummary() {
            if (accountsCacheValid()) {
                var result = $q.defer();
                result.resolve(summaryCache);
                return result.promise;
            } else {
                return yazilServiceClient.getAccountSummary().then(function (creditSummary) {
                    loadedAt = new Date();
                    var summary = creditSummary.BusinessCreditSummary;
                    bankAccounts = [];
                    _.each(creditSummary.BankAccounts, function (bankAccount) {
                        var account = {
                            bankAccountNumber: bankAccount.AccountNumber,
                            bankNumber: bankAccount.BankNum,
                            bankBranchNumber: bankAccount.BankBranchNumber
                        };
                        bankAccounts.push(account);
                        yazilServiceClient.getAccountTransactions(bankAccount.AccountNumber, bankAccount.Mislaka).then(function (transactions) {
                            var transSummary = transactions.CreditTransactionsSummary;
                            account.totalNextCredit = transSummary.TotalNextCreditForAccount.Value;
                            account.totalPreviousCredit = transSummary.TotalPreviousCreditForAccount.Value;
                            account.previousCreditsCount = transSummary.NumOfPreviousCredits;

                            function mapCreditDetails(creditDetails) {
                                return {
                                    day: creditDetails.CreditDay,
                                    date: creditDetails.CreditDate,
                                    amount: creditDetails.CreditSum.Value
                                };
                            }

                            if (transactions.LastCreditsDetails) {
                                account.nextCredits = _.map(transactions.LastCreditsDetails, mapCreditDetails);
                            }

                            if (transactions.PreviousCreditsDetails) {
                                account.previousCredits = _.map(transactions.PreviousCreditsDetails, mapCreditDetails);
                            }


                        });
                    });

                    summaryCache = {
                        nextCreditAmount: summary.TotalNextCredit.Value,
                        nextCreditDate: summary.NextCreditDate,
                        previousCreditAmount: summary.TotalPreviousCredit.Value,
                        previousCreditDate: summary.PreviousCreditDate,
                        totalBalance: summary.TotalBalanceForCustomer.Value,
                        balanceValueDate: new Date(),
                        accountOwnerName: summary.AccOwnerName,
                        lastLoginDate: summary.LastLoginDate,
                        noActiveAccounts: !summary.HasAccounts
                    };

                    return summaryCache;
                });
            }

        }

        return {
            getAccounts: getAccounts,
            getAccountSummary: getAccountSummary
        };
    }

})(Simple, Cal, Cal.Yazil);