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
					type="primary"
					size="medium"
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
		<el-dialog title="Crear sucursal" :visible.sync="dialogVisibleCreate">
			<el-row>
	      <form-sucursal
	    		:sucursal="sucursalCreate"
					:isCreate="true"
	    		v-on:processFormSucursal="processCreate($event)"
	    		v-on:cancelFormSucursal="cancelCreate"
	    	></form-sucursal>
			</el-row>
    </el-dialog>
	</div>
</template>

<script>
import SucursalCard from '@/components/Sucursal/SucursalCard'
import FormSucursal from '@/components/Sucursal/FormSucursal'
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
    SucursalCard,FormSucursal,PageHeader
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
