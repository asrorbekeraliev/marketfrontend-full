<template>
    <div>
      <el-table
          :data="marketBaseList"
          border
          style="width: 90%; position: center; margin-top: 20px; margin-left: 45px;">
        <el-table-column
            prop="product.code"
            label="Product Code">
        </el-table-column>
        <el-table-column
            prop="product.name"
            label="Name">
        </el-table-column>
        <el-table-column
            prop="quantity"
            label="Quantity">
        </el-table-column>
        <el-table-column
            prop="price"
            label="Purchase Price">
        </el-table-column>
        <el-table-column
            prop="currentPrice"
            label="Selling Price">
        </el-table-column>
      </el-table>
    </div>
</template>

<script>
import axios from "axios";

export default {
    name: "MarketBaseList",
    data(){
      return{
        marketBaseList: []
      }
    },
  methods:{
      loadData(){
        axios
            .get("api/market-base")
            .then(res=>{
              console.log(res)
              this.marketBaseList = res.data.content
            })
      }
  },
  created() {
      this.loadData()
  }
}
</script>

<style scoped>

</style>