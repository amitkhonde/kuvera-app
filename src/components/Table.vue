<template>
  <div class="table">
    <div class="search row">
      <input placeholder="Search Fund By Name" type="text" v-model="searchTerm">
    </div>
    <div class="row justify-space-around headings">
      <div 
        class="row" 
        v-for="(heading, index) in localHeadingsConfig" 
        :key="heading.key">
        <p>{{heading.name}}</p>
        <p 
          class="sort-text" 
          @click="sortData(heading.key, index, 1)" 
          v-if="heading.isSortable && heading.sortState === 0">
          (asc)
        </p>
        <p 
          class="sort-text" 
          @click="sortData(heading.key, index, 0)" 
          v-if="heading.isSortable && heading.sortState === 1">
          (dsc)
        </p>
        <p 
          class="sort-text" 
          @click="sortData(heading.key, index, 0)" 
          v-if="heading.isSortable && heading.sortState === -1">
          (sort)
        </p>
      </div>
    </div>
    <div class="data-rows">
      <div 
        class="row justify-space-around data-row" 
        v-for="data in filteredLocalTableData" 
        :key="data.code">
          <div v-for="heading in localHeadingsConfig" :key="heading.key">
            <router-link v-if="heading.isLink" :to="data[heading.linkTo]">{{data[heading.key]}}</router-link>
            <p v-else>
              {{data[heading.key]}}
            </p>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Table',
  data() {
    return {
      localHeadingsConfig: [],
      localTableData: [],
      currentSortedColumnIndex: -1,
      searchTerm: "",
    }
  },
  props: {
    headingsConfig: {
      type: Array,
      required: true,
    },
    tableData: {
      type: Array,
      required: true,
    }
  },
  computed: {
    filteredLocalTableData() {
      if (this.searchTerm) {
        return this.localTableData.filter(row => 
          row.name.toLowerCase().includes(this.searchTerm.toLowerCase())
        );
      }

      return this.localTableData;
    }
  },
  watch: {
    headingsConfig: {
      deep: true,
      immediate: true,
      handler() {
        this.localHeadingsConfig = this.headingsConfig;
      },
    },
    tableData: {
      deep: true,
      immediate: true,
      handler() {
        this.localTableData = this.tableData;
      },
    }
  },
  methods: {
    sortData: function(key, index, sortType ) {
      let isAscSort = sortType === 0;
      if (this.currentSortedColumnIndex !== -1) {
        this.localHeadingsConfig[this.currentSortedColumnIndex].sortState = -1;
      }

      this.localTableData.sort((row1, row2) => {
        if (row1[key] < row2[key]) {
          return isAscSort ? -1 : 1;
        } else if (row1[key] > row2[key]) {
          return isAscSort ? 1 : -1;
        } else {
          return 0;   
        }
      });

      this.currentSortedColumnIndex = index;
      isAscSort ? 
        this.localHeadingsConfig[this.currentSortedColumnIndex].sortState = 0 : 
        this.localHeadingsConfig[this.currentSortedColumnIndex].sortState = 1;
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.table {
  min-width: 1000px;

  .row {
    padding: 5px 0px;
  }

  .headings {
    font-weight: bold;
    font-size: 20px;
  }

  .data-rows {
    max-height: 800px;
    overflow: scroll;
  }

  .headings > *, .data-row > * {
    width: 200px;
    text-align: center;
  }

  .headings > * {
    justify-content: center;
  }

  .sort-text {
    margin-left: 3px;
    cursor: pointer;
    font-size: 12px;
  }

  .search {
    justify-content: end;
    margin-right: 10px;

    input {
      width: 200px;
      padding: 10px;
      border: 1px solid;
      border-radius: 3px;
      font-size: 12px;
    }
  }
}
</style>
