<template>
    <div>
        <el-row style="margin-top: -20px;">
            <el-col :span="12" style="margin-top: 35px">
                <el-input
                size="mini"
                v-model="productCode"
                @keyup.enter.native="onEnter()"
                placeholder="Please, enter product code"
                style="width: 100%; max-width: 500px; margin-bottom: 25px">
                </el-input>
              <br>
              <span v-if="hasProduct">
                  <el-col :span="6" >{{ product.code }}</el-col>
                  <el-col :span="6" style="border-left: 1px dashed black; min-height: 50px">{{product.name}}</el-col>
                  <el-col :span="4" style="border-left: 1px dashed black; min-height: 50px">
                      <el-input size="mini" style="width: 120px" v-model="marketBase.quantity"></el-input>
                  </el-col>
                  <el-col :span="4" style="border-left: 1px dashed black; min-height: 50px">
                      <el-input size="mini" style="width: 120px" v-model="marketBase.price"></el-input>
                  </el-col>
                  <el-col :span="4" style="border-left: 1px dashed black; min-height: 50px">
                      <el-input size="mini" style="width: 120px" v-model="marketBase.currentPrice" @keyup.enter.native="addMarketBase()"></el-input>
                  </el-col>
              </span>
            </el-col>


            <el-col :span="12" style="border-left: 1px solid black; min-height: 500px">
              <el-button type="success" style="margin-top: 30px; float: right; margin-bottom: 20px; margin-right: 30px" @click="saveData()">Register</el-button>
              <el-table
                  :data="marketBaseList"
                  border
                  style="width: 90%; position: center; margin-top: 20px; margin-left: 45px;">
                <el-table-column
                    prop="product.code"
                    label="Product Code"
                    width="150">
                </el-table-column>
                <el-table-column
                    prop="product.name"
                    label="Name"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="quantity"
                    label="Quantity"
                    width="100">
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
            </el-col>
        </el-row>
    </div>

</template>

<script>
    import axios from "axios";

    export default {
        name: "MarketBase",
        data() {
            return {
                marketBaseList: [],
                marketBase: {
                  quantity: null,
                  price: null,
                  currentPrice: null,
                  product: {
                    id: null,
                    name: null,
                    code: null
                  }
                },
                productCode: null,
                hasProduct: false,
                product: null

            }
        },
        methods: {
            getProduct(){
                axios
                    .get(`api/product/code?code=${this.productCode}`)
                    .then(res=>{
                      if (res.data != null && res.data != undefined && res.data != ''){
                        this.hasProduct = true;
                        this.product = res.data;
                        this.marketBase.product = res.data;
                      }
                    })
            },
            onEnter(){
                this.getProduct()
            },
            addMarketBase(){
              this.marketBaseList.push(this.marketBase)
              this.marketBase = {}
              this.product = {}
              this.hasProduct = false;
              this.productCode = null
            },
            saveData(){
              axios
                  .post("api/market-base/list", this.marketBaseList)
                  .then(res=>{
                    console.log(res)
                    this.marketBaseList = []

                  })
            }
        }
    }
</script>

<style scoped>
label {
  color: navy;
  background-color: #003576;
}

</style>