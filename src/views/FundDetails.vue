<template>
  <div class="fund-details">
    <p class="heading">Fund Details</p>
    <div class="details-table" v-for="detailKey in fundDetailsKeys" :key='detailKey.key'>
      <div v-if="currentFund[detailKey.key]" class="row justify-space-around">
        <p>{{detailKey.val}} </p>
        <p class="value">{{currentFund[detailKey.key]}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'FundDetails',
  computed: {
    ...mapState(['currentFund']),
  },
  data() {
    return {
      fundDetailsKeys: [
        {
          key: "name",
          val: "Fund Name"
        },
        {
          key: "category",
          val: "Fund Category"
        },
        {
          key: "fund_manager",
          val: "Fund Manager"
        },
        {
          key: "fund_type",
          val: "Fund type"
        },
        {
          key: "lump_available",
          val: "Is Lumpsum Available"
        },
        {
          key: "sip_available",
          val: "Is SIP Available"
        },
        {
          key: "sip_min",
          val: "Minimum SIP"
        },
        {
          key: "sip_max",
          val: "Maximum SIP"
        },
        {
          key: "lump_min",
          val: "Minimum LumpSum"
        },
        {
          key: "lump_max",
          val: "Maximum LumpSum"
        }
      ]
    }
  },
  methods: {
    fetchFundDetails() {
      this.$store.commit('setLoaderState', true);
      this.$store.dispatch(
        'fetchFundDetails', 
        { code: this.$route.params.code }
      ).then(res => {
        this.$store.commit('setLoaderState', false);
      }).catch(err => {
        this.$store.commit('setLoaderState', false);
        console.log(err);
      });
    }
  },
  mounted() {
    this.fetchFundDetails();
  }
}
</script>

<style lang="scss" scoped>
  .fund-details {
    .details-table {
      width: 500px;
      margin: auto;
      text-align: center;
      // border: 1px solid;
      // border-top: none;

      .row > * {
        width: 50%;
      }

      .value {
        font-weight: bold;
      }
    }

    .details-table > * {
      border: 1px solid;
      border-top: none;
    }

    .details-table:first-of-type {
      border-top: 1px solid;
    }

    .details-table:nth-of-type(odd) {
      background-color: #dbd9d9;
    }
  }
</style>
