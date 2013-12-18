(function(S, C, Y) {
    Y.LoginController = function ($scope, $location, loginManager, network, networkManager, $log, textResource, metadataService, sessionManager, alertService, calConfiguration, analytics, utils) {
        $scope.displayVersion = false;
        $scope.version = calConfiguration.version;
        
        function navigate() {
            analytics.recordClick(Y.AnalyticsEvents.Login);
            $location.path("/");
        }

        $scope.forgotPasswordLink = "http://cal-online.co.il";
        metadataService.getMetadata().then(function (metadata) {
            $scope.forgotPasswordLink = metadata.ForgotUserPasswordURL;
            sessionManager.isUserLoggedIn(metadata.SessionTimeout).then(function () {
                navigate();
            });
        }, function (error) {
            alertService.show(error.Dialog).then(function () {
                $scope.unattendedLogout();
            });
        });


        $scope.forgotPassword = function() {
            utils.browser.open($scope.forgotPasswordLink);
        };

       
        $scope.isOnline = false;
        function updateNetworkStatus() {
            $scope.isOnline = network.isOnline();
            if (!network.isOnline()) {
                $scope.loginError = "NoNetworkError";
            }
        }
        $scope.$on("Simple.NetworkStatusChanged", function (args) {
            updateNetworkStatus();
        });

        updateNetworkStatus();
        $scope.login = function () {
            var userName = $scope.Username, password = $scope.Password;
            $scope.Password = "";
            $scope.Username = "";
            var rx = /^[a-zA-Z\d]+$/;
            if (!userName || userName == "") {
                $scope.loginError = textResource.get("MissingUserName");
            } else if (!password || password == "") {
                $scope.loginError = textResource.get("MissingPassword");
            } else if (!rx.test(userName)) {
                $scope.loginError = "InvalidUsername";
            } else if (!rx.test(password)) {
                $scope.loginError = "InvalidPassword";
            } else {
                $scope.notifyProgressStarted();

                var authResult = loginManager.authenticate(userName, password);

                function loginUser(user) {
                    
                    loginManager.login(user).then(navigate);
                }

                function authenticationFailed(error) {
                    if (C.isError(error, Y.Errors.InvalidUsernameOrPassword)) {
                        $scope.loginError = error.Message;
                    }  else if (C.isError(error, Y.Errors.PasswrodChangeRequired)) {
                        alertService.show(error.Dialog).then(function(result) {
                            if (result.status == "Confirm") {
                                utils.browser.open(error.ReturnUrl);
                            }
                        });
                    } else {
                        // C.isError(error, Y.Errors.LockedUser)
                        // C.isError(error, Y.Errors.LoginInactiveCustomer)
                        alertService.show(error.Dialog);
                    }
                }

                authResult.then(loginUser, authenticationFailed).finally($scope.notifyProgressCompleted);
            }
        };
    };
})(Simple, Cal, Cal.Yazil);