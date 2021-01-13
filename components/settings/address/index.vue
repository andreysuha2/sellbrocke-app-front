<template>
    <div v-if="componentData" class="settings-rows">

        <div class="settings-rows--row">
            <div class="settings-rows--cell">
                <span>Office country</span>
            </div>
            <div class="settings-rows--cell">
                <span>{{ componentData.OFFICE_COUNTRY }}</span>
            </div>
        </div>

        <div class="settings-rows--row">
            <div class="settings-rows--cell">
                <span>Office state</span>
            </div>
            <div class="settings-rows--cell">
                <span>{{ componentData.OFFICE_STATE }}</span>
            </div>
        </div>

        <div class="settings-rows--row">
            <div class="settings-rows--cell">
                <span>Office city</span>
            </div>
            <div class="settings-rows--cell">
                <span>{{ componentData.OFFICE_CITY }}</span>
            </div>
        </div>

        <div class="settings-rows--row">
            <div class="settings-rows--cell">
                <span>Office address</span>
            </div>
            <div class="settings-rows--cell">
                <span>{{ componentData.OFFICE_ADDRESS_LINE }}</span>
            </div>
        </div>

        <div class="settings-rows--row">
            <div class="settings-rows--cell">
                <span>Office postal code</span>
            </div>
            <div class="settings-rows--cell">
                <span>{{ componentData.OFFICE_POSTAL_CODE }}</span>
            </div>
        </div>

        <div class="settings-rows--row">
            <div class="settings-rows--control">
                <md-button
                    @click="showUpdatePopup=true"
                    class="md-primary md-raised"
                >
                    Update
                </md-button>
            </div>
        </div>

        <update-form
            :show-popup="showUpdatePopup"
            @closePopup="showUpdatePopup=false"/>

    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import UpdatePopup from "@components/settings/address/UpdatePopup";

export default {
    components: { 'update-form': UpdatePopup },
    data() {
        return { showUpdatePopup: false };
    },
    computed: { ...mapGetters('settings/address', { componentData: 'getAddress' }) },
    methods: { ...mapActions('settings/address', { fetchData: 'fetchAddress' }) },
    mounted() {
        this.fetchData();
    }
};
</script>

<style lang="scss" scoped>
@import 'mixins/settings/settings-rows.scss';
</style>
