(function (S, C, Y) {
    
    Y.MoreInfoController = function ($scope, metadataService) {
        $scope.$root.header = "More Info";
        metadataService.getMetadata().then(function(metadata) {
            $scope.email = metadata.ServiceEmailAdd;
            $scope.fax = metadata.ServicePhone2;
        });
    };
    
})(Simple, Cal, Cal.Yazil);