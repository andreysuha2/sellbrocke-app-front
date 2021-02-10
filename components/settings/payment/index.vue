<template>
    <div v-if="componentData" class="settings-rows">

        <div class="settings-rows--row">
            <div class="settings-rows--cell settings-rows--cell--full">
                <span>Paypal client ID</span>
            </div>
            <div class="settings-rows--cell">
                <span>{{ componentData.PAYPAL_CLIENT_ID }}</span>
            </div>
        </div>

        <div class="settings-rows--row">
            <div class="settings-rows--cell settings-rows--cell--secret">
                <span>Paypal client secret</span>
                <md-button class="md-icon-button" @click="showSecret=!showSecret">
                    <md-icon v-if="showSecret">visibility</md-icon>
                    <md-icon v-else>visibility_off</md-icon>
                </md-button>
            </div>
            <div class="settings-rows--cell">
                <span>{{ secret }}</span>
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
import UpdatePopup from "@components/settings/payment/UpdatePopup";

export default {
    components: { 'update-form': UpdatePopup },
    data() {
        return {
            showSecret: false,
            showUpdatePopup: false
        };
    },
    computed: {
        ...mapGetters('settings/payment', { componentData: 'getPayment' }),
        secret() {
            if(this.showSecret) {
                return this.componentData.PAYPAL_CLIENT_SECRET;
            }
            return '*'.repeat(this.componentData.PAYPAL_CLIENT_SECRET.length) || '******';
        }
    },
    methods: { ...mapActions('settings/payment', { fetchData: 'fetchPayment' }) },
    mounted() {
        this.fetchData();
    }
};
</script>

<style lang="scss" scoped>
@import 'mixins/settings/settings-rows.scss';

</style>
