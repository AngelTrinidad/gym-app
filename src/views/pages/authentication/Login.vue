<template>
	<vue-scroll class="login-page align-vertical">
		<div class="form-wrapper align-vertical-middle">
			<div class="form-box card-base card-shadow--extraLarge">
				<img class="image-logo" src="@/assets/images/logo.svg" alt="logo"/>
				<el-form ref="formLogin" :model="user" :rules="rules" @submit.native.prevent="login">
					<el-form-item label="E-mail" prop="email">
						<el-input
							v-model="user.email"
							type="email"
							placeholder="E-mail"
						></el-input>
					</el-form-item>
					<el-form-item label="Password" prop="password">
						<el-input
							v-model="user.password"
							type="password"
							placeholder="Password"
						></el-input>
					</el-form-item>
					<el-row>
						<el-col :sm="24" :md="8" :lg="10">
							<div class="box grow"><el-checkbox>Recuérdame</el-checkbox></div>
						</el-col>
						<el-col :sm="24" :md="16" :lg="14" class="text-right">
							<router-link to="/forgot-password">Olvidaste tu password?</router-link>
						</el-col>
					</el-row>
					<div class="flex text-center center pt-30 pb-10">
						<el-button plain size="small" @click="login" class="login-btn tada animated">
							LOGIN
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
	name: 'Login',
	data() {
		return {
			user: {
				email: '96trinidad@gmail.com',
				password: 'Tulina1997',
			},
			rules: {
				email: [
					{required: true, message: 'Por favor ingresa el email', trigger: 'blur'},
					{type: 'email', message: 'Por favor ingresa un email válido', trigger: 'blur'}
				],
				password: [
					{required: true, message: 'Por favor ingresa el password', trigger: 'blur'}
				]
			}
		}
	},
	methods: {
		...mapActions({
			_login: 'auth/login'
		}),
		login() {
			this.$refs['formLogin'].validate((valid) => {
				if(!valid){
					this.$message.error('Oops. Hubo un error al procesar el formulario.')
				}else{
					this._login(this.user).then((res) => {
						if(res.status === 'ok'){
							this.$router.push('/')
						}else{
							this.$message.error('Credenciales incorrectos')
						}
					})
				}
			})
		}
	}
}
</script>

<style lang="scss">
@import '../../../assets/scss/_variables';

.login-page {
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
			margin-bottom: 30px;
			display: block;
		}

		.login-btn ,
		.social-btn {
			width: 160px;

			&.google {
				margin-bottom: 10px;
				background-color: #d73d32;
				color: white;

				&:hover {
					border-color: #d73d32;
				}
			}
			&.facebook {
				background-color: #3f5c9a;
				color: white;

				&:hover {
					border-color: #3f5c9a;
				}
			}
		}

		.signin-box {
			font-size: 14px;
		}
	}
}

@media (max-width: 768px) {
	.layout-container .container .view.login-page {
		margin-left: -5px;
		margin-right: -5px;
		max-width: calc(100% + 10px);
	}
}
</style>
