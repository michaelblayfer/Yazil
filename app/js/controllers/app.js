(function (S, C, Y) {

    Y.AppController = function ($scope, $rootScope, $route, $location, $controller, $filter, metadataService) {
        
        $scope.animations = {
            page: false,
            swipe: false
        };

        $rootScope.$on("Cal.Yazil.SessionStarted", function() {
            metadataService.getMetadata().then(function (metadata) {
                $scope.animations.page = metadata.PageAnimationEnabled;
                $scope.animations.swipe = metadata.SwipeAnimationEnabled;
            });
        });

        $rootScope.$on("Cal.Yazil.SessionEnded", function() {
            $scope.animations = {
                page: false,
                swipe: false
            };
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
        $rootScope.navigateToCustomerService = function () {
            $location.path("CustomerService");
        };
        $rootScope.navigateToHome = function () {
            $location.path("/");
        };
        $rootScope.navigateToAccount = function () {
            $location.path("Account");
        };
        $rootScope.navigateToMoreInfo = function () {
            $location.path("MoreInfo");
        };

        $rootScope.isButtonSelected = function (name) {
            return $route.current.controller == name;
        };
    };

})(Simple, Cal, Cal.Yazil);