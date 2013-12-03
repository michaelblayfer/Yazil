(function(S) {
    S.GoogleAnalyticsService = function(phoneGap) {

        function isAvailable() {
            return typeof ga !== "undefined";
        }
        
        function record(category, action, label) {
            if (isAvailable()) {
                if (category.Category) {
                    label = category.Label;
                    category = category.Category;
                }
                ga("send", "event", category, action, label);
                ga(function(t) {
                    console.log("Sent!", t);
                });
            }
        }
        
        function recordClick(category, label) {
            record(category, "Click", label);
        }

        function init() {

            (function (i, s, o, g, r, a, m) {
                i['GoogleAnalyticsObject'] = r; i[r] = i[r] || function () {
                    (i[r].q = i[r].q || []).push(arguments)
                }, i[r].l = 1 * new Date(); a = s.createElement(o),
                m = s.getElementsByTagName(o)[0]; a.async = 1; a.src = g; m.parentNode.insertBefore(a, m)
            })(window, document, 'script', '/lib/analytics/analytics.js', 'ga');
            var uuid = (typeof device !== "undefined" ? device.uuid : "Dev");
            console.log("Device UUID:", uuid);
            ga('create', 'UA-18343624-8', {
                'storage': 'none',
                'clientId': uuid
            });

        }

        phoneGap(init);
        // for dev test, replace the line above
        //init();
        return {
            isAvailable: isAvailable,
            record: record,
            recordClick: recordClick
        };
    };
})(Simple);