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

  computed: {
    dc() {
      return defineComponent({
        components: this.components,
        props: ['bindings'],
        render: compile(this.template),
      });
    },
  },

  render() {
    return h(this.dc, { bindings: this.bindings });
  },
};
</script>
