(function (S) {

    S.PhoneGap = function () {
        
        return function (fn, supportsBrowser) {
            if (navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry|IEMobile)/)) {
                var queue = [];

                var impl = function () {
                    queue.push(Array.prototype.slice.call(arguments));
                };

                document.addEventListener('deviceready', function () {
                    _.each(queue, function (args) {
                        fn.apply(this, args);
                    });
                    impl = fn;
                }, false);

                return function () {
                    return impl.apply(this, arguments);
                };
            } else {
                return function() {
                    if (supportsBrowser) {
                        fn.apply(this, arguments);
                    }
                };
            } 
        };
    };

})(Simple);