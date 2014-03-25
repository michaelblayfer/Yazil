﻿Cal = {
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
            InvalidUsernameOrPassword: [1,2,3,42,45],
            MetadataErrors: [1, 2],
            MetadataWarning: 1,
            VersionRequired: 2,
            PasswrodChangeRequired: [ 43, 44, 49 ],
            LockedUser: 48,
            InactiveCustomer: 2,
            LoginInactiveCustomer: 7,
            LoginUnregisteredCustomer: 4
        },
        AnalyticsEvents: {
            Login: { Category: "כניסה", Label: "מסך פתיחה" },
            LoginCustomerService: { Category: "שירות לקוחות", Label: "מסך פתיחה" },
            Account: { Category: "פירוט חשבונות", Label: "החשבונות שלי" },
            PreviousCredit: { Category: "זיכויים אחרונים", Label: "החשבונות שלי" },
            NextCredit: { Category: "זיכויים קרובים", Label: "החשבונות שלי" },
            Logout: { Category: "התנתקות", Label: "התנתקות" },
            LegalTerms: { Category: "תנאים משפטיים", Label: "עוד" },
            InfoSecurity: { Category: "אבטחת מידע", Label: "עוד" },
            Home: { Category: "דף הבית", Label: "ניווט תחתון" },
            CustomerService: { Category: "שירות לקוחות", Label: "ניווט תחתון" },
            AccountDetails: { Category: "פירוט חשבונות", Label: "ניווט תחתון" },
            MoreInfo: { Category: "עוד", Label: "ניווט תחתון" }
            
        }
    },
    startActivity : function(webIntentName) {
        window.plugins.webintent.startActivity(
          {
            action: WebIntent.ACTION_MAIN,
            handler: {
                packageName : webIntentName + "/" + webIntentName + ".Yatzil"
            }
          }, 
          function() {}, 
          function() {
            var msgErr;
            for (arg in arguments)
                 msgErr = "(" + arg + " : " + arguments[arg] + ")" + "\n";
            alert('Failed to open URL via Android Intent' + '\n' + msgErr);
          }
        );        
    }
};
