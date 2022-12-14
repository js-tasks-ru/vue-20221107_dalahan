<script>
import { h, compile, defineComponent } from 'vue';

export default {
  name: 'TemplateRenderer',

  props: {
    template: {
      type: String,
      required: true,
    },

    bindings: {
      type: Object,
      default: () => ({}),
    },

    components: {
      type: [Object, Array],
      default: () => [],
    },
  },

  render() {
    return h(
      defineComponent({
        components: this.components,
        props: ['bindings'],
        render: compile(this.template),
      }),
      { bindings: this.bindings },
    );
  },
};
</script>
