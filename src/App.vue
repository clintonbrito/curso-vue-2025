<template>
  <div>

    <template v-if="this.question">

      <h1 v-html="this.question"></h1>
  
      <template v-for="(answer, index) in this.answers" v-bind:key="index">
        <input
          :disabled="this.answerSubmitted"
          type="radio"
          name="options"
          :value="answer"
          v-model="this.chosenAnswer"
          />
        <label v-html="answer"></label><br />
      </template>

      <button v-if="!this.answerSubmitted" @click="this.submitAnswer()" class="send" type="button">Send</button>
      <button v-if="this.answerSubmitted" @click="this.getNewQuestion()" class="send" type="button">Next question</button>

      <section v-if="this.answerSubmitted" class="result">
        <h4 v-if="this.chosenAnswer == this.correctAnswer"
        v-html="'&#9989; Parabéns, a resposta ' + this.correctAnswer + ' está correta.'">
        </h4>
        <h4 v-else
        v-html="'&#10060; Que pena, a resposta está errada. A resposta correta é ' + this.correctAnswer + '.'">
        </h4>
      </section>

    </template>

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
      chosenAnswer: null,
      answerSubmitted: false
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
    this.getNewQuestion();
  },
  methods: {
    submitAnswer() {
      if(!this.chosenAnswer) {
        alert("Escolha uma das opções.")
      } else {
        this.answerSubmitted = true;
        if(this.chosenAnswer == this.correctAnswer) {
          console.log("Parabéns, você acertou!")
        } else {
          console.log("Resposta errada.")
        }
      }
    },

    getNewQuestion() {

      this.chosenAnswer = null,
      this.answerSubmitted = false,
      this.question = null

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
