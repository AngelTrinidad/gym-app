<template>
	<el-menu
		:default-active.sync="activeLink"
		:mode="mode"
		@select="goto"
		:collapse="isCollapse"
		:unique-opened="true"
		background-color="transparent"
		class="main-navigation-menu"
		:class="{'nav-collapsed':isCollapse}"
	>
		<div class="el-menu-item-group__title" style="padding-top: 4px;"><span>Módulos</span></div>
		<el-menu-item index="/home">
			<i class="mdi mdi-gauge"></i><span slot="title">Inicio</span>
		</el-menu-item>
		<el-submenu index="cuota"  popper-class="main-navigation-submenu">
			<template slot="title">
				<i class="mdi mdi-format-list-numbers"></i><span>Cuota</span>
			</template>
			<el-menu-item index="/cuota/registrarCuota">
				<span slot="title">Registrar cuota</span>
			</el-menu-item>
			<el-menu-item index="/cuota/consultarCuota">
				<span slot="title">Consultar cuota</span>
			</el-menu-item>
		</el-submenu>
		<el-submenu index="socio" popper-class="main-navigation-submenu">
			<template slot="title">
				<i class="mdi mdi-clipboard-account"></i><span>Socio</span>
			</template>
			<el-menu-item index="/socio/registrarSocio">
				<span slot="title">Registrar socio</span>
			</el-menu-item>
			<el-menu-item index="/socio/consultarSocio">
				<span slot="title">Consultar socio</span>
			</el-menu-item>
		</el-submenu>
		<el-submenu index="ingreso" popper-class="main-navigation-submenu">
			<template slot="title">
				<i class="mdi mdi-login-variant"></i><span>Ingreso</span>
			</template>
			<el-menu-item index="">
				<span slot="title">Abrir ingreso</span>
			</el-menu-item>
			<el-menu-item index="/ingreso/consultarIngreso">
				<span slot="title">Consultar ingresos</span>
			</el-menu-item>
		</el-submenu>
		<el-submenu index="producto" popper-class="main-navigation-submenu">
			<template slot="title">
				<i class="mdi mdi-food-fork-drink"></i><span>Producto</span>
			</template>
			<el-menu-item index="/producto/registrarProducto">
				<span slot="title">Registrar producto</span>
			</el-menu-item>
			<el-menu-item index="/producto/consultarProducto">
				<span slot="title">Consultar producto</span>
			</el-menu-item>
			<el-menu-item index="/producto/stock">
				<span slot="title">Actualizar stock</span>
			</el-menu-item>
			<el-menu-item index="/producto/venta">
				<span slot="title">Venta de producto</span>
			</el-menu-item>
		</el-submenu>

		<div class="el-menu-item-group__title"><span>Control Interno</span></div>
		<el-submenu index="caja" popper-class="main-navigation-submenu">
			<template slot="title">
				<i class="mdi mdi-cash"></i><span>Caja</span>
			</template>
			<el-menu-item index="/caja/apertura">
				<span slot="title">Apertura de caja</span>
			</el-menu-item>
			<el-menu-item index="/caja/cierre">
				<span slot="title">Cierre de caja</span>
			</el-menu-item>
			<el-menu-item index="/caja/movimiento">
				<span slot="title">Movimiento de caja</span>
			</el-menu-item>
		</el-submenu>
		<el-submenu index="personal" popper-class="main-navigation-submenu">
			<template slot="title">
				<i class="mdi mdi-account-settings"></i><span>Personal</span>
			</template>
			<el-menu-item index="/personal/registro">
				<span slot="title">Registro de personal</span>
			</el-menu-item>
			<el-menu-item index="/personal/consulta">
				<span slot="title">Consulta de personal</span>
			</el-menu-item>
		</el-submenu>
		<el-submenu index="sucursal" popper-class="main-navigation-submenu">
			<template slot="title">
				<i class="mdi mdi-home-map-marker"></i><span>Sucursal</span>
			</template>
			<el-menu-item index="/sucursal/listado">
				<span slot="title">Listado de sucursales</span>
			</el-menu-item>
			<el-menu-item index="/sucursal/registro">
				<span slot="title">Registro de sucursal</span>
			</el-menu-item>
		</el-submenu>
		<el-submenu index="reporte" popper-class="main-navigation-submenu">
			<template slot="title">
				<i class="mdi mdi-chart-areaspline"></i><span>Reporte</span>
			</template>
			<el-menu-item index="/reporte/cuota">
				<span slot="title">Cuotas</span>
			</el-menu-item>
			<el-menu-item index="/reporte/cuota">
				<span slot="title">Socios</span>
			</el-menu-item>
			<el-menu-item index="/reporte/producto">
				<span slot="title">Productos</span>
			</el-menu-item>
			<el-menu-item index="/reporte/caja">
				<span slot="title">Caja</span>
			</el-menu-item>
		</el-submenu>
	</el-menu>
</template>


<script>
import { detect } from 'detect-browser'
const browser = detect()

export default {
	name: 'Nav',
	props: ['mode', 'isCollapse'],
	data() {
		return {
			isIe: true,
			isEdge: true,
			activeLink: null
		}
	},
	methods: {
		goto(index, indexPath) {
			if(index.charAt(0) === '/') {
				this.$router.push(index)
				this.$emit('push-page', {page:index})
			}

		},
		setLink(path) {
			this.activeLink = path
		}
	},
	created() {
		if(browser.name !== 'ie') this.isIe = false
		if(browser.name !== 'edge') this.isEdge = false

		this.setLink(this.$router.currentRoute.path)
		this.$router.afterEach((to, from) => {
			this.setLink(this.$router.currentRoute.path)
			//console.log('afterEach', to, from)
		})
		//console.log('this.$router.currentRoute.path', this.$router.currentRoute.path)
	},
	mounted() {
		//console.log('nav component mounted')
	}
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/_variables';

.el-menu {
	border: none;
}
.el-menu::before, .el-menu::after {
	display: none;
}
.el-submenu, .el-menu-item {
	.mdi {
		vertical-align: middle;
		margin-right: 5px;
		display: inline-block;
		width: 24px;
		text-align: center;
		font-size: 18px;
	}
}
</style>

<style lang="scss">
@import '../assets/scss/_variables';

.main-navigation-menu {
	transition: width .5s;

	&:not(.el-menu--collapse) {
		.el-submenu__title, .el-menu-item {
			height: 40px;
			line-height: 40px;
			background-color: transparent !important;
		}

		&:not(.el-menu--horizontal) {
			.el-menu-item, .el-submenu {
				position: relative;

				&::before {
					content: '';
					display: block;
					width: 0px;
					height: 1px;
					position: absolute;
					bottom: 10px;
					left: 30px;
					background: $text-color;
					z-index: 1;
					opacity: 0;
					transition: all .7s cubic-bezier(.55,0,.1,1);
				}
				&:hover {
					&::before {
						width: 100px;
						opacity: 1;
						//left: 50px;
						transform: translate(20px, 0);
					}
				}

				&.is-active {
					&::before {
						background: $text-color-accent;
					}
				}
			}
		}

		.el-submenu.is-opened {
			//background: #edf1f6 !important;
			//background: rgba(223, 228, 234, 0.38) !important;
			position: relative;

			&::after {
				content: '';
				display: block;
				width: 2px;
				position: absolute;
				top: 40px;
				bottom: 10px;
				left: 31px;
				background: $text-color;
				z-index: 1;
			}

			&::before {
				display: none;
			}

			.el-menu-item, .el-submenu {
				&::before, &::after {
					display: none;
				}
			}
		}

		.el-menu-item-group__title {
			padding: 15px 0 0px 20px;
			color: transparentize($text-color, 0.65);
		}
	}

	.el-submenu__title, .el-menu-item:not(.is-active) {
		color: $text-color;

		i {
			color: $text-color;
		}
	}

	&.el-menu--collapse {
		.el-menu-item-group__title {
			padding: 15px 0 0px 0px;
			width: 100%;
			text-align: center;
		}

		.el-submenu__title:hover, .el-menu-item:hover {
			background-color: rgba(0, 0, 0, 0.05) !important;
		}
	}

	&.el-menu--horizontal {
		white-space: nowrap;
		/*width: fit-content;
		width: max-content;*/
		overflow: hidden;
		display: table;

		& > * {
			float: inherit !important;
			display: inline-block;
		}
	}

	&.nav-collapsed {
		.el-menu-item,.el-submenu__title {
			& > span {
				display: none;
			}
		}
	}
}

.main-navigation-submenu {
	.el-menu {
		background: #fff !important;

		.el-menu-item:not(.is-active) {
			color: $text-color;
		}
		.el-menu-item:hover {
			background-color: transparentize($background-color, 0.3) !important;
		}
	}
}
</style>
