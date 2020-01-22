<template>
  <div class="root d-flex">
    <div class="content flex-grow-1 pt-8">
      <header class="container">
        <svg-icon
          class="mr-7"
          name="logo"
          style="width: 3.5rem; height: 3.5rem"
        />

        <h1 class="font-weight-light m-0">A flexible responsive menu</h1>

        <p>
          A renderless Vue component that will auto detect if menu items don't
          fit and moves them to a separate dropdown. Also known as the
          Priority+ pattern.
        </p>

        <hr class="my-7" />

        <VueResponsiveMenu
          #default="{ menuItems, moreMenuItems}"
          :nav="navigation"
        >
          <ul class="mainnav bg-light list-unstyled d-flex flex-wrap">
            <li
              class="p-2 px-4 bg-light"
              v-for="menuItem in menuItems"
              :key="menuItem.id"
            >
              {{ menuItem.label }}
            </li>

            <li class="p-2 px-4 bg-light" v-if="moreMenuItems.length > 0">
              {{ menuItems.length === 0 ? '☰' : 'more ↓' }}
              <ul class="list-unstyled p-3 position-absolute bg-light">
                <li
                  v-for="moreMenuItem in moreMenuItems"
                  :key="moreMenuItem.id"
                >
                  {{ moreMenuItem.label }} (more)
                </li>
              </ul>
            </li>
          </ul>
        </VueResponsiveMenu>
      </header>
    </div>
  </div>
</template>

<script>
import VueResponsiveMenu from '../../src/index'
export default {
  components: { VueResponsiveMenu },
  data() {
    return {
      navigation: [
        { label: 'Page 1', id: 1, link: '#1' },
        { label: 'Page 2', id: 2, link: '#2' },
        { label: 'Page 3', id: 3, link: '#3' },
        { label: 'Page 4', id: 4, link: '#4' },
        { label: 'Page 5', id: 5, link: '#5' },
        { label: 'Page 6', id: 6, link: '#6' },
        { label: 'Page 7', id: 7, link: '#7' }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.header {
  display: grid;
}

@keyframes menuWidth {
  from {
    width: 100%;
  }
  to {
    width: 20%;
  }
}
.mainnav {
  resize: both;
  overflow: auto;
  align-items: center;
  animation: 3s menuWidth infinite alternate ease-in-out;
}
.root {
  height: 100%;
  &:before {
    content: '';
    width: 150px;
    min-height: 100vh;
    background: linear-gradient(180deg, #ff2940 0%, #ff5b15 100%);
  }
}
</style>
