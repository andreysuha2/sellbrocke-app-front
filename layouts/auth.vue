<template>
    <div class="app-auth flex flex-center">
        <nuxt/>
    </div>
</template>

<script>
export default { middleware: "guest" };
</script>

<style lang="scss" scoped>
.app-auth {
    width: 100%;
    height: 100%;
    padding: 30px;
}
</style>
