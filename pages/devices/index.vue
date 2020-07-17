<template>
    <app-page title="Devices">
        <template #header>
            <md-button
                class="md-button md-primary md-raised">Add new</md-button>
        </template>
        <md-empty-state
            md-icon="devices"
            md-label="Create your first device"
            md-description="Create device to start you business">
            <md-button
                class="md-primary md-raised">Create device</md-button>
        </md-empty-state>
    </app-page>
</template>
