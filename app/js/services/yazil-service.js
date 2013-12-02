(function(S, C, Y) {

    Y.ServiceClient = function(calConfiguration, calServiceClient) {

        function authenticate(userName, password, loadDataOperation) {
            return calServiceClient.run("POST",
                "YazilAuthenticator",
                { UserName: userName, Password: password, LoadDataOperation: loadDataOperation });
        }

        function getMetadata() {
            return calServiceClient.run("GET", "YazilMetaData", { CurrentVersion: calConfiguration.version, OperatingSystem: calConfiguration.os });
        }

        function getAccountSummary() {
            return calServiceClient.run("GET", "CreditInfoByAccounts");
        }

        function getAccountTransactions(number, mislaka) {
            return calServiceClient.run("GET", "AccountCreditTransactions/" + number + "@" + mislaka);
        }

        function logout() {
            return calServiceClient.run("DELETE", "YazilAuthenticator");
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