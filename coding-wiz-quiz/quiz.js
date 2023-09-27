const question = document.querySelector ('#question');
const choices = Array.from(document.querySelectorAll ('.choice-text'));
const scoreText = document.querySelector('#score');
const progressText = document.querySelector ('#progressText');
const progressBarFull = document.querySelector ('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
{
question: "What does HTML stand for?",
choice1: "Hyper Text Markup Language",
choice2: "Hyperlinks and Text Markup Language",
choice3: "Home Tool Markup Language",
choice4: "Hyper Text Markup Leveler",
answer: 1,
},

{
question: "What is the correct HTML element for the largest heading?",
choice1: "<h1>",
choice2: "<heading>",
choice3: "<head>",
choice4: "<h6>",
answer: 1,
},

{
question: "What element is used to define important text?",
choice1: "<b>",
choice2: "<em>",
choice3:  "<i>",
choice4: "<strong>",
answer: 4,
},

{
question: "Which HTML element is used for creating an ordered list?",
choice1: "<li>",
choice2: "<ul>",
choice3: "<ol>",
choice4:  "<dl>",
answer: 3,
},

{
question: "What is the correct HTML for creating a hyperlink?",
choice1: "<link src='http://www.example.com'>Example</link>",
choice2: "<a href='http://www.example.com'>Example</a>",
choice3: "<a url='http://www.example.com'>Example</a>",
choice4: "<href link='http://www.example.com'>Example</href>",
answer: 2,
},

{
    question: "Which HTML tag is used to define an image?",
    choice1: "<img>",
    choice2: "<image>",
    choice3: "<picture>",
    choice4: "<figure>",
    answer: 1,
    },

{
    question:  "What is the purpose of the HTML 'meta' tag?",
    choice1: "To define a character encoding",
    choice2: "To create a hyperlink",
    choice3: "To add a background image",
    choice4: "To define a paragraph",
    answer: 4,
    },

{
    question: "In HTML, which tag is used for creating a line break?",
    choice1: "<break>",
    choice2: "<lb>",
    choice3: "<br>",
    choice4: "<newline>",
    answer: 3,
    },

{
    question: "Which HTML tag is used for creating a table?",
    choice1: "<tr>",
    choice2: "<table>",
    choice3:  "<td>",
    choice4:  "<th>",
    answer: 2,
    },

{
    question: "What is the correct HTML for inserting a comment?",
    choice1: "<!-- This is a comment -->",
    choice2: "// This is a comment",
    choice3: "/* This is a comment */",
    choice4: "' This is a comment",
    answer: 1,
    }

]

const SCORE_POINTS = 10
const MAX_QUESTIONS = 10

startQuiz = () => {
questionCounter = 0
score = 0
availableQuestions = [...questions]
getNewQuestion()
}

getNewQuestion = () => {
if (availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
    localStorage.setItem('mostRecentScore', score)
    return window.location.assign ('end.html')
}

questionCounter++
progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`

const questionsIndex = Math.floor (Math.random() * availableQuestions.length)
currentQuestion = availableQuestions[questionsIndex]
question.innerText = currentQuestion.question

choices.forEach(choice =>{
    const number = choice.dataset['number']
    choice.innerText = currentQuestion['choice' + number]
})

availableQuestions.splice (questionsIndex, 1)

acceptingAnswers = true
}

choices.forEach (choice =>{
    choice.addEventListener('click', e =>{
    if (!acceptingAnswers) return

    acceptingAnswers = false
    const selectedChoice = e.target
    const selectedAnswer = selectedChoice.dataset['number']

    let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

    if (classToApply === 'correct') {
        incrementScore(SCORE_POINTS)
    }

    selectedChoice.parentElement.classList.add(classToApply)

    setTimeout (() =>{
    selectedChoice.parentElement.classList.remove(classToApply)
    getNewQuestion()
    }, 1000)
    })
})

incrementScore = num => {
    score+= num
    scoreText.innerText = score
}

startQuiz()