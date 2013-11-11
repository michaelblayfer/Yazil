(function (S, C, Y) {

    Y.AppController = function ($scope, $rootScope, $route, $location, $controller, $filter) {

        $rootScope.$on("$routeChangeSuccess", function (scope, next) {
            if (next && next.locals && next.locals.pageInfo) {
                $scope.header = $filter("l10n")(next.locals.pageInfo.header);
                $scope.hideFooter = next.locals.pageInfo.hideFooter;
            }
        });
        $rootScope.navigateToCustomerService = function () {
            $location.path("CustomerService")
        };
        $rootScope.navigateToHome = function () {
            $location.path("/")
        };
        $rootScope.navigateToAccount = function () {
            $location.path("Account")
        };
        $rootScope.navigateToMoreInfo = function () {
            $location.path("MoreInfo")
        };
    };

})(Simple, Cal, Cal.Yazil);