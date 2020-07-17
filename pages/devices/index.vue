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
            md-description="Create device to start you business">
            <md-button
                @click="showCreatePopup = true"
                class="md-primary md-raised">Create device</md-button>
        </md-empty-state>
        <create-device
            @closePopup="showCreatePopup = false"
            :show-popup="showCreatePopup"/>
    </app-page>
</template>

<script>
import CreationPopup from "@components/devices/CreationPopup";

export default {
    components: { "create-device": CreationPopup },
    data() {
        return { showCreatePopup: false };
    }
};
</script>
