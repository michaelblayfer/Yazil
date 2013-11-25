(function (S, C, Y) {
    
    Y.HomeController = function ($scope, $location, $rootScope, accountManager, alertService) {
        $rootScope.loaded = false;
        $scope.notifyProgressStarted();
        accountManager.getAccountSummary().then(function (summary) {
            _.extend($scope, summary);
            $rootScope.loaded = true;
        }, function (error) {
            alertService.show(error.Dialog).then(function() {
                $rootScope.logout();
            });
        }).finally($scope.notifyProgressCompleted);

        $scope.gotoAccountDetails = function () {
            $location.path("/Account");
        };
    };
    
})(Simple, Cal, Cal.Yazil);