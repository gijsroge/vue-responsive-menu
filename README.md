# A vue responsive menu
A renderless Vue component that will auto detect if menu items don't fit and moves them to a separate dropdown. Also known as the Priority+ pattern.

### Usage
``` vuejs
import { ResponsiveMenu } from 'vue-responsive-menu'

Vue.component('FocusTrap', FocusTrap)
```

``` vuejs
<VueResponsiveMenu #default="{ menuItems, moreMenuItems}" :nav="mainMenu.items">
  <ul>
    <li v-for="item in menuItems" :key="item.id">
      <a :href="`${item.href}`">
        {{ item.name }}
      </a>
    </li>

    <li v-if="moreMenuItems.length">
      <button type="button">More ↓</button>
      <ul">
        <li v-for="item in moreMenuItems" :key="item.id">
          <a :href="`${item.href}`">
            {{ item.name }}
          </a>
        </li>
      </ul>
    </li>
  </ul>
</VueResponsiveMenu>
```

### Todo
- [ ] Make a public example site
- [ ] Create GIF in documentation
- [ ] Write tests
- [ ] Setup CI
- [ ] Add contribution guidelines
