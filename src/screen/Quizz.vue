<template>
  <div v-if=quizzCountry class="row justify-content-center">
    <div class="col-md-4">
      <b-card :img-src="quizzCountry.flag"
              :img-alt="quizzCountry.name"
              :title="'What\'s the ' + questionType + ' of this country ?'"
              footer-tag="footer"
              img-top>
        <vue-numeric v-if="questionType === 'population'" currency="" v-model="answer" class="form-control" @keyup.enter.native="validate" />
        <b-input v-else v-model="answer" @keyup.enter.native="validate" />
        <div slot="footer">
          <b-btn variant="outline-primary" v-on:click="validate"><font-awesome-icon icon="check" />&nbsp;Check</b-btn>&nbsp;
          <b-btn variant="outline-secondary" v-on:click="reset"><font-awesome-icon icon="sync" />&nbsp;New</b-btn>
        </div>
      </b-card>

      <div v-if="feedback" :class="'mt-3 alert alert-' + feedback.type">{{ feedback.message }}</div>
    </div>
  </div>
</template>

<script>
    import VueNumeric from 'vue-numeric'
    import validator from '../data/validator';

    export default {
        name: "Quizz",
        props: {
            countries: Array,
            dataFields: Array,
            thresholds: Object,
            database: Object,
            userId: String,
        },
        components: {
            VueNumeric
        },
        mounted() {
            this.reset();
        },
        data: function() {
            return {
                feedback: null,
                answer: null,
                quizzCountry: null,
                questionType: null,
            }
        },
        methods: {
            generateQuestion() {
                this.quizzCountry = this.countries[Math.floor(Math.random() * this.countries.length)];
                this.questionType = this.dataFields[Math.floor(Math.random() * this.dataFields.length)];
            },
            validate() {
                if (this.feedback) {
                    this.reset();
                    return;
                }

                if (!this.answer) {
                    return;
                }

                const success = validator(this.thresholds).validateAnswer(this.quizzCountry, this.questionType, this.answer);

                if (success) {
                    this.feedback = {
                        type: 'success',
                        message: 'Correct!',
                    }
                } else {
                    this.feedback = {
                        type: 'danger',
                        message: 'Wrong! The ' + this.questionType + ' is ' + this.quizzCountry[this.questionType].toLocaleString(),
                    }
                }

                this.database.collection('quizz-results').add({
                    answer: this.answer,
                    expected: this.quizzCountry[this.questionType].toLocaleString(),
                    question: this.questionType,
                    success: success,
                    userId: this.userId,
                    country: this.quizzCountry,
                    remembered: false,
                })
            },
            reset () {
                this.feedback = null;
                this.answer = null;
                this.generateQuestion();

                if (this.questionType === 'population') {
                    this.answer = 0;
                }
            }
        }
    }
</script>

<style scoped>

</style>