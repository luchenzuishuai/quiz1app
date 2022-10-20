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
        <span class="ques">Ques11: Give two magnitude values (Low and High) and the number of partitions (called N),show the number of quakes between those Low and High values in N partitions, </span>
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
        <span class="ques">Ques12: Allow a user to give two location values (that is the lat and long for two different locations)
          and on a page show (list) the id, lat, long, time, net, and place (name)</span>
        <div>
          <el-row type="flex">
            <el-input v-model="ques3Info.longitude1" placeholder="input longitude1" size="small" style="width: 200px"></el-input>
            <el-input v-model="ques3Info.latitude1" placeholder="input latitude1" size="small" style="width: 200px"></el-input>
            <el-input v-model="ques3Info.longitude2" placeholder="input longitude2" size="small" style="width: 200px"></el-input>
            <el-input v-model="ques3Info.latitude2" placeholder="input latitude2" size="small" style="width: 200px"></el-input>
            <el-button type="primary" icon="el-icon-search" size="mini" style="margin-left: 15px" @click="ques3Click">search</el-button>
          </el-row>
        </div>
      </div>
      <el-divider></el-divider>
       <!-- Ques3.5 -->
      <div class='ques3'>
        <span class="ques">Ques12.5: Allow a user to also specify High and Low mag values, only give results within those values.</span>
        <div>
          <el-row type="flex">
            <el-input v-model="ques3AddInfo.longitude1" placeholder="input longitude1" size="small" style="width: 200px"></el-input>
            <el-input v-model="ques3AddInfo.latitude1" placeholder="input latitude1" size="small" style="width: 200px"></el-input>
            <el-input v-model="ques3AddInfo.longitude2" placeholder="input longitude2" size="small" style="width: 200px"></el-input>
            <el-input v-model="ques3AddInfo.latitude2" placeholder="input latitude2" size="small" style="width: 200px"></el-input>
            <el-input v-model="ques3AddInfo.lowMag" placeholder="input lowMag" size="small" style="width: 200px"></el-input>
            <el-input v-model="ques3AddInfo.highMag" placeholder="input highMag" size="small" style="width: 200px"></el-input>
            <el-button type="primary" icon="el-icon-search" size="mini" style="margin-left: 15px" @click="ques3AddClick">search</el-button>
          </el-row>
        </div>
      </div>
      <el-divider></el-divider>
      <!-- Ques4 -->
      <div class='ques4'>
        <span class="ques">Ques13: Allow a user to give net value, for example "pr" and you will show the most recent quakes
          (up to 6, maximum, if there are more than 1). Then allow a user to modify the location (change name) or delete (remove) that quake</span>
        <el-input v-model="net" placeholder="input net" size="small" style="width: 200px"></el-input>
        <el-button type="primary" icon="el-icon-search" size="mini" style="margin-left: 15px" @click="ques4Click">search</el-button>
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
      <el-table :data="searchList" border stripe style="width: 100%" height="550">
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

    <el-dialog title="Search Result" :visible.sync="ques2Show" @close="ques2Close">
      <span style="color: red;font-weight: 700;font-size: 18px">{{'Total: ' + search2List.length}}</span>
      <span style="margin-left: 15px;font-weight: 700">select partition: </span>
      <el-select v-model="nPart" placeholder="select partition" @change="partitionChange">
        <el-option v-for="item in Number(partition)" :key="item" :value="item">
        </el-option>
      </el-select>
      <div style="margin-left: 15px;font-weight: 700;color: pink">Notes: Click the header mag to sort and view the maximum value (Default descending order)</div>
      <el-table v-loading="ques2Loading" :data="search2List" border stripe style="width: 100%" height="550">
        <el-table-column prop="time" label="time"></el-table-column>
        <el-table-column prop="latitude" label="latitude"></el-table-column>
        <el-table-column prop="longitude" label="longitude"></el-table-column>
        <el-table-column prop="depth" label="depth"></el-table-column>
        <el-table-column prop="mag" sortable label="mag"></el-table-column>
        <el-table-column prop="net" label="net"></el-table-column>
        <el-table-column prop="id" label="id"></el-table-column>
        <el-table-column prop="place" label="place"></el-table-column>
      </el-table>
    </el-dialog>

    <el-dialog title="Search Result" :visible.sync="ques3Show">
      <span style="color: red;font-weight: 700;font-size: 18px">{{'Total: ' + search3List.length}}</span>
      <el-table v-loading="ques3Loading" :data="search3List" border stripe style="width: 100%" height="550">
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

    <el-dialog title="Search Result" :visible.sync="ques3AddShow">
      <span style="color: red;font-weight: 700;font-size: 18px">{{'Total: ' + search3AddList.length}}</span>
      <el-table v-loading="ques3AddLoading" :data="search3AddList" border stripe style="width: 100%" height="550">
        <el-table-column prop="time" label="time"></el-table-column>
        <el-table-column prop="latitude" label="latitude"></el-table-column>
        <el-table-column prop="longitude" label="longitude"></el-table-column>
        <el-table-column prop="depth" label="depth"></el-table-column>
        <el-table-column prop="mag" label="mag" sortable></el-table-column>
        <el-table-column prop="net" label="net"></el-table-column>
        <el-table-column prop="id" label="id"></el-table-column>
        <el-table-column prop="place" label="place"></el-table-column>
      </el-table>
    </el-dialog>

    <el-dialog title="Search Result" :visible.sync="ques4Show">
      <span style="color: red;font-weight: 700;font-size: 18px">{{'Total: ' + search4List.length}}</span>
      <el-table v-loading="ques4Loading" :data="search4List" border stripe style="width: 100%" height="550">
        <el-table-column prop="time" label="time"></el-table-column>
        <el-table-column prop="latitude" label="latitude"></el-table-column>
        <el-table-column prop="longitude" label="longitude"></el-table-column>
        <el-table-column prop="depth" label="depth"></el-table-column>
        <el-table-column prop="mag" label="mag" sortable></el-table-column>
        <el-table-column prop="net" label="net" width="50"></el-table-column>
        <el-table-column prop="id" label="id"></el-table-column>
        <el-table-column prop="place" label="place"></el-table-column>
        <el-table-column label="operation">
          <template v-slot="{row}">
            <el-row type="flex">
              <el-button type="warning" icon="el-icon-edit" size="mini" circle @click="editLocation(row)"></el-button>
              <el-button type="danger" icon="el-icon-delete" size="mini" circle @click="deleteQuake(row.id)"></el-button>
            </el-row>
          </template>
        </el-table-column>
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
      // 问题1对应的参数
      ques1Show: false,
      searchList: [],
      // 问题2对应的参数,2 5 4 low high partition
      lowMag: '',
      highMag: '',
      partition: '',
      search2All: [],
      search2List: [],
      ques2Show: false,
      nPart: 1, // 默认看第一个区间
      ques2Loading: false,
      // 问题3对应的参数
      ques3Info: {
        latitude1: '',
        latitude2: '',
        longitude1: '',
        longitude2: '',
        pageNum: 1,
        pageSize: -1
      },
      search3List: [],
      ques3Show: false,
      ques3Loading: false,
      // 问题3.5对应的参数(额外的加分)
      ques3AddInfo: {
        latitude1: '',
        latitude2: '',
        longitude1: '',
        longitude2: '',
        pageNum: 1,
        pageSize: -1,
        highMag: '',
        lowMag: ''
      },
      search3AddList: [],
      ques3AddShow: false,
      ques3AddLoading: false,
      // 问题4对应的参数
      ques4Loading: false,
      search4List: [],
      ques4Show: false,
      net: ''
    }
  },
  async created () {
    this.getQuakesList()
  },
  mounted () {
    this.$notify({
      title: 'Hello',
      message: '😀Have a good day~',
      type: 'success',
      duration: 3000
    })
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
      this.ques1Show = true
      this.$message({ message: 'Search success. Query results are updated in the table!', type: 'success', customClass: 'messageIndex' })
    },
    async searchLargest () {
      const { data } = await this.$http.get('/nquakes/fetchLargestQuakes')
      this.searchList = data.records
      this.ques1Show = true
      this.$message({ message: 'Search success. Query results are updated in the table!', type: 'success', customClass: 'messageIndex' })
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
      this.ques2Show = true
      this.ques2Loading = true
      const { data } = await this.$http.get('/nquakes/fetchPartitionQuakes', {
        params: {
          highMag: this.highMag,
          lowMag: this.lowMag,
          partition: this.partition
        }
      })
      this.search2All = data // 全部区间的列表
      this.search2List = data[0]
      this.$nextTick(() => {
        this.ques2Loading = false
        this.$message.success('Search success. Query results are updated in the table!')
      })
    },
    partitionChange () {
      this.search2List = this.search2All[this.nPart - 1]
      console.log(this.search2List)
    },
    ques2Close () {
      // 重置查看的区间序号为1
      this.nPart = 1
    },
    async ques3Click () {
      this.ques3Show = true
      this.ques3Loading = true
      const { data } = await this.$http.get('/nquakes/fetchQuakesBetweenTwoLocaltion', {
        params: {
          ...this.ques3Info // (-142.32 , 21.2223) (63.2254 , -42.8974)
        }
      })
      this.search3List = data.records
      this.$nextTick(() => {
        this.ques3Loading = false
        this.$message.success('Search success. Query results are updated in the table!')
      })
    },
    async ques3AddClick () {
      this.ques3AddShow = true
      this.ques3AddLoading = true
      const { data } = await this.$http.get('/nquakes/fetchQuakesBetweenTwoLocaltion', {
        params: {
          ...this.ques3AddInfo // (-142.32 , 21.2223) (63.2254 , -42.8974)
        }
      })
      this.search3AddList = data.records
      this.$nextTick(() => {
        this.ques3AddLoading = false
        this.$message.success('Search success. Query results are updated in the table!')
      })
    },
    async ques4Click () {
      this.ques4Show = true
      this.ques4Loading = true
      const { data } = await this.$http.get('/nquakes/fetchQuakesFilteredByNet', {
        params: {
          net: this.net
        }
      })
      this.search4List = data
      this.$nextTick(() => {
        this.ques4Loading = false
        this.$message.success('Search success. Query results are updated in the table!')
      })
    },
    async editLocation (quake) {
      try {
        const { value } = await this.$prompt('input name ', 'edit loaction') // {value: '123', action: 'confirm'}
        // 提交更新
        await this.$http.post('/nquakes/modifyNQuake', { ...quake, place: value })
        // 刷新数据
        const { data } = await this.$http.get('/nquakes/fetchQuakesFilteredByNet', {
          params: {
            net: this.net
          }
        })
        this.search4List = data
        this.$message.success('Successfully modified')
      } catch {
        this.$message({
          type: 'info',
          message: 'cancel input'
        })
      }
    },
    async deleteQuake (id) {
      await this.$http.delete('/nquakes/removeNQuake', {
        params: {
          id
        }
      })
      // 刷新数据
      const { data } = await this.$http.get('/nquakes/fetchQuakesFilteredByNet', {
        params: {
          net: this.net
        }
      })
      this.search4List = data
      this.$message.success('Successfully deleted')
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
