(function(S, C, Y) {

    Y.ServiceClient = function($q,calConfiguration, calServiceClient) {

        function authenticate(userName, password, loadDataOperation) {
            return calServiceClient.run("POST",
                "YazilAuthenticator",
                { UserName: userName, Password: password, LoadDataOperation: loadDataOperation });
        }
        
        function postSubscriptionInfo(newlyRegId) {
            return calServiceClient.run("POST",
                "PushSubscription",
                { RegistrationId : newlyRegId, CalApplicationId : calConfiguration.appid.toString(), DeviceBrand : calConfiguration.osInd.toString() });
        }        

        function getMetadata() {
            return calServiceClient.run("GET", "YazilMetaData", { CurrentVersion: calConfiguration.version, OperatingSystem: calConfiguration.os == "Other" ? "Android" : calConfiguration.os });
        }

        function getAccountSummary() {
            return calServiceClient.run("GET", "CreditInfoByAccounts");
        }

        function getAccountTransactions(number, mislaka) {
            return calServiceClient.run("GET", "AccountCreditTransactions/" + number + "@" + mislaka);
        }

        function logout(user) {
            return calServiceClient.run("DELETE", "YazilAuthenticator", null, null, user ? user.AuthenticationToken : null);
        }

        return {
            authenticate: authenticate,
            getMetadata: getMetadata,
            getAccountSummary: getAccountSummary,
            getAccountTransactions: getAccountTransactions,
            logout: logout
        };
    };
})(Simple, Cal, Cal.Yazil);
