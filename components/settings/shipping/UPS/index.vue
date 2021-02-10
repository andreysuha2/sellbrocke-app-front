<template>
    <div v-if="componentData" class="settings-rows">

        <div class="settings-rows--row">
            <div class="settings-rows--cell">
                <span>UPS url</span>
            </div>
            <div class="settings-rows--cell">
                <span>{{ componentData.UPS_URL }}</span>
            </div>
        </div>

        <div class="settings-rows--row">
            <div class="settings-rows--cell">
                <span>UPS production url</span>
            </div>
            <div class="settings-rows--cell">
                <span>{{ componentData.UPS_PRODUCTION_URL }}</span>
            </div>
        </div>

        <div class="settings-rows--row">
            <div class="settings-rows--cell">
                <span>UPS user id</span>
            </div>
            <div class="settings-rows--cell">
                <span>{{ componentData.UPS_USER_ID }}</span>
            </div>
        </div>

        <div class="settings-rows--row">
            <div class="settings-rows--cell">
                <span>UPS shipper number</span>
            </div>
            <div class="settings-rows--cell">
                <span>{{ componentData.UPS_SHIPPER_NUMBER }}</span>
            </div>
        </div>

        <div class="settings-rows--row">
            <div class="settings-rows--cell settings-rows--cell--secret">
                <span>UPS password</span>
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
            <div class="settings-rows--cell settings-rows--cell--secret">
                <span>UPS access key</span>
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
            <div class="settings-rows--cell">
                <span>UPS sandbox</span>
            </div>
            <div class="settings-rows--cell">
                <span>{{ sandbox }}</span>
            </div>
        </div>

        <template v-if="sandbox">
            <div class="settings-rows--row">
                <div class="settings-rows--cell">
                    <span>Ups sandbox url</span>
                </div>
                <div class="settings-rows--cell">
                    <span>{{ componentData.UPS_SANDBOX_URL }}</span>
                </div>
            </div>
        </template>

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
import UpdatePopup from "@components/settings/shipping/UPS/UpdatePopup";

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
        ...mapGetters('settings/shipping/ups', { componentData: 'getUps' }),
        password() {
            if(this.showPassword) {
                return this.componentData.UPS_PASSWORD;
            }
            return '*'.repeat(this.componentData.UPS_PASSWORD.length) || '******';
        },
        key() {
            if(this.showKey) {
                return this.componentData.UPS_ACCESS_KEY;
            }
            return '*'.repeat(this.componentData.UPS_ACCESS_KEY.length) || '******';
        },
        sandbox() {
            return this.componentData.UPS_SANDBOX === true || this.componentData.UPS_SANDBOX === 'true';
        }
    },
    methods: { ...mapActions('settings/shipping/ups', { fetchData: 'fetchUps' }) },
    mounted() {
        this.fetchData();
    }
};
</script>

<style lang="scss" scoped>
@import '../../../../mixins/settings/settings-rows';
</style>
