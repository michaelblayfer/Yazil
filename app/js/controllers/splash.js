(function (S, C, Y) {

    Y.SplashController = ["$scope", "$location","$timeout", "metadataService", "utils", "alertService", function ($scope, $location, $timeout, metadataService, utils, alertService) {
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
            }, 250);
        }

        step();


        function navigate() {
            $location.path("/Login");
        }

        function onMetadataError(error) {
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
        function fetchMetadata() {
            metadataService.getMetadata().then(function () {
                if ($scope.step == 6) {
                    navigate();
                } else {
                    canNavigateNext = true;
                }

            }, onMetadataError);

        }

        fetchMetadata();
    }];

})(Simple, Cal, Cal.Yazil);

