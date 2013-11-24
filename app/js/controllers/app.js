(function (S, C, Y) {

    Y.AppController = function ($scope, $rootScope, $route, $location, $controller, $filter) {
        $rootScope.notifyProgressStarted = function () {
            $rootScope.$emit("progress-started");
        };
        $rootScope.notifyProgressCompleted = function () {
            $rootScope.$emit("progress-completed");
        };

        $rootScope.$on("progress-started", function () {
            $rootScope.isInProgress = true;
            
        });
        $rootScope.$on("progress-completed", function () {
            $rootScope.isInProgress = false;
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