<template>
  <section id="faq">
    <v-row>
      <v-col cols="12" md="3" xl="3" lg="3" sm="12" xs="12">
        <v-card class="mb-6">
          <v-card-title>{{ $t("Form") }}</v-card-title>
          <v-card-text>
            <v-form>
              <v-text-field
                v-model="name"
                :prepend-inner-icon="icons.mdiAccountOutline"
                :label="$t('Name')"
                outlined
                dense
                :placeholder="$t('Name')"
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
                    :label="$t('Date')"
                    :hint="$t('Format') + '  DD/MM/YYYY'"
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
                :label="$t('Amount')"
                outlined
                dense
                type="Amount"
                @focus="$event.target.select()"
                :placeholder="$t('Amount')"
              ></v-text-field>

              <v-textarea
                v-model="note"
                :prepend-inner-icon="icons.mdiCommentOutline"
                :label="$t('Note')"
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
                :label="$t('Crossing')"
                hide-details
                outlined
                dense
              ></v-combobox> </v-form
          ></v-card-text> </v-card
      ></v-col>
      <v-col cols="12" md="9" xl="9" lg="9" sm="12" xs="12">
        <v-card class="mb-6">
          <v-card-title>
            <span class="me-3">{{ $t("Layout") }} 🚀</span>
            <v-spacer></v-spacer>

            <span class="me-3">
              <v-btn @click="Print" color="primary" block>
                {{ $t("Print") }}
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
                    id="ChequeImage"
                    :src="require('@/assets/images/cheques/Jordan.jpg')"
                    alt="Cheque img"
                    class="On_Cheque"
                    draggable="false"
                  />

                  <p class="On_Cheque" style="top: 1.5cm; left: 1cm; width: 110px">
                    {{ computedDateFormatted }}
                  </p>
                  <p class="On_Cheque" style="top: 2.7cm; left: 1.2cm; width: 530px">
                    {{ name }}
                  </p>
                  <p class="On_Cheque" style="top: 4cm; left: 12.1cm; width: 100px">
                    #{{ amount > 0 ? parseInt(amount) : "" }}#
                  </p>
                  <p
                    class="On_Cheque nWords"
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
                    class="On_Cheque crossing_horizontal"
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
    <v-card-text class="text-center">
      <p class="text-xl font-weight-medium text--primary mb-1">
        {{ $t("You still have a other templete ?") }}
      </p>
      <p>
        {{
          $t(
            "If you cannot find a templete in our site, you can always contact us. We will answer to you shortly!"
          )
        }}
      </p>
    </v-card-text>

    <v-row class="mx-auto">
      <v-col
        v-for="(contact, index) in contactDetails"
        :key="contact.icon"
        cols="12"
        sm="6"
        md="5"
        :class="index > 0 ? 'me-auto' : 'ms-auto'"
      >
        <v-card class="faq-contact text-center pa-5" flat>
          <v-avatar rounded color="secondary" size="38" class="v-avatar-light-bg mb-6">
            <a :href="contact.href" target="_blank">
              <v-icon class="text--primary" size="24">
                {{ contact.icon }}
              </v-icon></a
            >
          </v-avatar>

          <p class="text-xl text--primary font-weight-medium mb-2">
            <a :href="contact.href" target="_blank"> {{ contact.contact }}</a>
          </p>

          <p class="text-sm mb-0">
            {{ contact.tagLine }}
          </p>
        </v-card>
      </v-col>
    </v-row>
  </section>
</template>
<script>
// eslint-disable-next-line object-curly-newline
import { nArabicWords } from "@/plugins/nArabicWords.js";
import Jordan from "@core/report/Template/Jordan/Jordan-All.js";
import {
  mdiAccountOutline,
  mdiCalendar,
  mdiCashMultiple,
  mdiCommentOutline,
  mdiEmailOutline,
  mdiPrinter,
  mdiWhatsapp,
} from "@mdi/js";
import { computed, ref } from "@vue/composition-api";

export default {
  setup() {
    const Report = ref({
      Id: 1,
      Name: "test",
      Html: Jordan,
    });
    const name = ref("");
    const date = ref(new Date().toISOString().substr(0, 10));

    const amount = ref(0);
    const note = ref("");
    const crossing = ref("");
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
        document.getElementById("ifrmPrint").src = "";
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
.sign_name {\
  width: 170px;\
  text-align: center;\
  background-color: transparent;\
  padding: 0px;\
  border: none;\
  font-family: sans-serif;\
  overflow-x: hidden;\
}\
.crossing_horizontal {\
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
.nWords {\
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
          //  document.getElementById("ifrmPrint").src = "";
        }, 2000);
      } catch (e) {
        self.print();
      }
    };
    const contactDetails = [
      {
        icon: mdiWhatsapp,
        contact: "+ (962) 78867 5843",
        tagLine: "We are always happy to help!",
        href: "https://wa.me/962788675843?text=Cheques",
      },
      {
        icon: mdiEmailOutline,
        contact: "conicisv@gmail.com",
        tagLine: "Best way to get answer faster!",
        href: "mailto:conicisv@gmail.com?subject = Feedback&body = Message",
      },
    ];
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
      contactDetails,
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
.sign_name {
  width: 170px;
  text-align: center;
  background-color: transparent;
  padding: 0px;
  border: none;
  font-family: sans-serif;
  overflow-x: hidden;
}
.crossing_horizontal {
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
.nWords {
  font-size: 15px;
  text-transform: capitalize;
  margin-top: 15px;
}
</style>
