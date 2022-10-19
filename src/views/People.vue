<template>
  <div>
     <el-input style="width: 150px"
    placeholder="input name"
    v-model="searchName">
    <i slot="prefix" class="el-input__icon el-icon-search"></i>
  </el-input>
  <el-button @click="search" type="primary">search</el-button>
    <el-table :data="peopleList" border style="width: 100%">
      <el-table-column prop="name" label="Name" align="center"></el-table-column>
      <el-table-column prop="height" label="Height" width="180" align="center"></el-table-column>
      <el-table-column prop="author" label="Author" width="180" align="center"></el-table-column>
      <el-table-column prop="picture" label="Picture" align="center"></el-table-column>
      <el-table-column prop="keywords" label="Keywords" align="center"></el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  async created () {
    // 人员列表数据
    const { data } = await this.$http.get('/data/fetchList')
    console.log(data)
    this.peopleList = data
  },
  data () {
    return {
      peopleList: [],
      searchName: ''
    }
  },
  methods: {
    async search () {
      const { data } = await this.$http.get(`/data/fetchByName/${this.searchName}`)
      // console.log(res)
      this.peopleList = data
    }
  }
}
</script>

<style>
</style>
