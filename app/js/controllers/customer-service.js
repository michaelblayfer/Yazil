(function (S, C, Y) {

    Y.CustomerServiceController = function ($scope, $location, $sce) {
        console.log($sce);
        $scope.items = [{
            title: "חייג",
            text: $sce.trustAsHtml("03-5345522"),
            icon: "tel"
        },
        {
            title: "פקס",
            text: $sce.trustAsHtml("03-5345522"),
            icon: "fax"
        },
        {
            title: "שעות פעילות",
            text: $sce.trustAsHtml("בימי א' עד ה'" + "<br/>" + "בין השעות 8:00 - 17:00"),
            icon: "times"
        },
        {
            title: "כתובת",
            text: $sce.trustAsHtml("רחוב תפוצות ישראל 13" + "<br/>" + 'אזה"ת כורוזין' + "<br/>" + "גבעתיים"),
            icon: "address"
        }, ];
    };

})(Simple, Cal, Cal.Yazil);