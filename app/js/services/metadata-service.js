(function(S, C, Y) {

    Y.MetadataService = function ($q, $timeout, storageService, yazilServiceClient) {

        function getMetadata() {
            return storageService.prefix("Yazil").local("Metadata").then(function (metadata) {
                if (metadata) {
                    return metadata;
                } else {
                    return fetchMetadata().then(getMetadata);
                }
            });
        }

        function fetchMetadata() {
            //var result = $q.defer();
            //result.reject({
            //    Severity: C.Severity.Error,
            //    Number: "1"
            //});
            //return result.promise;
            return yazilServiceClient.getMetadata().then(function(metadata){
                return storageService.prefix("Yazil").local("Metadata", metadata);
            });
            return $timeout(function () {
                var metadata = {
                    ServicePhone1: "03-9221544",
                    ServiceFax: "03-5254665",
                    LoadDataOperation: true,
                    SessionTimeOut: 20,
                    ForgotUserPasswordURL: "http://google.com",
                    UpdateURLIOS: "http://build.phonegap.co.il",
                    UpdateURLAndroid: "http://google.com",
                    MinimalVersionIOS: "6.0",
                    MinimalVersionAndroid: "4.0",
                    MaintenanceStatus: "V",
                    OpeningHoursStart: "08:00",
                    OpeningHoursFinish: "18:00",
                    AddressLine1: "רחוב תפוצות ישראל 13",
                    AddressLine2: 'אזה"ת כורוזין',
                    City: "גבעתיים"
                };
                
                return storageService.prefix("Yazil").local("Metadata", metadata);

            }, 3000);
        }

        return {
            fetchMetadata: fetchMetadata,
            getMetadata: getMetadata
        };
    };
})(Simple, Cal, Cal.Yazil);