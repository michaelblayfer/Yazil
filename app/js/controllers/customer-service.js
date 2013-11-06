(function (S, C, Y) {

    Y.CustomerServiceController = function ($scope, $location, $sce) {
        console.log($sce);
        $scope.items = [{
            title: "חייג",
            text: $sce.trustAsHtml("03-5345522"),
            cssClass: "i-phone"
        },
        {
            title: "פקס",
            text: $sce.trustAsHtml("03-5345522"),
            cssClass: "i-fax"
        },
        {
            title: "שעות פעילות",
            text: $sce.trustAsHtml("בימי א' עד ה'" + "<br/>" + "בין השעות 8:00 - 17:00"),
            cssClass: "i-clock"
        },
        {
            title: "כתובת",
            text: $sce.trustAsHtml("רחוב תפוצות ישראל 13" + "<br/>" + 'אזה"ת כורוזין' + "<br/>" + "גבעתיים"),
            cssClass: "i-address"
        }, ];
    };

})(Simple, Cal, Cal.Yazil);