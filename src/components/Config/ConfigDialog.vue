<template lang="html">
  <el-dialog
    :show-close="true"
    :visible="visible"
    title="Configuraciones generales"
    @close="$emit('closeDialog')"
    center
    :append-to-body="true"
  >
    <div class="block">
      <el-collapse>
        <el-collapse-item title="Descuentos" name="1">
          <el-row :gutter="20">
            <el-col :span="8">
      				<ul>
      					<li
                  v-for="descuento in _descuentos"
                  :key="descuento.id"
                  @click="updateDescuento(descuento)"
                >
                  {{descuento.descripcion | toUpperCaseWords}}
                </li>
      				</ul>
            </el-col>
            <el-col :span="16">
              <div>
                <h3>{{actionDescuento === 'create' ? 'Crear Descuento' : 'Actualizar Descuento'}}</h3>
              </div>
              <el-form
                ref="formDescuento"
                label-position="left"
                class="col-p"
                :model="descuentoForm"
                :rules="rulesDescuento"
                autocomplete="off"
              >
                <el-row>
                  <el-col :span="24">
        						<el-form-item label="Descripción" prop="descripcion">
        							<el-input size="mini" v-model="descuentoForm.descripcion"/>
        						</el-form-item>
        					</el-col>
                </el-row>
                <el-row :gutter="20">
                  <el-col :span="10">
        						<el-form-item label="Monto" prop="monto">
        							<el-input size="mini" v-model="descuentoForm.monto_descuento" />
        						</el-form-item>
        					</el-col>
                  <el-col :span="4">
                    <span>- o -</span>
                  </el-col>
                  <el-col :span="10">
        						<el-form-item label="Porcentaje">
        							<el-input size="mini" v-model="descuentoForm.porcentaje_descuento"/>
        						</el-form-item>
        					</el-col>
                </el-row>
                <el-row>
                  <el-col :span="24">
                    <el-form-item label="Fecha inicio" prop="fechaInicio">
                      <el-date-picker
                        v-model="descuentoForm.fecha_inicio"
                        type="date"
                        placeholder="Seleccione una fecha"
                        format="dd/MM/yyyy"
                        value-format="yyyy/MM/dd"
                        size="mini"
                        >
                      </el-date-picker>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="24">
                    <el-form-item label="Fecha fin">
                      <el-date-picker
                        v-model="descuentoForm.fecha_fin"
                        type="date"
                        placeholder="Seleccione una fecha"
                        format="dd/MM/yyyy"
                        value-format="yyyy/MM/dd"
                        size="mini"
                        >
                      </el-date-picker>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="24">
                    <el-button type="primary" size="mini" @click="validateBeforeSubmit">
                      {{actionDescuento === 'create' ? 'Crear' : 'Actualizar'}}
              			</el-button>
                    <el-button
                      type="danger"
                      size="mini"
                      @click="cancelFormDescuento"
                      v-show="actionDescuento === 'update'"
                    >
                      Cancelar
              			</el-button>
                  </el-col>
                </el-row>
              </el-form>
            </el-col>
          </el-row>
        </el-collapse-item>
        <el-collapse-item title="Medios de pagos" name="2">
          <div>Operation feedback: enable the users to clearly perceive their operations by style updates and interactive effects;</div>
          <div>Visual feedback: reflect current state by updating or rearranging elements of the page.</div>
        </el-collapse-item>
      </el-collapse>
    </div>
  </el-dialog>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  name: 'Config',
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data(){
    return {
      descuentoForm: {},
      actionDescuento: 'create',
      rulesDescuento: {
				descripcion: [
					{required: true, message: 'Por favor ingresa una descripción', trigger: 'blur'}
				],
        monto: [
					{
						validator: (rule, value, callback) => {
							if(!this.descuentoForm.monto_descuento && !this.descuentoForm.porcentaje_descuento)
                callback('Se debe especificar o un monto o un porcentaje')
							else callback()
						},
						trigger: 'blur'
					}
				],
        fechaInicio: [
          {validator: (rule, value, callback) => {
            if(!this.descuentoForm.fecha_inicio)
              callback('Por favor ingresa una fecha de inicio')
            else callback()
          }, trigger: 'change'}
        ]
			}
    }
  },
  computed: {
    ...mapGetters({
      _descuentos: 'descuento/all'
    })
  },
  mounted(){
    this.$store.dispatch('descuento/get')
  },
  methods: {
    validateBeforeSubmit(){
      this.$refs['formDescuento'].validate(async(valid) => {
        if(!valid){
          this.$message.error('Oops. Hubo un error al procesar el formulario.')
        }else{
          let res = null
          let message = ''

          if(!this.descuentoForm.id){
            res = await this.$store.dispatch('descuento/create', this.descuentoForm)
            message = 'Descuento agregado correctamente'
          }else{
            res = await this.$store.dispatch('descuento/update', this.descuentoForm)
            message = 'Descuento modificado correctamente'
          }

          if(res.status === 'ok'){
            this.$message({message, type: 'success'})
            this.$refs['formDescuento'].resetFields()
            this.descuentoForm = {}
          }else{
            this.$message.error('Oops. Hubo un error al procesar el formulario.')
          }
        }
      })
    },
    updateDescuento(descuento){
      this.descuentoForm = {
        id: descuento.id,
        descripcion: descuento.descripcion,
        monto_descuento: descuento.monto_descuento,
        porcentaje_descuento: descuento.porcentaje_descuento,
        fecha_inicio: descuento.fecha_inicio,
        fecha_fin: descuento.fecha_fin
      }
      this.actionDescuento = 'update'
    },
    cancelFormDescuento(){
      this.descuentoForm = {}
      this.actionDescuento = 'create'
    }
  }
}
</script>
<style lang="scss" scoped>
.block {
  padding: 20px;
}
.col-p {
	padding: 0 10px;
	box-sizing: border-box;
}
@media (max-width: 768px) {code{font-size: 70%;}}
</style>
