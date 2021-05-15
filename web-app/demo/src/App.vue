<template>
  <div id="app">
    <el-table
      :data="tableData"
      stripe>
      <el-table-column
        prop="index"
        label="index"
        :width="90"/>
      <el-table-column
        prop="oclcnum"
        label="oclcnum"
        :width="90">
      </el-table-column>
        <el-table-column
        prop="year"
        label="year"
        sortable
        :width="90">
      </el-table-column>
      <el-table-column
        prop="citation"
        label="citation"
        :width="600">
        <template slot-scope="scope">
          <p v-html='scope.row.citation'></p>
        </template>
      </el-table-column>
      <el-table-column
        prop="language"
        label="language"
        :width="90">
      </el-table-column>
      <el-table-column
        prop="responsibility"
        label="responsibility">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>

export default {
  name: 'App',
  data() {
    return {
      tableData: [],
    }
  },
  created() {
    const data = Object.values(require('../../../test_data/result.json'));
    this.tableData = data.map((item) => {
      return {
        ...item,
        year: item.citation.match(/([0-9]{4})\./)?.[1] || 'nd',
      }
    }).sort((a, b) => a.year.localeCompare(b.year))
    .map((item, index) => ({...item, index: index + 1}));
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
