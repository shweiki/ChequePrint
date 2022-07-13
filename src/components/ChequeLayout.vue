<template>
  <v-row>
    <v-col cols="12" md="12">
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
    </v-col>
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
import Jordan from "@core/report/Template/Jordan/Jordan-All.js";
import Visualization from "@core/report/Visualization.js";

export default {
  props: {
    Data: {
      type: Object,
      required: true,
    },
    Type: { type: String, required: true },
  },
  setup() {
    const Report = ref({
      Id: 1,
      Name: "test",
      Html: Jordan,
    });
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
