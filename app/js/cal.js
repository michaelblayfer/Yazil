Cal = {
    Severity: {
        Success: "S",
        Warning: "W",
        Error: "E",
        Information: "I"
        
    },
    isError: function (error, desiredErrorCode, severityCode) {
        if (!severityCode || severityCode == error.Severity) {
            var codeToCheck = parseInt(error.Number, 10);
            if (desiredErrorCode.length) {
                return desiredErrorCode.indexOf(codeToCheck) >= 0;
            } else {
                return desiredErrorCode == codeToCheck;
            }
        } else {
            return false;
        }
    },
    Yazil: {
        Errors: {
            MetadataErrors: [1, 2],
            MetadataWarning: 1,
            VersionRequired: 2,
            PasswrodChangeRequired: [ 43, 44, 49 ],
            LockedUser: 48,
            InactiveCustomer: 2
        }
    }
};