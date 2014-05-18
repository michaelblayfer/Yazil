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
            appid: getValue("appid")
        };
        
        config.os = _opSystem;
        
        /* switch(config.os) {
            case "Android": 
                 config.osInd = 1;
                 break;
                 
            case "IOS": 
                 config.osInd = 2;
                 break;
                 
            default: 
                 config.osInd = 3;
        }*/
        
        return config;
    };
})(Simple, Cal);
