export default {
    loadCompanies(state, companies) {
        state.companies = companies;
    },
    addCompany(state, company) {
        state.companies.push(company);
    }
};
