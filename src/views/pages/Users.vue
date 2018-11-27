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
					type="primary"
					size="medium"
					@click="dialogVisibleCreate=true"
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
		              @click="openDialog(scope.row)"
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
    <el-dialog title="Editar usuario" :visible.sync="dialogVisibleUpdate">
			<el-row>
	      <form-user
	    		:user="userUpdate"
					:isCreate="false"
	    		v-on:processFormUser="processUpdate($event)"
	    		v-on:cancelFormUser="cancelUpdate"
	    	></form-user>
			</el-row>
    </el-dialog>
		<el-dialog title="Crear usuario" :visible.sync="dialogVisibleCreate">
			<el-row>
	      <form-user
	    		:user="userCreate"
					:isCreate="true"
	    		v-on:processFormUser="processCreate($event)"
	    		v-on:cancelFormUser="cancelCreate"
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
      userUpdate: {
        id: 0,
        nombre: '',
        apellido: '',
        username: '',
        email: '',
        sucursal_id: '',
      },
			userCreate : {
        nombre: '',
        apellido: '',
        username: '',
        email: '',
        sucursal_id: '',
				password: ''
			},
      dialogVisibleUpdate: false,
			dialogVisibleCreate: false,
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
    openDialog(user){
      this.userUpdate = {
        id: user.id,
        nombre: this.$options.filters.toUpperCaseWords(user.nombre),
        apellido: this.$options.filters.toUpperCaseWords(user.apellido),
        email: user.email,
        username: this.$options.filters.toUpperCaseWords(user.username),
        sucursal_id: (user.sucursal.id ? user.sucursal.id : '')
      }
      this.dialogVisibleUpdate = true
    },
    async processUpdate(user){
      const res = await this._updateUser(user)
      if(res.status === 'ok'){
        this.$message({
					message: 'Usuario actualizado correctamente',
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
		async processCreate(user){
			const res = await this._createUser(user)
      if(res.status === 'ok'){
        this.$message({
					message: 'Usuario creado correctamente. Su password fue enviado al correo especificado',
					type: 'success'
				})
        this.dialogVisibleCreate = false
      }else{
        this.$message.error('Oops. Hubo un error al procesar el formulario.')
      }
		},
		cancelCreate(){
			this.dialogVisibleCreate = false
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
