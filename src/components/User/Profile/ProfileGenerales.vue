<template>
	<form-user
		:user="_user"
		:isCreate="false"
		v-on:processFormUser="processUpdate($event)"
		v-on:cancelFormUser="cancelUpdate()"
	></form-user>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
import FormUser from '@/components/User/FormUser'
export default {
	name: 'ProfileEdit',
	components:{
		FormUser
	},
	data() {
		return {
			user: {
				email: '',
				username: '',
				nombre: '',
				apellido: '',
				sucursal_id: 0
			}
		}
	},
	computed:{
		...mapGetters({
			_user: 'auth/user'
		})
	},
	methods: {
		...mapActions({
			_updateUser: 'auth/updateUser'
		}),
		async processUpdate(user) {
			const res = await this._updateUser(user)
			if(res.status === 'ok'){
				this.$message({
					message: 'Usuario actualizado correctamente',
					type: 'success'
				})
			}else{
				this.$message.error('Oops. Hubo un error al procesar el formulario.')
			}
		},
		cancelUpdate(){
			this.$router.push('/')
		},
		resizeLabelPosition() {
			if(window.innerWidth <= 768) {
				this.labelPosition = 'top'
			}
		}
	},
	mounted() {
		this.user = {
			nombre: this.$options.filters.toUpperCaseWords(this._user.nombre),
			apellido: this.$options.filters.toUpperCaseWords(this._user.apellido),
			username: this.$options.filters.toUpperCaseWords(this._user.username),
			email: this._user.email,
			sucursal_id: this._user.sucursal_id
		}
		this.resizeLabelPosition()
		window.addEventListener('resize', this.resizeLabelPosition)

	},
	beforeDestroy() {
		window.removeEventListener('resize', this.resizeLabelPosition)
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
