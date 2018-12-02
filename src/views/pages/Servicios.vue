<template>
	<div class="page-servicios flex column" id="page-servicios">
		<resize-observer @notify="__resizeHanlder" />
		<page-header
			:items="[
				{text: 'Servicios'}
			]"
		></page-header>
		<div class="contacts-root box grow flex gaps justify-center" :class="servicioClass">
			<div class="card-base card-shadow--small search-card scrollable only-y">
				<h1 class="mt-0">Servicios</h1>

				<el-input
					prefix-icon="el-icon-search"
					placeholder="Buscar..."
					clearable
					v-model="search"
				>
				</el-input>

				<div class="o-050 text-right mt-10 mb-30">
					<strong>{{cantServicios}}</strong> {{cantServicios === 1 ? 'servicio' : 'servicios'}}
				</div>

				<el-button
					icon="el-icon-plus"
					@click="openDialog({}, true)"
				> Agregar servicio</el-button>
			</div>
			<div class="contacts-list box grow scrollable only-y">
				<div
					v-for="servicio in _servicios"
					:key="servicio.id"
					class="flex contact"
					@click="openDialog(servicio, false)">
					<div class="info box grow flex">
						<div class="name box grow flex column justify-center p-10">
							<div class="fullname fs-18"><strong>{{servicio.detalle | toUpperCaseWords}}</strong></div>
							<div class="precio fs-14 secondary-text">{{servicio.precio | separator}} Gs.</div>
						</div>
						<div class="precio align-vertical p-10"><span class="align-vertical-middle">{{servicio.precio | separator}} Gs.</span></div>
					</div>
				</div>
			</div>
		</div>
		<servicio-dialog
			:servicio="servicio"
			:visible.sync="dialogVisible"
			@processFormServicio="processForm($event)"
			@cancelFormServicio="cancelForm"
			@deleteServicio="deleteServicio($event)"
			:isCreate="createServicio"
		></servicio-dialog>
	</div>
</template>

<script>
import PageHeader from '@/core/page-header'
import {mapGetters, mapMutations} from 'vuex'
import ServicioDialog from '@/components/Servicio/ServicioDialog'

export default {
	name: 'Servicios',
	data() {
		return {
			dialogVisible: false,
			pageWidth: 0,
			servicio: {},
			createServicio: true,
		}
	},
	computed: {
		...mapGetters({
			_search: 'servicio/search',
			_servicios: 'servicio/filter'
		}),
		search: {
			get(){
				return this._search
			},
			set(value){
				this._setSearch(value)
			}
		},
		cantServicios(){
			return this._servicios.length
		},
		servicioClass() {
			return this.pageWidth >= 870 ? 'large' : this.pageWidth >= 760 ? 'medium' : 'small'
		}
	},
	methods: {
		...mapMutations({
			_setSearch: 'servicio/setSearch',
			_clearSearch: 'servicio/clearSearch'
		}),
		setPageWidth() {
			this.pageWidth = document.getElementById('page-servicios').offsetWidth
		},
		__resizeHanlder: _.throttle(function (e) {
			this.setPageWidth()
		}, 700),
		openDialog(servicio, create){
			if(!create){
				this.servicio = {
					id: servicio.id,
          detalle: servicio.detalle,
          estado: servicio.estado,
          precio: servicio.precio
				}
			}else{
				this.servicio = servicio
			}
			this.dialogVisible = true
			this.createServicio = create
		},
		async processForm(servicio){
			let res
			let message = ''

			if(!servicio.id){
				res = await this.$store.dispatch('servicio/create', servicio)
				message = 'Servicio creado correctamente'
			}else{
				res = await this.$store.dispatch('servicio/update', servicio)
				message = 'Servicio actualizado correctamente'
			}
			if(res.status === 'ok'){
				this.$message({message, type: 'success'})
				this.dialogVisible = false
			}else{
				this.$message.error('Oops. Hubo un error al procesar el formulario.')
			}
		},
		cancelForm(){
			this.dialogVisible = false
		},
		deleteServicio(servicio){
			this.$confirm('Esto eliminará el servicio, ¿está seguro?', 'Confirmación', {
				confirmButtonText: 'Confirmar',
				cancelButtonText: 'Cancelar',
				type: 'error'
			}).then(async ()=> {
				//Confirmed
				const res = await this.$store.dispatch('servicio/changeState', {
					id: servicio.id,
					state: 'delete'
				})
				if(res.status === 'ok'){
					this.$message({message: 'Servicio eliminado correctamente', type: 'success'})
					this.dialogVisible = false
				}else{
					this.$message.error('Oops. Hubo un error al procesar la acción')
				}
			})
		}
	},
	mounted() {
		this.setPageWidth()
		this.$store.dispatch('servicio/get')
	},
	components: {
		PageHeader, ServicioDialog
	}
}
</script>

<style lang="scss" scoped>
@import '../../assets/scss/_variables';

.page-servicios {
	height: 100%;
	margin: 0 !important;
	padding: 20px;
	padding-bottom: 10px;
	box-sizing: border-box;

	.search-card {
		padding: 50px;
		max-width: 350px;
		max-height: 320px;
		box-sizing: border-box;
		margin-bottom: 15px;

		.el-input, .el-button {
			width: 100%;
		}
	}

	.search-wrap {
		margin: 0 auto;
		margin-bottom: 10px;
		padding: 0px 30px;
		box-sizing: border-box;
		width: 100%;
		max-width: 600px;

		i {
			display: inline-block;
			width: 22px;
		}

		input {
			outline: none;
			background: transparent;
			border: none;
			font-size: 15px;
			position: relative;
			top: -2px;
			width: 100%;
			padding: 0;
			color: $text-color;
		}

		.contacts-tot {
			margin-right: 20px;
			margin-left: 10px;
		}

		a {
			border-bottom: 1px solid;
			text-decoration: none;
			color: $text-color;

			&:hover {
				opacity: .6;
			}
		}
	}

	.contacts-root {
		max-height: 100%;
	}

	.contacts-list {
		//margin: 0 auto;
		width: 100%;
		max-width: 965px;
		padding: 0px 30px;
		box-sizing: border-box;

		.contact {
			margin: 10px 0;
			padding: 5px;
			box-sizing: border-box;
			cursor: pointer;
			transition: all .5s .25s;

			.star {
				.mdi-star {
					color: #ffd730;
				}
				.mdi-star-outline {
					opacity: .5;
				}
			}

			.avatar {
				width: 60px;
				transition: all .5s .25s;

				img {
					border: 1px solid transparentize($text-color, .9);
					box-sizing: border-box;
					width: 50px;
					height: 50px;
					border-radius: 50%;
					transition: all .5s .25s;
				}
			}

			.info {
				word-break: break-word;

				.name {

					//.fullname {}

					.estado {
						opacity: 0;
						line-height: 0;
						transition: all .5s .25s;
					}

					.precio {
						display: none;
					}
				}

				//.precio {}
			}

			&:hover {
				margin: 15px -20px;
				padding: 10px;
				background-color: lighten($background-color, 20%);
				border-radius: 5px;
				box-shadow: 0 8px 16px 0 rgba(40,40,90,.09),0 3px 6px 0 rgba(0,0,0,.065);

				.avatar {
					width: 90px;

					img {
						width: 90px;
						height: 90px;
					}
				}

				.info {
					.name {
						.estado {
							opacity: 1;
							line-height: 1.4;
						}
					}
				}
			}
		}
	}

	.contacts-root {
		&.medium {
			.search-card {
				padding: 20px;
				max-width: 260px;
				max-height: 260px;
			}
		}
		&.small {
			overflow-y: auto;
			display: block;
			-webkit-box-orient: vertical;
			-webkit-box-direction: normal;
			-ms-flex-direction: column;
			flex-direction: column;
			padding: 5px;

			.search-card {
				padding: 20px;
				max-width: 100%;
				width: 100%;
				//max-height: 240px;
				flex: none;
				-webkit-box-flex: none;
				-ms-flex: none;
				display: block;
				overflow: hidden !important;
			}

			.contacts-list {
				flex: none;
				-webkit-box-flex: none;
				-ms-flex: none;
				display: block;
				overflow: hidden !important;
			}
		}
	}
}

@media (max-width: 768px) {
	.page-servicios {
		.search-wrap {
			padding: 0;
		}
		.contacts-list {
			padding: 0px;

			.contact {
				.avatar {
					width: 40px;

					img {
						width: 40px;
						height: 40px;
					}
				}

				.info {
					.precio {
						display: none;
					}

					.name {
						.precio {
							display: block;
						}
					}
				}

				&:hover {
					margin: 15px 0px;

					.avatar {
						width: 60px;

						img {
							width: 60px;
							height: 60px;
						}
					}
				}
			}
		}

		.contacts-root {
			&.medium {
				.contacts-list {
					padding: 0 30px;
				}
			}
			&.small {
				.contacts-list {
					padding: 8px;
				}
			}
		}
	}
}
</style>
