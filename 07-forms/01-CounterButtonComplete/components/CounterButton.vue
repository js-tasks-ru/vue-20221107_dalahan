<template>
  <button type="button" @click="btn_click">{{ btn_count }}</button>
</template>

<script>
export default {
  name: 'CounterButton',

  props: {
    count: {
      type: Number,
      default: 0,
    },
  },

  emits: ['update:count'],

  data() {
    return {
      btn_count: this.count,
    };
  },

  watch: {
    count() {
      if (this.btn_count != this.count) {
        this.btn_count = this.count;
      }
    },
  },

  methods: {
    btn_click() {
      this.btn_count += 1;
      this.$emit('update:count', this.btn_count);
    },
  },
};
</script>
