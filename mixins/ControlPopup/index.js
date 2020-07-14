import { decamelize } from "@helpers/functions";

export default {
    props: {
        showPopup: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return { formData: null };
    },
    computed: {
        hasUpdate() {
            return Object.values(this.temp).reduce((has, val) => has || Boolean(val), false);
        }
    },
    methods: {
        setField(name, value) {
            if(this.temp.hasOwnProperty(name)) {
                if(this.storeData && value === this.storeData[name]) this.clearField(name);
                else {
                    this.temp[name] = value;
                    this.formData.set(decamelize(name), value);
                }
            }
        },
        clearField(name, value = null) {
            if(this.temp.hasOwnProperty(name)) {
                this.temp[name] = value;
                this.formData.delete(decamelize(name));
            }
        },
        clearForm() {
            for(let key in this.temp) this.temp[key] = null;
            this.formData = new FormData();
        }
    },
    created() {
        if(process.client) {
            this.formData = new FormData();
        }
    }
};
