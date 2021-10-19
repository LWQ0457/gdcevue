<template>
  <div id="app">
    <h2
      style="color: #00a1ff; border-bottom: 1px solid #1e95ce; text-align: left"
    >
      企业资质认定
    </h2>
    <el-form
      id="form1"
      ref="loginForm"
      :model="form"
      :rules="loginRules"
      label-width="100px"
      label-position="left"
      style="margin-left:0px"
    >
      <el-row type="flex" justify="center">
        <el-col :span="6">
          <el-form-item label="企业名称：" prop="enterpriseName">
            <el-input v-model="form.enterpriseName" size="small" class="enterpriseName" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="法人代表：" prop="legalPerson">
            <el-input v-model="form.legalPerson" size="small" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="注册地区：" prop="registerArea">
            <el-input v-model="form.registerArea" size="small" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="注册资金：" prop="registerCapital">
            <el-input v-model="form.registerCapital" size="small" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col :span="6">
          <el-form-item label="联系人：" prop="contactName">
            <el-input v-model="form.contactName" size="small" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="联系电话：" prop="contactPhone">
            <el-input v-model="form.contactPhone" size="small" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="邮箱：" prop="mail">
            <el-input v-model="form.mail" size="small" />
          </el-form-item>
        </el-col>
        <el-col :span="6" />
      </el-row>

      <el-row type="flex" justify="center">
        <el-col :span="6">
          <el-form-item label="营业执照号：" prop="businessLicense">
            <el-upload
              ref="newupload"
              accept=".jpg,.jpeg,.png,.gif,.bmp,.pdf,.JPG,.JPEG,.PBG,.GIF,.BMP,.PDF"
              name="businessLicense"
              class="avatar-uploader"
              action="api/user/authentication/upload"
              multiple
              :auto-upload="false"
              :on-change="onSelectFile1"
              :limit="1"
            >
              <el-button
                slot="trigger"
                size="small"
                icon="el-icon-upload"
                style="margin-top: 5px;margin-left:-50px;"
              >选择上传文件　</el-button>

              <div slot="tip" class="el-upload__tip" style="margin-left: -50px">
                　　　　　只能上传jpg/png文件，且不超过500kb
              </div>
            </el-upload>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="组织机构代码:" prop="organizationCode">
            <el-upload
              ref="newupload"
              accept=".jpg,.jpeg,.png,.gif,.bmp,.pdf,.JPG,.JPEG,.PBG,.GIF,.BMP,.PDF"
              name="organizationCode"
              class="avatar-uploader"
              :auto-upload="false"
              :limit="1"
              action="api/user/authentication/upload"
              :on-change="onSelectFile2"
              multiple
            >
              　　<el-button
                  　　　　slot="trigger"
                  　　　　size="small"
                  　　　　icon="el-icon-upload"
                  　　　　style="margin-top: 5px;margin-left:-50px;"
                >选择上传文件 　　</el-button>

              <div slot="tip" class="el-upload__tip" style="margin-left: -50px">
                　　　　　只能上传jpg/png文件，且不超过500kb
              </div>
            </el-upload>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="税务登记号：" prop="taxRegistration">
            <el-upload
              ref="newupload"
              accept=".jpg,.jpeg,.png,.gif,.bmp,.pdf,.JPG,.JPEG,.PBG,.GIF,.BMP,.PDF"
              name="taxRegistration"
              class="avatar-uploader"
              action="api/user/authentication/upload"
              :auto-upload="false"
              :limit="1"
              multiple
              :on-change="onSelectFile3"
            >
              　　<el-button
                  　　　　slot="trigger"
                  　　　　size="small"
                  　　　　icon="el-icon-upload"
                  　　　　style="margin-top: 5px;margin-left:-50px;"
                >选择上传文件 　　</el-button>

              <div slot="tip" class="el-upload__tip" style="margin-left: -50px">
                　　　　　只能上传jpg/png文件，且不超过500kb
              </div>
            </el-upload>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="煤炭经营许可:" prop="coalBusinessLicense">
            <el-upload
              ref="newupload"
              accept=".jpg,.jpeg,.png,.gif,.bmp,.pdf,.JPG,.JPEG,.PBG,.GIF,.BMP,.PDF"
              name="coalBusinessLicense"
              action="api/user/authentication/upload"
              class="avatar-uploader"
              :auto-upload="false"
              :limit="1"
              multiple
              :on-change="onSelectFile4"
            >
              　　<el-button
                  　　　　slot="trigger"
                  　　　　size="small"
                  　　　　icon="el-icon-upload"
                  　　　　style="margin-top: 5px;margin-left:20px;"
                >选择上传文件 　　</el-button>

              <div slot="tip" class="el-upload__tip" style="margin-left: -50px">
                　　　　　请上传图片文件，且不超过2M
              </div>
            </el-upload>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col :span="5">
          <el-form-item>
            <el-button @click="submit">提交</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>
<script>
export default {
  name: 'Authentication',

  data() {
    var validatePass = function(rule, value, callback) {
      if (/^([1-9]\d{0,9}|0)([.]?|(\.\d{1,2})?)$/.test(value)) {
        callback()
      } else {
        callback(new Error('请输入正确的资金格式'))
      }
    }
    var validatePass2 = function(rule, value, callback) {
      if (/^(\(\d{3,4}\)|\d{3,4}-)?\d{7,8}$/.test(value)) {
        callback()
      } else {
        callback(new Error('请输入正确的电话格式'))
      }
    }
    var validatePass3 = function(rule, value, callback) {
      if (
        /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/.test(
          value
        )
      ) {
        callback()
      } else {
        callback(new Error('请输入正确的邮箱格式'))
      }
    }
    return {
      form: {
        enterpriseName: '',
        legalPerson: '',
        registerArea: '',
        registerCapital: '',
        contactName: '',
        contactPhone: '',
        mail: ''
      },
      formData: new FormData(),

      loginRules: {
        enterpriseName: [
          { required: true, message: '企业名不能为空' },
          { min: 2, max: 20, message: '请输入2-20个字符' }
        ],
        legalPerson: [
          { required: true, message: '法人代表不能为空不能为空' },
          { min: 2, max: 20, message: '请输入2-20个字符' }
        ],
        registerArea: [
          { required: true, message: '注册地区不能为空' },
          { min: 2, max: 20, message: '请输入2-20个字符' }
        ],
        registerCapital: [
          { required: true, message: '注册资金不能为空' },
          { validator: validatePass }
        ],
        contactName: [
          { required: true, message: '联系人不能为空' },
          { min: 2, max: 20, message: '请输入2-20个字符' }
        ],
        contactPhone: [
          { required: true, message: '联系电话不能为空' },
          { validator: validatePass2 }
        ],
        mail: [
          { required: true, message: '邮箱不能为空' },
          { validator: validatePass3 }
        ]
      }
    }
  },
  methods: {
    test() {
      this.$axios({
        url: 'api/user/testToken',
        methods: 'get',
        headers: { token: '2131231token', 'Access-Control-Allow-Origin': true },
        params: {
          info: 'test'
        }
      })
    },
    onSelectFile1(file) {
      this.formData.append('businessLicenseFile', file.raw)
    },
    onSelectFile2(file) {
      this.formData.append('organizationCodeFile', file.raw)
    },
    onSelectFile3(file) {
      this.formData.append('taxRegistrationFile', file.raw)
    },
    onSelectFile4(file) {
      this.formData.append('coalBusinessLicenseFile', file.raw)
    },
    submit() {
      this.$refs['loginForm'].validate((valid) => {
        if (valid) {
          this.formData.append('enterprise', JSON.stringify(this.form))
          const xhr = new XMLHttpRequest()
          xhr.open('POST', 'api/user/authentication/upload')
          xhr.setRequestHeader('Access-Control-Allow-Origin', true)
          var token = localStorage.getItem('token')
          xhr.setRequestHeader('token', token)
          xhr.onreadystatechange = () => {
            console.log(xhr.response)

            if (xhr.readyState === 7) {
              var response = JSON.parse(xhr.response)
              if (response === 200) {
                console.log(xhr.response)
                this.$message.success('提交成功')
              }
              if (response === 201) {
                this.$message.warning('该账户已提交企业认证信息,提交失败!')
              }
              if (response === 202) {
                this.$message.warning('参数信息不能为空')
              }
              if (response === 203) {
                this.$message.warning('文件上传失败')
              } else {
                console.log(xhr.response)
              }
            }
          }
          console.log(JSON.stringify(this.form))
          xhr.send(this.formData)
        } else {
          console.log('error submit!!')
          return false
        }
      })
    } // 上传时，判断文件的类型及大小是否符合规则

    // onSelectFile1(file) {
    //   const isJPG =
    //     file.type === 'image/jpeg' ||
    //     file.type === 'image/png' ||
    //     file.type === 'image/jpg'
    //   const isLt2M = file.size / 1024 / 1024 < 2
    //   if (!isJPG) {
    //     this.$message.warning('上传头像图片只能是 JPG/PNG/JPEG 格式!')
    //     return isJPG
    //   }
    //   if (!isLt2M) {
    //     this.$message.warning('上传图片大小不能超过 2MB!')
    //     return isLt2M
    //   }
    //   this.multfileImg = file
    //   return isJPG && isLt2M
    // }
  }
}
</script>
<style>
#form1  {
    margin: 0,auto;
  }
</style>
