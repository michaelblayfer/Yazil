(function (S, C, Y) {
    var yazilModule = angular.module("Cal.Yazil");

    //yazilModule.service("verifyLogin", ["$q", "$location", "$rootScope", "metadataService", "sessionManager", "$log", "alertService", "utils", function ($q, $location, $rootScope, metadataService, sessionManager, $log, alertService, utils) {
    //    var result = $q.defer();



    //    return result.promise;
    //}]);


    yazilModule.config(function ($routeProvider, $q, pushNotificationService) {
        console.log("pushNotificationService is : " + typeof pushNotificationService);
        $routeProvider
            .when("/", { templateUrl: "views/home.html", controller: "HomeCtrl", resolve: { 
                registrationInfo: function () { 
                    console.log("during resolution...");
                    return pushNotificationService.getPNRegistrationID();
                } 
                } 
            })
            .otherwise({ redirectTo: "/" });
    });

})(Simple, Cal, Cal.Yazil);
