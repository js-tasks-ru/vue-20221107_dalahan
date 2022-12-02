<template>
  <a v-if="tag == 'a'" class="link"> <slot /> </a>
  <router-link v-else :props="$attrs"> <slot /> </router-link>
</template>

<script>
export default {
  name: 'UiLink',

  props: {
    tag: {
      type: String,
      default: 'router-link',
    }
  },

};
</script>

<style scoped>
.link {
  color: var(--blue);
  text-decoration: none;
}

.link:hover {
  text-decoration: underline;
}
</style>
