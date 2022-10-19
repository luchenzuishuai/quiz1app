<template>
  <div>
    <div style="background-color: lightblue;display: flex; align-items: center; justify-content: space-between; margin-bottom: 15px">
      <img src="https://oit.uta.edu/_images/_assets/oit-logo.png" alt="">
      <span style="font-weight: 700; color: white;">Name: Chen Lu, Id: 91906</span>
    </div>
    <el-card :body-style="{padding: '0 20px'}">
      <el-alert description="The table displays all data by default" title="Tip" type="warning" show-icon :closable="false">
      </el-alert>
      <!-- Ques1 -->
      <div class='ques1'>
        <!--  search for magnitude greater than 5.0 -->
        <span class="ques">Ques10: Give (location and id) of the largest one and smallest ones ("mag")</span>
        <el-button type="primary" icon="el-icon-search" size="mini" style="margin-left: 15px" @click="searchSmallest">search smallest</el-button>
        <el-button type="primary" icon="el-icon-search" size="mini" style="margin-left: 15px" @click="searchLargest">search largest</el-button>
      </div>
      <el-divider></el-divider>
      <!-- Ques2 -->
      <div class='ques2'>
        <span class="ques">Ques11: give two magnitude values (Low and High) and the number of partitions (called N),show the number of quakes between those Low and High values in N partitions, </span>
        <div>
          <el-row type="flex">
            <el-input v-model="lowMag" placeholder="input lowMag" size="small" style="width: 200px"></el-input>
            <el-input v-model="highMag" placeholder="input highMag" size="small" style="width: 200px"></el-input>
            <el-input v-model="partition" placeholder="input partition" size="small" style="width: 200px"></el-input>
            <el-button type="primary" icon="el-icon-search" size="mini" style="margin-left: 15px" @click="ques2Click">search</el-button>
          </el-row>
        </div>
      </div>
      <el-divider></el-divider>
      <!-- Ques3 -->
      <div class='ques3'>
        <span class="ques">Ques12: allow a user to give two location values (that is the lat and long for two different locations)
     and on a page show (list) the id, lat, long, time, net, and place (name)</span>
        <div>
          <!-- <el-select v-model="location" placeholder="select location" size="small">
            <el-option v-for="item in locationOptions" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select> -->
        </div>
      </div>
      <el-divider></el-divider>
      <!-- Ques4 -->
      <div class='ques4'>
        <span class="ques">Ques13:  allow a user to give net value, for example "pr" and you will show the most recent quakes
     (up to 6, maximum, if there are more than 1). Then allow a user to modify the location (change name) or delete (remove) that quake</span>
      </div>
      <el-divider></el-divider>
      <!-- show data table -->
      <el-table :data="dataList" border stripe style="width: 100%">
        <el-table-column prop="time" label="time"></el-table-column>
        <el-table-column prop="latitude" label="latitude"></el-table-column>
        <el-table-column prop="longitude" label="longitude"></el-table-column>
        <el-table-column prop="depth" label="depth"></el-table-column>
        <el-table-column prop="mag" label="mag"></el-table-column>
        <el-table-column prop="net" label="net"></el-table-column>
        <el-table-column prop="id" label="id"></el-table-column>
        <el-table-column prop="place" label="place"></el-table-column>
      </el-table>
      <el-row type="flex" justify="center" style="margin-top: 15px">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageInfo.current" :page-sizes="[5, 10, 50, 100]" :page-size="pageInfo.size" layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>
      </el-row>
    </el-card>

    <el-dialog title="Search Result" :visible.sync="ques1Show">
      <span style="color: red;font-weight: 700;font-size: 18px">{{'Total: ' + searchList.length}}</span>
      <el-table :data="searchList" border stripe style="width: 100%">
        <el-table-column prop="time" label="time"></el-table-column>
        <el-table-column prop="latitude" label="latitude"></el-table-column>
        <el-table-column prop="longitude" label="longitude"></el-table-column>
        <el-table-column prop="depth" label="depth"></el-table-column>
        <el-table-column prop="mag" label="mag"></el-table-column>
        <el-table-column prop="net" label="net"></el-table-column>
        <el-table-column prop="id" label="id"></el-table-column>
        <el-table-column prop="place" label="place"></el-table-column>
      </el-table>
    </el-dialog>

    <el-dialog title="Search Result" :visible.sync="ques2Show">
      <span style="color: red;font-weight: 700;font-size: 18px">{{'Total: ' + search2List.length}}</span>
      <el-select v-model="nPart" placeholder="select partition">
        <el-option @change="partitionChange" v-for="item in partition" :key="item" :label="item" :value="item">
        </el-option>
      </el-select>
      <el-table :data="search2List" border stripe style="width: 100%">
        <el-table-column prop="time" label="time"></el-table-column>
        <el-table-column prop="latitude" label="latitude"></el-table-column>
        <el-table-column prop="longitude" label="longitude"></el-table-column>
        <el-table-column prop="depth" label="depth"></el-table-column>
        <el-table-column prop="mag" label="mag" order></el-table-column>
        <el-table-column prop="net" label="net"></el-table-column>
        <el-table-column prop="id" label="id"></el-table-column>
        <el-table-column prop="place" label="place"></el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      dataList: [], // table data
      pageInfo: {
        size: 5,
        current: 1
      },
      total: 0,
      ques1Show: false,
      searchList: [],
      lowMag: 2.0,
      highMag: 5.0,
      partition: 3,
      search2All: [],
      search2List: [],
      ques2Show: false,
      nPart: ''
    }
  },
  async created () {
    this.getQuakesList()
  },
  methods: {
    async getQuakesList () {
      const { data } = await this.$http.get('/nquakes/fetchAll', {
        params: {
          pageNum: this.pageInfo.current,
          pageSize: this.pageInfo.size
        }
      })
      this.total = data.total
      console.log(data)
      this.dataList = data.records
    },
    handleSizeChange (newSize) {
      this.pageInfo.size = newSize
      this.getQuakesList()
    },
    handleCurrentChange (newCurrent) {
      this.pageInfo.current = newCurrent
      this.getQuakesList()
    },
    async searchSmallest () {
      const { data } = await this.$http.get('/nquakes/fetchSmallestQuakes', {
        params: {
          pageNum: 1,
          pageSize: -1
        }
      })
      this.searchList = data.records
      this.$message.success('Search success. Query results are updated in the table!')
      this.ques1Show = true
    },
    async searchLargest () {
      const { data } = await this.$http.get('/nquakes/fetchLargestQuakes')
      this.searchList = data.records
      this.$message.success('Search success. Query results are updated in the table!')
      this.ques1Show = true
    },
    async ques1Click () {
      const { data } = await this.$http.get('/quakes/countEarthquakes?magnitude=' + 5)
      this.$alert(`The number of earthquakes with a magnitude greater than 5.0 is <strong style="color: red">${data}</strong>.`, 'Ques1-Answer', {
        dangerouslyUseHTMLString: true,
        confirmButtonText: 'confirm',
        callback: action => {
          this.$message({
            type: 'info',
            message: 'close dialog~'
          })
        }
      })
    },
    async ques2Click () {
      const { data } = await this.$http.get('/nquakes/fetchPartitionQuakes', {
        params: {
          highMag: this.highMag,
          lowMag: this.lowMag,
          partition: this.partition
        }
      })
      this.search2All = data // 全部区间的列表
      this.search2List = data[0]
      this.$message.success('Search success. Query results are updated in the table!')
      this.ques2Show = true
    },
    partitionChange () {
      this.search2List = this.search2All[this.nPart - 1]
    },
    async ques5Click () {
      // 默认4.0级别，18点以后
      const { data } = await this.$http.get('/quakes/fetchNightQuakes')
      const str1 = 'Earthquakes with magnitude greater than 4.0 occur more at night than in other time periods'
      const str2 = 'Earthquakes with magnitude greater than 4.0 occur less at night than in other time periods'
      this.$alert(`<strong style="color: red">${data ? 'Yes, ' + str1 : 'No, ' + str2}</strong>`, 'Ques5-Answer', {
        dangerouslyUseHTMLString: true,
        confirmButtonText: 'confirm',
        callback: action => {
          this.$message({
            type: 'info',
            message: 'close dialog~'
          })
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.ques {
  color: red;
  font-weight: 700;
}

/deep/ .el-pagination__total {
  color: red;
  font-weight: 700;
}
</style>
