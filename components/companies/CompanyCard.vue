<template>
    <md-card md-with-hover class="card">
        <div
            :style="logoBg"
            class="card--logo flex flex-center">
        </div>
        <div class="card--name">
            <span>{{ name }}</span>
        </div>
    </md-card>
</template>

<script>
export default {
    props: {
        id: {
            type: Number,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        logo: {
            type: String,
            required: true
        }
    },
    computed: {
        logoBg() {
            return { backgroundImage: `url(${this.logo})` };
        }
    }
};
</script>

<style lang="scss" scoped>
.card {
    padding: 20px;

    &--logo {
        width: 100px;
        height: 100px;
        background-size: contain;
        background-position: center center;
        background-repeat: no-repeat;
    }

    &--name {
        margin-top: 10px;
        text-align: center;
        font-weight: bold;
    }
}
</style>
