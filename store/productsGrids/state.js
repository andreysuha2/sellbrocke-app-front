import { genKey } from "@helpers/generators";

export default () => ({
    types: [
        { value: "carrier", name: "Carrier", key: genKey("PRODUCTS_GRIDS_TYPE") },
        { value: "size", name: "Size", key: genKey("PRODUCTS_GRIDS_TYPE") }
    ]
});
