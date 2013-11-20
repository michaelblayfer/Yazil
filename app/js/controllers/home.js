(function (S, C, Y) {
    
    Y.HomeController = function ($scope, $location, $rootScope, accountManager) {
        $scope.notifyProgressStarted();
        accountManager.getAccountSummary().then(function (summary) {
            _.extend($scope, summary);
        }).finally($scope.notifyProgressCompleted);

        $scope.gotoAccountDetails = function () {
            $location.path("/Account");
        };
    };
    
})(Simple, Cal, Cal.Yazil);