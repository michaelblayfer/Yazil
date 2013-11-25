(function (S, C, Y) {
    Y.AccountDescriptionFilter = function () {
        return function (account) {
            if (account && account.bankNumber) {
                return String(account.bankNumber) + "-" + String(account.bankBranchNumber) + "-" + String(account.bankAccountNumber);
            } else {
                return "";
            }
        };
    };
})(Simple, Cal, Cal.Yazil);