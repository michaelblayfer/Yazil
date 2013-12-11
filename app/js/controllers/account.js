(function (S, C, Y) {

    Y.AccountController = function ($scope, $location, accountManager, alertService, $timeout, analytics) {
        accountManager.getAccounts().then(function(accounts){
            $scope.accounts = accounts;
            if (accounts.length > 0) {
                $scope.selectedAccountIndex = 0;
                selectAccount(0);
            } else {
                $location.path("home");
            }
        }, function (error) {
            alertService.show(error.Dialog).then(function () {
                $scope.unattendedLogout();
            });
        });

        $scope.nextAccount = function() {
            if ($scope.selectedAccountIndex < $scope.accounts.length - 1) {
                $scope.selectedAccountIndex++;
            } else {
                $scope.selectedAccountIndex = 0;
            }
            if (selectAccount($scope.selectedAccountIndex)) {
                $scope.movedToNext = true;
                $scope.movedToPrevious = false;
            }
        };

        $scope.previousAccount = function() {
            if ($scope.selectedAccountIndex > 0) {
                $scope.selectedAccountIndex--;
            } else {
                $scope.selectedAccountIndex = $scope.accounts.length - 1;
            }
            if (selectAccount($scope.selectedAccountIndex)) {
                $scope.movedToNext = false;
                $scope.movedToPrevious = true;
            }
        };

        function selectAccount(index) {
            if ($scope.accounts && index >= 0 && index < $scope.accounts.length) {
                $scope.nextCreditExpanded = $scope.previousCreditExpanded = false;
                $scope.selectedAccount = $scope.accounts[index];
                if ($scope.accounts.length > 1) {
                    $timeout(function() {
                        $scope.movedToNext = false;
                        $scope.movedToPrevious = false;
                    }, 500);

                    return true;
                }
            }
            return false;
        }

        $scope.nextCreditExpanded =false;
        $scope.previousCreditExpanded =false;
        $scope.toggleExpand = function (type, condition) {
            if (condition) {
                if (type == "next") {
                    analytics.recordClick(Y.AnalyticsEvents.NextCredit);
                    $scope.nextCreditExpanded = !$scope.nextCreditExpanded;
                    if ($scope.nextCreditExpanded) {
                        $scope.previousCreditExpanded = false;
                    }
                } else {
                    analytics.recordClick(Y.AnalyticsEvents.PreviousCredit);
                    $scope.previousCreditExpanded = !$scope.previousCreditExpanded;
                    if ($scope.previousCreditExpanded) {
                        $scope.nextCreditExpanded = false;
                    }
                }
            }
        };
    };

})(Simple, Cal, Cal.Yazil);