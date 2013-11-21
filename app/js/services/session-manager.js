(function(S, C, Y) {
    Y.SessionManager = function ($q, $rootScope, storageService) {
        var currentUser = null;

        function sessionInfo(key, value) {
            return storageService.prefix("Cal.Yazil").session(key, value);
        }

        function start(user) {
            return sessionInfo("User", user).then(function (user) {
                currentUser = user;
                $rootScope.$broadcast("Cal.Yazil.SessionStarted", user);
                return user;
            });
        }

        function end() {
            return sessionInfo("User", null).then(function () {
                currentUser = null;
                $rootScope.$broadcast("Cal.Yazil.SessionEnded");
            });
        }

        function get(key) {
            return sessionInfo(key);
        }
        function isValidToken(user) {
            return true;
            //var now = new Date();
            //return now < moment(token.expiredAt).add("d", 5);
        }
        function isUserLoggedIn() {
            var result = $q.defer();

            if (currentUser) {
                result.resolve(currentUser);
            } else {
                var userInfo = get("User").then(function (info) {
                    if (info) {
                        if (isValidToken(info)) {
                            currentUser = info;
                            result.resolve(info);
                        } else {
                            result.reject();
                        }
                    } else {
                        result.reject();
                    }
                });
            }
            return result.promise;
        }


        function getAuthenticationToken() {
            return get("User").then(function (user) {
                if (user) {
                    return user.AuthenticationToken;
                }
            });
        }

        return {
            get: get,
            start: start,
            end: end,
            getAuthenticationToken: getAuthenticationToken,
            isUserLoggedIn: isUserLoggedIn
        };
    };
})(Simple, Cal, Cal.Yazil);