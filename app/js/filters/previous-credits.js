(function (S, C, Y) {
    Y.PreviousCreditsFilter = function ($filter) {
        return function (value) {
            if (value) {
                value = parseInt(value);
                var text = $filter("l10n")("PreviousCredits");
                if (value == 1) {
                    text = $filter("l10n")("PreviousCredit");
                }
            } else {
                text = $filter("l10n")("NoPreviousCredits");
            }

            return text;
        };
    };

})(Simple, Cal, Cal.Yazil);