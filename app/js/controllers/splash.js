(function (S, C, Y) {

    Y.SplashController = function ($scope, $location, accountManager, metadataService, utils, alertService, $timeout) {

        $scope.step = 0;

        function step() {
            $timeout(function() {
                if ($scope.step < 6) {
                    $scope.step++;
                    step();
                } 
            }, 250);
        }

        step();

        function navigate() {
            $location.path("/Login");
        }
        
        metadataService.fetchMetadata().then(function(metadata) {
            if ($scope.step == 6) {
                navigate();
            } else {
                $timeout(navigate, 2000);
            }
        }, function (error) {
            if (C.isError(error, Y.Errors.VersionRequired, C.Severity.Warning)) {
                var dialog = error.Dialog;
                dialog.overrideDefault = true;
                dialog.dontDismiss = true;
                $scope.step = 7;
                alertService.show(dialog).then(function (result) {

                    var versionUpdateUrl = utils.os.isIOS() ? error.data.UpdateURLIOS : error.data.UpdateURLAndroid;
                        utils.browser.open(versionUpdateUrl);
                    
                });
            } else {
                alertService.show(error.Dialog || {});
            }
        });
    };

})(Simple, Cal, Cal.Yazil);

