<template>
  <b-table hover stacked="sm" :items="countries" :fields="fields">
    <template slot="flag" slot-scope="country">
      <b-img-lazy :src="country.item.flag" class="table-flag" />
    </template>
  </b-table>
</template>

<script>
    export default {
        name: "Database.vue",
        props: {
            countries: Array,
            dataFields: Array
        },
        data: function() {
            return {
                fields: [
                    'flag',
                    'name',
                    {
                        'key': 'population',
                        'formatter': population => population.toLocaleString()
                    },
                    'capital'
                ]
            }
        }
    }
</script>

<style>
  .table-flag {
    max-width: 40vw;
  }
  @media (min-width: 768px) {
    .table-flag {
      max-width: 5vw;
    }
  }
</style>