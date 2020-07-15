import { decamelize } from "@helpers/functions";

export default {
    props: {
        showPopup: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            formData: null,
            temp: null
        };
    },
    computed: {
        hasUpdate() {
            return Object.values(this.temp).reduce((has, val) => has || Boolean(val), false);
        }
    },
    methods: {
        setField(name, value, asString = false) {
            if(this.temp.hasOwnProperty(name)) {
                if(this.storeData && value === this.storeData[name]) this.clearField(name);
                else {
                    this.temp[name] = value;
                    if(asString) value = JSON.stringify(value);
                    this.formData.set(decamelize(name), value);
                }
            }
        },
        clearField(name, value = null) {
            if(this.temp.hasOwnProperty(name)) {
                this.temp[name] = value || this.tempDefault[name];
                this.formData.delete(decamelize(name));
            }
        },
        clearForm() {
            this.temp = this.tempDefault;
            this.formData = new FormData();
        }
    },
    created() {
        this.temp = this.tempDefault;
        if(process.client) {
            this.formData = new FormData();
        }
    }
};
