(function (S, C, Y) {
    var yazilModule = angular.module("Cal.Yazil");

    //yazilModule.service("verifyLogin", ["$q", "$location", "$rootScope", "metadataService", "sessionManager", "$log", "alertService", "utils", function ($q, $location, $rootScope, metadataService, sessionManager, $log, alertService, utils) {
    //    var result = $q.defer();



    //    return result.promise;
    //}]);


    yazilModule.config(function ($routeProvider) {
        $routeProvider
            .when("/", { templateUrl: "views/home.html", controller: "HomeCtrl", resolve: { pageInfo: function () { return { header: "MyAccountsTitle" }; } } })
            .when("/Login", { templateUrl: "views/login.html", controller: "LoginCtrl", resolve: { pageInfo: function () { return { header: "Welcome", hideFooter: true }; } } })
            .when("/Account", { templateUrl: "views/account.html", controller: "AccountCtrl", resolve: { pageInfo: function () { return { header: "MyAccountTitle" }; } } })
            .when("/LegalTerms", { templateUrl: "views/legal-terms.html", controller: "MoreInfoCtrl", resolve: { pageInfo: function () { return { header: "LegalTerms", displayBack: true }; } } })
            .when("/Security", { templateUrl: "views/security.html", controller: "MoreInfoCtrl", resolve: { pageInfo: function () { return { header: "InfoSecurity", displayBack: true }; } } })
            .when("/MoreInfo", { templateUrl: "views/more-info.html", controller: "MoreInfoCtrl", resolve: { pageInfo: function () { return { header: "MoreInfo" }; } } })
            .when("/CustomerService", { templateUrl: "views/customer-service.html", controller: "CustomerServiceCtrl", resolve: { pageInfo: function () { return { header: "CustomerService" }; } } })
            .otherwise({ redirectTo: "/" });
    });

})(Simple, Cal, Cal.Yazil);
