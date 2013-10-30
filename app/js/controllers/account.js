(function (S, C, Y) {

    Y.AccountController = function ($scope, $location, accountManager) {
        accountManager.getAccounts().then(function(accounts){
            $scope.accounts = accounts;
            if (accounts.length > 0) {
                $scope.selectAccount(0);
            }
        });       

        
        $scope.selectAccount = function (index) {
            if ($scope.accounts && index >= 0 && index < $scope.accounts.length) {
                $scope.selectedAccount = $scope.accounts[index];
            }
        }

        
    };

})(Simple, Cal, Cal.Yazil);