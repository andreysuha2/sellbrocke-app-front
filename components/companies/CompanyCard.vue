<template>
    <md-card
        md-with-hover class="card flex">
        <div
            :style="logoBg"
            class="card--logo flex flex-center">
        </div>
        <div class="card--info card-info">
            <div class="card-info--row">
                <span class="card-info--name">Name:</span>
                <span class="card-info--cell">{{ name }}</span>
            </div>
            <div class="card-info--row">
                <span class="card-info--name">Percent:</span>
                <span class="card-info--cell">{{ priceReduction }}%</span>
            </div>
            <div class="card-info--row">
                <span class="card-info--name">Slug:</span>
                <span class="card-info--cell">{{ slug }}</span>
            </div>
            <div class="card-info--row">
                <span class="card-info--name">Devices:</span>
                <span class="card-info--cell">{{ devicesCount }}</span>
            </div>
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
        },
        priceReduction: {
            type: Number,
            required: true
        },
        slug: {
            type: String,
            required: true
        },
        devicesCount: {
            type: Number,
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
    padding: 15px;
    cursor: pointer;

    &--logo {
        width: 100px;
        height: 100px;
        background-size: contain;
        background-position: center center;
        background-repeat: no-repeat;
    }

    &--info {
        margin: {
            left: 20px;
        }
    }
}

.card-info {
    &--row:not(:last-child) {
        margin-bottom: 5px;
    }

    &--name {
        font-weight: bold;
    }
}
</style>
