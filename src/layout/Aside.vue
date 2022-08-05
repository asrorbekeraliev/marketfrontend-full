<template>
  <div>
    <el-aside width="200px" v-if="hasAnyAuth('ROLE_ADMIN') && authenticated">
<!--      Faqat 'ROLE_ADMIN' bo'lsagina Aside ochiladi   -->
      <el-menu style="padding-top: 70px; padding-bottom: 70px; background-color: #d9edf7">
        <el-submenu index="1">
          <template v-slot:title><i class="el-icon-s-cooperation"></i>Ma'lumotlar</template>
          <el-menu-item-group>
            <el-menu-item index="1-1"><router-link to="/product">All Products</router-link></el-menu-item>
            <el-menu-item index="1-2"><router-link to="/market-base">Register Products to Store</router-link></el-menu-item>
            <el-menu-item index="1-3"><router-link to="/market-base/list">Available Products in Store</router-link></el-menu-item>
            <el-menu-item index="1-4"><router-link to="/payment-list">Sale</router-link></el-menu-item>
          </el-menu-item-group>

        </el-submenu>
        <el-submenu index="2">
          <template v-slot:title><i class="el-icon-menu"></i>Navigator Two</template>
          <el-menu-item-group>
            <template v-slot:title>Group 1</template>
            <el-menu-item index="2-1">Option 1</el-menu-item>
            <el-menu-item index="2-2">Option 2</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="Group 2">
            <el-menu-item index="2-3">Option 3</el-menu-item>
          </el-menu-item-group>
          <el-submenu index="2-4">
            <template v-slot:title>Option 4</template>
            <el-menu-item index="2-4-1">Option 4-1</el-menu-item>
          </el-submenu>
        </el-submenu>
      </el-menu>
    </el-aside>
  </div>
</template>

<script>
import AccountService from "@/account/account.service";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Aside",
  data(){
    return{
      hasAnyAuthorityValue : false
    }
  },
  computed:{
    authenticated(){
      return this.$store.getters.authenticated;
    }
  },
  methods:{
    hasAnyAuth(authorities){
        new AccountService(this.$router, this.$store)
            .hasAnyAuthorityAndAuth(authorities)
            .then(value => {
              this.hasAnyAuthorityValue = value;
            });
        return this.hasAnyAuthorityValue;
    }
  }
}
</script>

<style scoped>
.el-submenu, .el-menu-item, .el-menu-item-group {
  background-color: #d9edf7
             }

</style>