<template>
  <VueResponsiveMenu #default="{ menuItems, moreMenuItems}" :nav="navigation">
    <ul class="mainnav list-unstyled d-flex flex-wrap">
      <li
        class="p-2 px-4 bg-light"
        v-for="menuItem in menuItems"
        :key="menuItem.id"
      >
        {{ menuItem.label }}
      </li>
      <li class="p-2 px-4 bg-light" v-if="moreMenuItems.length > 0">
        more
        <ul class="list-unstyled p-3 position-absolute bg-light">
          <li v-for="moreMenuItem in moreMenuItems" :key="moreMenuItem.id">
            {{ moreMenuItem.label }} (more)
          </li>
        </ul>
      </li>
    </ul>
  </VueResponsiveMenu>
</template>

<style lang="scss">
body {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  display: flex;
  justify-content: center;
  height: 100vh;
  align-items: center;
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
  background-color: #42b983;
  resize: both;
  overflow: auto;
  height: 30vh;
  align-items: center;
  padding: 5rem;
  width: 100%;
  //animation: 3s menuWidth infinite alternate ease-in-out;
}
</style>

<script>
import VueResponsiveMenu from "../src";
export default {
  name: "app",
  components: { VueResponsiveMenu },
  data() {
    return {
      menuWidth: 0,
      navigation: [
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
      ]
    };
  }
};
</script>
