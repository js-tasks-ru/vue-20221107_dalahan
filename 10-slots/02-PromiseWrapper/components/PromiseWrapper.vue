<template>
  <slot v-if="state == states.pending" name="pending"></slot>
  <slot v-else-if="state == states.fulfilled" name="fulfilled" :result="prom_result"></slot>
  <slot v-else name="rejected" :error="prom_result"></slot>
</template>

<script>
export default {
  name: 'PromiseWrapper',

  props: {
    promise: {
      type: Promise,
      required: true,
    },
  },

  data() {
    return {
      states: {
        pending: 'pending',
        fulfilled: 'fulfilled',
        rejected: 'rejected',
      },
      state: null,
      result: null,
    };
  },

  watch: {
    promise: {
      immediate: true,
      handler() {
        this.state = this.states.pending;
        this.promise
          .then((result) => {
            this.state = this.states.fulfilled;
            this.prom_result = result;
          })
          .catch((error) => {
            this.state = this.states.rejected;
            this.prom_result = error;
          });
      },
    },
  },
};
</script>
