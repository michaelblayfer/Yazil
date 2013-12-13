(function (S) {//UA-3032756-9
    S.GoogleAnalyticsService = function (key) {
        ga_storage._setAccount(key);
        return function() {

            function isAvailable() {
                return true; // typeof ga !== "undefined";
            }

            function record(category, action, label) {

                if (isAvailable()) {
                    if (category.Category) {
                        label = category.Label;
                        category = category.Category;
                    }
                    //ga(onRecorded);
                    //ga("send", "event", category, action, label);
                    //_gaq.push(onRecorded);
                    //_gaq.push(["_trackEvent", category, action, label]);
                    ga_storage._trackEvent(category, action, label);
                }
            }

            function recordClick(category, label) {
                record(category, "Click", label);
            }

            return {
                isAvailable: isAvailable,
                record: record,
                recordClick: recordClick
            };
        };
    };
})(Simple);