(function (S, C, Y) {
    
    Y.HomeController = function ($scope, $location, $rootScope, accountManager, alertService, analytics, textResource) {
        $rootScope.loaded = false;

        $scope.gotoAccountDetails = function () {
            analytics.recordClick(Y.AnalyticsEvents.Account);
            $location.path("/Account");
        };

        $scope.notifyProgressStarted();

        function onLoadError(error) {
            
            if (typeof error.status !== "undefined" &&
                error.status == 0) {
                var messageDialog = {
                    message: textResource.get("CommunicationError"),
                    confirmText: textResource.get("Retry"),
                    cancelText: textResource.get("Close")
                };
                alertService.show(messageDialog).then(function (result) {
                    if (result.status == "Confirm") {
                        load();
                    }
                });
            } else {
                if (error.Dialog) {
                    alertService.show(error.Dialog).then(function() {
                        $scope.unattendedLogout();
                    });
                } else {
                    $scope.unattendedLogout();
                }
            }
        }

        function onSummaryAvailable(summary) {
            _.extend($scope, summary);
            $rootScope.loaded = true;
        }

        function load() {
            accountManager.getAccountSummary().then(onSummaryAvailable).then(function() {
                $scope.notifyProgressCompleted();
                return accountManager.loadAccounts();
            }).catch(onLoadError).finally($scope.notifyProgressCompleted);
        }
        navigator.notification.alert("NAVIGATED TO HOME!");
        load();

    };
    
})(Simple, Cal, Cal.Yazil);