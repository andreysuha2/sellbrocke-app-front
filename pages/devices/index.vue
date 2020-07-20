<template>
    <app-page title="Devices">
        <template #header>
            <md-button
                @click="showCreatePopup = true"
                class="md-button md-primary md-raised">Add new</md-button>
        </template>
        <md-empty-state
            md-icon="devices"
            md-label="Create your first device"
            :md-description="emptyDescription">
            <md-button
                v-if="canCreate"
                @click="showCreatePopup = true"
                class="md-primary md-raised">Create device</md-button>
        </md-empty-state>
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
import { mapGetters } from "vuex";

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
        ...mapGetters("devices", [ "canCreate" ]),
        emptyDescription() {
            return this.canCreate ? "Create device to start you business" : "You must created categories and companies before create devices";
        }
    }
};
</script>
