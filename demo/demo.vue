<template>
  <div class="container">
    <h3 class="mb-4">Basic menu with no options</h3>
    <VueResponsiveMenu
      class="mb-5"
      #default="{ menuItems, moreMenuItems}"
      :nav="navigation()"
      data-cypress="mainnav1"
    >
      <ul class="mainnav list-unstyled d-flex flex-wrap">
        <li
          class="p-2 px-4 bg-light border"
          v-for="menuItem in menuItems"
          :key="menuItem.id"
        >
          {{ menuItem.label }}
        </li>
        <li class="p-2 px-4 bg-light border" v-if="moreMenuItems.length > 0">
          more
          <ul class="list-unstyled p-3 position-absolute bg-light">
            <li v-for="moreMenuItem in moreMenuItems" :key="moreMenuItem.id">
              {{ moreMenuItem.label }} (more)
            </li>
          </ul>
        </li>
      </ul>
    </VueResponsiveMenu>

    <h3 class="mb-4">Basic menu with a max width</h3>
    <VueResponsiveMenu
      style="max-width: 600px"
      class="mb-5"
      #default="{ menuItems, moreMenuItems}"
      :nav="navigation()"
      data-cypress="mainnav2"
    >
      <ul class="mainnav list-unstyled d-flex flex-wrap">
        <li
          class="p-2 px-4 bg-light border"
          v-for="menuItem in menuItems"
          :key="menuItem.id"
        >
          {{ menuItem.label }}
        </li>
        <li class="p-2 px-4 bg-light border" v-if="moreMenuItems.length > 0">
          more
          <ul class="list-unstyled p-3 position-absolute bg-light">
            <li v-for="moreMenuItem in moreMenuItems" :key="moreMenuItem.id">
              {{ moreMenuItem.label }} (more)
            </li>
          </ul>
        </li>
      </ul>
    </VueResponsiveMenu>

    <h3 class="mb-4">Menu with max 10 characters</h3>
    <VueResponsiveMenu
      class="mb-5"
      #default="{ menuItems, moreMenuItems}"
      :max-characters="10"
      :nav="navigation()"
      data-cypress="mainnav3"
    >
      <ul class="mainnav list-unstyled d-flex flex-wrap">
        <li
          class="p-2 px-4 bg-light border"
          v-for="menuItem in menuItems"
          :key="menuItem.id"
        >
          {{ menuItem.label }}
        </li>
        <li class="p-2 px-4 bg-light border" v-if="moreMenuItems.length > 0">
          more
          <ul class="list-unstyled p-3 position-absolute bg-light">
            <li v-for="moreMenuItem in moreMenuItems" :key="moreMenuItem.id">
              {{ moreMenuItem.label }} (more)
            </li>
          </ul>
        </li>
      </ul>
    </VueResponsiveMenu>

    <h3 class="mb-4">Incompatible root element</h3>
    <VueResponsiveMenu
      class="mb-5"
      #default="{ menuItems, moreMenuItems}"
      :nav="navigation()"
      data-cypress="mainnav4"
    >
      <div>
        <ul class="mainnav list-unstyled d-flex flex-wrap">
          <li
            class="p-2 px-4 bg-light border"
            v-for="menuItem in menuItems"
            :key="menuItem.id"
          >
            {{ menuItem.label }}
          </li>
          <li class="p-2 px-4 bg-light border" v-if="moreMenuItems.length > 0">
            more
            <ul class="list-unstyled p-3 position-absolute bg-light">
              <li v-for="moreMenuItem in moreMenuItems" :key="moreMenuItem.id">
                {{ moreMenuItem.label }} (more)
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </VueResponsiveMenu>

    <h3 class="mb-4">Nested root element</h3>
    <VueResponsiveMenu
      class="mb-5"
      #default="{ menuItems, moreMenuItems}"
      :nav="navigation()"
      data-cypress="mainnav5"
    >
      <div>
        <ul
          class="mainnav list-unstyled d-flex flex-wrap"
          data-vue-responsive-menu
        >
          <li
            class="p-2 px-4 bg-light border"
            v-for="menuItem in menuItems"
            :key="menuItem.id"
          >
            {{ menuItem.label }}
          </li>
          <li class="p-2 px-4 bg-light border" v-if="moreMenuItems.length > 0">
            more
            <ul class="list-unstyled p-3 position-absolute bg-light">
              <li v-for="moreMenuItem in moreMenuItems" :key="moreMenuItem.id">
                {{ moreMenuItem.label }} (more)
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </VueResponsiveMenu>
  </div>
</template>

<style lang="scss">
body {
  padding: 5rem;
}
.mainnav {
  > li {
    margin-left: -1px;
  }
}
</style>

<style lang="scss" scoped>
@keyframes menuWidth {
  from {
    width: 80vw;
  }
  to {
    width: 400px;
  }
}
.mainnav {
  resize: both;
  align-items: center;
  width: 100%;
}
</style>

<script>
import VueResponsiveMenu from "../src";
export default {
  name: "app",
  components: { VueResponsiveMenu },
  data() {
    return {
      menuWidth: 0
    };
  },
  methods: {
    navigation() {
      return [
        { label: "Page 1", id: 1, link: "#1" },
        { label: "Page 2", id: 2, link: "#2" },
        { label: "Page 3", id: 3, link: "#3" },
        { label: "Page 4", id: 4, link: "#4" },
        { label: "Page 5", id: 5, link: "#5" },
        { label: "Page 6", id: 6, link: "#6" },
        { label: "Page 7", id: 7, link: "#7" },
        { label: "Page 8", id: 8, link: "#8" },
        { label: "Page 9", id: 9, link: "#9" },
        { label: "Page 10", id: 10, link: "#10" }
      ];
    }
  }
};
</script>
