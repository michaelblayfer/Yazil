(function(S, C, Y) {

    Y.LoginManager = function(storageService, $q, metadataService, yazilServiceClient) {
        var currentUser = null;

        function authenticate(userName, password) {

            return metadataService.getMetadata().then(function (metadata) {
                return yazilServiceClient.authenticate(userName, password, metadata.LoadDataOperation);
                //var result = $q.defer();

                //if (userName == "1") {
                //    result.resolve({
                //        Usernmame: "anon",
                //        Name: "Anonymous"
                //    });
                //} else {
                //    result.reject({
                //        status: "W",
                //        code: 7
                //    });
                //}
                //return result.promise;
            });
            
        }
        
        function sessionInfo(value){
            return storageService.prefix("Cal.Yazil").session("User", value);
        }
        function login(user) {
            var result = sessionInfo(user).then(function () {
                currentUser = user;
            });
           
           return result;
        }
        
        function isValidToken(user) {
            return true;
            //var now = new Date();
            //return now < moment(token.expiredAt).add("d", 5);
        }

        function logout() {
            currentUser = null;
            return sessionInfo(null);
        }

        function isUserLoggedIn(){
            var result = $q.defer();

            if (currentUser) {
                result.resolve(currentUser);
            } else {
                var userInfo = sessionInfo().then(function (info) {
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

        
        return {
            isUserLoggedIn: isUserLoggedIn,
            login: login,
            logout: logout,
            authenticate: authenticate
        };
    };
})(Simple, Cal, Cal.Yazil);