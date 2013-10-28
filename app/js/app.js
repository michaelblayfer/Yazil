(function (S, C, Y) {

    var yazilModule = angular.module("Cal.Yazil", ["ngRoute", "Simple"]);

    yazilModule.service("loginManager", Y.LoginManager);
    
    yazilModule.controller("LoginCtrl", Y.LoginController);
    yazilModule.controller("HomeCtrl", Y.HomeController);

    yazilModule.config(function ($routeProvider) {
        $routeProvider
            .when("/", { templateUrl: "views/home.html", controller: "HomeCtrl" })
            .when("/Login", { templateUrl: "views/login.html", controller: "LoginCtrl" })
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
            "AuthenticationFailed": "שם המשתמש או הסיסמה שגויים או שאינך רשום"
        });
    });


    
})(Simple, Cal, Cal.Yazil);
