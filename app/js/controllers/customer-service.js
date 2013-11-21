(function (S, C, Y) {

    Y.CustomerServiceController = function ($scope, $location, $sce, metadataService) {
        
        metadataService.getMetadata().then(function (metadata) {
            $scope.items = [{
                title: "חייג",
                text: $sce.trustAsHtml("<a href='tel:" + metadata.ServicePhone1 + "'>" + metadata.ServicePhone1 + "</a>"),
                cssClass: "i-phone"
            },
             {
                 title: "פקס",
                 text: $sce.trustAsHtml(metadata.ServicePhone2),
                 cssClass: "i-fax"
             },
             {
                 title: "שעות פעילות",
                 text: $sce.trustAsHtml("בימי א' עד ה'" + "<br/>" + "בין השעות " + metadata.OpeningHoursStart + " - " + metadata.OpeningHoursFinish),
                 cssClass: "i-clock"
             },
             {
                 title: "כתובת",
                 text: $sce.trustAsHtml(metadata.AddressLine1 + (metadata.AddressLine2 ? "<br/>" + metadata.AddressLine2 : "") + "<br/>" + metadata.City),
                 cssClass: "i-address"
             }, ];
        });

 
    };

})(Simple, Cal, Cal.Yazil);