const getWidthIncludingMargin = el => {
  return (
    el.offsetWidth +
    parseFloat(getComputedStyle(el).marginLeft) +
    parseFloat(getComputedStyle(el).marginRight)
  );
};

export default {
  props: {
    maxCharacters: {
      type: [Number, Boolean],
      default: false
    },
    label: {
      type: String,
      default: "label"
    },
    nav: {
      type: Array,
      required: true,
      default() {
        return [];
      }
    },
    offset: {
      type: Number,
      default: 0
    }
  },

  data() {
    return {
      currentMenuWidth: null,
      previousMenuWidth: null,
      menuItems: [],
      moreMenuItems: [],
      firstRun: true,
      moved: false
    };
  },

  created() {
    /* Presort menu items if maxCharacters is se. Useful for when you pre-render or SSR */
    let menuItemsCount = 0;
    if (!this.maxCharacters) {
      this.menuItems = this.nav;
    } else {
      this.menuItems = this.nav.filter(navItem => {
        menuItemsCount += navItem[this.label].length;
        if (menuItemsCount < this.maxCharacters) {
          return navItem;
        }
      });
    }

    let moreMenuItemsCount = 0;
    if (!this.maxCharacters) {
      this.moreMenuItems = [];
    } else {
      this.moreMenuItems = this.nav.filter(navItem => {
        moreMenuItemsCount += navItem[this.label].length;
        if (moreMenuItemsCount >= this.maxCharacters) {
          return navItem;
        }
      });
    }
  },

  mounted() {
    // Register observer
    this.observer = new ResizeObserver(entries => {
      entries.forEach(entry => {
        this.$emit("menu-resized", entry.contentRect.width);
        this.currentMenuWidth = entry.contentRect.width;
        // Only execute if the width of our menu changed
        if (
          this.previousMenuWidth !== entry.contentRect.width ||
          this.firstRun
        ) {
          if (this.firstRun) {
            this.previousMenuWidth = entry.contentRect.width;
          }
          this.moveItem(entry.contentRect.width);
          this.firstRun = false;
        }
        this.previousMenuWidth = entry.contentRect.width;
      });
    });

    // Attach resize handler to monitor menu width
    this.observer.observe(this.element);
  },

  methods: {
    moveItem() {
      if (this.isOverflown) {
        const lastElement = this.menuItems[this.menuItems.length - 1] || null;
        this.$emit("item-to-dropdown", lastElement);
        this.moreMenuItems.unshift(lastElement);
        this.menuItems.pop();
        this.moved = false;
        this.$nextTick(() => {
          this.moveItem();
        });
      } else if (
        (this.currentMenuWidth > this.previousMenuWidth ||
          this.firstRun ||
          this.moved) &&
        this.moreMenuItems[0]
      ) {
        const firstElement = this.moreMenuItems[0];
        this.menuItems.push(firstElement);
        this.$emit("item-to-menu", firstElement);
        this.moreMenuItems.shift();
        this.moved = true;
        this.$nextTick(() => {
          this.moveItem();
        });
      }
    },
    totalWidthOfChildren() {
      if (this.menuItems.length === 0) {
        return 0;
      }
      return Array.from(this.element.children).reduce((total, child) => {
        return total + getWidthIncludingMargin(child);
      }, 0);
    }
  },

  render() {
    return this.$scopedSlots.default({
      menuItems: this.menuItems,
      moreMenuItems: this.moreMenuItems
    });
  },

  computed: {
    element() {
      if (this.$el.children.length === 1 || !this.$el instanceof HTMLElement) {
        return this.$el.querySelector("[data-vue-responsive-menu]");
      }

      return this.$el;
    },
    isOverflown() {
      if (!this.currentMenuWidth) return false;
      return this.currentMenuWidth < this.totalWidthOfChildren() + this.offset;
    }
  }
};
