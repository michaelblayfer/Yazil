(function (S, C, Y) {

    var yazilModule = angular.module("Cal.Yazil", ["ngRoute","$strap", "Simple"]);

    yazilModule.service("loginManager", Y.LoginManager);
    yazilModule.service("accountManager", Y.AccountManager);
    yazilModule.service("metadataService", Y.MetadataService);

    yazilModule.directive("toolbar", function () {
        return Y.ToolbarDirective;
    });
    
    yazilModule.directive("appHeader", function () {
        return Y.AppHeaderDirective;
    });

    yazilModule.directive('preventDefault', function () {
        return function (scope, element, attrs) {
            $(element).click(function (event) {
                event.preventDefault();
            });
        }
    });

    yazilModule.filter("previousCredits", Y.PreviousCreditsFilter);
    yazilModule.filter("accountDescription", Y.AccountDescriptionFilter);
    yazilModule.filter("intCurrency", Y.IntegerCurrencyFilter);
    
    yazilModule.controller("AppCtrl", Y.AppController);
    yazilModule.controller("LoginCtrl", Y.LoginController);
    yazilModule.controller("HomeCtrl", Y.HomeController);
    yazilModule.controller("AccountCtrl", Y.AccountController);
    yazilModule.controller("CustomerServiceCtrl", Y.CustomerServiceController);
    yazilModule.controller("MoreInfoCtrl", Y.MoreInfoController);
    yazilModule.controller("SplashCtrl", Y.SplashController);

    yazilModule.config(function ($routeProvider) {
        $routeProvider
            .when("/", { templateUrl: "views/home.html", controller: "HomeCtrl", resolve: { pageInfo: function () { return { header: "MyAccounts" }; } } })
            .when("/Login", { templateUrl: "views/login.html", controller: "LoginCtrl", resolve: { pageInfo: function () { return { header: "Welcome", hideFooter: true }; } } })
            .when("/Account", { templateUrl: "views/account.html", controller: "AccountCtrl", resolve: { pageInfo: function () { return { header: "MyAccounts" }; } } })
            .when("/LegalTerms", { templateUrl: "views/legal-terms.html", controller: "MoreInfoCtrl", resolve: { pageInfo: function () { return { header: "LegalTerms" }; } } })
            .when("/Security", { templateUrl: "views/security.html", controller: "MoreInfoCtrl", resolve: { pageInfo: function () { return { header: "InfoSecurity" }; } } })
            .when("/MoreInfo", { templateUrl: "views/more-info.html", controller: "MoreInfoCtrl", resolve: { pageInfo: function () { return { header: "MoreInfo" }; } } })
            .when("/Splash", { templateUrl: "views/splash.html", controller: "SplashCtrl", resolve: { pageInfo: function () { return { header: "Splash" }; } } })
            .when("/CustomerService", { templateUrl: "views/customer-service.html", controller: "CustomerServiceCtrl", resolve: { pageInfo: function () { return { header: "CustomerService" }; } } })
            .otherwise({ redirectTo: "/" });
    });
    
    yazilModule.run(function ($rootScope, $location, loginManager) {
        // register listener to watch route changes
        $rootScope.logout = function () {   
            loginManager.logout().then(function () {
                $location.path("Login");
            });
        };
        var anonymousAllowed = ["views/login.html", "views/customer-service.html", "views/splash.html"];
        $rootScope.$on("$routeChangeStart", function (event, next, current) {
            loginManager.isUserLoggedIn().then(function () {
                $rootScope.isLoggedIn = true;
                
            }, function () {
                $rootScope.isLoggedIn = false;
                // no logged user, we should be going to #login
                if (anonymousAllowed.indexOf(next.templateUrl) >=0) {
                } else {
                    
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
            "Welcome": "ברוכים הבאים",
            "Username": "שם משתמש",
            "Password": "סיסמה",
            "Logout": "יציאה",
            "ForgotPassword": "שכחתי שם משתמש / סיסמה",
            "AuthenticationFailed": "שם המשתמש או הסיסמה שגויים או שאינך רשום",
            "NextCredit": "זיכוי קרוב",
            "PreviousCredit": "זיכוי קודם",
            "BalanceComment": '(סה"כ יתרות - כולל זיכוי קרוב)',
            "TotalBalance": 'סה"כ יתרות',
            "BalanceValueDate": "נכון לתאריך",
            "GoToAccountDetails": "לצפייה בפירוט חשבונות",
            "NoPreviousCredits": "אין זיכויים קודמים",
            "PreviousCredits": "זיכוי/ים קודמים",
            "NextCredits": "זיכויים קרובים",
            "LegalTerms": "תנאים משפטיים",
            "InfoSecurity": "אבטחת מידע",
            "CustomerService": "שירות לקוחות",
            "MyAccounts": "פירוט חשבונות",
            "Home":"דף הבית",
            "MoreInfo": "עוד...",
            "CreditDate": "תאריך",
            "CreditAmount": "סכום",
            "NoNetworkError": "אין חיבור רשת, לא ניתן לבצע כניסה",
            "AlertTitle": "הודעה",
            "AlertConfirm":"אישור",
            "AlertCancel": "ביטול"
        });
    });

})(Simple, Cal, Cal.Yazil);
