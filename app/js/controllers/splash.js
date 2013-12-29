(function (S, C, Y) {

    Y.SplashController = [
        "$scope",
        "$location",
        "$timeout",
        "metadataService",
        "utils",
        "alertService",
        "sessionManager",
        "$log",
        "$rootScope",
        function ($scope, $location, $timeout, metadataService, utils, alertService, sessionManager, $log, $rootScope) {
            var canNavigateNext = false;
            $scope.step = 0;

            function step() {
                $timeout(function () {
                    if ($scope.step < 6) {
                        $scope.step++;
                        step();
                    } else {
                        if (canNavigateNext) {
                            navigate();
                        }
                    }
                }, 500);
            }

            step();


            function navigate() {
                $location.path("/Login");
            }

            //function onMetadataError(error) {
            //    if (C.isError(error, Y.Errors.VersionRequired, C.Severity.Warning)) {
            //        var dialog = error.Dialog;
            //        dialog.overrideDefault = true;
            //        alertService.show(dialog).then(function () {
            //            var versionUpdateUrl = error.data.UpdateURL;
            //            utils.browser.open(versionUpdateUrl);
            //        });
            //    } else {
            //        $scope.notifyError(error).then(fetchMetadata);
            //    }
            //}
            //function fetchMetadata() {
            //    metadataService.getMetadata().then(function () {
            //        if ($scope.step == 6) {
            //            navigate();
            //        } else {
            //            canNavigateNext = true;
            //        }

            //    }, onMetadataError);

            //}

            //fetchMetadata();

            function onMetadataError(error) {
                $rootScope.isLoggedIn = false;
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
                sessionManager.start(user, metadata.SessionTimeout).then(function () {
                    $location.path("/");
                });
            }
            function onUserNotLoggedIn() {
                $rootScope.isLoggedIn = false;
                if ($scope.step == 6) {
                    navigate();
                } else {
                    canNavigateNext = true;
                }
            }

            function loadMetadata(metadata) {
                sessionManager.isUserLoggedIn(metadata.SessionTimeout).then(function (user) {
                    onUserLoggedIn(metadata, user);
                }, onUserNotLoggedIn);
            }

            function fetchMetadata() {
                metadataService.getMetadata().then(loadMetadata, onMetadataError);
            }

            fetchMetadata();
        }];

})(Simple, Cal, Cal.Yazil);

