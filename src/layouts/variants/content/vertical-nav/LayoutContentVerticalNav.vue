<template>
  <layout-content-vertical-nav :nav-menu-items="navMenuItems">
    <slot></slot>

    <!-- Slot: Navbar -->
    <template #navbar="{ isVerticalNavMenuActive, toggleVerticalNavMenuActive }">
      <div
        class="navbar-content-container"
        :class="{ 'expanded-search': shallShowFullSearch }"
      >
        <!-- Left Content: Search -->
        <div class="d-flex align-center">
          <router-link to="/" class="d-flex align-center text-decoration-none">
            <v-img
              :src="appLogo"
              max-height="30px"
              max-width="30px"
              alt="logo"
              contain
              class="me-3"
            ></v-img>
            <h2 class="app-title text--primary">
              {{ appName }}
            </h2>
          </router-link>
        </div>

        <!-- Right Content: I18n, Light/Dark, Notification & User Dropdown -->
        <div class="d-flex align-center right-row">
          <app-bar-i18n></app-bar-i18n> &nbsp; &nbsp; &nbsp; &nbsp;

          <app-bar-theme-switcher></app-bar-theme-switcher>
        </div>
      </div>
    </template>

    <!-- Slot: Footer -->
    <template #footer>
      <div class="d-flex justify-space-between">
        <span
          >COPYRIGHT &copy; {{ new Date().getFullYear() }} Conic-ISV , All rights
          Reserved</span
        >
        <div class="align-center d-none d-md-flex">
          <span>Hand-crafted &amp; Made with</span>
          <v-icon color="error" class="ms-2">
            {{ icons.mdiHeartOutline }}
          </v-icon>
        </div>
      </div>
    </template>
  </layout-content-vertical-nav>
</template>

<script>
import LayoutContentVerticalNav from "@/@core/layouts/variants/content/vertical-nav/LayoutContentVerticalNav.vue";
import navMenuItems from "@/navigation/vertical";

// App Bar Components
import AppBarI18n from "@core/layouts/components/app-bar/AppBarI18n.vue";
import AppBarThemeSwitcher from "@core/layouts/components/app-bar/AppBarThemeSwitcher.vue";
import { mdiHeartOutline, mdiMenu } from "@mdi/js";

import { getVuetify } from "@core/utils";

// Search Data
import appBarSearchData from "@/assets/app-bar-search-data";

import themeConfig from "@themeConfig";
import { ref, watch } from "@vue/composition-api";

export default {
  components: {
    LayoutContentVerticalNav,

    // App Bar Components
    AppBarI18n,
    AppBarThemeSwitcher,
  },
  setup() {
    const $vuetify = getVuetify();

    // Search
    const appBarSearchQuery = ref("");
    const shallShowFullSearch = ref(false);
    const maxItemsInGroup = 5;
    const totalItemsInGroup = ref({
      pages: 0,
      files: 0,
      contacts: 0,
    });
    watch(appBarSearchQuery, () => {
      totalItemsInGroup.value = {
        pages: 0,
        files: 0,
        contacts: 0,
      };
    });

    // NOTE: Update search function according to your usage
    const searchFilterFunc = (item, queryText, itemText) => {
      if (item.header || item.divider) return true;

      const itemGroup = (() => {
        if (item.to !== undefined) return "pages";
        if (item.size !== undefined) return "files";
        if (item.email !== undefined) return "contacts";

        return null;
      })();

      const isMatched =
        itemText.toLocaleLowerCase().indexOf(queryText.toLocaleLowerCase()) > -1;

      if (isMatched) {
        if (itemGroup === "pages") totalItemsInGroup.value.pages += 1;
        else if (itemGroup === "files") totalItemsInGroup.value.files += 1;
        else if (itemGroup === "contacts") totalItemsInGroup.value.contacts += 1;
      }

      return (
        appBarSearchQuery.value &&
        isMatched &&
        totalItemsInGroup.value[itemGroup] <= maxItemsInGroup
      );
    };

    // ? Handles case where in <lg vertical nav menu is open and search is triggered using hotkey then searchbox is hidden behind vertical nav menu overlaty
    const handleShallShowFullSearchUpdate = (
      isVerticalNavMenuActive,
      toggleVerticalNavMenuActive
    ) => {
      if ($vuetify.breakpoint.mdAndDown && isVerticalNavMenuActive) {
        toggleVerticalNavMenuActive();
      }
    };

    return {
      navMenuItems,
      handleShallShowFullSearchUpdate,
      // App Config
      appName: themeConfig.app.name,
      appLogo: themeConfig.app.logo,
      // Search
      appBarSearchQuery,
      shallShowFullSearch,
      appBarSearchData,
      searchFilterFunc,

      icons: {
        mdiMenu,
        mdiHeartOutline,
      },
    };
  },
};
</script>

<style lang="scss" scoped>
.navbar-content-container {
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-grow: 1;
  position: relative;
}

// ? Handle bg of autocomplete for blured appBar
.v-app-bar.bg-blur {
  .expanded-search {
    ::v-deep .app-bar-autocomplete-box div[role="combobox"] {
      background-color: transparent;
    }

    > .d-flex > button.v-icon {
      display: none;
    }

    // ===

    & > .right-row {
      visibility: hidden;
      opacity: 0;
    }

    ::v-deep .app-bar-search-toggler {
      visibility: hidden;
    }
  }
}
</style>
