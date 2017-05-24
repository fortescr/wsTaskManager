angular
    .module('app')
    .factory("Notification", ['toastrConfig',
    function (toastrConfig) {

        var obj = {};

        obj.options = {
            autoDismiss: false,
            position: 'toast-top-right',
            type: 'success',
            timeout: '500',
            extendedTimeout: '1000',
            html: false,
            closeButton: false,
            tapToDismiss: true,
            progressBar: false,
            closeHtml: '<button>&times;</button>',
            newestOnTop: true,
            maxOpened: 0,
            preventDuplicates: false,
            preventOpenDuplicates: false
        };

        return obj;
}]);
