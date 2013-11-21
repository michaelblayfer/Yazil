(function(S, C, Y) {

    Y.ServiceClient = function(calConfiguration, calServiceClient){
        
        function authenticate(userName, password, loadDataOperation){
            return calServiceClient.run("POST",
                                        "YazilAuthenticator", 
                                        { UserName: userName, Password: password, LoadDataOperation: loadDataOperation});
        }
        
        function getMetadata(){
            return calServiceClient.run("GET", "YazilMetaData", { CurrentVersion: calConfiguration.version, OperatingSystem: "IOS"});
        }        
        
        return {
            authenticate: authenticate,
            getMetadata: getMetadata
        }
    }
})(Simple, Cal, Cal.Yazil);