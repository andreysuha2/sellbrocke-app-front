<template>
    <div v-if="componentData" class="settings-rows">

        <div class="settings-rows--row">
            <div class="settings-rows--cell">
                <span>Receiver attention name</span>
            </div>
            <div class="settings-rows--cell">
                <span>{{ componentData.RECEIVER_ATTENTION_NAME }}</span>
            </div>
        </div>

        <div class="settings-rows--row">
            <div class="settings-rows--cell">
                <span>Receiver name</span>
            </div>
            <div class="settings-rows--cell">
                <span>{{ componentData.RECEIVER_NAME }}</span>
            </div>
        </div>

        <div class="settings-rows--row">
            <div class="settings-rows--cell">
                <span>Admin email</span>
            </div>
            <div class="settings-rows--cell">
                <span>{{ componentData.ADMIN_EMAIL }}</span>
            </div>
        </div>

        <div class="settings-rows--row">
            <div class="settings-rows--cell">
                <span>Office phone</span>
            </div>
            <div class="settings-rows--cell">
                <span>{{ componentData.OFFICE_PHONE }}</span>
            </div>
        </div>

        <div class="settings-rows--row">
            <div class="settings-rows--cell">
                <span>Office fax</span>
            </div>
            <div class="settings-rows--cell">
                <span>{{ componentData.OFFICE_FAX }}</span>
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
import { mapActions, mapGetters } from "vuex";
import UpdatePopup from "@components/settings/common/UpdatePopup";

export default {
    components: { 'update-form': UpdatePopup },
    data() {
        return { showUpdatePopup: false };
    },
    computed: { ...mapGetters('settings/common', { componentData: 'getCommon' }) },
    methods: { ...mapActions('settings/common', { fetchData: 'fetchCommon' }) },
    mounted() {
        this.fetchData();
    }
};
</script>

<style lang="scss" scoped>
@import 'mixins/settings/settings-rows.scss';
</style>
