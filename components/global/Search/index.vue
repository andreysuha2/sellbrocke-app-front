<template>
    <app-form
        no-validate
        :use-preloader="false"
        :form-name="name"
        :on-submit="onSearch"
        class="app-search">
        <div class="flex items-center">
            <div class="app-search--input">
                <app-input
                    :value="value"
                    @input="$emit('input', $event)"
                    :placeholder="placeholder"/>
            </div>
            <div class="app-search--submit">
                <md-button
                    type="submit"
                    class="md-button md-primary md-raised">Search</md-button>
            </div>
        </div>
    </app-form>
</template>

<script>
export default {
    props: {
        value: {
            type: String,
            default: ""
        },
        name: {
            type: String,
            required: true
        },
        placeholder: {
            type: String,
            default: "Search"
        },
        onSearch: {
            type: Function,
            required: true
        }
    }
};
</script>

<style lang="scss" scoped>
.app-search {
    &--input {
        flex-basis: 50%;
        margin-right: 20px;
    }
}
</style>
