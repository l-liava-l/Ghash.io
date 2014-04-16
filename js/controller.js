var app = angular.module("ghashStatusApp", ['ngTouch', 'ngResource']);


app.controller("dataCtrl", function($scope, $resource) {


    $scope.session = (function(){

        for(var i in window.localStorage) {
                window.sessionStorage[i] = window.localStorage[i];
        }
        return window.sessionStorage;
    })();



    function GenButtons(id) {

        this.buttons = [
            {"id": 0, "name": "Th", "len": 1e6},
            {"id": 1, "name": "Gh", "len": 1e3},
            {"id": 2, "name": "Mh", "len": 1e1},
            {"id": 3, "name": "Kh", "len": 1}
        ];

        this.now = this.buttons[id];
        this.now.style='active';
    }

    $scope.setActive = function (button) {
        window.localStorage.setItem("measure", button.id || 0);
        $scope.measure = new GenButtons(button.id || 0);
    };

    $scope.setActive({"id": window.localStorage.measure});







    $scope.save = function() {
        for(var i in this.session) {
            window.localStorage.setItem(i, this.session[i]);
        }
    };


/*
    function getData() {

        var s = $scope.s,
            nonce = Date.now(),
            signature = genSignature();

        function genSignature() {
            var message = nonce + s.userName + s.api_key,
                hash = CryptoJS.HmacSHA256(message, s.api_secret);
            return CryptoJS.enc.Hex.stringify(hash).toUpperCase();
        }

    }


    $scope.data = $resource("https://cex.io/api/ghash.io/hashrate",{},{req: {method: "POST"}}).req();
    */
});
