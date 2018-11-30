<template lang="html">
  <div class="page-profile-edit">
		<div class="right-box box grow"><h3>Foto de perfil</h3></div>
    <el-upload
      class="avatar-uploader"
      :action="action"
      :headers="headers"
      name="photo"
      :show-file-list="false"
      :on-success="uploadSuccess"
      :before-upload="uploadBefore">
      <img v-if="_user.img_perfil" :src="`${$store.state.apiImages}users/${_user.img_perfil}`" class="avatar">
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
	</div>
</template>

<script>
import VueCropper from 'vue-cropperjs'
import {mapGetters} from 'vuex'
export default {
  data() {
    return {
      action: `${this.$store.state.apiURL}upload-profile-photo-user`,
      headers: {
        Authorization: `Bearer ${window.localStorage.getItem('_token')}`
      }
    }
  },
  computed: {
    ...mapGetters({
      _user: 'auth/user'
    })
  },
  methods: {
    uploadSuccess(res, file){
      if(res.status === 'ok'){
        this.$store.commit('auth/setImageProfileUser', res.body.user.img_perfil)
      }else{
        this.$message.error('Oops. Hubo un error al subir el archivo')
      }
    },
    uploadBefore(file){
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('La imagen debe estar en formato JPG')
      }
      if (!isLt2M) {
        this.$message.error('La imagen excede los 2MB!')
      }

      return isJPG && isLt2M;
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../../../assets/scss/_variables';

.page-profile-edit {
	.label-switch-box {
		display: block;
		clear: both;
		width: 100%;
		text-align: right;
		margin-bottom: 20px;
	}
	.col-p {
		padding: 0 10px;
		box-sizing: border-box;
	}
	.select-wide {
		width: 100%;
	}
}
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
