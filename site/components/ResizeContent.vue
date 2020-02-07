<template>
  <div>
    <slot></slot>
    <div class="handle"></div>
  </div>
</template>
<script>
export default {
  async mounted() {
    const module = await import('interactjs')
    const interact = module.default
    console.log(interact)
    interact(this.$el)
      .resizable({
        // resize from all edges and corners
        edges: { left: false, right: '.handle', bottom: false, top: false },

        modifiers: [
          // keep the edges inside the parent
          interact.modifiers.restrictEdges({
            outer: 'parent'
          }),

          // minimum size
          interact.modifiers.restrictSize({
            min: { width: 100, height: 50 }
          })
        ],

        inertia: true
      })
      .draggable({
        onmove: window.dragMoveListener,
        inertia: true,
        modifiers: [
          interact.modifiers.restrictRect({
            restriction: 'parent',
            endOnly: true
          })
        ]
      })
      .on('resizemove', function(event) {
        var target = event.target
        var x = parseFloat(target.getAttribute('data-x')) || 0
        var y = parseFloat(target.getAttribute('data-y')) || 0

        // update the element's style
        target.style.width = event.rect.width + 'px'
        target.style.height = event.rect.height + 'px'

        // translate when resizing from top or left edges
        x += event.deltaRect.left
        y += event.deltaRect.top

        target.style.webkitTransform = target.style.transform =
          'translate(' + x + 'px,' + y + 'px)'
      })
  }
}
</script>
<style lang="scss" scoped>
div {
  touch-action: none;
  position: relative;
}
.handle {
  top: 0;
  right: 0;
  content: '';
  position: absolute;
  width: 20px;
  height: 100%;
  color: $black;
  background: $primary
    svg-load('../assets/images/svgs/icons/knob.svg', fill = currentColor)
    no-repeat center;
  background-size: 4px 13px;
  transform: scaleY(1.5);
  filter: drop-shadow(0 0 50px $black);
  touch-action: pan-x !important;
}
</style>
