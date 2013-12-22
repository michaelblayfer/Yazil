(function (S, C, Y) {

    Y.SplashController = function ($scope, $rootScope, $location, accountManager, metadataService, utils, alertService, $timeout) {

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
        return metadataService.fetchMetadata().then(function (metadata) {
            navigate();
            return metadata;
        }, function (error) {
            if (C.isError(error, Y.Errors.VersionRequired, C.Severity.Warning)) {
                var dialog = error.Dialog;
                dialog.overrideDefault = true;
                dialog.dontDismiss = true;
                alertService.show(dialog).then(function (result) {
                    var versionUpdateUrl = error.data.UpdateURL;
                    utils.browser.open(versionUpdateUrl);
                });
            } else {
                alertService.show(error.Dialog || {});
            }
        });
    };

})(Simple, Cal, Cal.Yazil);

