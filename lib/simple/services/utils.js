(function (S) {
    S.Utilities = function($q) {
        function colorToHex(color) {
            color = String(color);
            if (color.substr(0, 1) === '#') {
                return color;
            }
            var digits = /(.*?)rgb\((\d+), (\d+), (\d+)\)/.exec(color);

            var red = parseInt(digits[2]);
            var green = parseInt(digits[3]);
            var blue = parseInt(digits[4]);

            var rgb = blue | (green << 8) | (red << 16);
            return digits[1] + '#' + rgb.toString(16);
        };
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
                    if (S.Utilities.os.isIOS()) {
                        window.open(url, '_system');
                    } else {
                        window.open(url, '_blank', 'location=yes');
                    }

                }
            }
        };
    };
})(Simple);