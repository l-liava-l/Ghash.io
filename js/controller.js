var app = angular.module("ghashStatusApp", ['ngTouch']);

app.controller("dataCtrl", function($scope, $http) {

    function GenButtons(id) {

        this.buttons = [
            {"id": 0, "name": "Th", "len": 1e6},
            {"id": 1, "name": "Gh", "len": 1e3},
            {"id": 2, "name": "Mh", "len": 1e1},
            {"id": 3, "name": "Kh", "len": 1}
        ];

        this.now = this.buttons[id];
        this.len = this.now.len;
        this.now.style='active';
    }

    ($scope.setActive = function (button) {

        window.localStorage.setItem("measure", button.id || 0);
        $scope.measure = new GenButtons(button.id || 0);

    })({"id": window.localStorage.measure});


////////////////////////todo fixme refractoring maybe

    $scope.saveSettings = function() {
        for(var i in this.session) {
            window.localStorage.setItem(i, this.session[i]);
        }
    };

    function loadSettings() {
        for(var i in window.localStorage) {
            window.sessionStorage[i] = window.localStorage[i];
        }
        return window.sessionStorage;
    }

    $scope.session = loadSettings();

////////////////////////////////////


    $scope.round = function(data) {

        return Math.round(data / $scope.measure.len);

    };

/////////////////////////////////

    function Requester() {

        var genParamObj = function () {

            var s = window.localStorage,
                nonce = Date.now(),
                signature = genSig();

            function genSig() {

                var message = nonce + s.userName + s.api_key,
                    hash = CryptoJS.HmacSHA256(message, s.api_secret);

                return CryptoJS.enc.Hex.stringify(hash).toUpperCase();
            }

            return  {
                key: s.api_key,
                signature: signature,
                nonce: nonce
            };
        };

        this.getPower = function (url, model) {
            $http.post(url, genParamObj())
                .success(function(data){
                    $scope[model] = data;
                });
        };
    }

    (function() {
        var workersPowerUrl = "https://cex.io/api/ghash.io/workers",
            generalPowerUrl = "https://cex.io/api/ghash.io/hashrate";


        var r = new Requester();

        req();
        setInterval(function(){
        req();
        }, 5000);

        function req() {

            r.getPower(generalPowerUrl, "generalPower");
            //  r.getPower(workersPowerUrl, "workersPower");
        }

    })();







});
