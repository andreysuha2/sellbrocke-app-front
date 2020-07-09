<template>
    <app-page title="Companies">
        <template #header>
            <md-button
                @click="showCreatePopup = true"
                class="md-primary md-raised">Add new</md-button>
        </template>
        <div>
            <md-empty-state
                v-if="!hasCompanies"
                md-icon="business"
                md-label="Create your first company"
                md-description="You cant create devices without company">
                <md-button
                    @click="showCreatePopup = true"
                    class="md-primary md-raised">Create company</md-button>
            </md-empty-state>
            <div v-else class="companies">
                <div
                    v-for="(companies, i) in companiesLists"
                    :key="i"
                    class="companies--row flex">
                    <company-card
                        class="companies--card"
                        v-for="company in companies"
                        :id="company.id"
                        :key="company.id"
                        :name="company.name"
                        :logo="company.logo"/>
                </div>
            </div>
        </div>
        <create-company
            @closePopup="showCreatePopup = false"
            :show-popup="showCreatePopup"/>
    </app-page>
</template>

<script>
import CreateCompany from "@components/companies/CreationPopup";
import CompanyCard from "@components/companies/CompanyCard";
import { mapGetters } from "vuex";

export default {
    name: "CompaniesPage",
    async fetch({ store }) {
        try {
            await store.dispatch("companies/loadCompanies");
        } catch (e) {
            dl.error(e);
        }
    },
    components: {
        "create-company": CreateCompany,
        "company-card": CompanyCard
    },
    data() {
        return { showCreatePopup: false };
    },
    computed: {
        ...mapGetters("companies", {
            companiesLists: "companiesChunks",
            hasCompanies: "has",
            countCompanies: "count"
        })
    }
};
</script>

<style lang="scss" scoped>
.companies {
    &--row:not(:last-child) {
        margin-bottom: 20px;
    }

    &--card {
        max-width: 10%;

        &:not(:last-child) {
            margin-right: 20px;
        }
    }
}
</style>
