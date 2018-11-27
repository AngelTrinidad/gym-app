<template lang="html">
  <div class="page-profile-edit">
		<el-form ref="form" :model="sucursal" label-width="120px" label-position="top" :rules="rules">
			<el-col>
				<el-col class="col-p">
					<el-form-item label="Detalle" prop="detalle">
						<el-input v-model="sucursal.detalle"/>
					</el-form-item>
				</el-col>
				<el-col class="col-p">
					<el-form-item label="Direccion" prop="direccion">
						<el-input v-model="sucursal.direccion "/>
					</el-form-item>
				</el-col>
			</el-col>
			<el-col>
				<el-col class="col-p">
					<el-form-item label="Contacto" prop="contacto">
						<el-input v-model="sucursal.contacto"/>
					</el-form-item>
				</el-col>
			</el-col>

			<el-col class="col-p">
				<el-form-item>
						<el-button
              type="primary"
              @click="validateBeforeSubmit"
            >
							{{isCreate ? 'Crear' : 'Actualizar'}}
						</el-button>
						<el-button @click="cancelSubmit">Cancelar</el-button>
				</el-form-item>
			</el-col>
		</el-form>
	</div>
</template>

<script>
export default {
  props:{
    sucursal: {
      type: Object,
      required: true
    },
    isCreate:{
      type: Boolean,
      default: true
    }
  },
  data(){
    return {
      rules: {
        detalle: [
					{required: true, message: 'Por favor ingresa un nombre', trigger: 'blur'}
				],
        direccion: [
          {required: true, message: 'Por favor ingresa una dirección', trigger: 'blur'}
        ],
        contacto: [
          {required: true, message: 'Por favor ingresa un contacto', trigger: 'blur'}
        ]
      }
    }
  },
  methods:{
    validateBeforeSubmit(){
      this.$refs['form'].validate(async (valid) => {
				if(!valid){
					this.$message.error('Oops. Hubo errores de validación.')
				}else{
					this.$emit('processFormSucursal', this.sucursal)
				}
			})
    },
    cancelSubmit(){
      this.$emit('cancelFormSucursal')
    }
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
