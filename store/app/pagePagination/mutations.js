import { camelizeObject } from "@helpers/functions";
import { genKey } from "@helpers/generators";

export default {
    setItems(state, items) {
        state.items = items;
    },
    addItem(state, item) {
        const { items } = state;
        items.unshift(item);
        if(items.length > state.pagination.perPage) items.splice(items.length - 1, 1);
    },
    updateItem(state, itemData) {
        const itemIndex = state.items.findIndex((item) => item.id === itemData.id);
        if(itemIndex !== -1) state.items.splice(itemIndex, 1, itemData);
    },
    deleteItem(state, id) {
        const itemIndex = state.items.findIndex((item) => item.id === id);
        state.items.splice(itemIndex, 1);
    },
    addNextItem(state, item) {
        if(item) state.items.push(item);
    },
    setPagination(state, pagination) {
        if(!state.id || pagination.path !== state.pagination.path) state.id = genKey("APP_PAGINATION");
        state.pagination = camelizeObject(pagination);
    },
    clearPagination(state) {
        state.id = null;
        state.items = null;
        state.pagination = null;
    },
    recalculatePagination(state, diff) {
        const { pagination } = state;
        pagination.total = pagination.total + diff;
        const expectedLastPage = Math.ceil(pagination.total / pagination.perPage);
        if(expectedLastPage !== pagination.lastPage) pagination.lastPage = expectedLastPage;
    }
};
