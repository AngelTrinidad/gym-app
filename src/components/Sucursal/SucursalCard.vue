<template lang="html">
  <div class="block">
    <el-card :body-style="{ padding: '0px' }">
      <img :src="'/static/images/gallery/sucursal01.jpg'" class="image" alt="card image">
      <div style="padding: 14px;">
        <h3>{{sucursal.detalle | toUpperCaseWords}}</h3>
        <div class="bottom clearfix">
          <el-row>
            <el-col>
              <el-button
                type="text"
                @click="dialogVisibleUpdate=true"
              >Editar</el-button>
            </el-col>
          </el-row>
        </div>
      </div>
    </el-card>
    <sucursal-dialog
  		:sucursal="sucursalUpdate"
			:isCreate="false"
			:visible.sync="dialogVisibleUpdate"
  		v-on:processFormSucursal="processUpdate($event)"
  		v-on:cancelFormSucursal="cancelUpdate"
      v-on:deleteSucursal="deleteSucursal"
  	></sucursal-dialog>
  </div>
</template>
<script>
import SucursalDialog from './SucursalDialog'

export default {
  props: {
    sucursal: {
      Type: Object,
      required: true
    }
  },
  data(){
    return {
      sucursalUpdate: {
        detalle: this.$options.filters.toUpperCaseWords(this.sucursal.detalle),
        direccion: this.sucursal.direccion,
        contacto: this.sucursal.contacto,
        id: this.sucursal.id
      },
      dialogVisibleUpdate: false
    }
  },
  components: {
    SucursalDialog
  },
  methods: {
    async processUpdate(sucursal){
      const res = await this.$store.dispatch('sucursal/update', sucursal)
      if(res.status === 'ok'){
        this.$message({
					message: 'Sucursal actualizada correctamente',
					type: 'success'
				})
        this.dialogVisibleUpdate = false
      }else{
        this.$message.error('Oops. Hubo un error al procesar el formulario.')
      }
    },
    cancelUpdate(){
      this.dialogVisibleUpdate = false
    },
    deleteSucursal(){
			this.$confirm('Esto eliminará la sucursal, ¿está seguro?', 'Confirmación', {
				confirmButtonText: 'Confirmar',
				cancelButtonText: 'Cancelar',
				type: 'error'
			}).then(async ()=> {
				//Confirmed
				const res = await this.$store.dispatch('sucursal/changeState', {
					id: this.sucursal.id,
					state: 'delete'
				})
				if(res.status === 'ok'){
					this.$message({message: 'Sucursal eliminada correctamente', type: 'success'})
          this.dialogVisibleUpdate = false
				}else{
					this.$message.error('Oops. Hubo un error al procesar la acción')
				}
			})
		}
  }
}
</script>

<style lang="scss" scoped>
.block {
	padding: 15px;
}
.bodyCard {
    font-size: 13px;
    color: #999;
    margin-bottom: 10px;
  }

  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 100%;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }

  .clearfix:after {
      clear: both
  }
</style>
