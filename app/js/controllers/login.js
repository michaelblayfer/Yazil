(function(S, C, Y) {
    Y.LoginController = function ($scope, loginManager, network, networkManager, $log) {
        //$scope.Username = "mysmallfish@gmail.com";
        //$scope.Password = "1234";
        var forgotPasswordLink = "http://google.com";
        $scope.forgotPassword = function () {
            window.open(forgotPasswordLink);
        }
        function navigate() {
            location.href = "#/";
        }

        loginManager.isUserLoggedIn().then(function() {
            navigate();
        });

        $scope.networkStatus = "Unknown";
        function updateNetworkStatus() {
            $scope.networkStatus = network.isOnline() ? "Online" : "Offline";
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
                $scope.loginError = "AuthenticationFailed";
            }

            authResult.then(loginUser, authenticationFailed);

        };
    };
})(Simple, Cal, Cal.Yazil);