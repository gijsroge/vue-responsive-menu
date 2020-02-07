<template>
  <div class="root d-flex">
    <div class="flex-grow-1">
      <div class="grid flex-grow-1 p-5 p-md-6 p-xxl-8 justify-content-center">
        <svg-icon
          class="logo delay-show"
          name="logo"
          style="width: 3.5rem; height: 3.5rem"
        />

        <div class="delay-show">
          <h1 class="font-weight-light m-0">
            {{ name }}
          </h1>
          <span
            class="ml-lg-2 font-size-sm font-weight-bold d-inline-block position-absolute"
            style="color: #41b883"
            >for Vue.js</span
          >
        </div>

        <div class="description py-md-5 mt-5 mt-md-4">
          <p class="font-size-lg headings-font-family delay-show">
            A renderless Vue component using Resize Observer to detect if menu
            items dont't fit its parent and moves them to a separate menu.
          </p>

          <div class="d-flex align-items-center mb-5 delay-show">
            <a
              class="btn btn-sm btn-secondary btn-twitter mr-3"
              href="https://twitter.com/intent/tweet?text=Vue responsive menu — Auto detect if menu items don't fit and moves them to a separate dropdown.%0a%0a👉 vue-responsive-menu.netlify.com"
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

          <div class="example example--1 py-5 mb-5">
            <ResizeContent class="resize-animation">
              <VueResponsiveMenu
                v-if="responsiveMenuReady"
                @menu-resized="updatePopper()"
                :maxCharacters="false"
                class="resize-parent"
                :class="{ 'has-resized': hasResized }"
                #default="{ menuItems, moreMenuItems}"
                :nav="navigation"
                :offset="30"
              >
                <ul
                  data-vue-responsive-menu
                  class="demo-nav demo-nav--1 list-unstyled d-flex flex-wrap font-weight-bold flex-grow-1 mb-0"
                >
                  <li
                    class="d-inline-block"
                    v-for="menuItem in menuItems"
                    :key="menuItem.id"
                  >
                    <a
                      href="#"
                      class="p-md-2 p-1 px-2 px-md-4 border d-block"
                      >{{ menuItem.label }}</a
                    >
                  </li>

                  <li class="d-inline-block" v-show="moreMenuItems.length > 0">
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
                          <div class="dropdown-menu dropdown-black m-0 shadow d-block">
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
                        class="btn p-md-2 p-1 px-2 px-md-4 border bg-black rounded-0"
                        :style="menuItems.length === 0 ? 'width: 70px;' : ''"
                      >
                        {{ menuItems.length === 0 ? '☰' : 'more ↓' }}
                      </button>
                    </Popper>
                  </li>
                </ul>
              </VueResponsiveMenu>
            </ResizeContent>
          </div>

          <section class="delay-show">
            <h2>Key points</h2>
            <ul class="list-unstyled">
              <li>
                <span class="mr-2">✅</span> Nuxt/SSR support out of the box.
              </li>
              <li>
                <span class="mr-2">🎨</span> No styling included, only exposes
                reactive state.
              </li>
              <li>
                <span class="mr-2">☁</span>️ Lightweight
                <span class="text-muted">1.14kb</span>
              </li>
              <li>
                <span class="mr-2">💪</span> Resize Observer for better
                performance.
              </li>
              <li>
                <span class="mr-2">🔪</span> Set max amount of characters so
                extra items get cut off on initial render. Useful in SSR.
              </li>
            </ul>
          </section>
        </div>

        <div class="content delay-show">
          <h2 class="h4 text-dark-gray base-font-family font-weight-normal">
            How to use
          </h2>
          <h3>Install {{ name }}</h3>
          <pre><code class="language-markup">yarn add vue-responsive-menu</code></pre>

          <h3>Register as a Vue component</h3>
          <pre><code class="language-js font-size-sm">{{jsCode}}</code></pre>

          <h3>Pass your menu in the <code>:nav</code> prop</h3>
          <p class="text-muted">
            {{ name }} will expose 2 new arrays in the default prop, <br />
            <b class="">1 normal menu</b> and
            <b class="">1 with the excess items</b>.
          </p>
          <pre><code class="language-html font-size-sm">{{templateCode}}</code></pre>
          <h3>Available options</h3>
          <table class="options-table">
            <thead>
              <tr>
                <th>Prop</th>
                <th>Default</th>
                <th>Type</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>:nav <span class="text-muted">(required)</span></td>
                <td><code class="language-js font-size-sm">[]</code></td>
                <td>
                  Array of objects
                </td>
                <td></td>
              </tr>
              <tr>
                <td>:maxCharacters</td>
                <td><code class="language-js font-size-sm">false</code></td>
                <td>Number | Boolean</td>
                <td></td>
              </tr>
              <tr>
                <td>Label</td>
                <td><code class="language-js font-size-sm">'label'</code></td>
                <td>String</td>
                <td>
                  Key to read the menu item label. <br /><i class="font-size-sm"
                    >Only needed if you enable maxCharacters.</i
                  >
                </td>
              </tr>
            </tbody>
          </table>

          <h3>Available events</h3>
          <table class="options-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Payload</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>@menu-resized</td>
                <td>
                  <code class="language-markup font-size-sm">number</code>
                  <span class="text-muted">in pixels</span>
                </td>
              </tr>
              <tr>
                <td>@item-to-dropdown</td>
                <td>
                  <code class="language-markup font-size-sm">object</code>
                  <span class="text-muted">From nav prop</span>
                </td>
              </tr>
              <tr>
                <td>@item-to-menu</td>
                <td>
                  <code class="language-markup font-size-sm">object</code>
                  <span class="text-muted">From nav prop</span>
                </td>
              </tr>
            </tbody>
          </table>

          <h3>Example with options</h3>
          <span class="text-muted">MainMenu.vue</span>
          <pre><code class="language-html font-size-sm">{{example2}}</code></pre>
          <!--
          <pre><code class="language-html font-size-sm">{{scriptCode}}</code></pre>-->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import Popper from 'vue-popperjs'

export default {
  components: {
    FocusLock: () => import('vue-focus-lock'),
    ResizeContent: () => import('~/components/ResizeContent.vue'),
    Popper
  },
  async mounted() {
    if (!('ResizeObserver' in window)) {
      // Loads polyfill asynchronously, only if required.
      const module = await import('@juggle/resize-observer')
      window.ResizeObserver = module.ResizeObserver
    }

    const VueResponsiveMenu = await import('../../src/index')
    Vue.component('VueResponsiveMenu', VueResponsiveMenu.default)
    this.responsiveMenuReady = true

    setTimeout(() => {
      if (typeof this.$refs.popper !== 'undefined') {
        this.$refs.popper.doShow()
      }
    }, 200)

    setTimeout(() => {
      if (typeof this.$refs.popper !== 'undefined') {
        this.$refs.popper.doClose()
      }
    }, 3000)
  },
  methods: {
    updatePopper() {
      if (
        typeof this.$refs.popper !== 'undefined' &&
        this.$refs.popper.showPopper
      ) {
        this.$refs.popper.popperJS.update()
      }
    }
  },
  data() {
    return {
      responsiveMenuReady: false,
      name: 'Responsive menu',
      hasResized: false,
      jsCode: `import VueResponsiveMenu from 'vue-responsive-menu'

export default {
  components: {
    VueResponsiveMenu
  }
}`,
      example2: `<template>
  <!-- This will render max 35 characters counted from the name key in the nav array. In this case the first 5 menu items -->
  <VueResponsiveMenu
    #default="{ menuItems, moreMenuItems}" :maxCharacters="35" label="name" :nav="mainMenu.items">
      <!-- ... -->
  </VueResponsiveMenu>
</template>

<script>
  import VueResponsiveMenu from 'vue-responsive-menu'
  export default {
    components: {
      VueResponsiveMenu
    }
    data() {
      return {
        navigation: [
          { name: 'This', id: 1, link: '#1' },
          { name: 'is an', id: 2, link: '#2' },
          { name: 'example', id: 3, link: '#3' },
          { name: 'navigation', id: 4, link: '#4' },
          { name: 'with many', id: 5, link: '#5' },
          { name: 'many', id: 6, link: '#5' },
          { name: 'many', id: 7, link: '#5' },
          { name: 'many', id: 8, link: '#5' },
          { name: 'items', id: 9, link: '#6' }
        ]
      }
    }
  }
<\/script>`,
      templateCode: `<!-- Renderless component that exposes 2 arrays based on the array you pass in the nav prop. -->
<VueResponsiveMenu #default="{ menuItems, moreMenuItems}" :nav="mainMenu.items">

  <ul>
    <!-- Default menu -->
    <li v-for="item in menuItems" :key="item.id">
      <a :href="item.href">
        {{ item.name }}
      </a>
    </li>

    <!-- More menu with the items that didn't fit -->
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
      scriptCode: `<script>
  export default {
    data() {
      return {
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
        ]
      }
    }
  }
<\/script>`,
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
.options-table {
  td,
  th {
    padding: 0.5rem;
  }
}
.delay-show {
  @keyframes delay-show {
    to {
      opacity: 1;
    }
  }
  opacity: 0;
  animation: delay-show forwards 7s 2s;
}
@keyframes menuWidth {
  from {
    width: 100%;
  }
  to {
    width: 20%;
  }
}
.resize-animation {
  animation: 1.5s 0.5s menuWidth 2 alternate ease-in-out;
}
</style>

<style lang="scss" scoped>
.logo {
  @include media-breakpoint-up(md) {
    justify-self: center;
  }
}
.grid {
  display: grid;
  grid-template-areas:
    'logo header'
    'description description'
    'content content';

  grid-column-gap: 1rem;
  grid-template-columns: 56px minmax(50px, 1fr);

  @include media-breakpoint-up(md) {
    align-items: center;
    grid-column-gap: 3rem;
    grid-template-columns: 100px minmax(100px, 1200px);
    grid-template-rows: auto auto;
    grid-template-areas:
      'logo header'
      '....... description '
      '....... content';
  }

  @include media-breakpoint-up(lg) {
    grid-template-columns: 100px minmax(100px, 1200px);
  }
  @include media-breakpoint-up(xxl) {
    grid-template-columns: 300px minmax(100px, 1200px);
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
