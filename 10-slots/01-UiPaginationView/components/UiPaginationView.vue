<template>
  <div class="pagination-container">
    <slot v-for="item in filteredItems" :item="item"></slot>
  </div>
</template>

<script>
export default {
  name: 'UiPaginationView',

  props: {
    page: {
      type: Number,
      required: true,
      validator: (value) => value > 0,
    },
    perPage: {
      type: Number,
      required: true,
      validator: (value) => value > 0,
    },
    items: {
      type: Array,
      required: true,
    },
  },

  computed: {
    start() {
      return (this.page - 1) * this.perPage;
    },
    end() {
      let tmp = this.start + this.perPage;
      return tmp < this.items.length ? tmp : this.items.length;
    },
    filteredItems() {
      return this.items.slice(this.start, this.end);
    },
  },
};
</script>

<style></style>
