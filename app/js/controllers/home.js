(function (S, C, Y) {
    
    Y.HomeController = function ($scope, $location, $rootScope, accountManager) {
        accountManager.getAccountSummary().then(function (summary) {
            $scope.nextCreditAmount = summary.nextCreditAmount;
            $scope.nextCreditDate = summary.nextCreditDate;
            $scope.previousCreditAmount = summary.previousCreditAmount;
            $scope.previousCreditDate = summary.previousCreditDate;
            $scope.totalBalance = summary.totalBalance;
            $scope.balanceValueDate = summary.balanceValueDate;
        });
    };
    
})(Simple, Cal, Cal.Yazil);