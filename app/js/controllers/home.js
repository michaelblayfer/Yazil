(function (S, C, Y) {
    
    Y.HomeController = function ($scope, $location, $rootScope, accountManager) {
        $rootScope.loaded = false;
        $scope.notifyProgressStarted();
        accountManager.getAccountSummary().then(function (summary) {
            _.extend($scope, summary);
            $rootScope.loaded = true;
        }).finally($scope.notifyProgressCompleted);

        $scope.gotoAccountDetails = function () {
            $location.path("/Account");
        };
    };
    
})(Simple, Cal, Cal.Yazil);