<template>
  <div>
    <div style="background-color: lightblue;display: flex; align-items: center; justify-content: space-between; margin-bottom: 15px">
      <img src="https://oit.uta.edu/_images/_assets/oit-logo.png" alt="">
      <span style="font-weight: 700; color: white">Name: Chen Lu, Id: 91906</span>
    </div>
    <el-card :body-style="{padding: '0 20px'}">
      <!-- Ques1 -->
      <div class='ques1'>
        <!--  search for magnitude greater than 5.0 -->
        <span class="ques">Ques1: Search for and count all earthquakes that occurred with a magnitude greater than 5.0</span>
        <el-button type="primary" icon="el-icon-search" size="mini" style="margin-left: 15px" @click="ques1Click">search</el-button>
      </div>
      <el-divider></el-divider>
      <!-- Ques2 -->
      <div class='ques2'>
        <span class="ques">Ques2: Search for 2.0 to 2.5, 2.5 to 3.0, etc magnitude quakes for a one week,a range of days or the whole 30 days</span>
        <div>
          <el-select v-model="magnitude" placeholder="select magnitude" size="small">
            <el-option v-for="item in magnitudeOptions" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
          <el-date-picker format="yyyy-MM-dd" value-format="yyyy-MM-dd" size="small" style="margin-left: 15px" v-model="dateRange" type="daterange" range-separator="-" start-placeholder="startDate" end-placeholder="endDate">
          </el-date-picker>
          <el-button type="primary"  icon="el-icon-search" size="mini" style="margin-left: 15px" @click="ques2Click">search</el-button>
        </div>
      </div>
      <el-divider></el-divider>
      <!-- Ques3 -->
      <div class='ques3'>
        <span class="ques">Ques3: Find earthquakes that were near (20 km, 50 km?) of a specified location</span>
        <div>
          <!-- <el-select v-model="location" placeholder="select location" size="small">
            <el-option v-for="item in locationOptions" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select> -->
          <el-select style="margin-left: 15px" v-model="distance" placeholder="select distance" size="small">
            <el-option v-for="item in distanceOptions" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
          <el-button type="primary" icon="el-icon-search" size="mini" style="margin-left: 15px">search</el-button>
        </div>
      </div>
      <el-divider></el-divider>
      <!-- Ques4 -->
      <div class='ques4'>
        <span class="ques">Ques4: Find clusters of earthquakes</span>
        <el-button type="primary" icon="el-icon-view" size="mini" style="margin-left: 15px">show graph</el-button>
      </div>
      <el-divider></el-divider>
      <!-- Ques5 -->
      <div class='ques5'>
        <span class="ques">Ques5: Do large (>4.0 mag) occur more often at night?</span>
        <el-button type="primary" icon="el-icon-view" size="mini" style="margin-left: 15px" @click="ques5Click">show answer</el-button>
      </div>
      <el-divider></el-divider>
      <!-- show data table -->
      <el-table :data="dataList" border stripe style="width: 100%">
        <el-table-column prop="time" label="time"></el-table-column>
        <el-table-column prop="latitude" label="latitude"></el-table-column>
        <el-table-column prop="longitude" label="longitude"></el-table-column>
        <el-table-column prop="depth" label="depth"></el-table-column>
        <el-table-column prop="mag" label="mag"></el-table-column>
        <el-table-column prop="magType" label="magType"></el-table-column>
        <el-table-column prop="nst" label="nst"></el-table-column>
        <el-table-column prop="gap" label="gap"></el-table-column>
        <el-table-column prop="dmin" label="dmin"></el-table-column>
        <el-table-column prop="rms" label="rms"></el-table-column>
        <el-table-column prop="updated" label="updated"></el-table-column>
        <el-table-column prop="place" label="place"></el-table-column>
        <el-table-column prop="type" label="type"></el-table-column>
        <el-table-column prop="horizontalError" label="horizontalError"></el-table-column>
        <el-table-column prop="depthError" label="depthError"></el-table-column>
        <el-table-column prop="magError" label="magError"></el-table-column>
        <el-table-column prop="magNst" label="magNst"></el-table-column>
        <el-table-column prop="locationSource" label="locationSource"></el-table-column>
        <el-table-column prop="magSource" label="status"></el-table-column>
      </el-table>
      <el-row type="flex" justify="center" style="margin-top: 15px">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageInfo.current" :page-sizes="[5, 10, 50, 100]" :page-size="pageInfo.size" layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>
      </el-row>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      dataList: [], // table data
      magnitudeOptions: [
        {
          value: '2.0-2.5',
          label: '2.0-2.5'
        },
        {
          value: '2.5-3.0',
          label: '2.5-3.0'
        }
      ],
      durationOptions: [
        {
          value: 'a week',
          label: 'a week'
        },
        {
          value: 'a range of days',
          label: 'a range of days'
        },
        {
          value: 'the whole 30 days',
          label: 'the whole 30 days'
        }
      ],
      distanceOptions: [
        {
          value: '20',
          label: '20km'
        },
        {
          value: '50',
          label: '50km'
        }
      ],
      dateRange: '', // ques2's data
      magnitude: '', // ques2's data
      location: '', // ques3's data
      distance: '', // ques3's data
      pageInfo: {
        size: 5,
        current: 1
      },
      total: 0
    }
  },
  async created () {
    this.getQuakesList()
  },
  methods: {
    async getQuakesList () {
      const { data } = await this.$http.get('/quakes/fetchAll', {
        params: {
          pageNum: this.pageInfo.current,
          pageSize: this.pageInfo.size
        }
      })
      this.total = data.total
      // console.log(data)
      this.dataList = data.records
    },
    handleSizeChange (newSize) {
      this.pageInfo.size = newSize
      if (this.dataList.length) {
        // 选择了日期的情况下，说明是第二问查询数据的过程，因此调用第二问的分页查询条件
        this.ques2Click()
      } else {
        this.getQuakesList()
      }
    },
    handleCurrentChange (newCurrent) {
      this.pageInfo.current = newCurrent
      if (this.dataList.length) {
        // 选择了日期的情况下，说明是第二问查询数据的过程，因此调用第二问的分页查询条件
        this.ques2Click()
      } else {
        this.getQuakesList()
      }
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
      const { data } = await this.$http.get('/quakes/fetchFilteredByMagAndTime', {
        params: {
          endDate: this.dateRange[1],
          maxMag: this.magnitude.substr(4, 3),
          minMag: this.magnitude.substr(0, 3),
          startDate: this.dateRange[0],
          pageNum: this.pageInfo.current,
          pageSize: this.pageInfo.size
        }
      })
      this.dataList = data.records
      this.total = data.total
      this.$message.success('Search success. Query results are updated in the table!')
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
