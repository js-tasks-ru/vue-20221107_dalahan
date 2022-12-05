<template>
  <div class="image-uploader">
    <label
      :class="{ 'image-uploader__preview': true, 'image-uploader__preview-loading': state === 1 }"
      :style="previewImg && `--bg-url: url('${previewImg}')`"
    >
      <span class="image-uploader__text">{{ stateText[state] }}</span>
      <input
        ref="input"
        v-bind="$attrs"
        type="file"
        accept="image/*"
        class="image-uploader__input"
        @change="selectImg"
        @click="click"
      />
    </label>
  </div>
</template>

<script>
export default {
  name: 'UiImageUploader',
  inheritAttrs: false,

  props: {
    preview: String,
    uploader: Function,
  },

  emits: ['select', 'upload', 'error', 'remove'],

  data() {
    return {
      state: this.preview ? 2 : 0,
      stateText: ['Загрузить изображение', 'Загрузка...', 'Удалить изображение'],
      selectedImg: null,
    };
  },

  computed: {
    previewImg() {
      return this.preview || this.selectedImg;
    },
  },

  methods: {
    selectImg() {
      let file = this.$refs['input'].files[0];
      this.selectedImg = URL.createObjectURL(file);
      this.$emit('select', file);
      this.state = 1;
      if (this.uploader) {
        return this.uploader(file)
          .then((result) => {
            this.state = 2;
            this.$emit('upload', result);
          })
          .catch((error) => {
            this.deleteImg();
            this.state = 0;
            this.$emit('error', error);
          });
      } else {
        this.state = 2;
      }
    },
    deleteImg() {
      this.selectedImg = null;
      this.$refs['input'].value = '';
    },
    click(event) {
      if (this.state > 0) {
        event.preventDefault();
        if (this.state === 2) {
          this.deleteImg();
          this.state = 0;
          this.$emit('remove');
        }
      }
    },
  },
};
</script>

<style scoped>
.image-uploader {
}

.image-uploader__input {
  opacity: 0;
  height: 0;
}

.image-uploader__preview {
  --bg-url: var(--default-cover);
  background-size: cover;
  background-position: center;
  background-image: linear-gradient(0deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), var(--bg-url);
  border: 2px solid var(--blue-light);
  border-radius: 8px;
  transition: 0.2s border-color;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 512px;
  height: 228px;
}

.image-uploader__text {
  color: var(--white);
  font-family: 'Nunito', sans-serif;
  font-weight: 600;
  font-size: 20px;
  line-height: 28px;
}

.image-uploader__preview:hover {
  border-color: var(--blue);
}

.image-uploader__preview.image-uploader__preview-loading {
  cursor: no-drop;
}
</style>
