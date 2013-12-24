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

        metadataService.getMetadata().then(function () {
            if ($scope.step == 6) {
                navigate();
            } else {
                canNavigateNext = true;
            }

        }, function (error) {
            if (C.isError(error, Y.Errors.VersionRequired, C.Severity.Warning)) {
                var dialog = error.Dialog;
                dialog.overrideDefault = true;
                alertService.show(dialog).then(function (result) {
                    var versionUpdateUrl = error.data.UpdateURL;
                    utils.browser.open(versionUpdateUrl);
                });
            } else {
                alertService.show(error.Dialog || {});
            }
        });
    }];

})(Simple, Cal, Cal.Yazil);

