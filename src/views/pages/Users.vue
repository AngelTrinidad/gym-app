<template>
	<div class="page-table scrollable">
		<page-header
			title="Usuarios"
			:items="[
				{text: 'Usuarios'}
			]"
		></page-header>
		<div class="flex" style="margin-bottom:10px;">
			<div class="box">
				<el-button
					size="medium"
					@click="openDialog({}, true)"
					icon="el-icon-plus"
				>Crear usuario</el-button>
			</div>
		</div>
		<div class="table-box card-base card-shadow--medium">
			<el-table :data="_users" style="width: 100%">
				<el-table-column
					prop="username"
					label="Usuario"
					sortable
					width="180"
        ></el-table-column>
        <el-table-column
					prop="nombre"
					label="Nombre, Apellido"
					sortable
          :formatter="formatName"
					width="180"
        ></el-table-column>
        <el-table-column
					prop="email"
					label="Correo"
					width="180"
        ></el-table-column>
        <el-table-column
					prop="sucursal"
					label="Sucursal"
					sortable
          :formatter="formatSucursal"
					width="180"
        ></el-table-column>
        <el-table-column label="Operaciones">
          <template slot-scope="scope">
						<el-row>
							<el-col :sm="24" :md="12" :lg="12">
		            <el-button
		              size="mini"
		              @click="openDialog(scope.row, false)"
		            >Editar</el-button>
							</el-col>
							<el-col :sm="24" :md="12" :lg="12">
		            <el-button
		              size="mini"
		              :type="scope.row.estado ? 'danger' : 'success'"
		              @click="changeStatus(scope.row)"
		            >
		            {{ scope.row.estado === 1 ? 'Inactivar' : 'Reactivar' }}
		            </el-button>
							</el-col>
						</el-row>
          </template>
        </el-table-column>
			</el-table>
    </div>
    <el-dialog
			:title="createUser ? 'Crear usuario' : 'Modificar usuario'"
			:visible.sync="dialogVisible"
			center
		>
			<el-row>
	      <form-user
					ref="formUser"
	    		:user="user"
					:isCreate="createUser"
	    		v-on:processFormUser="processForm($event)"
	    		v-on:cancelFormUser="cancelForm"
	    	></form-user>
			</el-row>
    </el-dialog>
	</div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
import FormUser from '@/components/User/FormUser'
import PageHeader from '@/core/page-header'

export default {
	name: 'TableElement',
  components: {
    FormUser,PageHeader
  },
	data() {
    return {
      user: {},
      dialogVisible: false,
			createUser: false
    }
  },
  mounted(){
    this.$store.dispatch('user/get')
  },
  computed: {
    ...mapGetters({
      _users: 'user/all'
    })
  },
  methods: {
    ...mapActions({
			_createUser: 'user/create',
      _updateUser: 'user/update',
      _changeStatusUser: 'user/changeStatus'
    }),
    formatName(row, col){
      return this.$options.filters.toUpperCaseWords(row.nombre+', '+row.apellido)
    },
    formatSucursal(row, col){
      if(!row.sucursal){
        return '(Sin Sucursal)'
      }else{
        return this.$options.filters.toUpperCaseWords(row.sucursal.detalle)
      }
    },
    openDialog(user, create){
			if(this.$refs.formUser) this.$refs.formUser.$refs['form'].resetFields()
			if(create){
				this.user = user
			}else{
				this.user = {
	        id: user.id,
	        nombre: this.$options.filters.toUpperCaseWords(user.nombre),
	        apellido: this.$options.filters.toUpperCaseWords(user.apellido),
	        email: user.email,
	        username: this.$options.filters.toUpperCaseWords(user.username),
	        sucursal_id: (user.sucursal.id ? user.sucursal.id : '')
	      }
			}
			this.createUser = create
      this.dialogVisible = true
    },
    async processForm(user){
			let res
			let message = ''

			if(!user.id){
				res = await this._createUser(user)
				message = 'Usuario creado correctamente'
			}else{
				res = await this._updateUser(user)
				message = 'Usuario actualizado correctamente'
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
    async changeStatus(user){
      const res = await this._changeStatusUser(user.id)
      if(res.status === 'ok'){
        this.$message({
					message: 'Estado del usuario modificado correctamente.',
					type: 'success'
				})
      }else{
        this.$message.error('Oops. Hubo un error al procesar la acción.')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/scss/_variables';

.table-box {
	overflow: auto;
}
.col-p {
  padding: 0 10px;
  box-sizing: border-box;
}
</style>
