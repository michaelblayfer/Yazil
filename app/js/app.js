(function (S, C, Y) {

    var yazilModule = angular.module("Cal.Yazil", ["ngRoute", "Simple"]);

    yazilModule.service("loginManager", Y.LoginManager);
    yazilModule.directive("toolbar", function () {
        return Y.ToolbarDirective;
    });
    
    yazilModule.directive("appHeader", function () {
        return Y.AppHeaderDirective;
    });

    yazilModule.controller("AppCtrl", Y.AppController);
    yazilModule.controller("LoginCtrl", Y.LoginController);
    yazilModule.controller("HomeCtrl", Y.HomeController);
    yazilModule.controller("AccountCtrl", Y.AccountController);
    yazilModule.controller("CustomerServiceCtrl", Y.CustomerServiceController);
    yazilModule.controller("MoreInfoCtrl", Y.MoreInfoController);

    yazilModule.config(function ($routeProvider) {
        $routeProvider
            .when("/", { templateUrl: "views/home.html", controller: "HomeCtrl", resolve: { header: function () { return "Home"; } }})
            .when("/Login", { templateUrl: "views/login.html", controller: "LoginCtrl", resolve: { header: function () { return "Login"; } } })
            .when("/Account", { templateUrl: "views/account.html", controller: "AccountCtrl", resolve: { header: function () { return "Account"; } } })
            .when("/LegalTerms", { templateUrl: "views/legal-terms.html", controller: "MoreInfoCtrl", resolve: { header: function () { return "Terms"; } } })
            .when("/Security", { templateUrl: "views/security.html", controller: "MoreInfoCtrl", resolve: { header: function () { return "Security"; } } })
            .when("/MoreInfo", { templateUrl: "views/more-info.html", controller: "MoreInfoCtrl", resolve: { header: function () { return "More Info"; } } })
            .when("/CustomerService", { templateUrl: "views/customer-service.html", controller: "CustomerServiceCtrl", resolve: { header: function () { return "CustomerService"; } } })
            .otherwise({ redirectTo: "/" });
    });

    yazilModule.run(function ($rootScope, $location, loginManager) {
        // register listener to watch route changes
        $rootScope.logout = function () {   
            loginManager.logout().then(function () {
                $location.path("Login");
            });
        };

        $rootScope.$on("$routeChangeStart", function (event, next, current) {
            loginManager.isUserLoggedIn().catch(function () {
                // no logged user, we should be going to #login
                if (next.templateUrl == "views/login.html") {
                    // already going to #login, no redirect needed
                } else {
                    // not going to #login, we should redirect now
                    $location.path("/Login");
                }
            });
        });
    });

    yazilModule.run(function (textResource) {
        textResource.load("he-IL", {
            "Back": "חזור",
            "SystemLogin": "כניסה למערכת",
            "Login": "כניסה",
            "Username": "שם משתמש",
            "Password": "סיסמה",
            "Logout": "יציאה",
            "ForgotPassword": "שכחתי שם משתמש / סיסמה",
            "AuthenticationFailed": "שם המשתמש או הסיסמה שגויים או שאינך רשום"
        });
    });

})(Simple, Cal, Cal.Yazil);
