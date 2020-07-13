<template>
    <div class="menu-item">
        <div v-on-click-out="closeSub"
             @click="navigate" class="menu-item--item flex items-center items-center">
            <md-icon class="menu-item--icon">{{ icon }}</md-icon>
            <span class="menu-item--text">{{ name }}</span>
        </div>
        <div v-if="children && subOpen" class="menu-item--sub-menu">
            <child-item
                v-for="item in children"
                v-bind="item"
                :key="item.key"/>
        </div>
    </div>
</template>

<script>
import SubItem from "./MenuSubItem";

export default {
    components: { "child-item": SubItem },
    data() {
        return { subOpen: false };
    },
    props: {
        name: {
            type: String,
            required: true
        },
        link: {
            type: String,
            required: true
        },
        icon: {
            type: String,
            required: true
        },
        children: {
            required: true,
            validator(children) {
                return Array.isArray(children) || children === null;
            }
        }
    },
    computed: {
        canOpen() {
            return this.link !== "#" && (!this.children || this.subOpen);
        }
    },
    methods: {
        closeSub() {
            this.subOpen = false;
        },
        navigate() {
            if(this.canOpen) this.$router.push({ name: this.link });
            this.subOpen = !this.subOpen;
        }
    }
};
</script>

<style lang="scss" scoped>
.menu-item {
    color: $appBg;

    &--item {
        cursor: pointer;
    }

    &--icon.md-icon {
        color: $appBg;
        margin: 0;
    }

    &--text {
        font-weight: bold;
        margin-left: 15px;
    }

    &--sub-menu {
        margin: {
            top: 10px;
        }
        padding: {
            left: 25px;
        }
    }

    &:not(:last-child) {
        margin-bottom: 20px;
    }
}
</style>
