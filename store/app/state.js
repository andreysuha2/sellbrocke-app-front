import { genKey } from "@helpers/generators";

export default () => ({
    menuList: [
        {
            key: genKey("MENU_ITEM"),
            name: "Merchants",
            link: "merchants",
            icon: "store",
            children: null
        },
        {
            key: genKey("MENU_ITEM"),
            name: "Customers",
            link: "customers",
            icon: "people",
            children: null
        },
        {
            key: genKey("MENU_ITEM"),
            name: "Orders",
            link: "#",
            icon: "assignment",
            children: [
                {
                    key: genKey("MENU_SUB_ITEM"),
                    name: "List",
                    link: "#"
                },
                {
                    key: genKey("MENU_SUB_ITEM"),
                    name: "Custom quotes",
                    link: "#"
                }
            ]
        },
        {
            key: genKey("MENU_ITEM"),
            name: "Devices",
            link: "devices",
            icon: "devices",
            children: [
                {
                    key: genKey("MENU_SUB_ITEM"),
                    name: "Devices",
                    link: "devices"
                },
                {
                    key: genKey("MENU_SUB_ITEM"),
                    name: "Products grid",
                    link: "devices-products-grid"
                },
                {
                    key: genKey("MENU_SUB_ITEM"),
                    name: "Companies",
                    link: "devices-companies"
                },
                {
                    key: genKey("MENU_SUB_ITEM"),
                    name: "Categories",
                    link: "devices-categories"
                },
                {
                    key: genKey("MENU_SUB_ITEM"),
                    name: "Defects",
                    link: "devices-defects"
                }
            ]
        },
        {
            key: genKey("MENU_ITEM"),
            name: "Shipping",
            link: "#",
            icon: "local_shipping",
            children: null
        },
        {
            key: genKey("MENU_ITEM"),
            name: "Settings",
            link: "#",
            icon: "settings",
            children: null
        }
    ]
});
