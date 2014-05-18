(function (S, C) {
    C.ServiceClient = function ($q, $http, $rootScope, calConfiguration) {
        var authenticationToken = null;

        $rootScope.$on("Cal.Yazil.SessionStarted", function (e, user) {
            authenticationToken = user.AuthenticationToken;
        });
        $rootScope.$on("Cal.Yazil.SessionEnded", function () {
            authenticationToken = null;
        });
        function run(method, url, parameters, context, token) {

            if (url.indexOf("--CreditInfoByAccounts") == 0) {
                var results = {
                    data: {
                        UpdateURLIOS: "google.com?q=ios",
                        UpdateURLAndroid: "google.com?q=android",
                        Response: {
                            Status: {
                                SeverityCode: "E",
                                SeverityNumber: "001",
                                Description: "חובה לעדכן גרסה"
                            },
                            DialogBox: {
                                Title: "Errorrrr!",
                                Content: "לא רוצה",
                                OKButtonText: "סגור",
                                //CancelButtonText: "ביטול"
                            }
                        }
                    }
                };
                return processResults(results);
            }

            var httpConfig = {
                // calConfiguration.baseUrl
                url: [$("meta[name=base-url]").attr("content") , url].join("/"),
                method: method,
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                }
            };

            if (method == "GET") {
                httpConfig.params = parameters;
            } else {
                httpConfig.data = parameters;
            }

            token = token || authenticationToken;
            if (token) {
                httpConfig.headers["Authorization"] = "CalAuthScheme " + token;
            }

            function parseResponse(data) {
                var error = {
                    data: data
                };
                var response = data.Response;
                error.Severity = response.Status.SeverityCode;
                error.Number = response.Status.SeverityNumber;
                error.Message = response.Status.Description;
                error.ReturnUrl = response.Status.ReturnUrl;

                if (response.DialogBox) {
                    error.Dialog = {
                        title: response.DialogBox.Title,
                        message: response.DialogBox.Content,
                        confirmText: response.DialogBox.CancelButtonText ? response.DialogBox.OKButtonText : null,
                        cancelText: response.DialogBox.CancelButtonText || response.DialogBox.OKButtonText
                    };
                }

                return error;
            }



            function processResults(results) {

                var data = results.data;
                
                var result = $q.defer();
                var response = data.Response;
                var status = response.Status;

                if (!status.Succeeded) {
                    result.reject(parseResponse(data));
                } else {
                    result.resolve(data);
                }
                return result.promise;

            }

            console.log("On client run : " + JSON.stringify(httpConfig));
            return $http(httpConfig).then(processResults);
        }

        return {
            run: run
        };

    };
})(Simple, Cal);
