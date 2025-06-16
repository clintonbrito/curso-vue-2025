<template>
  <div>

    <template v-if="this.question">

      <h1 v-html="this.question"></h1>
  
      <template v-for="(answer, index) in this.answers" v-bind:key="index">
        <input
          type="radio"
          name="options"
          value="answer"
          />
        <label v-html="answer"></label><br />
      </template>

    </template>


    <button class="send" type="button">Send</button>
  </div>
</template>

<script>

export default {
  name: 'App',
  components: {},
  data() {
    return {
      question: [],
      incorrectAnswers: [],
      correctAnswer: [],
    }
  },
  computed: {
    answers() {
      var answers = this.incorrectAnswers ? [...this.incorrectAnswers] : [];
      answers.splice(Math.round(Math.random() * answers.length),0, this.correctAnswer);
      return answers;
    }
  },
  created() {
    this.axios
      .get('https://opentdb.com/api.php?amount=1&category=11')
      .then((response) => {
        this.question = response.data.results[0].question;
        this.incorrectAnswers = response.data.results[0].incorrect_answers;
        this.correctAnswer = response.data.results[0].correct_answer;
        console.log(response.data.results[0]);
      })
  }
}

// https://opentdb.com/api.php?amount=1&category=11

</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 60px auto;
  max-width: 960px;
}

input[type='radio'] {
  margin: 12px 4px;
}

button.send {
  margin-top: 12px;
  height: 40px;
  min-width: 120px;
  padding: 0 16px;
  color: #fff;
  background-color: #1867c0;
  border: 1px solid #1867c0;
  cursor: pointer;
}

</style>
