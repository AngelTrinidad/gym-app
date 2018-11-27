<template>
	<el-dialog
		:show-close="true"
		:custom-class="'producto-dialog'"
		:visible="visible"
		@close="$emit('cancelFormProducto')"
		:title="title"
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
							<el-input/>
						</el-form-item>
					</el-col>
					<el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p">
						<el-form-item label="Precio" prop="precio">
							<el-input-number
								controls-position="right"
								:min="0"
								:step="500"
							/>
						</el-form-item>
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
							></el-switch>
						</el-col>
						<el-col :span="7" :md="7" :sm="24" :xs="24" class="col-p">
							<el-form-item label="Cantidad en Stock" prop="precio">
								<el-input-number
									controls-position="right"
									:min="0"
									:step="1"
									size="mini"
									:disabled="!sucursal.active"
								/>
							</el-form-item>
						</el-col>
						<el-col :span="7" :md="7" :sm="24" :xs="24" class="col-p">
							<el-form-item label="Cantidad mínima" prop="precio">
								<el-input-number
									controls-position="right"
									:min="0"
									:step="1"
									size="mini"
									:disabled="!sucursal.active"
								/>
							</el-form-item>
						</el-col>
					</el-row>
				</div>
			</el-form>
		</div>
	</el-dialog>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
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
		}
	},
	data() {
		return {
			sucursales: [],
			imagePlaceholder: 'data:image/jpeg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAAAeAAD/4QMvaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjYtYzE0MCA3OS4xNjA0NTEsIDIwMTcvMDUvMDYtMDE6MDg6MjEgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkExM0RGNDdBMzM1QzExRThCNjhCOTFBMEVCQUQzNDYxIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkExM0RGNDc5MzM1QzExRThCNjhCOTFBMEVCQUQzNDYxIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE1IChXaW5kb3dzKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkRBMUEyQ0NDMjc2QzExRTg5QUMyOTk2OTcxQkYxODMyIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkRBMUEyQ0NEMjc2QzExRTg5QUMyOTk2OTcxQkYxODMyIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+/+4AIUFkb2JlAGTAAAAAAQMAEAMCAwYAAAWZAAAGSQAACC7/2wCEABALCwsMCxAMDBAXDw0PFxsUEBAUGx8XFxcXFx8eFxoaGhoXHh4jJSclIx4vLzMzLy9AQEBAQEBAQEBAQEBAQEABEQ8PERMRFRISFRQRFBEUGhQWFhQaJhoaHBoaJjAjHh4eHiMwKy4nJycuKzU1MDA1NUBAP0BAQEBAQEBAQEBAQP/CABEIAGQAZAMBIgACEQEDEQH/xACdAAEAAgMBAQAAAAAAAAAAAAAABQYBBAcCAwEBAAMBAAAAAAAAAAAAAAAAAAECAwQQAAEEAgMBAQEAAAAAAAAAAAECAwQFEQYAIDAQQBIRAAIBAgMCCwcFAAAAAAAAAAECAxEEACExYRIgMEFRcYGRodFSExBAsSIyQnKSsiMzBRIAAQQDAQEBAAAAAAAAAAAAAQAgMBEQITFxYYH/2gAMAwEAAhEDEQAAAOgAAHzPo09syAAAACF57IRXRjichFq9f9QE/wA24RIAAHLNGyVvpwGbRebPHSPNuFZAAERLfqVa2dct+x1eKmOuOedBy19CsgAY5b1LnOlIUb5ALzSL/nawDDYABjIgIK+L155I3IjS3SlwAAAAAAAAP//aAAgBAgABBQDxQkAEAgjB6JOU8Ucq+gEkIUnhSs8Ukp6NEZ+OEfz0DihwuK4Tny//2gAIAQMAAQUA8VqyQSOA5HRQweJGB9JxwqSeZSOJUD0czj4jOehQk8/hPn//2gAIAQEAAQUA/E9IYjobtqt1Xlsl+mojypcmY7gcodmlVjrbiHW/DZ5SpN590uSp+l8L0EXX3Q0kVfhutWtif8SlS1UNcayr8JjcN6PYaK8lbek3a10+t11Mrw2C+ap482dLsHod/cQkubhfLTJlSZblDtMqucbcQ632up67Gz66NYKehdVAKF9rUmqX0ZZdfd1fXnKlHYgEWOnVUwv6JZoKdKvFGJoSs11RX1iP3f/aAAgBAgIGPwCH6VRRDRgllBaKokDxbYb7mj+N7jcX/9oACAEDAgY/AIrCtpwGWVsLQv2Xkn//2gAIAQEBBj8A9y355FiTzOwUd+NyO8hdjookUn48WFiAe8mr6SnRQNXbBmupWmkP3Ma06BoOr2LFO7TWJNGQmpjHmQnm5sLJGwZHAZWGhBzB4m6LHKJvSQcwQU+NeAI3NTbyNGPxyZf3cTfA5fzue014E7chnNOpV4kf6CLWC5ADkaLIopn+QHtVEBZ2ICqMySdAMQ2rf20Ly087Zns04lob3cMEvylZCADXTXlwX/zZleM5iKXJhsDitevAVxFGvKxevcowk9xKst23ypI9FVSeSNSde/iRQCS6lr6MR0y+5tgwZryUyudK/SuxV0GAkF0+4Mgj0kUdG/WmN311Tasag99cerdSvM/mclqdHNhYLtmmsjka5vHtU82zswskbBkcBlYaEHMHhz3JNVLFYhzRrkvjwpbGQ1NswMdfI9cuog8IqdCKHDSxAzWJzWQZlNknjwVhhQySuaKiipJw9xctW6nUKyKaqig1ptPDIIqDkQcGSCtpKcyY/oJ2ocuymD6E0Mo5K7yH4MO/FCsSjnMnguAb66G7ypCM/wBT+GN2zhCMcmkPzO3Sxz9//9k='
			,rules: {

			}
		}
	},
	computed: {
		...mapGetters({
			_sucursales: 'sucursal/activos'
		}),
	},
	mounted(){
		this.$store.dispatch('sucursal/get').then(() => {
			this._sucursales.forEach(sucursal => {
				this.sucursales.push({
					id: sucursal.id,
					detalle: sucursal.detalle,
					cant: 0,
					cant_min: 0,
					active: false
				})
			})
		})
	},
	methods: {

	}
}
</script>
<style lang="scss" scoped>
.col-p {
	padding: 0 10px;
	box-sizing: border-box;
}
</style>
