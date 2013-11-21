(function(S, C) {
    C.ServiceClient = function($q, $http, calConfiguration){
        function run(method, url, parameters, context, token){
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