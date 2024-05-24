<template>
  <div>
    <ScoreBoard :winCount="this.winCount" :loseCount="this.loseCount"/>
  </div>
  
  <template v-if="this.question">
    <h1 v-html="this.question"></h1>

    <template v-for="(option, index) in this.answers" :key="index">

      <input 
        type="radio" 
        name="options" 
        :value="option" 
        v-model="this.chosenAnswer"
        :disabled="this.answerSubmitted"
      >
      <label v-html="option"></label><br>
      
    </template>

    <button 
      class="send" 
      type="button" 
      @click="this.submitAnswer()"
      v-if="!this.answerSubmitted"
    >
    Send
    </button>

    <section class="result" v-if="this.answerSubmitted">
      <h4 v-if="this.chosenAnswer == this.correctAnswer">
        &#9989; Congratulations, this is the correct answer
      </h4>

      <h4 v-if="this.chosenAnswer != this.correctAnswer">
        &#10060; I am sorry you picked the wrong answer. The correct answer is <div v-html="this.correctAnswer"></div>
      </h4>

      <button class="send" type="button" @click="this.getNewQuestion()">Next Question</button>
    </section>

  </template>
</template>

<script>

import ScoreBoard from "@/components/ScoreBoard.vue";

export default {
  
  name: 'App',
  
  components: {
    ScoreBoard
  },

  data(){
    return {
      question: undefined,
      incorrectAnswers: undefined,
      correctAnswer: undefined,
      chosenAnswer: undefined,
      answerSubmitted: false,
      winCount: 0,
      loseCount: 0
    }
  },

  computed: {
    answers() {
      var answers = [...this.incorrectAnswers];
      answers.splice( Math.random() * answers.length, 0, this.correctAnswer);
      return answers;
    }
  },
    
  methods: {

    submitAnswer() {
      if (!this.chosenAnswer){
        alert("Pick one of the options")
      }
      else {
        this.answerSubmitted = true;

        if (this.chosenAnswer == this.correctAnswer){
          this.winCount++;
        }
        else {
          this.loseCount++;
        }
      }
    },

    getNewQuestion() {
      this.answerSubmitted = false;
      this.chosenAnswer = undefined;
      this.question = undefined;
      
      var api = "https://opentdb.com/api.php?amount=1&category=18";

      this.axios.get(api).then((response) => {
        this.question = response.data.results[0].question;
        this.correctAnswer = response.data.results[0].correct_answer;
        this.incorrectAnswers = response.data.results[0].incorrect_answers;
      });
    }
  },
  
  created() {
    this.getNewQuestion();
  }
}

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

  input[type=radio]{
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
}
</style>
