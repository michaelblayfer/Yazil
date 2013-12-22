(function (S, C, Y) {

    Y.SplashController = function ($scope, $location, accountManager, metadataService, utils, alertService, $timeout) {

        $scope.step = 0;

        function step() {
            $timeout(function() {
                if ($scope.step < 6) {
                    $scope.step++;
                    step();
                } else {
                    $timeout(navigate, 750);
                }
            }, 250);
        }

        step();

        function navigate() {
            if ($scope.step == 6) {
                $location.path("/Login");
            }
        }

        metadataService.fetchMetadata().then(function(metadata) {
            navigate();
        }, function (error) {
            if (C.isError(error, Y.Errors.VersionRequired, C.Severity.Warning)) {
                alertService.show(error.Dialog).then(function (result) {
                    if (result.status == "Confirm") {
                        window.open(utils.os.isIOS() ? error.data.UpdateURLIOS : error.data.UpdateURLAndroid);
                    }
                });
            } else {
                alertService.show(error.Dialog || {});
            }
        });
    };

})(Simple, Cal, Cal.Yazil);

