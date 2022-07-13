const x = `        <style>\
@media print {\
    @page {\
        size: landscape;\
        margin: 0 ;\
    }\
    body{\
        margin: 0;\
        line-height: 1;\
    }\
    p {\
    margin: 0 0 10px;\
}\
    .cheque_div{\
        display:block;\
        margin: 0;\
        padding: 0;\
        position: fixed;\
        top: 50%;\
        right: 0px;\
        /*-ms-transform: translateY(-50%);*/\
        transform: translateY(-50%);\
        border: none;  \
    }\
    .On_Cheque {\
  position: absolute;\
  font-size: 18px;\
  text-align: center;\
  -webkit-touch-callout: none;\
  -webkit-user-select: none;\
  -khtml-user-select: none;\
  -moz-user-select: none;\
  -ms-user-select: none;\
  user-select: none;\
}\
.sign_name_lbl {\
  width: 170px;\
  text-align: center;\
  background-color: transparent;\
  padding: 0px;\
  border: none;\
  font-family: sans-serif;\
  overflow-x: hidden;\
}\
.crossing_lbl_horizontal {\
  position: absolute;\
  width: 140px;\
  font-size: 13px;\
  text-align: center;\
  padding: 4px;\
  border-top: 1px solid black;\
  border-bottom: 1px solid black;\
  font-weight: bold;\
  z-index: 300;\
  margin-top: 10px;\
  display: none;\
  top: 1.35cm;\
  left: 6.4cm;\
  transform: rotate(0deg);\
}\
.tafk_lbl {\
  font-size: 15px;\
  text-transform:\ capitalize;\
  margin-top: 15px;\
}\
     img  {\
    display: none !important; \
    }\
}\
</style>
<div class="cheque_div" style="width: 16.6cm; height: 8.2cm">
<div class="On_Cheque" style="position: absolute">


  <p class="On_Cheque" style="top: 1.5cm; left: 1.1cm; width: 110px">
    {{ computedDateFormatted }}
  </p>
  <p class="On_Cheque" style="top: 2.7cm; left: 1.2cm; width: 530px">
    {{ name }}
  </p>
  <p class="On_Cheque" style="top: 4cm; left: 12.1cm; width: 100px">
    #{{ amount > 0 ? parseInt(amount) : "" }}#
  </p>
  <p
    class="On_Cheque tafk_lbl"
    style="
      top: 3.1cm;
      left: 2.1cm;
      width: 305px;
      line-height: 25px;
      direction: rtl;
    "
  >
    فقط {{ nArabicWords(amount) }} لا غير
  </p>
  <p
    class="On_Cheque"
    style="top: 4.2cm; left: 1.2cm; width: 330px; font-size: 17px"
  >
    {{ note }}
  </p>
  <p
    class="On_Cheque crossing_lbl_horizontal"
    draggable="false"
    style="display: block"
  >
    {{ crossing }}
  </p>

  <p
    class="On_Cheque"
    style="top: 4cm; left: 15cm; width: 40px; display: block"
  >
    {{ amount > 0 ? (amount % 1).toFixed(3) * 1000 : "" }}
  </p>
</div>
</div>
<style>
.cheque_div {
  border: 1px solid black;
  position: relative;
  top: 15px;
  margin: auto;
  overflow: hidden;
}
.On_Cheque {
  position: absolute;
  font-size: 18px;
  text-align: center;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
.sign_name_lbl {
  width: 170px;
  text-align: center;
  background-color: transparent;
  padding: 0px;
  border: none;
  font-family: sans-serif;
  overflow-x: hidden;
}
.crossing_lbl_horizontal {
  position: absolute;
  width: 140px;
  font-size: 13px;
  text-align: center;
  padding: 4px;
  border-top: 1px solid black;
  border-bottom: 1px solid black;
  font-weight: bold;
  z-index: 300;
  margin-top: 10px;
  display: none;
  top: 1.35cm;
  left: 6.4cm;
  transform: rotate(0deg);
}
.tafk_lbl {
  font-size: 15px;
  text-transform: capitalize;
  margin-top: 15px;
}
</style>

`
export default x
