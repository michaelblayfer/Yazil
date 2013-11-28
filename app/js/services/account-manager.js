(function (S, C, Y) {
    Y.AccountManager = function($q, yazilServiceClient, metadataService) {
        var bankAccounts = [], loadedAt, summaryCache, maxCacheAge = 5 /*minutes*/, currentDate = new Date();

        metadataService.getMetadata().then(function(metadata) {
            currentDate = metadata.CurrentDate || new Date();
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

        function mapCreditDetails(creditDetails) {
            return {
                day: creditDetails.CreditDay,
                date: creditDetails.CreditDate,
                amount: creditDetails.CreditSum.Value
            };
        }

        function getAccountTransactions(account) {
            return yazilServiceClient.getAccountTransactions(account.bankAccountNumber, account.mislaka).then(function (transactions) {
                
                var transSummary = transactions.CreditTransactionsSummary;
                account.totalNextCredit = transSummary.TotalNextCreditForAccount.Value;
                account.totalPreviousCredit = transSummary.TotalPreviousCreditForAccount.Value;
                account.previousCreditsCount = transSummary.NumOfPreviousCredits;
                account.nextCreditsCount = transSummary.NumOfNextCredits;


                if (transactions.NextCreditsDetails) {
                    account.nextCredits = _.map(transactions.NextCreditsDetails, mapCreditDetails);
                }

                if (transactions.PreviousCreditsDetails) {
                    account.previousCredits = _.map(transactions.PreviousCreditsDetails, mapCreditDetails);
                }
            });
        }

        function loadAccounts() {
            
            var promises = [];
            if (bankAccounts && bankAccounts.length > 0) {
                promises = _.map(bankAccounts, getAccountTransactions);
            }
            return $q.all(promises);
        }

        function mapAccountSummary(summary) {
            return {
                nextCreditAmount: summary.TotalNextCredit.Value,
                nextCreditDate: summary.NextCreditDate,
                previousCreditAmount: summary.TotalPreviousCredit.Value,
                previousCreditDate: summary.PreviousCreditDate,
                totalBalance: summary.TotalBalanceForCustomer.Value,
                balanceValueDate: summary.CurrentDate || currentDate,
                accountOwnerName: summary.AccOwnerName,
                lastLoginDate: summary.LastLogInDate,
                noActiveAccounts: !summary.HasAccounts
            };
        }

        function getAccountSummary() {
            if (accountsCacheValid()) {
                var result = $q.defer();
                result.resolve(summaryCache);
                return result.promise;
            } else {
                return yazilServiceClient.getAccountSummary().then(function(creditSummary) {
                    loadedAt = new Date();
                    var summary = creditSummary.BusinessCreditSummary;

                    bankAccounts = [];
                    _.each(creditSummary.BankAccounts, function (bankAccount) {
                        var account = {
                            bankAccountNumber: bankAccount.AccountNumber,
                            bankNumber: bankAccount.BankNum,
                            bankBranchNumber: bankAccount.BankBranchNumber,
                            mislaka: bankAccount.Mislaka
                        };
                        bankAccounts.push(account);
                    });
                    summaryCache = mapAccountSummary(summary);

                    return summaryCache;
                });
            }

        }

        return {
            getAccounts: getAccounts,
            getAccountSummary: getAccountSummary,
            loadAccounts: loadAccounts
        };
    };

})(Simple, Cal, Cal.Yazil);