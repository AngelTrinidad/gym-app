<template>
	<div class="page-layout-blank scrollable">
		<h2 class="mt-0">Registrar cuota</h2>
		<el-row :gutter="20">
			<el-col :sm="24" :md="10" :lg="10">
				<el-card class="box-card">
				  <div slot="header" class="clearfix">
				    <span>Datos del socio</span>
				  </div>
				  <div  class="text item">
						<el-form ref="form" :model="form"  label-position="top">
							<el-col :sm="24" :md="12" :lg="12">
								<el-form-item label="Número de cédula:" >
									<el-input-number class="anchoTotal" :min="3000000" :max="9000000" :controls="false"></el-input-number>
								</el-form-item>
							</el-col>
						 	<el-col :sm="24" :md="12" :lg="12">
								<el-form-item label="Nombre completo:">
										<el-input v-model="form.nombre" :readonly="true"></el-input>
								 </el-form-item>
							</el-col>
							<el-col :sm="24" :md="12" :lg="12">
								<el-form-item label="Tipo de cuota:">
										<el-input v-model="form.tCuota" :readonly="true" ></el-input>
								 </el-form-item>
							</el-col>
							<el-col :sm="24" :md="12" :lg="12">
								<el-form-item label="Monto pagado:">
										<el-input v-model="form.montoP" :readonly="true"></el-input>
								 </el-form-item>
							</el-col>
							<el-col :sm="24" :md="12" :lg="12">
								<el-form-item label="Vencimiento de cuota:">
										<el-input v-model="form.vencimiento" :readonly="true"></el-input>
								 </el-form-item>
							</el-col>
							<el-col :sm="24" :md="12" :lg="12">
								<el-form-item label="Fecha último pago:">
										<el-input v-model="form.ultimoP" :readonly="true"></el-input>
								 </el-form-item>
							</el-col>
						</el-form>
				  </div>
				</el-card>
			</el-col>
			<el-col :sm="24" :md="14" :lg="14">
				<el-card class="box-card">
				  <div slot="header" class="clearfix">
				    <span>Cuota a cargar</span>
				  </div>
				  <div  class="text item">
						<el-form ref="form" :model="form"  label-position="top">
 							<el-col :sm="8" :md="5" :lg="5">
 								<el-form-item label="Cantidad:" >
 									<el-input-number class="anchoTotal" v-model="num8" :min="1" :max="36" controls-position="right" @change="handleChange"></el-input-number>
 								</el-form-item>
 							</el-col>
 						 	<el-col :sm="16" :md="9" :lg="9">
 								<el-form-item label="Tipo de cuota:">
									<el-select v-model="value4" clearable placeholder="Seleccionar" class="anchoTotal">
								    <el-option
								      v-for="item in options"
								      :key="item.value"
								      :label="item.label"
								      :value="item.value">
								    </el-option>
								  </el-select>
 								</el-form-item>
 							</el-col>
 							<el-col :sm="24" :md="10" :lg="10">
 								<el-form-item label="Monto cuota:">
 										<el-input v-model="form.montoC" :readonly="true" ></el-input>
 								 </el-form-item>
 							</el-col>
 							<el-col :sm="12" :md="8" :lg="8">
								<el-form-item label="Pagado el:">
									<el-date-picker v-model="value1" type="date" placeholder="Elegir fecha" class="anchoTotal" format="dd/MM/yyyy"></el-date-picker>
								</el-form-item>
 							</el-col>
							<el-col :sm="12" :md="8" :lg="8">
								<el-form-item label="Fecha de vencimiento:">
									<el-date-picker v-model="value2" type="date" placeholder="Elegir fecha" class="anchoTotal" format="dd/MM/yyyy"></el-date-picker>
								</el-form-item>
 							</el-col>
							<el-col :sm="12" :md="8" :lg="8">
 								<el-form-item label="Tipo de cuota:">
									<el-select v-model="selectDescuento" clearable placeholder="Seleccionar" class="anchoTotal">
								    <el-option
								      v-for="descuento in descuentos"
								      :key="descuento.value"
								      :label="descuento.label"
								      :value="descuento.value">
								    </el-option>
								  </el-select>
 								</el-form-item>
 							</el-col>
							<el-col :sm="24" :md="14" :lg="14">
								<el-form-item label="Observacion">
										<el-input v-model="observacion" ></el-input>
								 </el-form-item>
							</el-col>
							<el-col :sm="24" :md="10" :lg="10">
 								<el-form-item label="Monto a pagar:">
 										<el-input v-model="montoPagar" :readonly="true" ></el-input>
 								 </el-form-item>
 							</el-col>
 						</el-form>
				  </div>
				</el-card>
			</el-col>
		</el-col :span="24" class="text-center pt-10">
			<el-button type="primary" icon="el-icon-circle-check">Confirmar</el-button>
			<el-button type="warning" icon="el-icon-circle-close">Cancelar</el-button>
		</el-row>
	</div>
</template>


<script>
  export default {
		name: 'LayoutBlank',
    data() {
      return {
        form: {
          ci: '',
					nombre:'',
          tCuota: '',
          montoP: '',
          vencimiento: '',
          ultimoP: '',

        },
				num8: 1,
				value1:'',
				value2:'',
				options: [{
          value: 'Option1',
          label: 'Option1'
        }, {
          value: 'Option2',
          label: 'Option2'
        }, {
          value: 'Option3',
          label: 'Option3'
        }, {
          value: 'Option4',
          label: 'Option4'
        }, {
          value: 'Option5',
          label: 'Option5'
        }],
				descuentos: [{
          value: '1',
          label: '20% promo amigos'
        }, {
          value: '2',
          label: '25% promo aniversario'
        }, {
          value: '3',
          label: '30% entre 3'
        }, {
          value: '4',
          label: '50% entre 4'
        }],
        value4: '',
				selectDescuento: ''
      }
    },
    methods: {
      onSubmit() {
        console.log('submit!');
      },
			handleChange(value) {
        console.log(value);
      }
    }
  }
</script>

<style lang="scss" scoped>
@import '../../assets/scss/_variables';
.anchoTotal{
	width: 100% !important;
}
</style>
