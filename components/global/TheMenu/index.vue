<template>
    <div class="app-menu">
    </div>
</template>

<script>
export default {
    data() {
        return {
            list: [
                {
                    name: "Orders",
                    link: "#",
                    icon: "",
                    children: [
                        {
                            name: "List",
                            link: "#"
                        },
                        {
                            name: "Custom quotes",
                            link: "#"
                        }
                    ]
                },
                {
                    name: "Devices",
                    link: "#",
                    icon: "",
                    children: [
                        {
                            name: "List",
                            link: "#"
                        },
                        {
                            name: "Conditions",
                            link: "#"
                        }
                    ]
                }
            ]
        };
    }
};
</script>

<style lang="scss" scoped>
.app-menu {
    padding: 30px;
    padding-top: 40px;
}
</style>
