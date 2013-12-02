(function (S, C, Y) {
    
    Y.HomeController = function ($scope, $location, $rootScope, accountManager, alertService, analytics) {
        $rootScope.loaded = false;

        $scope.gotoAccountDetails = function () {
            analytics.recordClick(Y.AnalyticsEvents.Account);
            $location.path("/Account");
        };

        $scope.notifyProgressStarted();

        function onLoadError(error) {
            if (typeof error.status !== "undefined" && error.status != 200) {
                $rootScope.logout();
            } else {
                alertService.show(error.Dialog).then(function() {
                    $rootScope.logout();
                });
            }
        }

        function onSummaryAvailable(summary) {
            _.extend($scope, summary);
            $rootScope.loaded = true;
        }

        accountManager.getAccountSummary().then(onSummaryAvailable).then(function () {
            $scope.notifyProgressCompleted();
            return accountManager.loadAccounts();
        }).catch(onLoadError).finally($scope.notifyProgressCompleted);

    };
    
})(Simple, Cal, Cal.Yazil);