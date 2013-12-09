(function (S) {
    S.AlertService = function($q, textResource, $rootScope, $modal) {

        function show(info) {
            
            var modalScope = $rootScope.$new();
            modalScope.title = info.title || textResource.get("AlertTitle") || "Message";
            modalScope.message = info.message;
            modalScope.confirmText = info.confirmText || textResource.get("AlertConfirm") || "Ok";
            if (info.confirmText) {
                modalScope.cancelText = info.cancelText || textResource.get("AlertCancel") || "Cancel";
            }
            var result = $q.defer(), modal;

            modalScope.close = function(status) {
                modal.modal("hide");
                result.resolve({ status: status ||  "Dismissed"  });
            };

            modalScope.confirm = function() {
                modalScope.close("Confirm");
            };

            $modal({
                template: "views/alert.html",
                persist: true,
                show: true,
                scope: modalScope
            }).then(function(theModal) {
                modal = theModal;
            });

            return result.promise;
        }


        return {
            show: show
        };
    };
})(Simple);