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
          fit and moves them to a separate dropdown.  Also known as the
          Priority+ pattern.
        </p>
      </header>
    </div>
  </div>
</template>

<script>
export default {
  components: {}
}
</script>

<style lang="scss" scoped>
.header {
  display: grid;
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
