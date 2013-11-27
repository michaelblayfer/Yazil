(function (S, C, Y) {

    function createCreditsFilter(empty, one, many) {
        return function($filter) {
            return function(value) {
                var text = $filter("l10n")(empty);
                if (value) {
                    value = parseInt(value, 10);

                    if (value == 1) {
                        text = $filter("l10n")(one);
                    } else if (value > 1) {
                        text = String(value) + " " + $filter("l10n")(many);
                    }
                }

                return text;
            };
        };
    }
    
   // createCreditsFilter($filter, "NoPreviousCredits", "PreviousCredit", "PreviousCredits");
    Y.PreviousCreditsFilter = function($filter) {
            return function(value) {
                var text = $filter("l10n")("NoPreviousCredits");
                if (value) {
                    value = parseInt(value, 10);

                    if (value == 1) {
                        text = $filter("l10n")("PreviousCredit");
                    } else if (value > 1) {
                        text = String(value) + " " + $filter("l10n")("PreviousCredits");
                    }
                }

                return text;
            };
        };

    Y.NextCreditsFilter = function ($filter) {
        return function (value) {
            var text = $filter("l10n")("NoNextCredits");
            if (value) {
                value = parseInt(value, 10);

                if (value == 1) {
                    text = $filter("l10n")("NextCredit");
                } else if (value > 1) {
                    text = String(value) + " " + $filter("l10n")("NextCredits");
                }
            }

            return text;
        };
    };
        //createCreditsFilter($filter, "NoNextCredits", "NextCredit", "NextCredits");

})(Simple, Cal, Cal.Yazil);