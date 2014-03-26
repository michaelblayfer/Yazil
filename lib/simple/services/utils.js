(function (S) {
    S.Utilities = function() {
       
        return {
            os: {
                deviceType: function() {
                    var deviceType = (navigator.userAgent.match(/iPad/i))  == "iPad" ? "iPad" : (navigator.userAgent.match(/iPhone/i))  == "iPhone" ? "iPhone" : (navigator.userAgent.match(/Android/i)) == "Android" ? "Android" : (navigator.userAgent.match(/BlackBerry/i)) == "BlackBerry" ? "BlackBerry" : "null";
                    return deviceType;
                },
                isIOS: function () {
                    return ["iPad", "iPhone"].indexOf(this.deviceType()) >= 0;
                },
                isAndroid: function () {
                    return ["Android"].indexOf(this.deviceType()) >= 0;
                }
            },
            color: {
                fromRGBValue: function (rgb) {
                    return Math.abs(rgb).toString(16);
                },
                fromRGB: function (r, g, b) {
                    var rgb = b | (g << 8) | (r << 16);
                    return this.fromRGBValue(rgb);
                }
            },
            guid: {
                create: function() {
                    var guid =
                    'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
                        return v.toString(16);
                    });
                    return guid;
                }
            },
            browser: {
                open:function(url) {
                    if ((new S.Utilities()).os.isIOS()) {
                        window.open(url, '_system');
                    } else {
                        window.open(url, '_blank', 'location=yes');
                    }

                }
            },
            trace: {
                toDetailed: function(obj) {
                    var msgDetailed;
                    for (prop in obj) {
                         if (obj.hasOwnProperty(prop)) {
                            msgDetailed += "(" + prop + " : " + obj[prop] + ")" + "\n";                    
                         }
                    }
                }
            }
        };
    };
})(Simple);
