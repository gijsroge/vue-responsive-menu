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

  watch: {
    nav(nav) {
      this.menuItems = nav;
      this.preRender();
      this.moveItem();
    }
  },

  created() {
    this.preRender();
    this.$emit("moreMenuItems", this.moreMenuItems);
    this.$emit("menuItems", this.menuItems);
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
    if (!this.element) {
      console.warn(
        "Vue responsive menu: root element does not contain more then 1 child. If you have a nested menu please mark your menu with the 'data-vue-responsive-menu' attribute."
      );
      return;
    }
    this.observer.observe(this.element);
  },

  methods: {
    preRender() {
      /* Presort menu items if maxCharacters is set. Useful for when you pre-render or SSR */
      if (!this.maxCharacters) {
        this.menuItems = this.nav;
      } else {
        let total = 0;
        this.menuItems = this.nav.filter(navItem => {
          total += navItem[this.label].length;
          if (total < this.maxCharacters) {
            return navItem;
          }
        });
      }

      if (!this.maxCharacters) {
        this.moreMenuItems = [];
      } else {
        let total = 0;
        this.moreMenuItems = this.nav.filter(navItem => {
          total += navItem[this.label].length;
          if (total >= this.maxCharacters) {
            return navItem;
          }
        });
      }
    },
    moveItem() {
      const exceededCharacterCount =
        this.maxCharacters && this.menuCharacters > this.maxCharacters;

      if (this.isOverflown || exceededCharacterCount) {
        const lastElement = this.menuItems[this.menuItems.length - 1] || null;
        this.$emit("item-to-dropdown", lastElement);
        this.moreMenuItems.unshift(lastElement);
        this.menuItems.pop();
        this.moved = false;
        this.$emit("moreMenuItems", this.moreMenuItems);
        this.$emit("menuItems", this.menuItems);
        this.$nextTick(() => {
          this.moveItem();
        });
      } else if (
        (this.currentMenuWidth > this.previousMenuWidth ||
          this.firstRun ||
          this.moved) &&
        this.moreMenuItems[0] &&
        !exceededCharacterCount
      ) {
        const firstElement = this.moreMenuItems[0];
        this.menuItems.push(firstElement);
        this.$emit("item-to-menu", firstElement);
        this.moreMenuItems.shift();
        this.moved = true;
        this.$emit("moreMenuItems", this.moreMenuItems);
        this.$emit("menuItems", this.menuItems);
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
    menuCharacters() {
      return this.menuItems.reduce((total, menuItem) => {
        return (total += menuItem[this.label].length);
      }, 0);
    },
    element() {
      if (
        this.$el.children.length === 1 ||
        !(this.$el instanceof HTMLElement)
      ) {
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
