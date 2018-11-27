<template>
	<vue-scroll class="forgot-password-page align-vertical">
		<div class="form-wrapper align-vertical-middle">
			<div class="form-box card-base card-shadow--extraLarge">
				<img class="image-logo" src="@/assets/images/logo.svg" alt="logo"/>
				<el-form ref="form" :model="user" :rules="rules" @submit.native.prevent="submit">
					<el-form-item label="Nueva Contraseña" prop="password">
						<el-input
							v-model="user.password"
							type="password"
							placeholder="Nueva Contraseña"
						></el-input>
					</el-form-item>
					<el-form-item label="Repetir contraseña" prop="password_repeat">
						<el-input
							v-model="user.password_repeat"
							type="password"
							placeholder="Repetir Contraseña"
						></el-input>
					</el-form-item>
				</el-form>
				<div class="flex text-center center pt-20 pb-10">
					<el-button plain size="small" @click="submit" class="send-btn tada animated">
						CONFIRMAR
					</el-button>
				</div>
			</div>
		</div>
	</vue-scroll>
</template>

<script>
import Vue from 'vue'
import {mapActions} from 'vuex'
export default {
	name: 'ForgotPassword',
	data() {
		return {
			user: {
				password: '',
				password_repeat: '',
				id: this.$route.params.uid,
				cod_confirm: this.$route.params.cc
			},
			rules: {
				password: [
					{
						validator: (rule, value, callback) => {
							if(value.length === 0) callback('Por favor ingresa una nueva contraseña')
							else {
								if(this.user.password_repeat !== '') this.$refs.form.validateField('password_repeat')
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
							else if(value !== this.user.password) callback('Las contraseñas no coinciden')
							else callback()
						},
						trigger: 'blur'
					}
				]
			}
		}
	},
	methods: {
		...mapActions('auth', ['login']),
		submit() {
			this.$refs['form'].validate(async (valid) => {
				if(!valid){
					this.$message.error('Oops. Hubo un error al procesar el formulario.')
				}else{
	        const {data} = await Vue.axios({
	          method: 'POST',
	          url: 'change-pass-mail-user',
	          data: {
							password: this.user.password,
							password_repeat: this.user.password_repeat,
							user_id: this.user.id,
							cod_confirm: this.user.cod_confirm
						}
	        })
					if(data.status === 'ok'){
						this.login({email: data.body.user.email, password: this.user.password}).then((res) => {
							if(res.status === 'ok'){
								this.$router.push('/')
							}else{
								this.$router.push('/login')
							}
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

<style lang="scss">
@import '../../../assets/scss/_variables';

.forgot-password-page {
	background: $text-color;
	margin-left: -30px;
	margin-right: -30px;

	.form-wrapper {
		width: 100%;
	}

	.form-box {
		width: 100%;
		max-width: 340px;
		padding: 30px;
		box-sizing: border-box;
		margin: 20px auto;

		a {
			font-size: 14px;
			color: $text-color-accent;
			text-decoration: none;
			font-weight: 500;
		}

		.image-logo {
			width: 80px;
			margin: 0px auto;
			margin-bottom: 50px;
			display: block;
		}

		.send-btn {
			width: 160px;
		}
	}
}

@media (max-width: 768px) {
	.layout-container .container .view.forgot-password-page {
		margin-left: -5px;
		margin-right: -5px;
		max-width: calc(100% + 10px);
	}
}
</style>
