<template>
  <b-table v-if="failures.length" hover stacked="sm" :items="failures" :fields="fields">
    <template slot="flag" slot-scope="row">
      <b-img-lazy :src="row.item.country.flag" class="table-flag" />
    </template>
    <template slot="explanation" slot-scope="row">
      The expected {{ row.item.question }} of {{ row.item.country.name }} was {{ row.item.expected }}, not {{ row.item.answer }}
    </template>
    <template slot="remember" slot-scope="row">
      <b-button size="sm" @click.stop="rememberItem(row.item.id)" class="mr-2">
        Ok!
      </b-button>
    </template>
  </b-table>
  <h6 v-else>Nothing to practice!</h6>
</template>

<script>
    export default {
        name: "Improve",
        props: {
            database: Object,
            userId: String,
        },
        data: () => {
            return {
                failures: [],
                fields: ['flag', 'explanation', 'remember']
            }
        },
        methods: {
            rememberItem(id) {
                let docRef = this.database.collection('quizz-results').doc(id);

                docRef.update({
                    remembered: true
                });

                let index = this.failures.indexOf(this.failures.find(obj => obj.id === id));

                if (index > -1) {
                    this.failures.splice(index, 1);
                }
            }
        },
        mounted() {
            this.database.collection('quizz-results')
                .where('userId', '==', this.userId)
                .where('success', '==', false)
                .where('remembered', '==', false)
                .get()
                .then((querySnapshot) => {
                    let failures = [];
                    querySnapshot.forEach((doc) => {
                        let data = doc.data();
                        data.id = doc.id;
                        failures.push(data);
                    });

                    this.failures = failures;
                })
        }
    }
</script>

<style scoped>

</style>