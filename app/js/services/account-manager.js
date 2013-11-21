(function (S, C, Y) {
    Y.AccountManager = function ($q, yazilServiceClient) {
        var bankAccounts = [];
        var testAccounts = [
                {
                    totalNextCredit: 12333,
                    totalPreviousCredit: 41203,
                    previousCreditsCount: 3,
                    bankNumber: 20,
                    bankBranchNumber: 690,
                    bankAccountNumber: 111111,
                    nextCredits: [
                        {
                            day: "יום א'",
                            date: new Date(),
                            amount: 1546
                        },
                        {
                            day: "יום ב'",
                            date: new Date(),
                            amount: 324
                        },
                        {
                            day: "יום ד'",
                            date: new Date(),
                            amount: 322113
                        },
                        {
                            day: "יום ה'",
                            date: new Date(),
                            amount: 44323
                        }
                    ],
                    previousCredits: [
                        {
                            day: "יום א'",
                            date: new Date(),
                            amount: 111222
                        },
                        {
                            day: "יום א'",
                            date: new Date(),
                            amount: 423324
                        },
                        {
                            day: "יום א'",
                            date: new Date(),
                            amount: 34223
                        },
                        {
                            day: "יום ו'",
                            date: new Date(),
                            amount: 4332
                        }
                    ]
                },
                {
                    totalNextCredit: 12333,
                    totalPreviousCredit: 41203,
                    previousCreditsCount: 3,
                    bankNumber: 20,
                    bankBranchNumber: 690,
                    bankAccountNumber: 222222,
                    nextCredits: [
                        {
                            day: "יום א'",
                            date: new Date(),
                            amount: 6545
                        },
                        {
                            day: "יום ב'",
                            date: new Date(),
                            amount: 6454
                        },
                        {
                            day: "יום ד'",
                            date: new Date(),
                            amount: 444
                        },
                        {
                            day: "יום ה'",
                            date: new Date(),
                            amount: 555
                        }
                    ],
                    previousCredits: [
                        {
                            day: "יום א'",
                            date: new Date(),
                            amount: 54
                        },
                        {
                            day: "יום ב'",
                            date: new Date(),
                            amount: 3342
                        },
                        {
                            day: "יום ד'",
                            date: new Date(),
                            amount: 54454
                        },
                        {
                            day: "יום ה'",
                            date: new Date(),
                            amount: 4545
                        }
                    ]
                },
               {
                   totalNextCredit: 12333,
                   totalPreviousCredit: 41203,
                   previousCreditsCount: 3,
                   bankNumber: 20,
                   bankBranchNumber: 690,
                   bankAccountNumber: 333333,
                   nextCredits: [
                       {
                           day: "יום א'",
                           date: new Date(),
                           amount: 655
                       },
                       {
                           day: "יום ב'",
                           date: new Date(),
                           amount: 455
                       },
                       {
                           day: "יום ד'",
                           date: new Date(),
                           amount: 655
                       },
                       {
                           day: "יום ה'",
                           date: new Date(),
                           amount: 534
                       }
                   ],
                   previousCredits: [
                       {
                           day: "יום א'",
                           date: new Date(),
                           amount: 645
                       },
                       {
                           day: "יום ב'",
                           date: new Date(),
                           amount: 666
                       },
                       {
                           day: "יום ד'",
                           date: new Date(),
                           amount: 423
                       },
                       {
                           day: "יום ה'",
                           date: new Date(),
                           amount: 432
                       },
                       {
                           day: "יום ב'",
                           date: new Date(),
                           amount: 666
                       },
                       {
                           day: "יום ד'",
                           date: new Date(),
                           amount: 423
                       },
                       {
                           day: "יום ה'",
                           date: new Date(),
                           amount: 432
                       }
                   ]
               }
        ];

        var accountSummaryTest = {
            nextCreditAmount: 999999999,
            nextCreditDate: new Date(),
            previousCreditAmount: 0,
            previousCreditDate: new Date(),
            totalBalance: 0,
            balanceValueDate: new Date(),
            accountOwnerName: "יאיר כהן",
            lastLoginDate: "23/10/13",
            noActiveAccounts: false
        };

        function getAccounts() {
            
            var result = $q.defer();
            
            result.resolve(bankAccounts);
            return result.promise;
        }

        function getAccountSummary() {
            return yazilServiceClient.getAccountSummary().then(function (creditSummary) {
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
                        var summary = transactions.CreditTransactionsSummary;
                        account.totalNextCredit = summary.TotalNextCreditForAccount.Value;
                        account.totalPreviousCredit = summary.TotalPreviousCreditForAccount.Value;
                        account.previousCreditsCount = summary.NumOfPreviousCredits;

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
                
                return {
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
            });
            var result = $q.defer();
            result.resolve(accountSummaryTest);
            return result.promise;
        }

        return {
            getAccounts: getAccounts,
            getAccountSummary: getAccountSummary
        };
    }

})(Simple, Cal, Cal.Yazil);