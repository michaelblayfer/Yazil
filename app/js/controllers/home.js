(function (S, C, Y) {
    
    Y.HomeController = function ($scope, $location, $rootScope, accountManager) {
        $scope.notifyProgressStarted();
        accountManager.getAccountSummary().then(function (summary) {
            $scope.nextCreditAmount = summary.nextCreditAmount;
            $scope.nextCreditDate = summary.nextCreditDate;
            $scope.previousCreditAmount = summary.previousCreditAmount;
            $scope.previousCreditDate = summary.previousCreditDate;
            $scope.totalBalance = summary.totalBalance;
            $scope.balanceValueDate = summary.balanceValueDate;
            $scope.lastLoginDate = summary.lastLoginDate;
            $scope.accountOwnerName = summary.accountOwnerName;
        }).finally($scope.notifyProgressCompleted);
    };
    
})(Simple, Cal, Cal.Yazil);