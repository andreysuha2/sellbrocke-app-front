<template>
    <div class="app-menu">
        <menu-item
            v-for="item in list"
            v-bind="item"
            :key="item.key"/>
    </div>
</template>

<script>
import MenuItem from "./MenuItem";
import { mapState } from "vuex";

export default {
    components: { "menu-item": MenuItem },
    computed: { ...mapState("app", { list: "menuList" }) }
};
</script>

<style lang="scss" scoped>
.app-menu {
    padding: 30px;
    padding-top: 40px;
}
</style>
