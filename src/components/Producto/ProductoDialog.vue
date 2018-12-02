<template>
	<el-dialog
		:show-close="true"
		:visible="visible"
		@open="openDialog"
		@close="closeDialog"
		:title="isCreate ? 'Crear Producto' : 'Actualizar Producto'"
		center
	>
		<div class="form-box">
			<el-form
				:model="producto"
				ref="form"
				:rules="rules"
				label-position="top"
			>
				<h3>Datos generales</h3>
				<el-row>
					<el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p">
						<el-form-item label="Detalle" prop="detalle">
							<el-input v-model="producto.detalle"/>
						</el-form-item>
					</el-col>
					<el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p">
						<el-form-item label="Precio" prop="precio">
							<el-input-number
								controls-position="right"
								:min="0"
								:step="500"
								v-model.number="producto.precio"
							/>
						</el-form-item>
					</el-col>
				</el-row>
				<h3>Imagen</h3>
				<el-row>
					<el-col>
						<div class="avatar-uploader">
							<div class="el-upload" @click="$refs.selectPicture.click()">
								<input
									type="file"
									v-show="false"
									ref="selectPicture"
									id="selectPicture"
									@change="fileSelected($event)"
									accept=".jpg, .jpeg"
								></input>
								<img
									v-if="imgURL"
									alt="imagen producto"
									:src="imgURL"
									class="avatar"
								>
								<i v-else class="el-icon-plus avatar-uploader-icon"></i>
							</div>
						</div>
					</el-col>
				</el-row>
				<h3>Inventario</h3>
				<div v-for="sucursal in sucursales" :key="sucursal.id">
					<el-row>
						<el-col :span="10" :md="10" :sm="24" :xs="24" class="col-p">
							<el-switch
								:active-text="sucursal.detalle | toUpperCaseWords"
								active-color="#13ce66"
								v-model="sucursal.active"
								@change="updateStock(sucursal)"
							></el-switch>
						</el-col>
						<el-col :span="7" :md="7" :sm="12" :xs="12" class="col-p">
							<el-form-item label="Cantidad en Stock">
								<el-input-number
									controls-position="right"
									:min="0"
									:step="1"
									size="mini"
									:disabled="!sucursal.active"
									v-model.number="sucursal.cant"
								/>
							</el-form-item>
						</el-col>
						<el-col :span="7" :md="7" :sm="12" :xs="12" class="col-p">
							<el-form-item label="Cantidad mínima">
								<el-input-number
									controls-position="right"
									:min="0"
									:step="1"
									size="mini"
									:disabled="!sucursal.active"
									v-model.number="sucursal.cant_min"
								/>
							</el-form-item>
						</el-col>
					</el-row>
				</div>
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
				@click="$emit('deleteProducto', producto)"
				class="button-right"
				icon="el-icon-delete"
				circle
			></el-button>
	  </span>
		<crop-image
			:visible.sync="dialogCrop"
			:img="producto.img"
			@cropped="croppedImg($event)"
			@cancelCrop="cancelCropImg"
			:anidado="true"
		></crop-image>
	</el-dialog>
</template>

<script>
import {mapGetters} from 'vuex'
import CropImage from '@/components/cropImage'
export default {
	components: {
		CropImage
	},
	name: 'ProductoDialog',
	props: {
		producto: {
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
			sucursales: [],
			dialogCrop: false,
			imgURL: '',
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
	computed: {
		...mapGetters({
			_sucursales: 'sucursal/activos'
		}),
	},
	methods: {
		openDialog(){
			if(this.$refs['form']) this.$refs['form'].resetFields()
			if(this.producto.img){
				 this.imgURL = `${this.$store.state.apiImages}products/${this.producto.img}`
			}
			this.$store.dispatch('sucursal/get').then(() => {
				this.sucursales = []
				this._sucursales.forEach(sucursal => {
					let obj = {
						id: sucursal.id,
						detalle: sucursal.detalle,
						cant: 0,
						cant_min: 0,
						active: false
					}
					if(!this.isCreate){
						let sucursalConStock = this.producto.stock.find(row => row.sucursal_id === sucursal.id)
						if(sucursalConStock){
							obj.cant = sucursalConStock.cant
							obj.cant_min = sucursalConStock.cant_min
							obj.active = true
						}
					}
					this.sucursales.push(obj)
				})
			})
		},

		fileSelected(file){
			const img = file.target.files[0]
			if(img){
				this.producto.img = img
				this.dialogCrop = true
			}
			document.querySelector('#selectPicture').value = ''
		},
		async croppedImg(img){
			this.producto.img = img
			this.imgURL = URL.createObjectURL(img)
			this.dialogCrop = false
		},
		cancelCropImg(){
			this.dialogCrop = false
		},
		updateStock(sucursal){
			sucursal.cant = 0
			sucursal.cant_min = 0
		},
		validateBeforeSubmit(){
			this.$refs['form'].validate(async (valid) => {
				if(!valid){
					this.$message.error('Oops. Hubo errores de validación.')
				}else{
					this.producto.sucursales = this.sucursales
						.filter(sucursal => sucursal.active)
					this.$emit('processFormProducto', this.producto)
				}
			})
		},
		closeDialog(){
			this.imgURL = ''
			this.$emit('cancelFormProducto')
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
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
