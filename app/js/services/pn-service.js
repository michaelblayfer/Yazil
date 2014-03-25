(function (S, C, Y) {
    Y.PushNotificationService = function ($q, $rootScope, calConfiguration, utils) {
        var registrationID = null,
            registrationSuccess,
            registrationErrDetails,
            ePNLastEvent,
            dfr;

        function PNSuccessHandler(result) {
            console.log("PNSuccessHandler : " + result);
            registrationSuccess = true;
        }
        
        function PNSuccessHandler_IOS(result) {
            console.log("IOS PNSuccessHandler : " + result);
            registrationSuccess = true;
            
            registrationID = result;
            $rootScope.$emit("PN_registered", result);            
            dfr.resolve(registrationID);            
        }

        function PNErrorHandler(errDetails) {
            console.log("PNErrorHandler : " + errDetails);
            registrationErrDetails = errDetails;
            registrationSuccess = false;
            registrationID = "none";
            dfr.reject("registration failed");
        }

        function getPNRegistrationErrDetails() {
            return registrationErrDetails;
        }

        function getPNRegistrationID() {
            console.log("got to getPNRegistrationID");
            dfr = $q.defer();
            return dfr.promise;
        }

        function getLastPNMessage() {
            return ePNLastEvent;
        }

        function isPNRegistrationSucceeded() {
            return !!registrationSuccess;
        }

        function IOS_PNHandler(event) {
            try
            {
                var bh = function(e) {
                    console.log("IOS icon badge handler : " + e);
                }
                
                if ( event.alert )
                {
                    navigator.notification.alert(event.alert);
                }
            
                if ( event.sound )
                {
                    var snd = new Media(event.sound);
                    snd.play();
                }

                if ( event.badge )
                {
                    var pushNotification = window.plugins.pushNotification;
                    pushNotification.setApplicationIconBadgeNumber(bh, bh, event.badge);
                }
            }
            catch(exc) {
                console.log("IOS PHandler exception : " + exc);
            }
        }

        function PNHandler(e) {
            console.log('PNHandler event= ' + e);
            ePNLastEvent = e;

            switch (e.event) {
                case 'registered':
                    if (e.regid.length > 0) {
                        $rootScope.$emit("PN_registered", e.regid);
                        registrationID = e.regid;
                        dfr.resolve(registrationID);
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
                    dfr.resolve(registrationID);
                    break;

                default:
                    $rootScope.$emit("PN_unknown_event", e.msg);
                    console.log('An unknown GCM event has occurred');
                    break;
            }
        }

        function registerPN() {
            if (!isPNRegistrationSucceeded()) {
                console.log("...");
                var pushNotification = window.plugins.pushNotification;
                
                if (pushNotification) {
                    if (utils.os.isAndroid()) {
                        console.log("(GCM) Sender ID : "  + calConfiguration.senderID);
                        Cal.Configuration._PNHandler = PNHandler;
                        
                        pushNotification.register(PNSuccessHandler, PNErrorHandler, {
                            'senderID': calConfiguration.senderID,
                            'ecb': "Cal.Configuration._PNHandler"
                        });
                    } else if (utils.os.isIOS()) {
                               console.log("(APN) Sender ID : doesn't apply");
                               Cal.Configuration._PNHandler = IOS_PNHandler;
                                
                               pushNotification.register(PNSuccessHandler_IOS, PNErrorHandler, {
                                                            "badge": "true",
                                                            "sound": "true",
                                                            "alert": "true",
                                                            "ecb": "Cal.Configuration._PNHandler"
                                                        });
                                           
                           } else {
                                    console.log('Not supported platform for PN!');
                             }
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
