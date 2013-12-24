(function(S, C, Y) {

    Y.LoginManager = function(storageService, $q, metadataService, yazilServiceClient, sessionManager) {
        

        function authenticate(userName, password) {
            return metadataService.getMetadata().then(function (metadata) {
                return yazilServiceClient.authenticate(userName, password, metadata.LoadDataOperation);
            });
            
        }
        
        function login(user) {
            return metadataService.getMetadata().then(function (metadata) {
                var result = sessionManager.start(user, metadata.SessionTimeout);
                return result;
            });
        }
        


        function logout() {
            return sessionManager.end().then(function() {
                return yazilServiceClient.logout();
            });
        }


        
        return {
            login: login,
            logout: logout,
            authenticate: authenticate
        };
    };
})(Simple, Cal, Cal.Yazil);