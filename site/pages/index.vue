<template>
  <div class="root d-flex">
    <div class="flex-grow-1">
      <div class="grid flex-grow-1 p-3 p-md-6 p-lg-8">
        <svg-icon
          class="logo"
          name="logo"
          style="width: 3.5rem; height: 3.5rem"
        />

        <div>
          <h1 class="font-weight-light m-0">
            A flexible responsive menu
          </h1>
          <span
            class="font-size-sm font-weight-bold d-inline-block position-absolute"
            style="color: #41b883"
            >for Vue.js</span
          >
        </div>

        <div class="description py-5 mt-4">
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

          <div class="example example--1 py-5">
            <VueResponsiveMenu
              :maxCharacters="false"
              class="resize-parent"
              :class="{ 'has-resized': hasResized }"
              #default="{ menuItems, moreMenuItems}"
              :nav="navigation"
            >
              <div class="w-100">
                <vue-resizable
                  :min-width="150"
                  width="100%"
                  :active="['r']"
                  :fitParent="true"
                  @resize:move="updatePopper"
                >
                  <ul
                    data-vue-responsive-menu
                    class="demo-nav demo-nav--1 list-unstyled d-flex flex-wrap font-weight-bold flex-grow-1"
                  >
                    <li
                      class="d-inline-block"
                      v-for="menuItem in menuItems"
                      :key="menuItem.id"
                    >
                      <a href="#" class="p-2 px-4 border d-block">{{
                        menuItem.label
                        }}</a>
                    </li>

                    <li class="d-inline-block" v-if="moreMenuItems.length > 0">
                      <Popper
                        transition="dropdown"
                        enter-active-class="dropdown-enter-active"
                        leave-active-class="dropdown-leave-active"
                        ref="popper"
                        trigger="clickToToggle"
                        :append-to-body="true"
                        :options="{ placement: 'bottom' }"
                      >
                        <div class="popper dropdown-menu-wrapper">
                          <FocusLock>
                            <div class="dropdown-menu m-0 shadow d-block">
                              <ul class="list-unstyled">
                                <a
                                  class="dropdown-item"
                                  href="#"
                                  v-for="moreMenuItem in moreMenuItems"
                                  :key="moreMenuItem.id"
                                >
                                  {{ moreMenuItem.label }} (more)
                                </a>
                              </ul>
                            </div>
                          </FocusLock>
                        </div>
                        <button
                          type="button"
                          slot="reference"
                          class="btn w-100 p-2 px-4 border bg-dark-gray rounded-0"
                        >
                          {{ menuItems.length === 0 ? '☰' : 'more ↓' }}
                        </button>
                      </Popper>
                    </li>
                  </ul>
                </vue-resizable>
              </div>
            </VueResponsiveMenu>
          </div>
          <p class="font-size-lg">
            A renderless Vue component that will auto detect if menu items don't
            fit and moves them to a separate dropdown. Also known as the
            Priority+ pattern.
          </p>
        </div>

        <div class="content">
          <h2>How to use</h2>
          <pre><code class="language-html font-size-sm">{{templateCode}}</code></pre>
          <pre><code class="language-js font-size-sm">{{jsCode}}</code></pre>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VueResponsiveMenu from '../../src/index'
import Popper from 'vue-popperjs'
export default {
  components: {
    VueResponsiveMenu,
    FocusLock: () => import('vue-focus-lock'),
    Popper
  },
  methods: {
    updatePopper() {
      if (
        typeof this.$refs.popper !== 'undefined' &&
        this.$refs.popper.showPopper
      ) {
        this.$refs.popper.updatePopper()
      }
    },
    startResize() {
      this.hasResized = true
    },
    closeAll() {
      this.moreExample1Open = false
    }
  },
  data() {
    return {
      hasResized: false,
      jsCode: `import VueResponsiveMenu from 'vue-responsive-menu'

export default {
  components: {
    VueResponsiveMenu
  }
}`,
      templateCode: `<!-- Renderless component that exposes 2 arrays based on the array you pass in the nav prop. -->
<VueResponsiveMenu #default="{ menuItems, moreMenuItems}" :nav="mainMenu.items">

  <!-- menuItems contains items that fit in the remaining space. -->
  <ul>
    <li v-for="item in menuItems" :key="item.id">
      <a :href="item.href">
        {{ item.name }}
      </a>
    </li>

    <!-- moreMenuItems items that won't fit in the remaining space. -->
    <li v-if="moreMenuItems.length">
      <button type="button">{{ menuItems.length === 0 ? '☰' : 'more ↓' }}</button>
      <ul>
        <li v-for="item in moreMenuItems" :key="item.id">
          <a :href="item.href">
            {{ item.name }}
          </a>
        </li>
      </ul>
    </li>
  </ul>
</VueResponsiveMenu>`,
      moreExample1Open: false,
      navigation: [
        { label: 'This', id: 1, link: '#1' },
        { label: 'is an', id: 2, link: '#2' },
        { label: 'example', id: 3, link: '#3' },
        { label: 'navigation', id: 4, link: '#4' },
        { label: 'with many', id: 5, link: '#5' },
        { label: 'many', id: 6, link: '#5' },
        { label: 'many', id: 7, link: '#5' },
        { label: 'many', id: 8, link: '#5' },
        { label: 'items', id: 9, link: '#6' }
      ],
      letters: [
        { letter: 'h', id: 1 },
        { letter: 'e', id: 2 },
        { letter: 'l', id: 3 },
        { letter: 'l', id: 4 },
        { letter: 'o', id: 5 },
        { letter: '.', id: 6 },
        { letter: 'i', id: 7 },
        { letter: 's', id: 8 },
        { letter: '.', id: 9 },
        { letter: 'i', id: 10 },
        { letter: 't', id: 11 },
        { letter: '.', id: 12 },
        { letter: 'm', id: 13 },
        { letter: 'e', id: 14 },
        { letter: '.', id: 15 },
        { letter: 'y', id: 16 },
        { letter: 'o', id: 17 },
        { letter: 'u', id: 18 },
        { letter: 'r', id: 19 },
        { letter: '.', id: 20 },
        { letter: 'l', id: 21 },
        { letter: 'o', id: 22 },
        { letter: 'o', id: 23 },
        { letter: 'k', id: 24 },
        { letter: 'i', id: 25 },
        { letter: 'n', id: 26 },
        { letter: 'g', id: 27 },
        { letter: '.', id: 28 },
        { letter: 'f', id: 29 },
        { letter: 'o', id: 30 },
        { letter: 'r', id: 31 },
        { letter: '?', id: 32 }
      ]
    }
  },
  head() {
    const head = {}

    const description =
      "A renderless Vue component that will auto detect if menu items don't fit and moves them to a separate dropdown. Also known as the Priority+ pattern."

    head.meta = [
      {
        hid: 'description',
        name: 'description',
        content: description
      },
      {
        name: 'og:url',
        content: this.$nuxt.$route.path
      },
      { name: 'og:type', content: 'website' },
      {
        name: 'og:title',
        content: `Vue Responsive Menu | auto hide excessive menu items`
      },
      {
        name: 'og:description',
        content: description
      }
    ]

    // Twitter card
    head.meta = [
      ...head.meta,
      {
        name: 'twitter:title',
        content: `Vue Responsive Menu | auto hide excessive menu items`
      },
      {
        name: 'twitter:description',
        content: description
      },
      { name: 'twitter:site', content: 'Vue Responsive Menu' }
    ]

    return head
  }
}
</script>

<style lang="scss">
@keyframes menuWidth {
  from {
    width: 100%;
  }
  to {
    width: 20%;
  }
}
.resizable-content {
  height: 100%;
  width: 100%;
  background-color: aqua;
}
.resizable-r {
  background-color: $primary;
}
.resize-parent {
  &:not(.has-resized) {
    .resizable-component {
      //width: auto !important;
    }
  }
}
.resizable-component {
  height: auto !important;
  //animation: 1.5s menuWidth 2 alternate ease-in-out;
}
</style>

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

.hello-is-it-me {
  //animation: 3s menuWidth infinite alternate ease-in-out;
}

.demo-nav--1 {
  > li {
    margin-right: -1px;
  }
}
</style>
