(function(S, C, Y) {
    Y.LoginController = function ($scope,$location, loginManager, network, networkManager, $log, textResource, metadataService) {


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

        loginManager.isUserLoggedIn().then(function() {
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
            var authResult = loginManager.authenticate($scope.Username, $scope.Password);
            function loginUser(user) {
                loginManager.login(user).then(navigate);
            }

            function authenticationFailed(error) {
                $scope.loginError = error.response.Status.Description;
            }

            authResult.then(loginUser, authenticationFailed);

        };
    };
})(Simple, Cal, Cal.Yazil);