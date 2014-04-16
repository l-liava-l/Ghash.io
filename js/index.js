


/*
 document.addEventListener('deviceready', function(){

 new App();

 function App() {

 var s = window.localStorage;

 !s.rateVal ? s.rateVal = "Th" : null;

 $(this).on("DataGot",   this.parseData);
 $(this).on("DataParsed", this.checkAlert);
 $(this).on("checked", this.showData);



 //this.uiHandlers();

 }





 App.prototype.getData = function() {
 $(".last5m").html("df");
 var url = "https://cex.io/api/ghash.io/hashrate",
 s = window.localStorage,
 model = this;

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

 function onData(data) {
 model.data = data;
 $(model).trigger('DataGot');
 }

 $.post(url, param, onData);
 }
 };


 App.prototype.parseData = function() {

 var data = this.data;

 $(".last5m").html("ddf");
 rateRound(data, 1e6, "Th");
 rateRound(data, 1e3, "Gh");
 rateRound(data, 1e1, "Mh");

 $(this).trigger("DataParsed");

 function rateRound(data, len, measureUnit) {

 !data[measureUnit] ? data[measureUnit] = {}: null;

 for(var i in data) {
 data[measureUnit][i] = parseInt(data[i] / len);
 }
 }
 };


 App.prototype.checkAlert = function() {

 var s = window.localStorage,
 model = this;

 $(".last5m").html("dddddf");
 if(model.data[s.rateVal]["last5m"] < s.minHr && model.alert === null) {

 model.alert = setInterval(function() {
 navigator.notification.beep(1);
 navigator.notification.vibrate(2000);
 }, 5000);
 $(model).trigger("checked");
 }
 else {
 $(model).trigger("checked");
 }

 };

 App.prototype.showData = function() {

 $(".last5m").html("ddddddf");
 var s = window.localStorage,
 model = this;

 for(var i in model.data[s.rateVal]) {

 $("." + i).html(model.generalData[i] + " " + model.rateVal);

 }

 };




 */






/*

 App.prototype.uiHandlers = function() {

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






}, false);


 */