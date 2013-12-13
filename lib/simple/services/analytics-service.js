(function(S) {
    S.GoogleAnalyticsService = function(phoneGap) {
        //_gaq.push(['_setAccount', 'UA-18343624-8']);


        //_gaq.push(['_setAccount', 'UA-3032756-9']);
        //_gaq.push(['_setDomainName', 'none']);
        ga_storage._setAccount('UA-3032756-9');
        
        function isAvailable() {
            return true;// typeof ga !== "undefined";
        }

        function onRecorded(info) {
            console.log("Analytics Record Event Info: ", info);
        }

        function record(category, action, label) {
            
            if (isAvailable()) {
                console.log("Recording...");    
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

        function init() {

            
            //(function (i, s, o, g, r, a, m) {
            //    i['GoogleAnalyticsObject'] = r; i[r] = i[r] || function () {
            //        (i[r].q = i[r].q || []).push(arguments)
            //    }, i[r].l = 1 * new Date(); a = s.createElement(o),
            //    m = s.getElementsByTagName(o)[0]; a.async = 1; a.src = g; m.parentNode.insertBefore(a, m)
            //})(window, document, 'script', '/lib/analytics/analytics.js', 'ga');
            //var uuid = (typeof device !== "undefined" ? device.uuid : "Dev");
            //console.log("Device UUID:", uuid);
            //ga('create', 'UA-18343624-8', {
            //    'storage': 'none',
            //    'clientId': uuid
            //});

        }

        //phoneGap(init, true)();

        return {
            init: init,
            isAvailable: isAvailable,
            record: record,
            recordClick: recordClick
        };
    };
})(Simple);