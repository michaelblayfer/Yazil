(function(S, C, Y) {
    Y.LoginController = function ($scope,$location, loginManager, network, networkManager, $log, textResource, metadataService, sessionManager, alertService) {

        function navigate() {
            $location.path("/");
        }

        $scope.forgotPasswordLink = "http://cal-online.co.il";
        metadataService.getMetadata().then(function (metadata) {
            $scope.forgotPasswordLink = metadata.ForgotUserPasswordURL;
            sessionManager.isUserLoggedIn(metadata.SessionTimeout).then(function () {
                navigate();
            });
        });

        $scope.forgotPassword = function() {
            window.open($scope.forgotPasswordLink);
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
            $scope.notifyProgressStarted();
            var password = $scope.Password;
            $scope.Password = "";
            var authResult = loginManager.authenticate($scope.Username, password);
            
            function loginUser(user) {
                loginManager.login(user).then(navigate);
            }

            function authenticationFailed(error) {
                $scope.loginError = error.Message;
                if (C.isError(error, Y.Errors.LockedUser)) {
                    alertService.show(error.Dialog);
                } else if (C.isError(error, Y.Errors.PasswrodChangeRequired)) {
                    alertService.show(error.Dialog).then(function(result) {
                        if (result.status == "Confirm") {
                            window.open(error.ReturnUrl);
                        }
                    });
                }
            }

            authResult.then(loginUser, authenticationFailed).finally($scope.notifyProgressCompleted);

        };
    };
})(Simple, Cal, Cal.Yazil);