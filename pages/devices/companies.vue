<template>
    <app-page title="Companies">
        <template #header>
            <md-button
                @click="showCreatePopup = true"
                class="md-primary md-raised">Add new</md-button>
        </template>
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
                class="companies--row flex flex-wrap">
                <company-card
                    class="companies--card"
                    v-for="company in companies"
                    :key="company.id"
                    @click.native="selectCompany(company.id)"
                    v-bind="company"/>
            </div>
        </div>
        <create-company
            @closePopup="showCreatePopup = false"
            :show-popup="showCreatePopup"/>
        <control-company
            @closePopup="closeCompany"
            :show-popup="hasControlled"/>
    </app-page>
</template>

<script>
import CreateCompany from "@components/companies/CreationPopup";
import ControlCompany from "@components/companies/ControlPopup";
import CompanyCard from "@components/companies/CompanyCard";
import { mapGetters, mapMutations } from "vuex";

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
        "control-company": ControlCompany,
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
        }),
        ...mapGetters("companies/companyControl", [ "hasControlled" ])
    },
    methods: {
        ...mapMutations("companies/companyControl", {
            selectCompany: "startControl",
            closeCompany: "stopControl"
        })
    },
    created() {
        if(this.$route.query.company) {
            const { company: id } = this.$route.query;
            this.selectCompany(Number(id));
        }
    }
};
</script>

<style lang="scss" scoped>
.companies {
    &--row:not(:last-child) {
        margin-bottom: 20px;
    }

    &--card {
        width: 100%;
        max-width: calc((100% - 90px) / 4);

        &:not(:last-child) {
            margin-right: 20px;
        }
    }
}
</style>
