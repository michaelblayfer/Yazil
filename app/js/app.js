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

    yazilModule.run(function($location) {
        $location.path("/Splash");
    });
    

})(Simple, Cal, Cal.Yazil);
