(function (S, C, Y) {

    var yazilModule = angular.module("Cal.Yazil", ["ngRoute", "ngTouch", "ngAnimate","$strap", "Simple"]);
    
    yazilModule.service("calConfiguration", C.Configuration);
    yazilModule.service("calServiceClient", C.ServiceClient);
    yazilModule.service("sessionManager", Y.SessionManager);
    
    var analyticsService = S.GoogleAnalyticsService('UA-18343624-8');
    yazilModule.service("analytics", analyticsService);
    yazilModule.service("yazilServiceClient", Y.ServiceClient);

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
        return function(scope, element, attrs) {
            $(element).click(function(event) {
                event.preventDefault();
            });
        };
    });

    yazilModule.filter("previousCredits", Y.PreviousCreditsFilter);
    yazilModule.filter("nextCredits", Y.NextCreditsFilter);
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
            .when("/", { templateUrl: "views/home.html", controller: "HomeCtrl", resolve: { pageInfo: function () { return { header: "MyAccountsTitle" }; } } })
            .when("/Login", { templateUrl: "views/login.html", controller: "LoginCtrl", resolve: { pageInfo: function () { return { header: "Welcome", hideFooter: true }; } } })
            .when("/Account", { templateUrl: "views/account.html", controller: "AccountCtrl", resolve: { pageInfo: function () { return { header: "MyAccountTitle" }; } } })
            .when("/LegalTerms", { templateUrl: "views/legal-terms.html", controller: "MoreInfoCtrl", resolve: { pageInfo: function () { return { header: "LegalTerms", displayBack: true }; } } })
            .when("/Security", { templateUrl: "views/security.html", controller: "MoreInfoCtrl", resolve: { pageInfo: function () { return { header: "InfoSecurity", displayBack: true }; } } })
            .when("/MoreInfo", { templateUrl: "views/more-info.html", controller: "MoreInfoCtrl", resolve: { pageInfo: function () { return { header: "MoreInfo" }; } } })
            .when("/Splash", { templateUrl: "views/splash.html", controller: "SplashCtrl", resolve: { pageInfo: function () { return { header: false }; } } })
            .when("/CustomerService", { templateUrl: "views/customer-service.html", controller: "CustomerServiceCtrl", resolve: { pageInfo: function () { return { header: "CustomerService" }; } } })
            .otherwise({ redirectTo: "/" });
    });
    
    yazilModule.run(function ($rootScope, $location, loginManager, sessionManager, metadataService, alertService, utils) {
        // register listener to watch route changes

        var anonymousAllowed = ["views/login.html", "views/customer-service.html", "views/splash.html"];
        $rootScope.$on("$routeChangeStart", function (event, next, current) {
            metadataService.getMetadata().then(function (metadata) {
                sessionManager.isUserLoggedIn(metadata.SessionTimeout).then(function (user) {
                    $rootScope.isLoggedIn = true;
                    sessionManager.start(user, metadata.SessionTimeout);
                }, function () {
                    $rootScope.isLoggedIn = false;
                    if (anonymousAllowed.indexOf(next.templateUrl) >= 0) {
                    } else {
                        if (!$rootScope.alreadyStarted) {
                            $location.path("/Splash");
                            $rootScope.alreadyStarted = true;
                        } else {
                            $location.path("/Login");
                        }
                    }
                });
            }, function (error) {
                $rootScope.alreadyStarted = false;
                $location.path("/Splash");
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
            "LogoutMessage": "האם ברצונך להתנתק?",
            "Yes": "כן",
            "No":"לא",
            "ForgotPassword": "שכחתי שם משתמש / סיסמה",
            "AuthenticationFailed": "שם המשתמש או הסיסמה שגויים או שאינך רשום",
            "NextCredit": "זיכוי קרוב",
            "PreviousCredit": "זיכוי אחרון",
            "BalanceComment": '(סה"כ יתרות - כולל זיכוי קרוב)',
            "TotalBalance": 'סה"כ יתרות',
            "BalanceValueDate": "נכון לתאריך",
            "GoToAccountDetails": "לצפייה בפירוט חשבונות",
            "NoPreviousCredits": "זיכויים אחרונים",
            "PreviousCredits": "זיכויים אחרונים",
            "NextCredits": "זיכויים קרובים",
            "LegalTerms": "תנאים משפטיים",
            "InfoSecurity": "אבטחת מידע",
            "CustomerService": "שירות לקוחות",
            "MyAccountsTitle": "החשבונות שלי",
            "MyAccountTitle": "החשבון שלי",
            "MyAccounts": "פירוט חשבונות",
            "Home":"דף הבית",
            "MoreInfo": "עוד...",
            "CreditDate": "תאריך זיכוי",
            "CreditAmount": "סכום",
            "NoNetworkError": "אין חיבור רשת, לא ניתן לבצע כניסה",
            "AlertTitle": "הודעה",
            "AlertConfirm":"אישור",
            "AlertCancel": "ביטול",
            "AccountNumber": "חשבון מס'",
            "InvalidUsernameOrPassword": "יש להזין אותיות באנגלית או מספרים בלבד",
            "InvalidUsername": "יש להזין אותיות באנגלית או מספרים בלבד, בשדה שם משתמש",
            "InvalidPassword": "יש להזין אותיות באנגלית או מספרים בלבד, בשדה סיסמה",
            "NoAmount": "אין נתונים להצגה",
            "VersionUpdateRequired": "נדרש עדכון גרסה ע\"מ להשתמש באפליקציה",
            "ClickToUpdateVersion": "לחץ לעדכון גרסה",
            "MetadataError": "שגיאה בהפעלת האפליקציה",
            "Loading": "טוען",
            "Message": "הודעה",
            "ErrorMessage": "אירעה שגיאה בלתי צפויה",
            "NoNextCredits": "זיכויים קרובים",
            "MissingUserName": "נא להזין שם משתמש",
            "MissingPassword": "נא להזין סיסמה",
            "CommunicationError": "לא ניתן לקיים תקשורת. האם ברצונך לנסות שנית?",
            "Retry": "נסה שנית",
            "Close":"סגור"
        });
    });

})(Simple, Cal, Cal.Yazil);
