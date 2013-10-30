(function (S, C, Y) {
    Y.PreviousCreditsFilter = function ($filter) {
        return function (value) {
            return (value == 0) ? $filter("l10n")("NoPreviousCredits") : String(value) + " " + $filter("l10n")("PreviousCredits")
        };
    };

})(Simple, Cal, Cal.Yazil);