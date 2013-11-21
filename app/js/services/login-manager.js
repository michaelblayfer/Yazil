(function(S, C, Y) {

    Y.LoginManager = function(storageService, $q, metadataService, yazilServiceClient, sessionManager) {
        

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
        
        function login(user) {
            var result = sessionManager.start(user);
           
           return result;
        }
        


        function logout() {
            
            return sessionManager.end();
        }


        
        return {
            login: login,
            logout: logout,
            authenticate: authenticate
        };
    };
})(Simple, Cal, Cal.Yazil);