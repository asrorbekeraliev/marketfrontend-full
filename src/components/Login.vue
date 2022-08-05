<template>
  <div style="margin-top: 200px;">
    <el-row :gutter="20">
      <el-col :span="8" :offset="6" >
        <el-card shadow="always">
          <el-row :gutter="20">
            <el-col :span="12" :offset="6" style="padding-top: 25px; padding-bottom: 25px; ">
                <div class="grid-content bg-purple">
                  <el-input size="small" placeholder="Please input Login" v-model="loginVM.login"></el-input>
                  <el-input placeholder="Please input password"  size="small" v-model="loginVM.password" show-password style="margin-top: 15px"></el-input>
                </div>
            </el-col>
          </el-row>
          <el-row :gutter="20" style="margin-top: 15px; ">
            <el-col :span="10" :offset="8">
              <el-col :span="12">
                <el-checkbox v-model="loginVM.checked" style=" margin-left: -70px; padding-top: 10px; ">Eslab qolish</el-checkbox>
              </el-col>
              <el-col :span="12" style=" margin-right: -75px; padding-bottom: 15px">
                <el-button type="primary" plain @click="login">Login</el-button>
              </el-col>
            </el-col>
          </el-row>
        </el-card>
      </el-col>

    </el-row>


  </div>
</template>

<script>
import axios from "axios";
import AccountService from "@/account/account.service";
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Login",
  data(){
    return{
      loginVM: {
        login: null,
        password:null,
        checked: false
      }

    }
  },
  methods:{
    login(){
      axios.post('api/authenticate', this.loginVM)
          .then(res=>{
            const token = res.data.idToken;
            if (this.loginVM.checked){
              localStorage.setItem('market-token', token);
            }
            else {
              sessionStorage.setItem('market-token', token);
            }
            new AccountService(this.$route, this.$store).retrieveAccount();
            this.$router.push('/')
          })
    }
  }
}
</script>

<style scoped>

</style>