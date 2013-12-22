﻿(function (S, C, Y) {

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
            navigator.alert("Error: " + JSON.stringify(error));
            if (C.isError(error, Y.Errors.VersionRequired, C.Severity.Warning)) {
                var dialog = error.Dialog;
                dialog.overrideDefault = true;
                dialog.dontDismiss = true;
                alertService.show(dialog).then(function (result) {

                    var versionUpdateUrl = error.data.UpdateURL;
                        utils.browser.open(versionUpdateUrl);
                    
                });
            }
        });
    };

})(Simple, Cal, Cal.Yazil);

