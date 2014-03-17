(function (S, C, Y) {
    Y.PushNotificationService = function ($q, $rootScope, calConfiguration) {
        var registrationID = null,
            registrationSuccess,
            registrationErrDetails,
            ePNLastEvent;

        function PNSuccessHandler(result) {
            console.log("PNSuccessHandler : " + result);
            registrationSuccess = true;
        }

        function PNErrorHandler(errDetails) {
            console.log("PNErrorHandler : " + errDetails);
            registrationErrDetails = errDetails;
            registrationSuccess = false;
        }

        function getPNRegistrationErrDetails() {
            return registrationErrDetails;
        }

        function getPNRegistrationID() {
            console.log("got to getPNRegistrationID");
            return $q.when(registrationID);
        }

        function getLastPNMessage() {
            return ePNLastEvent;
        }

        function isPNRegistrationSucceeded() {
            return !!registrationSuccess;
        }

        function PNHandler(e) {
            console.log('PNHandler event= ' + e);
            ePNLastEvent = e;

            switch (e.event) {
                case 'registered':
                    if (e.regid.length > 0) {
                        $rootScope.$emit("PN_registered", e.regid);
                        registrationID = regid;
                    }
                    break;

                case 'message':               // this is the actual push notification. its format depends on the data model from the push server              
                    $rootScope.$emit("PN_message", e);
                    console.log('message = ' + e.message + ' msgcnt = ' + e.msgcnt);
                    break;

                case 'error':
                    $rootScope.$emit("PN_error", e.msg);
                    console.log('GCM error = ' + e.msg);
                    registrationID = "none";
                    break;

                default:
                    $rootScope.$emit("PN_unknown_event", e.msg);
                    console.log('An unknown GCM event has occurred');
                    break;
            }
        }

        function registerPN() {
            console.log("calConfiguration param : " + calConfiguration);
            
            if (!isPNRegistrationSucceeded()) {
                var pushNotification = window.plugins.pushNotification;
                
                if (pushNotification) {
                    console.log("Pub ID : "  + calConfiguration.senderID);
                    Cal.Configuration._PNHandler = PNHandler;
                    
                    pushNotification.register(PNSuccessHandler, PNErrorHandler, {
                        'senderID': calConfiguration.senderID,
                        'ecb': "Cal.Configuration._PNHandler"
                    });
                }
            }
        }

        return {
            isPNRegistrationSucceeded: isPNRegistrationSucceeded,
            registerPN: registerPN,
            getPNRegistrationID: getPNRegistrationID,
            getLastPNMessage: getLastPNMessage,
            getPNRegistrationErrDetails: getPNRegistrationErrDetails
        };
    };
})(Simple, Cal, Cal.Yazil);
