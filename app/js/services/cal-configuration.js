(function(S, C) {
    C.Configuration = function(utils){
        function getValue(name){
            return $("head meta[name='" + name + "']").attr("content");
        }

        var config = {
            baseUrl: getValue("base-url"),
            version: getValue("version"),
            os: utils.os.isIOS() ? "IOS" : "Android"
        };
        
        return config;
    };
})(Simple, Cal);