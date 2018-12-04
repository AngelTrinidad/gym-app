<template>
	<div class="page-layout-blank scrollable">
		<h2 class="mt-0">Step 1</h2>
		<el-row>
			<el-col :sm="24" :md="24" :lg="16">
				<el-card class="box-card">
				  <div slot="header" class="clearfix">
				    <span>Datos del cliente</span>
				  </div>
					<div class="text item">
						<el-form ref="form" :model="form" label-width="120px" label-position="top">
							<el-row :gutter="20">
								<el-col :span="20">
									<el-form-item label="Nro. CI / RUC: ">
										<el-input v-model="form.ci" required></el-input>
									</el-form-item>
								</el-col>
								<el-col :span="4">
									<el-form-item label="Nro. Op:">
										<el-input v-model="form.nro" disabled=""></el-input>
									</el-form-item>
								</el-col>
								<el-col :span="20">
									<el-form-item label="Nombre: ">
										<el-input v-model="form.nombre" disabled=""></el-input>
									</el-form-item>
								</el-col>
							</el-row>
							<el-row>
								<el-col :span="24">
									<el-form-item class="no-m">
										<el-button type="primary">Siguiente <i class="mdi mdi-arrow-right"></i></el-button>
									</el-form-item>
								</el-col>
							</el-row>
						</el-form>
					</div>
				</el-card>
			</el-col>
		</el-row>

		<h2 class="mt-0">Step 2</h2>
		<el-row>
			<el-col :span="24">
				<el-card class="box-card">
				  <div slot="header" class="clearfix">
				    <span>Detalle de venta</span>
				  </div>
					<div class="text item">
						<el-form ref="form" :model="form2" label-width="120px" label-position="top">
							<el-row :gutter="10">
								<el-col :span="5">
									<h4>Articulo:</h4>
								</el-col>
								<el-col :span="2">
									<h4>Cantidad:</h4>
								</el-col>
								<el-col :span="3">
									<h4>Monto:</h4>
								</el-col>
								<el-col :span="4">
									<h4>% Descuento:</h4>
								</el-col>
								<el-col :span="3">
									<h4>Total:</h4>
								</el-col>
								<el-col :span="4">
								<h4>Vencimiento:</h4>
								</el-col>
								<el-col :span="3">
								<h4>Action:</h4>
								</el-col>
							</el-row>
							<el-row :gutter="10">
								<el-col :span="5">
									<el-input v-model="form2.article" required prefix-icon="el-icon-search"></el-input>
								</el-col>
								<el-col :span="2">
									<el-input-number controls-position="right" v-model="form2.cant" :min="1" :max="24" class="anchoTotal"></el-input-number>
								</el-col>
								<el-col :span="3">
									<el-input v-model="form2.monto" required></el-input>
								</el-col>
								<el-col :span="4">
									<el-select v-model="form2.value" placeholder="Seleccionar">
										 <el-option
											 v-for="item in options"
											 :key="item.value"
											 :label="item.label"
											 :value="item.value">
										 </el-option>
									 </el-select>
								</el-col>
								<el-col :span="3">
									<el-input v-model="form2.total" required></el-input>
								</el-col>
								<el-col :span="4">
									<el-date-picker
									 v-model="form2.vencimiento"
									 type="date"
									 placeholder="Seleccionar" class="anchoTotal" format="dd/MM/yyyy">
								 </el-date-picker>
								</el-col>
								<el-col :span="3">
									<el-col :span="12">
										<el-button  icon="mdi mdi-plus" circle type="primary" ></el-button>
									</el-col>
									<el-col :span="12">
										<el-button  icon="mdi mdi-close" circle type="danger"></el-button>
									</el-col>

								</el-col>
							</el-row>
							<el-row class="pt-20" :gutter="20">
								<el-col :sm="12" :lg="4">
									<el-form-item class="no-m">
										<el-button type="primary" class="anchoTotal"><i class="mdi mdi-arrow-left"></i> Anterior </el-button>
									</el-form-item>
								</el-col>
								<el-col :sm="12" :lg="4">
									<el-form-item class="no-m">
										<el-button type="primary" class="anchoTotal">Siguiente <i class="mdi mdi-arrow-right"></i></el-button>
									</el-form-item>
								</el-col>
							</el-row>
						</el-form>
					</div>
				</el-card>
			</el-col>
		</el-row>

		<h2 class="mt-0">Step 3</h2>
		<el-row>
			<el-col :sm="24" :md="24" :lg="16">
				<el-card class="box-card">
					<div slot="header" class="clearfix">
						<span>Método de pago</span>
					</div>
					<div class="text item">
						<el-form ref="form" :model="form3" label-width="120px" label-position="top">
							<el-row :gutter="20">
								<el-col :span="20">
									<el-form-item label="Seleccionar Método de Pago ">
										<el-select v-model="form3.value" placeholder="Seleccionar">
											 <el-option
												 v-for="item in options"
												 :key="item.value"
												 :label="item.label"
												 :value="item.value">
											 </el-option>
										 </el-select>
									</el-form-item>
								</el-col>
							</el-row>
							<el-row class="pt-20" :gutter="20">
								<el-col :sm="12" :lg="6">
									<el-form-item class="no-m">
										<el-button type="primary" class="anchoTotal"><i class="mdi mdi-arrow-left"></i> Anterior </el-button>
									</el-form-item>
								</el-col>
								<el-col :sm="12" :lg="6">
									<el-form-item class="no-m">
										<el-button type="primary" class="anchoTotal">Siguiente <i class="mdi mdi-arrow-right"></i></el-button>
									</el-form-item>
								</el-col>
							</el-row>
						</el-form>
					</div>
				</el-card>
			</el-col>
		</el-row>

		<h2 class="mt-0">Step 4</h2>
		<el-row>
			<el-col :sm="24" :md="24" :lg="16">
				<el-card class="box-card">
					<div slot="header" class="clearfix">
						<span>Confirmación - Resumen</span>
					</div>
					<div class="text item">
						<el-form ref="form" :model="form4" label-width="120px" label-position="left">
							<el-row :gutter="20">
								<el-col :span="24">
									<h4>Nombre del cliente</h4>
								</el-col>
								<el-col :sm="24" :lg="12">
									<el-form-item label="Total a pagar: ">
										<el-input v-model="form3.total"  required disabled=""></el-input>
									</el-form-item>
								</el-col>
								<el-col :sm="24" :lg="12">
									<el-form-item label="Total abonado: ">
										<el-input v-model="form3.aPagar"  required=""></el-input>
									</el-form-item>
								</el-col>
								<el-col :span="24">
									<p>Método de pago</p>
								</el-col>
							</el-row>
							<el-row class="pt-20" :gutter="20">
								<el-col :sm="12" :lg="6">

										<el-button type="primary" class="anchoTotal"><i class="mdi mdi-arrow-left"></i> Anterior </el-button>

								</el-col>
								<el-col :sm="12" :lg="6">

										<el-button type="danger" icon="mdi mdi-cancel" class="anchoTotal"> Cancelar</el-button>

								</el-col>
								<el-col :sm="12" :lg="6">

										<el-button type="success" icon="el-icon-check" class="anchoTotal"> Registrar</el-button>

								</el-col>
							</el-row>
						</el-form>
					</div>
				</el-card>
			</el-col>
		</el-row>

	</div>
</template>


<script>
  export default {
		data() {
      return {
        form: {
          ci: '',
					nro: '330',
					nombre: 'Jean Barzala',
        },
				form2: {
          article: '',
					cant: '1',
					monto:'',
					total:'',
					vencimiento:'',
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
					value:''


        },
				form3: {
					aPagar:'',
					total:'300.000'

        }
      }
    },
    methods: {
      onSubmit() {
        console.log('submit!');
      }
    }
  }
</script>

<style lang="scss" scoped>
@import '../../assets/scss/_variables';
	.anchoTotal{
		width: 100% !important;
	}
	.text {
	  font-size: 14px;
	}

	.item {
	  margin-bottom: 18px;
	}
	.clearfix:before,
	.clearfix:after {
	  display: table;
	  content: "";
	}
	.clearfix:after {
	  clear: both
	}
	.btn-plus{
		color: #409eff;
		background:#fff;
		border:none;
	}

	.btn-close{
		color: #f56c6c;
		background:#fff;
		border:none;
	}

</style>
