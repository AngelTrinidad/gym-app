<template>
	<div class="page-profile-edit">
		<div class="right-box box grow"><h3>Datos generales</h3></div>
		<el-form ref="form" :model="user" label-width="120px" label-position="top" :rules="rules">
			<el-col>
				<el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p">
					<el-form-item label="Usuario" prop="username">
						<el-input v-model="user.username"/>
					</el-form-item>
				</el-col>
				<el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p">
					<el-form-item label="Email" prop="email">
						<el-input v-model="user.email" type="email" :disabled="!isCreate"/>
					</el-form-item>
				</el-col>
			</el-col>
			<el-col>
				<el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p">
					<el-form-item label="Nombre" prop="nombre">
						<el-input v-model="user.nombre"/>
					</el-form-item>
				</el-col>
				<el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p">
					<el-form-item label="Apellido" prop="apellido">
						<el-input v-model="user.apellido"/>
					</el-form-item>
				</el-col>
			</el-col>

			<el-col>
				<el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p">
					<el-form-item label="Sucursal">
						<el-select
							class="select-wide"
							v-model="user.sucursal_id"
							placeholder="Seleccione una sucursal"
						>
							<el-option
								v-for="sucursal in sucursales"
								:key="sucursal.value"
								:label="sucursal.label | toUpperCaseWords"
								:value="sucursal.value"
							></el-option>
						</el-select>
					</el-form-item>
				</el-col>
			</el-col>

			<el-col class="col-p">
				<el-form-item>
						<el-button type="primary" @click="validateBeforeSubmit">
							{{isCreate ? 'Crear' : 'Actualizar'}}
						</el-button>
						<el-button @click="cancelSubmit">Cancelar</el-button>
				</el-form-item>
			</el-col>
		</el-form>
	</div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
export default {
	name: 'form-user',
  props: {
    user: {
      required: true,
      type: Object
    },
		isCreate: {
			type: Boolean,
			default: true
		}
  },
  data() {
		return {
			sucursales: [],
			rules: {
				email: [
					{required: true, message: 'Por favor ingresa el email', trigger: 'blur'},
					{type: 'email', message: 'Por favor ingresa un email válido', trigger: 'blur'},
					{validator: async (rule, value, callback) => {
						if(value.length === 0){
							callback()
						}else{
							let body = {
								field: 'email',
								value
							}
							if(!this.isCreate) body.exclude = {
								field: 'id',
								value: this.user.id
							}
							const res = await this._verify(body)
							if(res.status === 'ok' && res.body.users.length > 0){
								callback(new Error('Email ya existente, prueba otro.'))
							}else{
								callback()
							}
						}
					}, trigger: 'blur'}
				],
				username: [
					{required: true, message: 'Por favor ingresa un usuario', trigger: 'blur'},
					{validator: async (rule, value, callback) => {
						if(value.length === 0){
							callback()
						}else{
							const res = await this._verify(
								{
									field: 'username',
									value,
									exclude: {
										field: 'id',
										value: this.user.id
									}
								})
							if(res.status === 'ok' && res.body.users.length > 0){
								callback(new Error('Usuario ya existente, prueba otro.'))
							}else{
								callback()
							}
						}
					}, trigger: 'blur'}
				],
				nombre: [
					{required: true, message: 'Por favor ingresa un nombre', trigger: 'blur'}
				],
				apellido: [
					{required: true, message: 'Por favor ingresa un apellido', trigger: 'blur'}
				]
			}

		}
	},
	computed:{
		...mapGetters({
			_sucursales: 'sucursal/activos'
		})
	},
	methods: {
		...mapActions({
			_verify: 'auth/verify'
		}),
    validateBeforeSubmit(){
      this.$refs['form'].validate(async (valid) => {
				if(!valid || !this.user.sucursal_id){
					this.$message.error('Oops. Hubo errores de validación.')
				}else{
					this.$emit('processFormUser', this.user)
				}
			})
    },
    cancelSubmit(){
      this.$emit('cancelFormUser')
    },
		resizeLabelPosition() {
			if(window.innerWidth <= 768) {
				this.labelPosition = 'top'
			}
		}
	},
	mounted() {
    this.$store.dispatch('sucursal/get').then(() => {
      this._sucursales
        .forEach(sucursal => this.sucursales.push({
          value: sucursal.id,
          label: sucursal.detalle
          })
        )
    })
		this.resizeLabelPosition()
		window.addEventListener('resize', this.resizeLabelPosition)

	},
	beforeDestroy() {
		window.removeEventListener('resize', this.resizeLabelPosition)
	}
}
</script>

<style lang="scss" scoped>
@import '../../assets/scss/_variables';

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
