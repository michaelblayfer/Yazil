(function(S, C) {
    C.Configuration = function(){
        function getValue(name){
            return $("head meta[name='" + name + "']").attr("content");
        }
        var config = {
            baseUrl: getValue("base-url"),
            version: getValue("version")
        }
        
        return config;
    };
})(Simple, Cal);