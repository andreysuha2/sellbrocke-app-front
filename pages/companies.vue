<template>
    <app-page title="Companies">
        <template #header>
            <md-button
                @click="showCreatePopup = true"
                class="md-primary md-raised">Add new</md-button>
        </template>
        <create-company
            @closePopup="showCreatePopup = false"
            :show-popup="showCreatePopup"/>
    </app-page>
</template>

<script>
import CreateCompany from "@components/companies/CreationPopup";
export default {
    components: { "create-company": CreateCompany },
    data() {
        return { showCreatePopup: false };
    }
};
</script>
