import { createApp } from './vendor/vue.esm-browser.js';
import { defineComponent } from 'vue';

const App = defineComponent({
  name: 'App',
  data() {
    return {
      num1: 0,
      num2: 0,
      oper: 'sum',
    };
  },
  computed: {
    result() {
      return this.calc();
    },
  },
  methods: {
    calc() {
      let res = 0;
      switch (this.oper) {
        case 'sum':
          res = this.num1 + this.num2;
          break;
        case 'subtract':
          res = this.num1 - this.num2;
          break;
        case 'multiply':
          res = this.num1 * this.num2;
          break;
        case 'divide':
          res = this.num1 / this.num2;
          break;
      }
      return res;
    },
  },
});

const app = createApp(App);
const vm = app.mount('#app');
window.vm = vm;
