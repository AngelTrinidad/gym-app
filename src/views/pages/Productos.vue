<template>
	<div class="page-productos flex column" id="page-productos">
		<resize-observer @notify="__resizeHanlder" />
		<page-header
			:items="[
				{text: 'Productos'}
			]"
		></page-header>
		<div class="contacts-root box grow flex gaps justify-center" :class="productsClass">
			<div class="card-base card-shadow--small search-card scrollable only-y">
				<h1 class="mt-0">Productos</h1>

				<el-input
					prefix-icon="el-icon-search"
					placeholder="Buscar..."
					clearable
					v-model="search"
				>
				</el-input>

				<div class="o-050 text-right mt-10 mb-30">
					<strong>{{cantProductos}}</strong> {{cantProductos !== 1 ? 'productos' : 'producto'}}
				</div>

				<el-button
					icon="el-icon-plus"
					@click="openDialog({}, true)"
				> Agregar producto</el-button>
			</div>
			<div class="contacts-list box grow scrollable only-y">
				<div
					v-for="producto in _productos"
					:key="producto.id"
					class="flex contact"
					@click="openDialog(producto, false)">
					<div class="avatar align-vertical">
						<img :src="'/static/images/users/user-0.jpg'" class="align-vertical-middle" alt="user avatar">
					</div>
					<div class="info box grow flex">
						<div class="name box grow flex column justify-center p-10">
							<div class="fullname fs-18"><strong>{{producto.detalle | toUpperCaseWords}}</strong></div>
							<div class="precio fs-14 secondary-text">{{producto.precio | separator}} Gs.</div>
							<div class="estado fs-14 secondary-text">{{producto.estado === 1 ? 'Activo' : 'Inactivo'}}</div>
						</div>
						<div class="precio align-vertical p-10"><span class="align-vertical-middle">{{producto.precio | separator}} Gs.</span></div>
					</div>
				</div>
			</div>
		</div>
		<producto-dialog
			:producto="producto"
			:visible.sync="dialogVisible"
			@processFormProducto="processForm($event)"
			@cancelFormProducto="cancelForm"
			@deleteProducto="deleteProducto($event)"
			:isCreate="createProduct"
		></producto-dialog>
	</div>
</template>

<script>
import PageHeader from '@/core/page-header'
import {mapGetters, mapMutations} from 'vuex'
import ProductoDialog from '@/components/Producto/ProductoDialog'

export default {
	name: 'Productos',
	data() {
		return {
			dialogVisible: false,
			pageWidth: 0,
			producto: {},
			createProduct: true,
		}
	},
	computed: {
		...mapGetters({
			_search: 'producto/search',
			_productos: 'producto/filter'
		}),
		search: {
			get(){
				return this._search
			},
			set(value){
				this._setSearch(value)
			}
		},
		cantProductos(){
			return this._productos.length
		},
		productsClass() {
			return this.pageWidth >= 870 ? 'large' : this.pageWidth >= 760 ? 'medium' : 'small'
		}
	},
	methods: {
		...mapMutations({
			_setSearch: 'producto/setSearch',
			_clearSearch: 'producto/clearSearch'
		}),
		setPageWidth() {
			this.pageWidth = document.getElementById('page-productos').offsetWidth
		},
		__resizeHanlder: _.throttle(function (e) {
			this.setPageWidth()
		}, 700),
		openDialog(product, create){
			if(!create){
				this.producto = {
					id: product.id,
          detalle: product.detalle,
          estado: product.estado,
          precio: product.precio,
          created_at: product.created_at,
          updated_at: product.updated_at,
          userAlta: product.userAlta,
          stock: product.stock
				}
			}else{
				this.producto = product
			}
			this.dialogVisible = true
			this.createProduct = create
		},
		async processForm(product){
			let res
			let message = ''
			if(!product.id){
				res = await this.$store.dispatch('producto/create', product)
				message = 'Producto creado correctamente'
			}else{
				res = await this.$store.dispatch('producto/update', product)
				message = 'Producto actualizado correctamente'
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
		deleteProducto(producto){
			this.$confirm('Esto eliminará el producto, ¿está seguro?', 'Confirmación', {
				confirmButtonText: 'Confirmar',
				cancelButtonText: 'Cancelar',
				type: 'error'
			}).then(async ()=> {
				//Confirmed
				const res = await this.$store.dispatch('producto/delete', producto.id)
				console.log(res)
			})
		}
	},
	mounted() {
		this.setPageWidth()
		this.$store.dispatch('producto/get')
	},
	components: {
		PageHeader, ProductoDialog
	}
}
</script>

<style lang="scss" scoped>
@import '../../assets/scss/_variables';

.page-productos {
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
	.page-productos {
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
