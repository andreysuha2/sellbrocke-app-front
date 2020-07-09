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
            link: "#",
            icon: "devices",
            children: [
                {
                    key: genKey("MENU_SUB_ITEM"),
                    name: "List",
                    link: "#"
                },
                {
                    key: genKey("MENU_SUB_ITEM"),
                    name: "Conditions",
                    link: "#"
                }
            ]
        },
        {
            key: genKey("MENU_ITEM"),
            name: "Product Grids",
            link: "#",
            icon: "reorder",
            children: [
                {
                    key: genKey("MENU_SUB_ITEM"),
                    name: "Carriers",
                    link: "#"
                },
                {
                    key: genKey("MENU_SUB_ITEM"),
                    name: "Sizes",
                    link: "#"
                }
            ]
        },
        {
            key: genKey("MENU_ITEM"),
            name: "Categories",
            link: "#",
            icon: "view_list",
            children: null
        },
        {
            key: genKey("MENU_ITEM"),
            name: "Companies",
            link: "companies",
            icon: "business",
            children: null
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
        },
        {
            key: genKey("MENU_ITEM"),
            name: "Users",
            link: "#",
            icon: "supervisor_account",
            children: null
        }
    ]
});
