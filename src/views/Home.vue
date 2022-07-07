<template>
  <v-row>
    <v-col cols="3" md="3">
      <v-card class="mb-6">
        <v-card-title>From</v-card-title>
        <v-card-text>
          <v-form>
            <v-text-field
              v-model="name"
              :prepend-inner-icon="icons.mdiAccountOutline"
              label="Name"
              outlined
              dense
              placeholder="Name"
            ></v-text-field>

            <v-menu
              ref="menuref"
              v-model="menu1"
              :close-on-content-click="false"
              transition="scale-transition"
              offset-y
              max-width="290px"
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="computedDateFormatted"
                  label="Date"
                  hint="DD/MM/YYYY format"
                  persistent-hint
                  :prepend-inner-icon="icons.mdiCalendar"
                  v-bind="attrs"
                  v-on="on"
                  readonly
                  outlined
                ></v-text-field>
              </template>

              <v-date-picker
                v-model="date"
                no-title
                color="primary"
                @input="menu1 = false"
              ></v-date-picker>
            </v-menu>

            <v-text-field
              v-model="amount"
              :prepend-inner-icon="icons.mdiCashMultiple"
              label="Amount"
              outlined
              dense
              type="Amount"
              placeholder="Amount"
            ></v-text-field>

            <v-textarea
              v-model="note"
              :prepend-inner-icon="icons.mdiCommentOutline"
              label="Note"
              rows="1"
              outlined
              dense
              counter
            ></v-textarea>

            <v-combobox
              v-model="crossing"
              :items="['/ /', 'يصرف للمستفيد الأول', 'غير قابل للتداول']"
              item-text="title"
              item-value="value"
              label="Crossing"
              hide-details
              outlined
              dense
            ></v-combobox> </v-form
        ></v-card-text> </v-card
    ></v-col>
    <v-col cols="9" md="9">
      <v-card class="mb-6">
        <v-card-title>
          <span class="me-3">Layout 🚀</span>
          <v-spacer></v-spacer>

          <span class="me-3">
            <v-btn @click="Print" color="primary" block>
              Print
              <v-icon right dark>
                {{ icons.mdiPrinter }}
              </v-icon></v-btn
            >
          </span>
        </v-card-title>

        <v-card-text>
          <div id="PrintElement" style="color: rgb(0 0 0 / 68%)">
            <div class="cheque_div" style="width: 16.6cm; height: 8.2cm">
              <div class="On_Cheque" style="position: absolute">
                <img
                  src="https://print.cheque-at.com/img/checks/jor-all.jpg"
                  alt="Cheque img"
                  class="On_Cheque"
                  draggable="false"
                />

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
          </div>
        </v-card-text>
      </v-card></v-col
    >
    <iframe id="ifrmPrint" style="display: none !important"></iframe>
  </v-row>
</template>
<script>
// eslint-disable-next-line object-curly-newline
import { nArabicWords } from "@/plugins/nArabicWords.js";
import {
  mdiAccountOutline,
  mdiCalendar,
  mdiCashMultiple,
  mdiCommentOutline,
  mdiPrinter,
} from "@mdi/js";
import { computed, ref } from "@vue/composition-api";

export default {
  setup() {
    const name = ref("طه اسماعيل محمد الشويكي");
    const date = ref(new Date().toISOString().substr(0, 10));

    const amount = ref(1000.252);
    const note = ref("تسديد حساب النظام");
    const crossing = ref("يصرف للمستفيد الاول");
    const menu1 = ref(false);
    const formatDate = (dates) => {
      if (!dates) return null;
      const [year, month, day] = dates.split("-");

      return `${day}/${month}/${year}`;
    };
    const parseDate = (dates) => {
      if (!dates) return null;
      const [month, day, year] = dates.split("/");

      return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    };
    const computedDateFormatted = computed(() => formatDate(date.value));

    const Print = () => {
      try {
        // cheque_div
        var oIframe = document.getElementById("ifrmPrint");
        var oDoc = oIframe.contentWindow || oIframe.contentDocument;
        if (oDoc.document) oDoc = oDoc.document;
        oDoc.write(
          "<head><title>title</title>\
        <style>\
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
</style>"
        );
        oDoc.write('</head><body onload="this.focus(); this.print();">');
        oDoc.write(document.getElementById("PrintElement").innerHTML + "</body>");
        oDoc.close();
        setTimeout(() => {
          // document.getElementById("ifrmPrint").src = "";
        }, 2000);
      } catch (e) {
        self.print();
      }
    };

    return {
      name,
      date,
      amount,
      note,
      crossing,
      menu1,
      parseDate,
      computedDateFormatted,
      formatDate,
      nArabicWords,
      Print,
      // icons
      icons: {
        mdiAccountOutline,
        mdiPrinter,
        mdiCashMultiple,
        mdiCommentOutline,
        mdiCalendar,
      },
    };
  },
};
</script>
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
