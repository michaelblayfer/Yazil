(function(S, C) {
    C.ServiceClient = function($q, $http,$rootScope, calConfiguration){
        var authenticationToken = null;

        $rootScope.$on("Cal.Yazil.SessionStarted", function (e,user) {
            
            authenticationToken = user.AuthenticationToken;
            console.log(user);
        });
        $rootScope.$on("Cal.Yazil.SessionEnded", function () {
            authenticationToken = null;
        });
        function run(method, url, parameters, context, token) {
            var httpConfig ={
                url: [calConfiguration.baseUrl, url].join("/"),
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
            if (token){
                httpConfig.headers["Authorization"] = "CalAuthScheme " + token;
            }
            
            return $http(httpConfig).then(function(results){
                var data = results.data;
                var result = $q.defer();
                var response = data.Response;
                var status = response.Status;
                delete data.Response;
                if (!status.Succeeded) {
                    result.reject({
                        response: response
                    });
                } else {
                    result.resolve(data);
                }
                return result.promise;
            });
        }
        
        return {
            run:run
        };
        
    };
})(Simple, Cal);