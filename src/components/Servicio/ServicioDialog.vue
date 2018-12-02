<template>
	<el-dialog
		:show-close="true"
		:visible="visible"
		@open="openDialog"
		@close="closeDialog"
		:title="isCreate ? 'Crear Servicio' : 'Actualizar Servicio'"
		center
	>
		<div class="form-box">
			<el-form
				:model="servicio"
				ref="form"
				:rules="rules"
				label-position="top"
			>
				<h3>Datos generales</h3>
				<el-row>
					<el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p">
						<el-form-item label="Detalle" prop="detalle">
							<el-input v-model="servicio.detalle"/>
						</el-form-item>
					</el-col>
					<el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p">
						<el-form-item label="Precio" prop="precio">
							<el-input-number
								controls-position="right"
								:min="0"
								:step="500"
								v-model.number="servicio.precio"
							/>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
		</div>
		<span slot="footer" class="dialog-footer">
			<el-button type="primary" @click="validateBeforeSubmit">
				{{isCreate ? 'Crear' : 'Actualizar'}}
			</el-button>
			<el-button @click="closeDialog">Cancelar</el-button>
			<el-button
				type="danger"
				v-show="!isCreate"
				@click="$emit('deleteServicio', servicio)"
				class="button-right"
				icon="el-icon-delete"
				circle
			></el-button>
	  </span>
	</el-dialog>
</template>

<script>
export default {
	name: 'ServicioDialog',
	props: {
		servicio: {
			required: true,
			type: Object
		},
		visible: {
			type: Boolean,
			default: false
		},
		title: {
			type: String,
			default: 'Crear Producto'
		},
		isCreate: {
			type: Boolean,
			default: true
		}
	},
	data() {
		return {
			rules: {
				detalle: [
					{required: true, message: 'Por favor ingresa un detalle', trigger: 'blur'}
				],
				precio: [
					{required: true, message: 'Por favor ingresa un precio', trigger: 'blur'},
					{type: 'number', message: 'Por favor ingresa un número', trigger: 'blur'}
				]
			}
		}
	},
	methods: {
		validateBeforeSubmit(){
			this.$refs['form'].validate(async (valid) => {
				if(!valid){
					this.$message.error('Oops. Hubo errores de validación.')
				}else{
					this.$emit('processFormServicio', this.servicio)
				}
			})
		},
		openDialog(){
			if(this.$refs['form']) this.$refs['form'].resetFields()
		},
		closeDialog(){
			this.$emit('cancelFormServicio')
		}
	}
}
</script>
<style lang="scss" scoped>
.col-p {
	padding: 0 10px;
	box-sizing: border-box;
}
.button-right {
	float: right;
}
</style>
