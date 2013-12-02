(function (S, C, Y) {
    
    Y.MoreInfoController = function ($scope, $location, metadataService, analytics) {
        $scope.$root.header = "More Info";
        metadataService.getMetadata().then(function(metadata) {
            $scope.email = metadata.ServiceEmailAdd;
            $scope.fax = metadata.ServicePhone2;
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