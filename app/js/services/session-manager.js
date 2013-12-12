(function(S, C, Y) {
    Y.SessionManager = function ($q, $rootScope, storageService) {
        var currentUser = null, sessionTimeout;

        function sessionInfo(key, value) {
            return storageService.prefix("Cal.Yazil").session(key, value);
        }

        function checkSession() {
            get("User").then(function (user) {
                if (!isValidToken(user)) {
                    $rootScope.unattendedLogout();
                }
            });
        }

        var sessionTimer;

        function startSessionTimer() {
            stopSessionTimer();
            sessionTimer = setInterval(checkSession, 1000);
        }

        function stopSessionTimer() {
            if (sessionTimer) {
                clearInterval(sessionTimer);
            }
        }
        function start(user, timeout) {
            sessionTimeout = timeout;
            user.startedAt = new Date();
            startSessionTimer();
            return sessionInfo("User", user).then(function (user) {
                currentUser = user;
                $rootScope.$broadcast("Cal.Yazil.SessionStarted", user);
                return user;
            });
        }

        function end() {
            stopSessionTimer();
            if (currentUser) {
                return sessionInfo("User", null).then(function() {
                    currentUser = null;
                    $rootScope.$broadcast("Cal.Yazil.SessionEnded");
                });
            } else {
                return $q.when({});
            }
        }

        function get(key) {
            return sessionInfo(key);
        }
        function isValidToken(user) {
            
            var now = new Date();
            return user && now < moment(user.startedAt).add("s", sessionTimeout);
        }
        function isUserLoggedIn(timeout) {
            sessionTimeout = timeout;
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