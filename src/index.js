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
      type: Number,
      default: 100
    },
    nav: {
      type: Array,
      required: true,
      default() {
        return [];
      }
    }
  },

  data() {
    return {
      menuWidth: null,
      menuItems: [],
      moreMenuItems: [],
      breakpoints: []
    };
  },

  created() {
    let menuItemsCount = 0;
    this.menuItems = this.nav.filter(navItem => {
      menuItemsCount += navItem.label.length;
      if (menuItemsCount < this.maxCharacters) {
        return navItem;
      }
    });

    let moreMenuItemsCount = 0;
    this.moreMenuItems = this.nav.filter(navItem => {
      moreMenuItemsCount += navItem.label.length;
      if (moreMenuItemsCount >= this.maxCharacters) {
        return navItem;
      }
    });
  },

  mounted() {
    this.menuWidth = this.$el.offsetWidth;
    this.previousMenuWidth = this.menuWidth;
    this.moveItem();

    // Register observer
    this.observer = new ResizeObserver(entries => {
      entries.forEach(entry => {
        if (this.menuWidth !== entry.contentRect.width) {
          this.moveItem(entry.contentRect.width);
        }
        this.menuWidth = entry.contentRect.width;
      });
    });

    // Attach resize handler to monitor menu width
    this.observer.observe(this.$el);
  },

  methods: {
    moveItem(currentMenuWidth = this.menuWidth) {
      console.log(currentMenuWidth, this.menuWidth);
      if (this.isOverflown && currentMenuWidth < this.menuWidth) {
        const lastElement = this.menuItems[this.menuItems.length - 1] || null;
        if (lastElement) {
          this.breakpoints.push(
            this.menuWidth + getWidthIncludingMargin(this.lastDomMenuItem)
          );
          this.moreMenuItems.unshift(lastElement);
          this.menuItems.pop();
        }
        this.$nextTick(() => {
          this.moveItem();
        });
      } else if (!this.isOverflown) {
        this.breakpoints.forEach(breakpoint => {
          const moreMenuItem = this.moreMenuItems[0] || null;
          if (this.menuWidth > breakpoint) {
            this.breakpoints.shift();
            this.menuItems.push(moreMenuItem);
            this.moreMenuItems.shift();

            this.$nextTick(() => {
              this.moveItem();
            });
          }
        });
      }
    },
    getTotalCharacters() {
      return this.nav.reduce((total, num) => total + num.label.length, 0);
    },
    totalWidthOfChildren() {
      if (this.menuItems.length === 0) {
        return 0;
      }
      return Array.from(this.$el.children).reduce((total, child) => {
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
    isOverflown() {
      if (!this.menuWidth) return false;
      return this.menuWidth < this.totalWidthOfChildren();
    },
    lastDomMenuItem() {
      if (this.moreMenuItems.length === 0) {
        return this.$el.lastElementChild;
      }

      const children = Array.from(this.$el.children);
      return children[children.length - 2];
    }
  }
};
