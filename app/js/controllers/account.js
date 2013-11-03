﻿(function (S, C, Y) {

    Y.AccountController = function ($scope, $location, accountManager) {
        accountManager.getAccounts().then(function(accounts){
            $scope.accounts = accounts;
            if (accounts.length > 0) {
                selectAccount(0);
            }
        });       

        $scope.nextAccount = function () {
            if ($scope.selectedAccountIndex < $scope.accounts.length -1) {
                $scope.selectedAccountIndex++;
            } else {
                $scope.selectedAccountIndex = 0;
            }
            selectAccount($scope.selectedAccountIndex);
        }

        $scope.previousAccount = function () {
            if ($scope.selectedAccountIndex > 0) {
                $scope.selectedAccountIndex--;
            } else {
                $scope.selectedAccountIndex = $scope.accounts.length - 1;
            }
            selectAccount($scope.selectedAccountIndex);
        }

        function selectAccount(index) {
            if ($scope.accounts && index >= 0 && index < $scope.accounts.length) {
                $scope.selectedAccount = $scope.accounts[index];
            }
        }
        $scope.nextCreditExpanded =false;
        $scope.previousCreditExpanded =false;
        $scope.toggleExpand = function (type) {
            if (type == "next") {
                $scope.nextCreditExpanded = !$scope.nextCreditExpanded;
                if ($scope.nextCreditExpanded) {
                    $scope.previousCreditExpanded = false;
                }
            } else {
                $scope.previousCreditExpanded = !$scope.previousCreditExpanded;
                if ($scope.previousCreditExpanded) {
                    $scope.nextCreditExpanded = false;
                }

            }
        }
    };

})(Simple, Cal, Cal.Yazil);