<template>
    <app-page title="Devices">
        <template #header>
            <md-button
                @click="showCreatePopup = true"
                class="md-button md-primary md-raised">Add new</md-button>
        </template>
        <md-empty-state
            v-if="!hasDevices"
            md-icon="devices"
            md-label="Create your first device"
            :md-description="emptyDescription">
            <md-button
                v-if="canCreate"
                @click="showCreatePopup = true"
                class="md-primary md-raised">Create device</md-button>
        </md-empty-state>
        <template v-else>
            <md-table class="devices-list">
                <md-table-row>
                    <md-table-head class="devices-list--id" md-numeric>ID</md-table-head>
                    <md-table-head>Name</md-table-head>
                    <md-table-head>Company</md-table-head>
                    <md-table-head>Categories</md-table-head>
                    <md-table-head>Slug</md-table-head>
                    <md-table-head>Base price</md-table-head>
                    <md-table-head>Discounted price</md-table-head>
                    <md-table-head>Controls</md-table-head>
                </md-table-row>
                <md-table-row v-for="device in devices" :key="device.id">
                    <md-table-cell class="device-list--id" md-numeric>{{ device.id }}</md-table-cell>
                    <md-table-cell>{{ device.name }}</md-table-cell>
                    <md-table-cell>
                        <nuxt-link
                            :to="{ name: 'devices-companies', query: { company: device.company.id } }"
                            class="device-list-company flex items-center">
                            <div class="device-list-company--image flex items-center">
                                <img :src="device.company.logo" alt="">
                            </div>
                            <div class="device-list-company--name">
                                <span>{{ device.company.name }}</span>
                            </div>
                        </nuxt-link>
                    </md-table-cell>
                    <md-table-cell>
                        <nuxt-link
                            class="device-list--category"
                            v-for="category in device.categories"
                            :key="category.id"
                            :to="{ name: 'devices-categories', query: { category: category.id } }"
                        >
                            {{ category.name }}
                        </nuxt-link>
                    </md-table-cell>
                    <md-table-cell>{{ device.slug }}</md-table-cell>
                    <md-table-cell>{{ device.prices.base }}</md-table-cell>
                    <md-table-cell>{{ device.prices.discounted }}</md-table-cell>
                    <md-table-cell>
                        <md-button
                            @click="openUpdatePopup(defect.id)"
                            class="defects-list--control md-icon-button md-raised">
                            <md-icon>edit</md-icon>
                        </md-button>
                        <md-button
                            @click="removeConfimation(defect)"
                            class="defects-list--control md-icon-button md-raised">
                            <md-icon>delete</md-icon>
                        </md-button>
                    </md-table-cell>
                </md-table-row>
            </md-table>
        </template>
        <create-device
            v-if="canCreate"
            @closePopup="showCreatePopup = false"
            :show-popup="showCreatePopup"/>
        <md-dialog-alert
            v-else
            :md-active.sync="showCreatePopup"
            md-title="Prevent create device!"
            :md-content="emptyDescription" />
    </app-page>
</template>

<script>
import CreationPopup from "@components/devices/CreationPopup";
import { mapGetters, mapState } from "vuex";

export default {
    async fetch({ store }) {
        try {
            await store.dispatch("devices/loadDevices");
        } catch (e) {
            dl.error(e.response);
        }
    },
    components: { "create-device": CreationPopup },
    data() {
        return { showCreatePopup: false };
    },
    computed: {
        ...mapState("devices", { devices: "devices" }),
        ...mapGetters("devices", {
            canCreate: "canCreate",
            hasDevices: "hasDevices"
        }),
        emptyDescription() {
            return this.canCreate ? "Create device to start you business" : "You must created categories and companies before create devices";
        }
    }
};
</script>

<style lang="scss" scoped>
.devices-list {
    &--id {
        width: 100px;
    }

    &--category:not(:last-child) {
        margin-right: 5px;

        &:after {
            content: ',';
        }
    }
}

.device-list-company {
    &--image {
        width: 50px;
        height: 50px;
        margin-right: 10px;
    }
}
</style>
