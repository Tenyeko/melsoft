// Define your array of objects with questions, choices, and correct answers
const questions = [
  {
    question: "What does HTML stand for?",
    choices: ["Hyper Text Markup Language", "Hyperlinks and Text Markup Language", "Home Tool Markup Language", "Hyper Text Markup Leveler"],
    correctAnswer: "Hyper Text Markup Language"
  },
  {
    question: "What is the correct HTML element for the largest heading?",
    choices: ["<h1>", "<heading>", "<head>", "<h6>"],
    correctAnswer: "<h1>"
  },
  {
    question: "What element is used to define important text?",
    choices: ["<strong>", "<em>", "<i>", "<b>"],
    correctAnswer: "<strong>"
  },
  {
    question: "Which HTML element is used for creating an ordered list?",
    choices: ["<ol>", "<li>", "<ul>", "<dl>"],
    correctAnswer: "<ol>"
  },
  {
    question: "What is the correct HTML for creating a hyperlink?",
    choices: ["<a href='http://www.example.com'>Example</a>", "<link src='http://www.example.com'>Example</link>", "<a url='http://www.example.com'>Example</a>", "<href link='http://www.example.com'>Example</href>"],
    correctAnswer: "<a href='http://www.example.com'>Example</a>"
  },
  {
    question: "Which HTML tag is used to define an image?",
    choices: ["<img>", "<image>", "<picture>", "<figure>"],
    correctAnswer: "<img>"
  },
  {
    question: "What is the purpose of the HTML 'meta' tag?",
    choices: ["To define a paragraph", "To define a character encoding", "To create a hyperlink", "To add a background image"],
    correctAnswer: "To define a character encoding"
  },
  {
    question: "In HTML, which tag is used for creating a line break?",
    choices: ["<break>", "<lb>", "<br>", "<newline>"],
    correctAnswer: "<br>"
  },
  {
    question: "Which HTML tag is used for creating a table?",
    choices: ["<table>", "<tr>", "<td>", "<th>"],
    correctAnswer: "<table>"
  },
  {
    question: "What is the correct HTML for inserting a comment?",
    choices: ["<!-- This is a comment -->", "// This is a comment", "/* This is a comment */", "' This is a comment"],
    correctAnswer: "<!-- This is a comment -->"
  },
  // Add more questions here
];

let currentQuestionIndex = 0;
let score = 0;

// Function to display the current question and choices
function displayQuestion() {
  const questionElement = document.getElementById("question");
  const choicesElement = document.getElementById("choices");

  // Display the current question
  questionElement.textContent = questions[currentQuestionIndex].question;

  // Clear the previous choices
  choicesElement.innerHTML = "";

  // Display the choices for the current question
  questions[currentQuestionIndex].choices.forEach(choice => {
    const li = document.createElement("li");
    li.textContent = choice;
    li.addEventListener("click", () => checkAnswer(choice));
    choicesElement.appendChild(li);
  });
}

// Function to check if the selected answer is correct
function checkAnswer(selectedAnswer) {
  if (selectedAnswer === questions[currentQuestionIndex].correctAnswer) {
    score++;
  }

  // Move on to the next question
  currentQuestionIndex++;

  // Check if all questions have been answered
  if (currentQuestionIndex === questions.length) {
    // Display the final score
    alert("Your final score is: " + score + "/" + questions.length);
  } else {
    // Display the next question
    displayQuestion();
  }
}

// Start the quiz by displaying the first question
displayQuestion();
