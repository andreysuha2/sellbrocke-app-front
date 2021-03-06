<template>
    <app-page v-if="isCurrentPaginateItems" title="Devices">
        <template #header>
            <md-button
                @click="showCreatePopup = true"
                class="md-button md-primary md-raised">Add new</md-button>
        </template>
        <app-search
            :on-search="search"
            v-model="searchQuery"
            name="devices-search"
            placeholder="Search devices"/>
        <md-empty-state
            v-if="!hasDevices"
            md-icon="devices"
            :md-label="emptyTitle"
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
                    <md-table-head>Base price</md-table-head>
                    <md-table-head>Discounted price</md-table-head>
                    <md-table-head>Use PG</md-table-head>
                    <md-table-head>Controls</md-table-head>
                </md-table-row>
                <md-table-row v-for="device in devices" :key="device.id">
                    <md-table-cell class="devices-list--id" md-numeric>{{ device.id }}</md-table-cell>
                    <md-table-cell>
                        <div class="flex items-center">
                            <div class="devices-list--thumbnail"
                                :style="{ backgroundImage: `url(${device.thumbnail})` }">
                            </div>
                            <span>{{ device.name }}</span>
                        </div>
                    </md-table-cell>
                    <md-table-cell>
                        <nuxt-link
                            :to="{ name: 'devices-companies', query: { company: device.company.id } }"
                            class="device-list-company flex items-center">
                            <div
                                :style="{ backgroundImage: `url(${device.company.logo})` }"
                                class="devices-list--thumbnail">
                            </div>
                            <div class="device-list-company--name">
                                <span>{{ device.company.name }}</span>
                            </div>
                        </nuxt-link>
                    </md-table-cell>
                    <md-table-cell>{{ device.prices.base }}$</md-table-cell>
                    <md-table-cell>
                        {{ device.prices.discounted }}$ ({{ device.company.priceReduction }}%)
                    </md-table-cell>
                    <md-table-cell>
                        <md-icon class="md-primary"
                                 v-if="device.useProductsGrids">done</md-icon>
                        <md-icon
                            class="md-accent"
                            v-else>close</md-icon>
                    </md-table-cell>
                    <md-table-cell>
                        <div class="devices-list--controls">
                            <md-button
                                @click="showDisplay(device.id)"
                                class="devices-list--control md-icon-button md-raised">
                                <md-icon>visibility</md-icon>
                            </md-button>
                            <md-button
                                @click="showUpdate(device.id)"
                                class="devices-list--control md-icon-button md-raised">
                                <md-icon>edit</md-icon>
                            </md-button>
                            <md-button
                                @click="removeConfirmation(device)"
                                class="devices-list--control md-icon-button md-raised">
                                <md-icon>delete</md-icon>
                            </md-button>
                        </div>
                    </md-table-cell>
                </md-table-row>
            </md-table>
            <div class="devices-pagination flex justify-between items-center">
                <app-pagination v-if="hasPages"/>
                <div></div>
                <span>total devices: {{ totalItems }}</span>
            </div>
        </template>
        <create-device
            v-if="canCreate"
            @addDevice="addPaginateItem($event)"
            @closePopup="showCreatePopup = false"
            :show-popup="showCreatePopup"/>
        <md-dialog-alert
            v-else
            :md-active.sync="showCreatePopup"
            md-title="Prevent create device!"
            :md-content="emptyDescription" />
        <template v-if="hasCurrentDevice && hasDevices">
            <update-device
                @updateDevice="updatePaginateItem($event)"
                @closePopup="showUpdate(false)"
                :show-popup="isUpdate"/>
            <display-device
                @closePopup="showDisplay(false)"
                :show-popup="isDisplay"/>
        </template>
        <md-dialog-confirm
            v-if="hasDevices"
            :md-active.sync="showDeleteConfirmation"
            :md-content='`Do you whant delete device "${deletedDeviceData.name}"?`'
            @md-cancel="cancelDelete"
            @md-confirm="confirmDelete"
            md-title="Delete device"/>
    </app-page>
</template>

<script>
import CreationPopup from "@components/devices/CreationPopup";
import UpdatePopup from "@components/devices/UpdatePopup";
import DisplayPopup from "@components/devices/DisplayPopup";
import { mapGetters, mapState, mapMutations, mapActions } from "vuex";
import paginationMixin from "@mixins/pages/pagination";

export default {
    mixins: [ paginationMixin ],
    asyncData({ query }) {
        return { searchQuery: query.qs || "" };
    },
    async fetch({ store, route, redirect }) {
        try {
            const { page, qs } = route.query;
            await store.dispatch("devices/loadDevices", { query: qs, page });
            const { currentPage, lastPage } = store.state.app.pagePagination.pagination;
            if(currentPage > lastPage) redirect({ name: 'devices' });
        } catch (e) {
            dl.error(e.response);
        }
    },
    components: {
        "create-device": CreationPopup,
        "update-device": UpdatePopup,
        "display-device": DisplayPopup
    },
    data() {
        return {
            showCreatePopup: false,
            showDeleteConfirmation: false,
            showUpdatePopup: false,
            showDisplayPopup: false,
            deletedDeviceData: {
                id: null,
                name: null
            }
        };
    },
    computed: {
        ...mapState("app/pagePagination", { devices: "items" }),
        ...mapGetters("devices", {
            canCreate: "canCreate",
            hasDevices: "hasDevices"
        }),
        ...mapGetters("devices/currentDevice", { hasCurrentDevice: "hasCurrentDevice" }),
        emptyTitle() {
            if(this.searchQuery) return `No results for query "${this.searchQuery}"`;
            return this.canCreate ? "Create your first device" : "For now you can't create devices";
        },
        emptyDescription() {
            if(this.searchQuery) {
                if(this.canCreate) return "Try to use other query or create new device";
                return "You must created categories and companies before create devices";
            }
            return this.canCreate ? "Create device to start you business" : "You must created categories and companies before create devices";
        },
        isUpdate() {
            return this.showUpdatePopup && this.hasCurrentDevice;
        },
        isDisplay() {
            return this.showDisplayPopup && this.hasCurrentDevice;
        }
    },
    methods: {
        ...mapMutations("devices/currentDevice", {
            selectDevice: "setDevice",
            closeDevice: "cancelDevice"
        }),
        ...mapActions("devices", {
            deleteDevice: "removeDevice",
            getDevices: "loadDevices"
        }),
        removeConfirmation({ id, name }) {
            this.deletedDeviceData.id = id;
            this.deletedDeviceData.name = name;
            this.showDeleteConfirmation = true;
        },
        cancelDelete() {
            this.showDeleteConfirmation = false;
            this.deletedDeviceData.id = null;
            this.deletedDeviceData.name = null;
        },
        confirmDelete() {
            this.deleteDevice(this.deletedDeviceData.id)
                .then(({ device, nextDevice }) => {
                    this.$notify({
                        title: "Device deleted",
                        text: `Device "${device.name}" was deleted!`
                    });
                    this.removePaginateItem(device.id, nextDevice);
                }).catch((e) => this.handleServerErrors(e, "Delete device error"))
                .finally(() => this.cancelDelete());
        },
        showUpdate(id) {
            if(id !== false) {
                this.selectDevice(id);
                this.showUpdatePopup = true;
            } else {
                this.showUpdatePopup = false;
                this.closeDevice();
            }
        },
        showDisplay(id) {
            if(id !== false) {
                this.selectDevice(id);
                this.showDisplayPopup = true;
            } else {
                this.showDisplayPopup = false;
                this.closeDevice();
            }
        },
        search() {
            return new Promise((resolve, reject) => {
                this.getDevices({ query: this.searchQuery })
                    .then(result => {
                        resolve(result);
                        this.$router.push({ name: "devices", query: { qs: this.searchQuery } });
                    })
                    .catch(e => reject(e));
            });
        }
    }
};
</script>

<style lang="scss" scoped>
.devices-list {
    &--id {
        width: 100px;
    }

    &--categories {
        max-width: 420px;
    }

    &--category:not(:last-child) {
        margin-right: 5px;

        &:after {
            content: ',';
        }
    }

    &--control:not(:last-child) {
        margin-right: 10px;
    }

    &--thumbnail {
        width: 50px;
        height: 50px;
        min-width: 50px;
        min-height: 50px;
        margin-right: 10px;
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center center;
    }

    &--controls {
        min-width: 150px;
    }
}

.device-list-company {
    &--image {
        width: 50px;
        height: 50px;
        margin-right: 10px;
    }
}

.devices-pagination {
    margin-top: 30px;
}
</style>
