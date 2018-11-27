<template lang="html">
  <div class="page-profile-edit">
		<div class="right-box box grow"><h3>Cambiar contraseña</h3></div>
		<el-form ref="form" :model="form" :rules="rules" label-width="120px" label-position="top">
			<el-col>
					<el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p">
						<el-form-item label="Nueva contraseña" prop="password" >
						<el-input
							v-model="form.password"
							type="password"
						></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p">
						<el-form-item label="Repetir contraseña" prop="password_repeat" >
						<el-input
							v-model="form.password_repeat"
							type="password"
						></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="24"  class="col-p">
						<el-button type="primary" @click="onSubmit">Cambiar</el-button>
					</el-col>
			</el-col>
		</el-form>
	</div>
</template>

<script>
import {mapActions} from 'vuex'
export default {
  data() {
    return {
      form: {
				password: '',
        password_repeat: ''
			},
      rules: {
				password: [
					{
						validator: (rule, value, callback) => {
							if(value.length === 0) callback('Por favor ingresa una nueva contraseña')
							else {
								if(this.form.password_repeat !== '') this.$refs.form.validateField('password_repeat')
								callback()
							}
						},
						trigger: 'blur'
					}
				],
				password_repeat: [
					{
						validator: (rule, value, callback) => {
							if(value.length === 0) callback('Por favor repite tu nueva contraseña')
							else if(value !== this.form.password) callback('Las contraseñas no coinciden')
							else callback()
						},
						trigger: 'blur'
					}
				]
			}
    }
  },
  methods: {
    ...mapActions({
      _changePass: 'auth/changePass'
    }),
    onSubmit(){
      this.$refs['form'].validate(async (valid) => {
				if(!valid){
					this.$message.error('Oops. Hubo un error al procesar el formulario.')
				}else{
	        const res = await this._changePass({password: this.form.password, password_repeat: this.form.password_repeat})
          if(res.status === 'ok'){
            this.$message({
		          message: 'Password actualizado correctamente',
		          type: 'success'
		        })
					}else{
						this.$message.error('Oops. Hubo un error al procesar el formulario.')
					}
				}
			})
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
</style>
