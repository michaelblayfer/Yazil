(function(S, C) {
    C.ServiceClient = function($q, $http, calConfiguration){
        function run(method, url, parameters, context, token){
            var httpConfig ={
                url: [calConfiguration.baseUrl, url].join("/"),
                method: method,
                data: parameters,
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                }
            };
            
            if (token){
                httpConfig.headers["Authorization"] = "CalAuthScheme " + token;
            }
            
            return $http(httpConfig).then(function(results){
                var result = $q.defer();
                var response = results.Response;
                delete results.Response;
                if (response.Status == C.Severity.Warning || response.Status == C.Severity.Error){
                    result.reject({
                        response: response
                    });
                } else {
                    result.resolve(results);
                }
                return result.promise;
            });
        }
        
        return {
            run:run
        };
        
    };
})(Simple, Cal);