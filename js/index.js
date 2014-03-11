
document.addEventListener('deviceready', function(){

    new Controller();}, false);

function Controller() {

    var s = window.localStorage;

    !s.rateVal ? s.rateVal = "Th" : null;



    $(this).on("generalDataGot",   this.parseGeneralData);
    $(this).on("workersDataGot",   this.parseWorkersData);
    $(this).on("generalDataParsed",this.showGeneralData);

    this.uiHandlers();
    this.getData();
}

//this function get data for workers and general data
Controller.prototype.getData = function() {

    var urlG = "https://cex.io/api/ghash.io/hashrate",
        urlW = "";

    var s = window.localStorage,
        controller = this;

    setInterval(req, 5000);

    function req() {

        var nonce = Date.now(),
            signature = genSignature();

        var param = {
            key:       s.api_key,
            signature: signature,
            nonce:     nonce
        };

        function genSignature() {
            var message = nonce + s.userName + s.api_key,
                hash = CryptoJS.HmacSHA256(message, s.api_secret);
            return CryptoJS.enc.Hex.stringify(hash).toUpperCase();
        }

        function onGeneralData(data) {
            controller.generalData = data;
            $(controller).trigger('generalDataGot');
        }

        function onWorkersData(data) {
            controller.workersData = data;
            $(controller).trigger('workersDataGot');
        }


        $.post(urlG, param, onGeneralData);
        s.getWorkers ? $.post(urlW, param, onWorkersData): null;
    }
};




Controller.prototype.parseGeneralData = function() {

    var s = window.localStorage;

    if(s.rateVal == "Th") rateRound(this.generalData, 1e6);
    if(s.rateVal == "Gh") rateRound(this.generalData, 1e3);
    if(s.rateVal == "Mh") rateRound(this.generalData, 1e1);

    this.rateVal = s.rateVal;
    this.alert = checkData(this.generalData);

    $(this).trigger("generalDataParsed");

    function rateRound(data, len) {//todo fixme need refractoring

        for(var i in data) {
                data[i] = parseInt(data[i] / len);
        }
    }

    function checkData(data) {
        return parseInt(data['last5m']) < parseInt(s.minHr);
    }
};


Controller.prototype.parseWorkersData = function() {};


Controller.prototype.showGeneralData = function() {

    var model = this;

    for(var i in model.generalData) {
        $("." + i).html(model.generalData[i] + " " + model.rateVal);
    }

    if(model.alert === true) {

       navigator.notification.beep(1);
       navigator.notification.vibrate(2000);

    }

};

Controller.prototype.uiHandlers = function() {

    var s = window.localStorage,
        model = this;

    if(s.api_key !== undefined) {
        var inp = $('.sendOptions').find('input');
        for(var i = 0; i < inp.length; i++) {
            var elem  = inp[i];
            elem.value = s[elem.getAttribute('name')];
        }
    }

    if( s.minHr !== undefined) {
         $('.setMinHr_block > input').val(s.minHr);
    }

    $(".rateValue_block > button").removeClass("select");
    $(".rateValue_block #" + s.rateVal).addClass("select");



    $('.sendOptions').submit(function(e) {
        e.preventDefault();

        var inputs = $(this).find('input');

        for(var i = 0; i < inputs.length; i++) {
            var elem  = inputs[i];
            s[elem.getAttribute('name')] = elem.value;
        }

        location.reload();

    });

    $('.setMinHr_block > button').on('touchstart', function() {
        s.minHr = $('.setMinHr_block > input').val();
    });

    $(".rateValue_block > button").on('touchstart', function(){

        $(".rateValue_block > button").removeClass('select');
        $(this).addClass("select");
        s.rateVal = $(this).attr('name');
    });




};


