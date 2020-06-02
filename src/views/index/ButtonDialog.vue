<template>
  <div>
    <el-dialog v-bind="$attrs" :close-on-click-modal="false"
               :modal-append-to-body="false" v-on="$listeners" @open="onOpen" @close="onClose">
        <el-form ref="elForm" :model="formData" :rules="rules" size="small" label-width="100px">
            <el-form-item label="按钮名称" prop="label">
              <el-input v-model="formData.label" placeholder="请输入按钮名称" clearable/>
            </el-form-item>
            <el-form-item v-if="formData.buildIn === false" label="按钮编码" prop="key">
              <el-input v-model="formData.key" placeholder="请输入按钮编码" clearable>
              </el-input>
            </el-form-item>

            <el-form-item v-if="formData.key !== 'add'" label="按钮位置" prop="position">
              <el-radio-group v-model="formData.position" size="small">
                <el-radio-button v-for="posi in positions" :label="posi.label" :key="posi.label">{{posi.name}}</el-radio-button>
              </el-radio-group>
            </el-form-item>

            <el-form-item label="按钮样式" prop="type">
              <el-select v-model="formData.type" placeholder="请选择" size="small">
                <el-option label="主要" value="primary"><span style="color: #409eff;">主要</span></el-option>
                <el-option label="成功" value="success"><span style="color: #67c23a;">成功</span></el-option>
                <el-option label="信息" value="info"><span style="color: #909399;">信息</span></el-option>
                <el-option label="警告" value="warning"><span style="color: #e6a23c;">警告</span></el-option>
                <el-option label="危险" value="danger"><span style="color: #f56c6c;">危险</span></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="图标">
              <el-input v-model="formData.icon" placeholder="请输入前图标名称">
                <el-button slot="append" icon="el-icon-thumb" @click="openIconsDialog('icon')">
                  选择
                </el-button>
              </el-input>
            </el-form-item>

        </el-form>
      <div slot="footer">
        <el-button type="primary" @click="handelConfirm">确定</el-button>
        <el-button @click="close">取消</el-button>
      </div>
    </el-dialog>
    <icons-dialog :visible.sync="iconsVisible" :current="formData.icon" @select="setIcon" />
  </div>
</template>
<script>
  import IconsDialog from '@/views/index/IconsDialog'

  export default {
    components: {
      IconsDialog
    },
    props: ['current'],
    data() {
      return {
        iconsVisible: false,
        formData: {
          label: undefined,
          key: undefined,
          position: 'header',
          type: 'primary',
          icon: undefined,
          buildIn: false
        },
        rules: {
          label: [
            {
              required: true,
              message: '请输入按钮名称',
              trigger: 'blur'
            }
          ],
          key: [
            {
              required: true,
              message: '请输入按钮编码',
              trigger: 'blur'
            }
          ]
        },
        positions: [
          {label: 'header', name: '头部'},
          {label: 'line',   name: '行内'},
          {label: 'all', name: '全部'}
        ]

      }
    },
    computed: {

    },
    watch: {

    },
    created() {
    },
    mounted() {
    },
    methods: {
      onOpen() {
        if(this.current) this.formData = Object.assign({}, this.current)
      },
      onClose() {
      },
      close() {
        this.$emit('update:visible', false)
      },
      openIconsDialog() {
        this.iconsVisible = true
      },
      setIcon(val) {
        this.formData.icon = val
      },
      handelConfirm() {
        this.$refs.elForm.validate(valid => {
          if (!valid) return

          this.$emit('commit', this.formData)
          this.close()
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
</style>
