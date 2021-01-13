<template>
    <div v-if="componentData" class="settings-rows">

        <div class="settings-rows--row">
            <div class="settings-rows--cell">
                <span>FedEx account number</span>
            </div>
            <div class="settings-rows--cell">
                <span>{{ componentData.FEDEX_ACCOUNT_NUMBER }}</span>
            </div>
        </div>

        <div class="settings-rows--row">
            <div class="settings-rows--cell">
                <span>FedEx meter number</span>
            </div>
            <div class="settings-rows--cell">
                <span>{{ componentData.FEDEX_METER_NUMBER }}</span>
            </div>
        </div>

        <div class="settings-rows--row">
            <div class="settings-rows--cell settings-rows--cell--secret">
                <span>FedEx key</span>
                <md-button class="md-icon-button" @click="showKey=!showKey">
                    <md-icon v-if="showKey">visibility</md-icon>
                    <md-icon v-else>visibility_off</md-icon>
                </md-button>
            </div>
            <div class="settings-rows--cell">
                <span>{{ key }}</span>
            </div>
        </div>

        <div class="settings-rows--row">
            <div class="settings-rows--cell settings-rows--cell--secret">
                <span>FedEx password</span>
                <md-button class="md-icon-button" @click="showPassword=!showPassword">
                    <md-icon v-if="showPassword">visibility</md-icon>
                    <md-icon v-else>visibility_off</md-icon>
                </md-button>
            </div>
            <div class="settings-rows--cell">
                <span>{{ password }}</span>
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
import UpdatePopup from "@components/settings/shipping/FedEx/UpdatePopup";

export default {
    components: { 'update-form': UpdatePopup },
    data() {
        return {
            showPassword: false,
            showKey: false,
            showUpdatePopup: false
        };
    },
    computed: {
        ...mapGetters('settings/shipping/fedex', { componentData: 'getFedex' }),
        password() {
            if(this.showPassword) {
                return this.componentData.FEDEX_PASSWORD;
            }
            return '*'.repeat(this.componentData.FEDEX_PASSWORD.length) || '******';
        },
        key() {
            if(this.showKey) {
                return this.componentData.FEDEX_KEY;
            }
            return '*'.repeat(this.componentData.FEDEX_KEY.length) || '******';
        }
    },
    methods: { ...mapActions('settings/shipping/fedex', { fetchData: 'fetchFedex' }) },
    mounted() {
        this.fetchData();
    }
};
</script>

<style lang="scss" scoped>
@import '../../../../mixins/settings/settings-rows';
</style>
