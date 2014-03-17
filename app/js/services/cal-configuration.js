(function(S, C) {
    C.Configuration = function(utils){
        function getValue(name){
            return $("head meta[name='" + name + "']").attr("content");
        }
        
        var _opSystem = "Other";

        if (utils.os.isIOS()) {
            _opSystem = "IOS";
        }
        
        if (utils.os.isAndroid()) {
            _opSystem = "Android";
        }
        
        var config = {
            senderID: "1011010555758",
            baseUrl: getValue("base-url"),
            version: getValue("version"),
            os: _opSystem
        };
        
        return config;
    };
})(Simple, Cal);
