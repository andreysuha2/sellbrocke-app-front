<template>
    <div class="menu-item"></div>
</template>

<script>
export default {
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
        }
    }
};
</script>
