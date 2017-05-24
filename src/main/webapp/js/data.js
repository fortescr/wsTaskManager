angular
    .module('app')
    .factory("Data", ['$http', '$location',
    function ($http, $q, $location) {

        var serviceBase = 'http://localhost:8080/WebServiceRest/rest/';

        var obj = {};

        obj.get = function (q) {
            return $http.get(serviceBase + q).then(function (results) {
                return results;
            });
        };
        obj.post = function (q, object) {
            return $http.post(serviceBase + q, object).then(function (results) {
                return results;
            });
        };
        obj.put = function (q, object) {
            return $http.put(serviceBase + q, object).then(function (results) {
                return results;
            });
        };
        obj.delete = function (q) {
            return $http.delete(serviceBase + q).then(function (results) {
                return results;
            });
        };
        return obj;
}]);
