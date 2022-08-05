<template>
  <div>
    <el-row>
      <el-col :span="16">

        <el-row style="margin-bottom: 20px">
          <el-col :span="12">
            <el-input size="mini"
                      v-model="productCode"
                      placeholder="Please, enter the product code"
                      style="width: 450px">
            </el-input>
          </el-col>
          <el-col :span="12">
            <el-input size="mini"
                      v-model="quantityPayment"
                      @keyup.enter.native="getProduct()"
                      placeholder="Please, enter the quantity"
                      style="width: 450px">
            </el-input>
          </el-col>
        </el-row>




        <el-table
            :data="paymentList"
            border
            style="width: 100%">

          <el-table-column
              prop="productName"
              label="Product Name"
              width="280">
          </el-table-column>
          <el-table-column
              prop="quantity"
              label="Quantity">
          </el-table-column>
          <el-table-column
              prop="summa"
              label="Summa">
            <template #default="{row}">
              <span>
                {{row.sum}}
              </span>
            </template>
          </el-table-column>
          <el-table-column
              prop="delete"
              label="Delete"
              width="100">
            <template #default="{row}">
            <el-button type="danger" icon="el-icon-delete" circle @click="deleteRow(row)" style="position: center"></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>

      <el-col :span="8">
        Press this button to make cheque
        <br>
        <el-button type="success" plain style="margin-top: 20px" @click="sell()">Done</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "PaymentList",
  data(){
    return{
      paymentList: [],
      registeredItems: [],
      productCode: null,
      quantityPayment:null,
      pack: [],
      marketBase:{
        currentPrice:null,
        price:null,
        quantity:null,
        productId: null,
        productName: null,
        sum: null,
      },

    }
  },
  methods:{
    getProduct(){
      axios
          .get(`api/market-base/get/product?code=${this.productCode}&quantity=${this.quantityPayment}`)
          .then(res=>{
            if (res.data == null || res.data == undefined || res.data == ''){
              alert('No Product')
              this.productCode = null
              this.quantityPayment = null
              return
            }  // alert: product not found
            this.marketBase = res.data;
            const index = this.registeredItems.indexOf(this.marketBase.productName)
            if (index > -1){
              this.marketBase.quantity += this.paymentList[index].quantity
              this.marketBase.sum += this.paymentList[index].sum
              this.paymentList.push(this.marketBase);
              this.registeredItems.push(this.marketBase.productName)
              this.deleteRow(index)
            } else {
              this.paymentList.push(this.marketBase);
              this.registeredItems.push(this.marketBase.productName)
            }
            this.marketBase = {}
            this.productCode = null;
            this.quantityPayment = null
          })
    },
    deleteRow(row){
        this.paymentList.splice(row, 1)
        this.registeredItems.splice(row, 1)
    },
    sell(){
      this.pack.push(this.paymentList[0].productId);
      this.pack.push(this.paymentList[0].quantity);
      console.log(this.pack)
      axios
          .post("api/market-base/sell", this.pack)
          .then(res=>{
            console.log(res)
          })

      this.paymentList = []

    }
  }
}
</script>

<style scoped>

</style>