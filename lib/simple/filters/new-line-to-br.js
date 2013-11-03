(function (S) {

    S.NewLineToBRFilter = function () {
        return function (text) {
            return text.replace(/\n/g, '<br/>');
        }
    };

})(Simple);