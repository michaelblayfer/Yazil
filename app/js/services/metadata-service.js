(function(S, C, Y) {

    Y.MetadataService = function ($q, $timeout, storageService, yazilServiceClient) {
        var cachedMetadata = null;
        function getMetadata() {
            if (cachedMetadata) {
                return $q.when(cachedMetadata);
            } else {
                return fetchMetadata();
            }
        }

        function fetchMetadata() {
            return yazilServiceClient.getMetadata().then(function (metadata) {
                metadata = _.defaults(metadata, {
                    AddressLine1: "רחוב תפוצות ישראל 13",
                    AddressLine2: 'אזה"ת כורוזין',
                    City: "גבעתיים",
                    MaxCacheAge: 6,
                    PageAnimationEnabled: false,
                    SwipeAnimationEnabled: true
                });
                delete metadata.Response;
                cachedMetadata = metadata;
                return metadata;
                //return storageService.prefix("Yazil").local("Metadata", metadata);
            });
        }

        return {
            fetchMetadata: fetchMetadata,
            getMetadata: getMetadata
        };
    };
})(Simple, Cal, Cal.Yazil);