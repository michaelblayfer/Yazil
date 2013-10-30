(function (S, C, Y) {
    Y.AccountDescriptionFilter = function () {
        return function (account) {
            return String(account.bankNumber) + "-" + String(account.bankBranchNumber) + "-" + String(account.bankAccountNumber);
        };
    };
})(Simple, Cal, Cal.Yazil);