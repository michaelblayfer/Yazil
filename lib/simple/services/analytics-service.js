(function(S) {
    S.GoogleAnalyticsService = function() {

        function isAvailable() {
            return typeof ga !== "undefined";
        }
        
        function sendEvent(category, action, label) {
            if (isAvailable()) {
                ga("send", "event", "כניסה", "Click", "מסך פתיחה");
            }
        }

        return {
            isAvailable: isAvailable,
            sendEvent: sendEvent
        };
    };
})(Simple);