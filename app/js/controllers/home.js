(function (S, C, Y) {
    
    Y.HomeController = function ($scope, $location, $rootScope, accountManager, alertService, analytics, textResource, metadataService, sessionManager, utils, $log) {
        $rootScope.loaded = false;

        $scope.gotoAccountDetails = function () {
            analytics.recordClick(Y.AnalyticsEvents.Account);
            $location.path("/Account");
        };

        function onLoadError(error) {
            console.log("LOAD ERROR!");
            $scope.notifyError(error).then(function() {
                load();
            }, function(e) {
                if (e !== "Dismissed") {
                    $scope.unattendedLogout();
                }
            });
            ////
            //if (typeof error.status !== "undefined" &&
            //    error.status == 0 || error.status == 404) {
            //    var messageDialog = {
            //        message: textResource.get("CommunicationError"),
            //        confirmText: textResource.get("Retry"),
            //        cancelText: textResource.get("Close")
            //    };
            //    alertService.show(messageDialog).then(function (result) {
            //        if (result.status == "Confirm") {
            //            load();
            //        }
            //    });
            //} else {
            //    if (error.Dialog) {
            //        alertService.show(error.Dialog).then(function() {
            //            $scope.unattendedLogout();
            //        });
            //    } else {
            //        $scope.unattendedLogout();
            //    }
            //}
        }

        function onSummaryAvailable(summary) {
            _.extend($scope, summary);
            $rootScope.loaded = true;
        }

        function load() {
            $scope.notifyProgressStarted();
            accountManager.getAccountSummary().then(onSummaryAvailable).then(function() {
                $scope.notifyProgressCompleted();
                return accountManager.loadAccounts();
            }).catch(onLoadError).finally($scope.notifyProgressCompleted);
        }

        function onMetadataError(error) {
            $rootScope.isLoggedIn = false;
            $location.path("/Splash");
            if (C.isError(error, Y.Errors.VersionRequired, C.Severity.Warning)) {
                var dialog = error.Dialog;
                dialog.overrideDefault = true;
                alertService.show(dialog).then(function () {
                    var versionUpdateUrl = error.data.UpdateURL;
                    utils.browser.open(versionUpdateUrl);
                });
            } else {
                $scope.notifyError(error).then(fetchMetadata);
            }
        }

        function onUserLoggedIn(metadata, user) {
            $rootScope.isLoggedIn = true;
            sessionManager.start(user, metadata.SessionTimeout).then(function() {
                load();
            });
        }
        function onUserNotLoggedIn() {
            $rootScope.isLoggedIn = false;
            $log.debug("User not logged in, redirecting to splash");
            $location.path("/Splash");
        }

        function loadMetadata(metadata) {
            sessionManager.isUserLoggedIn(metadata.SessionTimeout).then(function(user) {
                onUserLoggedIn(metadata, user);
            }, onUserNotLoggedIn);
        }

        function fetchMetadata() {
            metadataService.getMetadata().then(loadMetadata, onMetadataError);
        }

        fetchMetadata();

    };
    
})(Simple, Cal, Cal.Yazil);