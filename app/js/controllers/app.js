(function (S, C, Y) {

    Y.AppController = function ($scope, $rootScope, $route, $location, $controller, $filter, metadataService, accountManager, analytics, loginManager, alertService, textResource) {
        $scope.displayCalLogo = true;
        $scope.animations = {
            page: false,
            swipe: false
        };

        function updateMetadata() {
            metadataService.getMetadata().then(function (metadata) {
                $scope.animations.page = metadata.PageAnimationEnabled;
                $scope.animations.swipe = metadata.SwipeAnimationEnabled;
                $scope.displayCalLogo = metadata.DisplayCalLogo;
            });
        }

        updateMetadata();
        $rootScope.$on("Cal.Yazil.SessionStarted", updateMetadata);

        $rootScope.$on("Cal.Yazil.SessionEnded", function() {
            $scope.animations = {
                page: false,
                swipe: false
            };

            accountManager.clearCache();
        });

        $rootScope.notifyProgressStarted = function () {
            $rootScope.$emit("progress-started");
        };
        $rootScope.notifyProgressCompleted = function () {
            $rootScope.$emit("progress-completed");
        };

        $rootScope.$on("progress-started", function () {
            $scope.isInProgress = true;
            
        });
        $rootScope.$on("progress-completed", function () {
            $scope.isInProgress = false;
        });
        $rootScope.$on("$routeChangeSuccess", function (scope, next) {
            if (next && next.locals && next.locals.pageInfo) {
                $scope.header = $filter("l10n")(next.locals.pageInfo.header);
                $scope.hideFooter = next.locals.pageInfo.hideFooter;
            }
        });
        
        $rootScope.logout = function () {
           
            alertService.show({
                message: textResource.get("LogoutMessage"),
                confirmText: textResource.get("Yes"),
                cancelText: textResource.get("No")
            }).then(function (result) {
                if (result.status == "Confirm") {
                    analytics.recordClick(Y.AnalyticsEvents.Logout);
                    loginManager.logout().finally(function () {
                        $location.path("/Login");
                    });
                }
            });
        };
        $scope.navigateToCustomerService = function (from) {
            analytics.recordClick(Y.AnalyticsEvents[(from=="login"?"Login":"") + "CustomerService"]);
            $location.path("CustomerService");
        };
        $scope.navigateToHome = function () {
            analytics.recordClick(Y.AnalyticsEvents.Home);
            $location.path("/");
        };
        $scope.navigateToAccount = function () {
            analytics.recordClick(Y.AnalyticsEvents.AccountDetails);
            $location.path("Account");
        };
        $scope.navigateToMoreInfo = function () {
            analytics.recordClick(Y.AnalyticsEvents.MoreInfo);
            $location.path("MoreInfo");
        };

        $scope.isButtonSelected = function (name) {
            return $route.current.controller == name;
        };
    };

})(Simple, Cal, Cal.Yazil);