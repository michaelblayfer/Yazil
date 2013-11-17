(function (S, C, Y) {

    Y.SplashController = function ($scope, $location, accountManager, metadataService, alertService) {

        metadataService.fetchMetadata().then(function(){
            console.log("FETCH");
            $location.path("/Login");
        }, function (error) {
            if (error.Severity == C.Severity.Error) {
                alertService.show({
                    title: "Error",
                    message: "Unexpected error occured",
                    confirmText: "נסה שוב"
                });
            }
        });
    };

})(Simple, Cal, Cal.Yazil);

