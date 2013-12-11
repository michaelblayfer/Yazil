(function (S, C, Y) {
    
    Y.MoreInfoController = function ($scope, $location, metadataService, analytics, alertService) {
        $scope.$root.header = "More Info";
        metadataService.getMetadata().then(function(metadata) {
            $scope.email = metadata.ServiceEmailAdd;
            $scope.fax = metadata.ServicePhone2;
        }, function (error) {
            alertService.show(error.Dialog).then(function () {
                $scope.unattendedLogout();
            });
        });

        $scope.displayLegalTerms = function() {
            analytics.recordClick(Y.AnalyticsEvents.LegalTerms);
            $location.path("/LegalTerms");
        };

        $scope.displaySecurityInfo = function () {
            analytics.recordClick(Y.AnalyticsEvents.InfoSecurity);
            $location.path("/Security");
        };
    };
    
})(Simple, Cal, Cal.Yazil);