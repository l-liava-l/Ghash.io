/**
 * Created by lev on 26.11.13.
 */

var app = angular.module("ghashStatusApp", ['ngTouch']);

    app.controller("dataCtrl", function ($scope, $http) {

        function loadSettings() {

            var session = {};

            for (var i in window.localStorage) {
                session[i] = window.localStorage[i] == "undefined"? "": window.localStorage[i];
            }
            return session;
        }

        $scope.session = loadSettings();

        function GenButtons(id) {

            this.buttons = [
                {"id": 0, "name": "Th", "len": 1e6},
                {"id": 1, "name": "Gh", "len": 1e3},
                {"id": 2, "name": "Mh", "len": 1e1},
                {"id": 3, "name": "Kh", "len": 1}
            ];

            this.now = this.buttons[id];
            this.len = this.now.len;
            this.now.style = 'active';
        }

        ($scope.setActive = function (button) {

            window.localStorage.setItem("measure", button.id || 0);
            $scope.measure = new GenButtons(button.id || 0);

        })({"id": window.localStorage.measure});


        $scope.round = function (data) {
            if (!data) return "No data!";
            return Math.round(data / $scope.measure.len);
        };

        function Requester() {

            var genParamObj = function () {

                var S = window.localStorage,
                    nonce = Date.now(),
                    signature = genSig();

                function genSig() {

                    var message = (nonce + S.userName + S.api_key) || "null",
                        hash = CryptoJS.HmacSHA256(message, S.api_secret || "null");

                    return CryptoJS.enc.Hex.stringify(hash).toUpperCase();
                }

                return  {
                    key: S.api_key,
                    signature: signature,
                    nonce: nonce
                };
            };

            this.getPower = function (url, model) {
                $http.post(url, genParamObj())
                    .success(function (data) {
                        $scope[model] = data;
                    });
            };
        }

        $scope.saveSettings = function () {
            for (var i in this.session) {
                window.localStorage.setItem(i, this.session[i]);
            }
        };

        (function () {
            var workersPowerUrl = "https://cex.io/api/ghash.io/workers",
                generalPowerUrl = "https://cex.io/api/ghash.io/hashrate";


            var r = new Requester();

            req();
            setInterval(function () {
                req();
            },  $scope.session.time * 1000 || 5000);

            function req() {
                r.getPower(generalPowerUrl, "generalPower");

                if ($scope.needWorkers === true) {
                    r.getPower(workersPowerUrl, "workersPower");
                }
            }

        })();


    });