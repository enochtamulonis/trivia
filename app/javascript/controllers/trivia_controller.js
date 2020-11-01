import ApplicationController from './application_controller'

/* This is the custom StimulusReflex controller for the Questions Reflex.
 * Learn more at: https://docs.stimulusreflex.com
 */
let questionsJson

let questionNumber

let questionsCorrect

let questionsAmount

export default class extends ApplicationController {
  static targets = ["result", "header", "banner","cardDiv", "triviaBody", "answersHolder", "answers", "question", "resultsHolder", "score", "resultsHeader", "resultsScoreHeader"]

  connect () {
    super.connect()
    questionNumber = 0;
    questionsCorrect = 0;
    questionsJson = JSON.parse(this.data.get("url"));
    questionsAmount = questionsJson.length;
    questionsJson.sort(function (a, b) {return Math.random() - 0.5;});
    for (let i = 0; i < 11; i++) {
      questionsJson.pop();
    }
  }

  startTrivia(event) {
    event.preventDefault();
    document.getElementById("startButton").classList.add("hidden");
    this.triviaBodyTarget.classList.toggle("hidden");
    this.cardDivTarget.classList.toggle("items-center");
    this.headerTarget.classList.add("hidden");
    this.showQuestion();
  }

  showQuestion() {
    let currentQuestion = questionsJson[questionNumber];
    let allAnswers = currentQuestion.incorrect;
    let correctAnswer = currentQuestion.correct;
    let answersHTML = "";
    this.questionTarget.innerHTML = currentQuestion.question;
    this.scoreTarget.innerHTML = questionsCorrect;
    this.answersTarget.innerHTML = `<li class="pb-4 text-gray-400">Loading answers for (${currentQuestion.question})</li>`
    allAnswers.push(correctAnswer);
    allAnswers.sort(function (a, b) {return Math.random() - 0.5;});
    allAnswers.forEach((answer) => {
      answersHTML += this.answerTemplate(answer);
    })
    this.answersTarget.innerHTML = answersHTML;
    this.triviaBodyTarget.classList.remove("hidden");
}

  answerTemplate(answer) {
    return `<div class=" font-chill answerCard text-lg bg-blue-cute border-8 border-transparent rounded-lg cursor-pointer hover:shadow-xl hover:bg-blue-cutedark shadow-none transition-all duration-500"
      data-action="click->trivia#selectAnswer">${answer}</div>`;
  }


  selectAnswer(event) {
    event.preventDefault();
    let currentQuestion = questionsJson[questionNumber];
    if (event.srcElement.innerHTML == currentQuestion.correct) {
      this.resultTarget.innerHTML = "Your answer was correct";
      event.srcElement.classList.add("border-green-500");
      questionsCorrect++;
      this.scoreTarget.innerHTML = questionsCorrect;
      this.scoreTarget.classList.toggle("text-green-600");
      setTimeout(() => {this.scoreTarget.classList.toggle("text-green-600");event.srcElement.classList.remove(`bg-blue-cutedark`); event.srcElement.classList.toggle(`bg-green-500`);}, 700);
    } else {
      this.resultTarget.innerHTML = "Your answer was incorrect";
      event.srcElement.classList.add("border-red-500");
      this.scoreTarget.innerHTML = questionsCorrect;
      this.scoreTarget.classList.toggle("text-red-600");
      setTimeout(() => {
        this.scoreTarget.classList.toggle("text-red-600");
        event.srcElement.classList.remove(`bg-blue-cutedark`);
        event.srcElement.classList.toggle("bg-red-500");
      }, 700);
      setTimeout(() => {
        for (let sibling of event.srcElement.parentNode.children) {
          if (sibling.innerHTML == currentQuestion.correct) {
            event.srcElement.classList.toggle("bg-red-500");
            event.srcElement.classList.toggle("border-red-500");
            sibling.classList.remove("bg-blue-cute");
            sibling.classList.add("bg-green-600");
            sibling.classList.remove("opacity-50");
            this.resultTarget.innerHTML = `The correct answer was ${currentQuestion.correct}`
          }
        }
      }, 2000);
    }
    for (let sibling of event.srcElement.parentNode.children) {
        if (sibling !== event.srcElement) sibling.classList.add('opacity-50');
        if (sibling == event.srcElement) sibling.classList.add('bg-blue-cutedark'); sibling.classList.remove("bg-blue-cute");
        sibling.dataset.action = "";
        sibling.classList.toggle("hover:bg-blue-cutedark")
        sibling.classList.remove("hover:shadow-xl");
    }
    if (questionNumber < 9) {
      questionNumber++;
      let isCorrect = event.srcElement.innerHTML == currentQuestion.correct
      let timeValue = (isCorrect ? 2500 : 4000);
      setTimeout(() => {
        this.resultTarget.innerHTML = "";
        this.showQuestion();}, timeValue
      );
    } else {
      let score = questionsCorrect * 10;
      let resultsColor = score < 50 ? "text-red-600" : "text-green-600";
      let perfectScoreText = "you should practice more "
      let mediumScoreText = "wow you really know this stuff "
      let lowScoreText = "you should practice more "
      setTimeout(() => {
        this.triviaBodyTarget.classList.toggle("hidden");
        this.resultsHolderTarget.classList.toggle("hidden");
        this.resultsHeaderTarget.innerHTML = `Your final score is ${score}%`;
        if (score > 70 && score != 100 ) {
          this.resultsScoreHeaderTarget.innerHTML = mediumScoreText;
        }
        if (score == 100) {
          this.resultsScoreHeaderTarget.innerHTML = perfectScoreText
        } else {
          this.resultsScoreHeaderTarget.innerHTML = lowScoreText;
        }
      }, 3000);
    }
  }
}
