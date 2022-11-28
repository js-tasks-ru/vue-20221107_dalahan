<template>
  <div class="toasts">
    <div v-for="toast in toastArr" class="toast" :class="toast.class">
      <ui-icon class="toast__icon" :icon="toast.icon" />
      <span>{{ toast.message }}</span>
    </div>
  </div>
</template>

<script>
import UiIcon from './UiIcon.vue';

export default {
  name: 'TheToaster',

  components: { UiIcon },

  data() {
    return {
      toastArr: [],
      toastType: {
        success: {
          class: 'toast_success',
          icon: 'check-circle',
          timeout: 5000,
        },
        error: {
          class: 'toast_error',
          icon: 'alert-circle',
          timeout: 5000,
        },
      },
    };
  },

  methods: {
    addToast(message, type) {
      let item = {
        id: Date.now(),
        message: message,
        class: this.toastType[type].class,
        icon: this.toastType[type].icon,
      };
      this.toastArr.push(item);
      setTimeout(() => {
        this.removeToast(item.id);
      }, this.toastType[type].timeout);
    },
    removeToast(id) {
      this.toastArr = this.toastArr.filter((toast) => toast.id !== id);
    },
    success(message) {
      this.addToast(message, 'success');
    },
    error(message) {
      this.addToast(message, 'error');
    },
  },
};
</script>

<style scoped>
.toasts {
  position: fixed;
  bottom: 8px;
  right: 8px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  white-space: pre-wrap;
  z-index: 999;
}

@media all and (min-width: 992px) {
  .toasts {
    bottom: 72px;
    right: 112px;
  }
}

.toast {
  display: flex;
  flex: 0 0 auto;
  flex-direction: row;
  align-items: center;
  padding: 16px;
  background: #ffffff;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  border-radius: 4px;
  font-size: 18px;
  line-height: 28px;
  width: auto;
}

.toast + .toast {
  margin-top: 20px;
}

.toast__icon {
  margin-right: 12px;
}

.toast.toast_success {
  color: var(--green);
}

.toast.toast_error {
  color: var(--red);
}
</style>
