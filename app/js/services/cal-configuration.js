(function(S, C) {
    C.Configuration = function(utils){
        function getValue(name){
            return $("head meta[name='" + name + "']").attr("content");
        }
        
        var _os = "Other";
        if (utils.os.isIOS()) _os = "IOS";
        if (utils.os.isAndroid() _os = "Android";
        
        var config = {
            senderID: "1011010555758",
            baseUrl: getValue("base-url"),
            version: getValue("version"),
            os: _os
        };
        
        return config;
    };
})(Simple, Cal);
