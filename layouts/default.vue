<template>
  <div class="app-wrapper">
    <app-header/>
    <nuxt/>
  </div>
</template>

<script>
import AppHeader from "@global/TheHeader";

export default { components: { "app-header": AppHeader } };
</script>

<style lang="scss" scoped>
.app-wrapper {
    background-color: $appBg1;
    height: 100%;
}
</style>

