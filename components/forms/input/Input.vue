<template>
    <md-field :class="classList.field">
        <label v-if="placeholder">{{ placeholder }}</label>
        <md-input
            :data-vv-name="formValidateName"
            v-validate
            v-bind="$attrs"
            :data-vv-rules="validateRules"
            :data-vv-as="validateFieldName"
            :type="type"
            :required="required"
            @input="removeErrorDisplayed()"
            v-model="val"></md-input>
        <span
            v-if="subText"
            class="md-helper-text">{{ subText }}</span>
        <span class="md-error">{{ errors.first(formValidateName) }}</span>
    </md-field>
</template>

<script>
import Mixin from "./mixin";

export default { mixins: [ Mixin ] };
</script>
