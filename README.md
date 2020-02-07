[![Vue responsive menu logo](https://vue-responsive-menu.netlify.com/favicons/apple-touch-icon-152x152.png)](https://vue-responsive-menu.netlify.com/)
# A responsive menu build for Vue.js

A renderless Vue component that will auto detect if menu items don't fit and moves them to a separate dropdown. Also known as the Priority+ pattern.

[![Vue responsive menu demo](https://vue-responsive-menu.netlify.com/demo.gif)](https://vue-responsive-menu.netlify.com/)


#### Take a look at the **[Demo](https://vue-responsive-menu.netlify.com/)** site.

----------

### Install
`yarn add vue-responsive-menu`

### Register as a Vue component
```javascript
import VueResponsiveMenu from 'vue-responsive-menu'

export default {
  components: {
    VueResponsiveMenu
  }
}
```

### Pass your menu in the `:nav` prop
Responsive menu will expose 2 new arrays in the default prop, **1 normal menu** & **1 with the excess items**

```html
<!-- Renderless component that exposes 2 arrays based on the array you pass in the nav prop. -->
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

</VueResponsiveMenu>
```

### Props
| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| :nav | `array<object>` | `[]`
| :maxCharacters | `number` or `boolean` | `false`
| label | string | `'label'` | Key to read the menu item label. Only needed if you enable maxCharacters.


### Events
| Name | Payload | Description |
| --- | --- | --- |
| @menu-resized | `number` | current width of menu
| @item-to-dropdown | `object` | Item from nav prop
| @item-to-menu | `object` | Item from nav prop
                                                 

### Example with options

```html
<template>
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
</script>
```

### Todo

- [x] Make a public example site
- [x] Create GIF in documentation
- [x] Add documentation
- [ ] Write tests
- [ ] Setup CI
- [ ] Add contribution guidelines
