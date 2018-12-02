<template lang="html">
  <el-dialog
    :show-close="true"
    :visible="visible"
    @open="openDialog"
    @close="$emit('cancelCrop')"
    title="Elegir imagen en miniatura"
    center
    :append-to-body="anidado"
  >
    <el-row>
      <el-col>
        <vue-cropper
          ref="cropper"
          :src="src"
          alt="Imagen de perfil"
          :view-mode="2"
          drag-mode="move"
          :background="false"
          :aspectRatio="1/1"
          :toggleDragModeOnDblclick="false"
          :auto-crop-area="0.5"
          :min-container-width="250"
          :min-container-height="180"

          :rotatable="true"
          :img-style="{ 'width': '400px', 'height': '300px' }"
        >
        </vue-cropper>
      </el-col>
    </el-row>
    <span slot="footer">
      <el-button type="primary" @click="processCrop">Confirmar</el-button>
      <el-button @click="$emit('cancelCrop')">Cancelar</el-button>
    </span>
  </el-dialog>
</template>

<script>
import VueCropper from 'vue-cropperjs'
export default {
  name: 'CropImage',
  props: {
    img: {
      required: true
    },
    visible: {
      type: Boolean,
      default: false
    },
    anidado: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      src: ''
    }
  },
  methods: {
    openDialog(){
      const reader = new FileReader()
      reader.onload = (event) => {
        this.src = event.target.result
        this.$refs.cropper.replace(event.target.result)
      }
      reader.readAsDataURL(this.img)
    },
    processCrop(){
      this.$refs.cropper.getCroppedCanvas().toBlob(blob => {
        this.$emit('cropped', blob)
      })
    }
  }
}
</script>
<style lang="scss" scoped>
  img {
    max-width: 100%; /* This rule is very important, please do not ignore this! */
  }
</style>
