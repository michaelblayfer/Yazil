(function (S, C, Y) {

    Y.SplashController = function ($scope, $location, accountManager, metadataService, utils, alertService) {
        
        metadataService.fetchMetadata().then(function() {
            $location.path("/Login");
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

