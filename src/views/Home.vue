<template>
  <div class="home">
    <p class="heading">Funds Home</p>
    <Table :headingsConfig='tableHeadings' :tableData='tableData'/>
  </div>
</template>

<script>
import Table from '@/components/Table.vue';
import { mapState } from 'vuex';

export default {
  name: 'Home',
  components: {
    Table
  },
  data() {
    return {
      tableHeadings : [
        {
          key: "name",
          name: "Fund Name",
          isSortable: true,
          sortState: -1,
          isLink: true,
          linkTo: 'code'
        },
        {
          key: "fund_category",
          name: "Fund Category",
          isSortable: true,
          sortState: -1,
          isLink: false,
        },
        {
          key: "fund_type",
          name: "Fund Type",
          isSortable: true,
          sortState: -1,
          isLink: false,
        },
        {
          key: "plan",
          name: "Plan",
          isSortable: true,
          sortState: -1,
          isLink: false,
        },
        {
          key: "returns_year1",
          name: "Year 1 Returns",
          isSortable: true,
          sortState: -1,
          isLink: false,
        },
        {
          key: "returns_year3",
          name: "Year 3 Returns",
          isSortable: true,
          sortState: -1,
          isLink: false,
        }
      ]
    }
  },
  computed: mapState({
    tableData: state => state.funds,
  }),
  methods: {
    fetchFunds() {
      this.$store.commit('setLoaderState', true);
      this.$store.dispatch('fetchFunds').then(res => {
        this.$store.commit('setLoaderState', false);
      }).catch(err => {
        this.$store.commit('setLoaderState', false);
        console.log(err);
      });
    }
  },
  mounted() {
    this.fetchFunds();
  }
}
</script>
