(function (S, C, Y) {

    Y.AppController = [
        "$q",
        "$scope",
        "$rootScope",
        "$route",
        "$location",
        "$controller",
        "$filter",
        "metadataService",
        "accountManager",
        "analytics",
        "loginManager",
        "alertService",
        "textResource",
        "$window",
        "phoneGap",
        "sessionManager",
        "utils",
        "$log",
        function ($q, $scope, $rootScope, $route, $location, $controller, $filter, metadataService, accountManager, analytics, loginManager, alertService, textResource, $window, phoneGap, sessionManager, utils, $log) {
            

            function attachBackButton() {
                document.addEventListener("backbutton", function (e) {
                    
                    if (location.hash == "#/Login") {
                        e.preventDefault();
                        navigator.app.exitApp();
                    } else if (location.hash == "#/") {
                        if ($scope.isLoggedIn) {
                            $scope.logout();
                        }
                    } else {
                        navigator.app.backHistory();
                    }
                }, false);
            }

            phoneGap(attachBackButton)();


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

            $rootScope.$on("Cal.Yazil.SessionStarted", updateMetadata);

            $rootScope.$on("Cal.Yazil.SessionEnded", function () {
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


            $rootScope.$on("$routeChangeSuccess", function (event, next, current) {
                if (next && next.locals && next.locals.pageInfo) {
                    $scope.header = $filter("l10n")(next.locals.pageInfo.header);
                    $scope.hideFooter = next.locals.pageInfo.hideFooter;
                    $scope.displayBack = next.locals.pageInfo.displayBack;
                }
            });

            $rootScope.back = function () {
                $window.history.back();
            };

            $scope.notifyError = function (error, customMessage) {
                var result = $q.defer();
                if (typeof error.status !== "undefined" &&
                    error.status == 0 || error.status == 404) {
                    var messageDialog = {
                        message: customMessage || textResource.get("CommunicationError"),
                        confirmText: customMessage ? null : textResource.get("Retry"),
                        cancelText: textResource.get("Close")
                    };
                    alertService.show(messageDialog).then(function (errorResult) {
                        if (!customMessage && errorResult.status == "Confirm") {
                            result.resolve();
                        } else {
                            result.reject(errorResult.status);
                        }
                    }, result.reject);
                } else {
                    if (error.Dialog) {
                        alertService.show(error.Dialog).then(function (messageResult) {
                            result.reject(messageResult);
                        }, result.reject);
                    } else {
                        result.reject();
                    }
                }

                return result.promise;
            };

            $scope.logout = function () {

                alertService.show({
                    message: textResource.get("LogoutMessage"),
                    confirmText: textResource.get("Yes"),
                    cancelText: textResource.get("No")
                }).then(function (result) {

                    if (result.status == "Confirm") {
                        $rootScope.isLoggedIn = false;
                        analytics.recordClick(Y.AnalyticsEvents.Logout);
                        loginManager.logout().finally(function () {
                            $location.path("/Login");
                        });
                    }
                });
            };
            $rootScope.unattendedLogout = function () {
                $rootScope.isLoggedIn = false;
                return loginManager.logout().finally(function () {
                    $location.path("/Login");
                });
            };


            $scope.navigateToCustomerService = function (from) {
                analytics.recordClick(Y.AnalyticsEvents[(from == "login" ? "Login" : "") + "CustomerService"]);
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
                return $route.current && $route.current.controller == name;
            };

            /***/

            
        }];

})(Simple, Cal, Cal.Yazil);