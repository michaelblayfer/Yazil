(function(S, C, Y) {
    Y.LoginController = function ($scope,$location, loginManager, network, networkManager, $log, textResource, metadataService, sessionManager, alertService) {


        var forgotPasswordLink = "http://cal-online.co.il";
        metadataService.getMetadata().then(function (metadata) {
            forgotPasswordLink = metadata.ForgotUserPasswordURL;
        });

        $scope.forgotPassword = function () {
            window.open(forgotPasswordLink);
        }
        function navigate() {
            $location.path("/");
        }

        sessionManager.isUserLoggedIn().then(function () {
            navigate();
        });
        
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