<template>
  <div>
    <h1 style="font-weight: bold;">GENERAL PRODUCT LIST</h1>
    <el-row :gutter="20">
        <el-col :span="16" :offset="4">

          <el-button type="primary" round @click = "dialogFormVisible = true" style="border-radius: 13px; margin-bottom: 20px; margin-top: 20px">Add New Product</el-button>


            <el-table
              :data="tableData"
              style="width: 100%; border-color: #042359; border: #042359; border-style: inset; border-width: thin; border-radius: 10px">
              <el-table-column
                  label="ID"
                  width="80">
                <template slot-scope="scope">
                  <span>{{ scope.row.id }}</span>
                </template>
              </el-table-column>
              <el-table-column
                  label="NAME"
                  width="180">
                <template slot-scope="scope">
                  <span style="margin-left: 0px">{{ scope.row.name }}</span>
                </template>
              </el-table-column>
                      <el-table-column
                          label="CODE"
                          width="180">
                        <template slot-scope="scope">
                          <span style="margin-left: 0px">{{ scope.row.code }}</span>
                        </template>
                      </el-table-column>
                      <el-table-column
                          label="TYPE"
                          width="180">
                        <template slot-scope="scope">
                          <span style="margin-left: 0px">{{ scope.row.type }}</span>
                        </template>
                      </el-table-column>
                      <el-table-column
                          label="STATUS"
                          width="180">
                        <template slot-scope="scope">
                          <span style="margin-left: 0px">{{ scope.row.status }}</span>
                        </template>
                      </el-table-column>
                      <el-table-column
                  label="OPERATIONS">
                <template slot-scope="scope">
                  <el-button
                      size="mini"
                      @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
                  <el-button
                      size="mini"
                      type="danger"
                      @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
                </template>
              </el-table-column>
    </el-table>
        </el-col>
    </el-row>

    <el-dialog title="Enter Product Details" :visible.sync="dialogFormVisible">
      <el-form :model="product">
            <el-form-item label="Product Name" :label-width="formLabelWidth">
              <el-input v-model="product.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="Product Code" :label-width="formLabelWidth">
              <el-input v-model="product.code" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="Product Type" :label-width="formLabelWidth">
              <el-select v-model="product.type" placeholder="Please select a type">
                <el-option label="KG" value="KG"></el-option>
                <el-option label="L" value="L"></el-option>
                <el-option label="PIECES" value="PIECES"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="Product Status" :label-width="formLabelWidth">
              <el-select v-model="product.status" placeholder="Please select a status" style="color: #042359">
                <el-option label="ACTIVE" value="ACTIVE"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
              <el-button @click="closeDialogForm()">Cancel</el-button>
              <el-button type="primary" @click="save()" :loading="loadingButton">Confirm</el-button>
          </span>
    </el-dialog>



  </div>
</template>

<script>
import axios from "axios";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Product",
  data() {
    return {
      tableData: [],
      dialogFormVisible: false,
      loadingButton: false,
      product: {
        id: null,
        name: null,
        code: null,
        status: null,
        type: null
      },
      formLabelWidth: '120px'
    }
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row);
      this.product = row
      this.dialogFormVisible = true
    },
    handleDelete(index, row) {
      this.$confirm('This will permanently delete the product. Continue?', 'Delete', {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        type: 'error'
      }).then(() => {
        this.deleteProduct(row.id)
        this.$message({
          type: 'success',
          center: true,
          message: 'Product has been deleted',
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          center: true,
          message: 'Delete canceled'
        });
      });
    },
    save(){
      this.loadingButton = true;
      axios.post("api/product", this.product)
          .then(res=>{
            console.log(res)
            this.loadData();
            this.loadingButton = false;
            this.closeDialogForm()
          })
      this.$message({
        type: 'success',
        center: true,
        message: 'Product saved',
      });
    },
    loadData(){
      axios
          .get("api/product")
          .then(res=>{
            this.tableData = res.data.content
          })
    },
    closeDialogForm(){
      this.dialogFormVisible = false
      this.product = {}
    },
    deleteProduct(id){
      axios.delete(`api/product/${id}`)
          .then(res=>{
            console.log(res)
            this.loadData()
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