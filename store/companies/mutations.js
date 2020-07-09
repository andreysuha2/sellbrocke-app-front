export default {
    loadCompanies(state, companies) {
        state.companies = companies;
    },
    addCompany(state, company) {
        state.companies.push(company);
    },
    updateCompany(state, updatedCompany) {
        let companyIndex = state.companies.findIndex((company) => company.id === updatedCompany.id);
        if(companyIndex !== -1) state.companies.splice(companyIndex, 1, updatedCompany);
    },
    removeCompany(state, id) {
        let companyIndex = state.companies.findIndex((company) => company.id === id);
        if(companyIndex !== -1) state.companies.splice(companyIndex, 1);
    }
};
