<template>
    <footer class="app-footer flex justify-center items-center">
        <span>&copy; {{ years }} Sellbroke copyright. All rights reserved.</span>
    </footer>
</template>

<script>
const date = new Date();

export default {
    data() {
        return {
            yearStart: 2020,
            currentYear: date.getFullYear()
        };
    },
    computed: {
        years() {
            return this.currentYear - this.yearStart ? `${this.yearStart} - ${this.currentYear}` : this.yearStart;
        }
    },
    created() {
        const checkYear = (year) => {
            if(year !== this.currentYear) this.currentYear = year;
        };
        setTimeout(() => {
            const date = new Date();
            checkYear(date.getFullYear());
        }, 1000);
    }
};
</script>

<style lang="scss" scoped>
.app-footer {
    padding: 20px;
    background: {
        color: $appBg;
    };
}
</style>
