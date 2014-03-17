(function (S, C, Y) {

    Y.HomeController = function ($scope, $location, $rootScope, accountManager, alertService, analytics, 
                                 textResource, metadataService, sessionManager, utils, $log, pushNotificationService) {
        $rootScope.loaded = false;

        $scope.gotoAccountDetails = function () {
            analytics.recordClick(Y.AnalyticsEvents.Account);
            $location.path("/Account");
        };

        function onLoadError(error) {
            $scope.notifyError(error).then(function () {
                load();
            }, function (e) {
                if (e !== "Dismissed") {
                    $scope.unattendedLogout();
                }
            });
        }

        function onSummaryAvailable(summary) {
            _.extend($scope, summary);
            $rootScope.loaded = true;
        }

        function load() {
            $scope.notifyProgressStarted();
            accountManager.getAccountSummary().then(onSummaryAvailable).then(function () {
                $scope.notifyProgressCompleted();
            }).then(accountManager.loadAccounts).catch(onLoadError).finally($scope.notifyProgressCompleted);
        }
        
        $scope.isPNRegistrationSucceeded = true;
        
        $rootScope.$on('PN_registered', function(e, regid) {
            console.log("(regid : )" + regid.toString());
            $scope.registrationID = regid.toString();
        });
        
        $rootScope.$on('PN_error', function(e, errorDesc) {
            console.log("PN_error : " + errorDesc);
            $scope.isPNRegistrationSucceeded = false;
        });        

        //load();
        
        pushNotificationService.registerPN();
    };

})(Simple, Cal, Cal.Yazil);
