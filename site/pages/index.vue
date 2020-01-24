<template>
  <div class="root d-flex">
    <div class="flex-grow-1">
      <div class="grid flex-grow-1 p-3 p-md-6 p-lg-8">
        <svg-icon
          class="logo"
          name="logo"
          style="width: 3.5rem; height: 3.5rem"
        />

        <h1 class="font-weight-light m-0">A flexible responsive menu</h1>

        <div class="description py-5">
          <div class="d-flex align-items-center mb-5">
            <a
              class="btn btn-sm btn-secondary btn-twitter mr-3"
              href="https://twitter.com/intent/tweet?text=Vue responsive menu — Auto detect if menu items don't fit and moves them to a separate dropdown.%0avia @GijsRoge%0a%0a👉 vue-responsive-menu.netlify.com"
            >
              <svg-icon
                class="mr-1"
                name="twitter"
                style="width: 1em; height: 1em"
              />
              Tweet
            </a>
            <iframe
              src="https://ghbtns.com/github-btn.html?user=gijsroge&repo=vue-responsive-menu&type=star&count=true"
              frameborder="0"
              scrolling="0"
              width="170px"
              height="20px"
            ></iframe>
          </div>
          <p class="font-size-lg">
            A renderless Vue component that will auto detect if menu items don't
            fit and moves them to a separate dropdown. Also known as the
            Priority+ pattern.
          </p>
        </div>

        <div class="content"></div>
      </div>

      <div class="example example--1 bg-primary py-5">
        <VueResponsiveMenu
          #default="{ menuItems, moreMenuItems}"
          :nav="navigation"
        >
          <ul
            class="demo-nav demo-nav--1 list-unstyled d-flex flex-wrap font-weight-bold justify-content-center"
          >
            <li
              class="p-2 px-4 text-dark"
              v-for="menuItem in menuItems"
              :key="menuItem.id"
            >
              {{ menuItem.label }}
            </li>

            <li class="p-2 px-4" v-if="moreMenuItems.length > 0">
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
      </div>
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
        { label: 'This', id: 1, link: '#1' },
        { label: 'is an', id: 2, link: '#2' },
        { label: 'example', id: 3, link: '#3' },
        { label: 'navigation', id: 4, link: '#4' },
        { label: 'with many', id: 5, link: '#5' },
        { label: 'items', id: 6, link: '#6' }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.logo {
  justify-self: center;
}
.grid {
  display: grid;
  grid-template-areas:
    'logo header'
    'description description'
    'content content';
  align-items: center;
  grid-column-gap: 3rem;

  @include media-breakpoint-up(md) {
    grid-template-columns: 300px 1fr;
    grid-template-rows: auto auto;
    grid-template-areas:
      'logo header'
      '....... description '
      '....... content';
  }
}

.description {
  grid-area: description;
}
.content {
  grid-area: content;
}

@keyframes menuWidth {
  from {
    width: 100%;
  }
  to {
    width: 20%;
  }
}
.demo-nav {
}
</style>
