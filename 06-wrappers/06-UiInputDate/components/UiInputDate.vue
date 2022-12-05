<template>
  <ui-input :type="type" v-bind="$attrs" :modelValue="proxyValue" @change="change">
    <template v-for="slot in Object.keys($slots)" #[slot]>
      <slot :name="slot" />
    </template>
  </ui-input>
</template>

<script>
import UiInput from './UiInput';

export default {
  name: 'UiInputDate',

  components: { UiInput },

  props: {
    type: {
      type: String,
      default: 'date',
      validator: (type) => ['date', 'datetime-local', 'time'].includes(type),
    },
    modelValue: {
      type: Number,
      default: null,
    },
  },

  emits: ['update:modelValue'],

  computed: {
    proxyValue() {
      if (this.modelValue) {
        let dt = new Date(this.modelValue).toISOString();
        switch (this.type) {
          case 'time':
            return this.$attrs['step'] && this.$attrs['step'] % 60 != 0 ? dt.substring(11, 19) : dt.substring(11, 16);
          case 'datetime-local':
            return dt.substring(0, 16);
          default:
            return dt.substring(0, 10);
        }
      } else {
        return '';
      }
    },
  },

  methods: {
    change(event) {
      this.$emit('update:modelValue', event.target.valueAsNumber);
    },
  },
};
</script>
