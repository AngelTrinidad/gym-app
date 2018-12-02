<template>
	<div class="scrollable">
		<page-header
			title="Sucursales"
			:items="[
				{text: 'Sucursales'}
			]"
		></page-header>
		<div class="flex" style="margin-bottom:10px;">
			<div class="box">
				<el-button
					size="medium"
					icon="el-icon-plus"
					@click="dialogVisibleCreate = true"
				>Crear Sucursal</el-button>
			</div>
		</div>
		<div class="card-base card-shadow--medium demo-box bg-white">
      <el-row
        v-for="row in Math.ceil(_sucursales.length / numberOfColumns)"
        :key="row"
      >
        <el-col
          v-for="sucursal in _sucursales.slice((row - 1) * numberOfColumns, row * numberOfColumns)"
          :key="sucursal.id"
          :span="8" :xs="11"
        >
          <sucursal-card :sucursal="sucursal"></sucursal-card>
        </el-col>
      </el-row>
		</div>

    <sucursal-dialog
  		:sucursal="sucursalCreate"
			:isCreate="true"
			:visible.sync="dialogVisibleCreate"
  		v-on:processFormSucursal="processCreate($event)"
  		v-on:cancelFormSucursal="cancelCreate"
  	></sucursal-dialog>
	</div>
</template>

<script>
import SucursalCard from '@/components/Sucursal/SucursalCard'
import SucursalDialog from '@/components/Sucursal/SucursalDialog'
import PageHeader from '@/core/page-header'
import {mapGetters} from 'vuex'

export default {
	name: 'Sucursales',
	data() {
		return {
      numberOfColumns: 3,
			sucursalCreate: {
				detalle: '',
				direccion: '',
				contacto: ''
			},
			dialogVisibleCreate: false
		}
	},
  components: {
    SucursalCard,SucursalDialog,PageHeader
  },
  computed: {
    ...mapGetters({
      _sucursales: 'sucursal/all'
    })
  },
  mounted(){
    this.$store.dispatch('sucursal/get')
  },
	methods: {
		async processCreate(sucursal){
      const res = await this.$store.dispatch('sucursal/new', sucursal)
      if(res.status === 'ok'){
        this.$message({
					message: 'Sucursal creada correctamente',
					type: 'success'
				})
        this.dialogVisibleCreate = false
      }else{
        this.$message.error('Oops. Hubo un error al procesar el formulario.')
      }
    },
    cancelCreate(){
      this.dialogVisibleCreate = false
    }
	}
}
</script>

<style lang="scss" scoped>
	.demo-box {
		padding: 20px;
		margin-bottom: 20px;
	}
</style>
