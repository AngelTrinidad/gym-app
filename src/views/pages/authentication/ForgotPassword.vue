<template>
	<vue-scroll class="forgot-password-page align-vertical">
		<div class="form-wrapper align-vertical-middle">
			<div class="form-box card-base card-shadow--extraLarge">
				<img class="image-logo" src="@/assets/images/logo.svg" alt="logo"/>
				<div class="right-box box grow">
					<p>
						Especifica el correo electrónico de tu usuario. Te enviaremos un link(enlace)
						donde podrás cambiar tu contraseña.
					</p>
				</div>
				<el-form ref="formLogin" :model="user" :rules="rules" @submit.native.prevent="sendLink">
					<el-form-item label="E-mail" prop="email">
						<el-input
							v-model="user.email"
							type="email"
							placeholder="E-mail"
						></el-input>
					</el-form-item>
					<div class="flex text-center center pt-20 pb-10">
						<el-button plain size="small" class="send-btn tada animated" @click="sendLink">
							ENVIAR LINK
						</el-button>
					</div>
				</el-form>
			</div>
		</div>
	</vue-scroll>
</template>

<script>
import {mapActions} from 'vuex'
export default {
	name: 'ForgotPassword',
	data() {
		return {
			user: {
				email: ''
			},
			rules: {
				email: [
					{required: true, message: 'Por favor ingresa el email', trigger: 'blur'},
					{type: 'email', message: 'Por favor ingresa un email válido', trigger: 'blur'}
				]
			}
		}
	},
	methods: {
		...mapActions({
			_forgoutPass: 'auth/forgoutPass'
		}),
		sendLink() {
			this.$refs['formLogin'].validate(async (valid) => {
				if(!valid){
					this.$message.error('Oops. Hubo un error al procesar el formulario.')
				}else{
					const res = await this._forgoutPass(this.user.email)
					if(res.status === 'ok'){
						this.$message({
		          message: 'Te enviamos un email con el enlace para reestablecer tu password',
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
