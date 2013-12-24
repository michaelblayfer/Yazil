(function (S, C, Y) {
    var yazilModule = angular.module("Cal.Yazil");

    yazilModule.service("verifyLogin", ["$q", "$location", "$rootScope", "metadataService", "sessionManager", "$log", "alertService", "utils", function ($q, $location, $rootScope, metadataService, sessionManager, $log, alertService, utils) {
        var result = $q.defer();

        metadataService.fetchMetadata().then(function (metadata) {
            sessionManager.isUserLoggedIn(metadata.SessionTimeout).then(function (user) {
                $rootScope.isLoggedIn = true;
                $log.debug("User logged in, starting session");
                sessionManager.start(user, metadata.SessionTimeout);
                result.resolve();
            }, function () {
                $rootScope.isLoggedIn = false;
                $log.debug("User not logged in, redirecting to splash");
                $location.path("/Splash");
                result.reject();
            });
        }, function (error) {
            $location.path("/Splash");
            result.reject();
            if (C.isError(error, Y.Errors.VersionRequired, C.Severity.Warning)) {
                var dialog = error.Dialog;
                dialog.overrideDefault = true;
                alertService.show(dialog).then(function () {
                    var versionUpdateUrl = error.data.UpdateURL;
                    utils.browser.open(versionUpdateUrl);
                });
            } else {
                alertService.show(error.Dialog || {});
            }
        });

        return result.promise;
    }]);


    yazilModule.config(function ($routeProvider) {
        $routeProvider
            .when("/", { templateUrl: "views/home.html", controller: "HomeCtrl", resolve: { verifyLogin:"verifyLogin", pageInfo: function () { return { header: "MyAccountsTitle" }; } } })
            .when("/Login", { templateUrl: "views/login.html", controller: "LoginCtrl", resolve: { pageInfo: function () { return { header: "Welcome", hideFooter: true }; } } })
            .when("/Account", { templateUrl: "views/account.html", controller: "AccountCtrl", resolve: { pageInfo: function () { return { header: "MyAccountTitle" }; } } })
            .when("/LegalTerms", { templateUrl: "views/legal-terms.html", controller: "MoreInfoCtrl", resolve: { pageInfo: function () { return { header: "LegalTerms", displayBack: true }; } } })
            .when("/Security", { templateUrl: "views/security.html", controller: "MoreInfoCtrl", resolve: { pageInfo: function () { return { header: "InfoSecurity", displayBack: true }; } } })
            .when("/MoreInfo", { templateUrl: "views/more-info.html", controller: "MoreInfoCtrl", resolve: { pageInfo: function () { return { header: "MoreInfo" }; } } })
            .when("/Splash", { templateUrl: "views/splash.html", controller: "SplashCtrl", resolve: { pageInfo: function () { return { header: false }; } } })
            .when("/CustomerService", { templateUrl: "views/customer-service.html", controller: "CustomerServiceCtrl", resolve: { pageInfo: function () { return { header: "CustomerService" }; } } })
            .otherwise({ redirectTo: "/" });
    });

})(Simple, Cal, Cal.Yazil);
