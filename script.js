// Define your array of objects with questions, choices, and correct answers
const questions = [
  {
    question: "What does HTML stand for?",
    choices: ["Hyper Text Markup Language", "Hyperlinks and Text Markup Language", "Home Tool Markup Language", "Hyper Text Markup Leveler"],
    correctAnswer: 0 // Index of the correct choice
  },
  {
    question: "What is the correct HTML element for creating a hyperlink?",
    choices: ["<a href='http://www.example.com'>Example</a>", "<link src='http://www.example.com'>Example</link>", "<a url='http://www.example.com'>Example</a>", "<href link='http://www.example.com'>Example</href>"],
    correctAnswer: 0 // Index of the correct choice
  },
  {
    question: "Which HTML tag is used for creating a table?",
    choices: ["<table>", "<tr>", "<td>", "<th>"],
    correctAnswer: 0 // Index of the correct choice
  },
  // Add more questions here...
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
    question: "Which HTML tag is used for defining a list item?",
    choices: ["<li>", "<ol>", "<ul>", "<dl>"],
    correctAnswer: "<li>"
  },
  {
    question: "What is the correct HTML for inserting an image?",
    choices: ["<img src='image.jpg' alt='Description'>", "<image src='image.jpg' alt='Description'>", "<picture src='image.jpg' alt='Description'>", "<figure src='image.jpg' alt='Description'>"],
    correctAnswer: "<img src='image.jpg' alt='Description'>"
  },
  {
    question: "Which HTML tag is used for emphasizing text?",
    choices: ["<strong>", "<em>", "<i>", "<b>"],
    correctAnswer: "<em>"
  },
  {
    question: "What does CSS stand for?",
    choices: ["Cascading Style Sheet", "Computer Style Sheet", "Creative Style Sheet", "Colorful Style Sheet"],
    correctAnswer: "Cascading Style Sheet"
  },
  {
    question: "Which CSS property is used for changing the background color of an element?",
    choices: ["color", "background-color", "text-color", "bgcolor"],
    correctAnswer: "background-color"
  },
];

let currentQuestionIndex = 0;
let score = 0;

// Function to display the current question and choices
function displayQuestion() {
  const questionElement = document.getElementById("question");
  const choicesElement = document.getElementById("choices");

  // Display the current question
  questionElement.textContent = `${currentQuestionIndex + 1}. ${questions[currentQuestionIndex].question}`;

  // Clear the previous choices
  choicesElement.innerHTML = "";

  // Display the choices for the current question
  questions[currentQuestionIndex].choices.forEach((choice, index) => {
    const li = document.createElement("li");
    li.textContent = choice;
    li.addEventListener("click", () => selectAnswer(index));
    choicesElement.appendChild(li);
  });
}

// Function to select an answer
function selectAnswer(selectedIndex) {
  const selectedChoice = questions[currentQuestionIndex].choices[selectedIndex];
  const choices = document.querySelectorAll("#choices li");

  // Remove the "selected" class from all choices
  choices.forEach((choice) => {
    choice.classList.remove("selected");
  });

  // Add the "selected" class to the clicked choice
  choices[selectedIndex].classList.add("selected");

  // Highlight the correct answer in green
  choices[questions[currentQuestionIndex].correctAnswer].classList.add("correct-answer");

  const submitButton = document.getElementById("submit-btn");
  submitButton.disabled = false;

  // Show the correct answer
  const correctAnswerText = document.getElementById("correct-answer-text");
  correctAnswerText.textContent = questions[currentQuestionIndex].choices[questions[currentQuestionIndex].correctAnswer];
  const correctAnswerElement = document.getElementById("correct-answer");
  correctAnswerElement.style.display = "block";
}

// Function to check if the selected answer is correct
function checkAnswer(selectedIndex) {
  if (selectedIndex === questions[currentQuestionIndex].correctAnswer) {
    score++;
  }

  // Move on to the next question
  currentQuestionIndex++;

  // Check if all questions have been answered
  if (currentQuestionIndex === questions.length) {
    // Display the final score
    displayScore();
  } else {
    // Display the next question
    displayQuestion();
  }
}

// Function to display the final score
function displayScore() {
  const quizContainer = document.getElementById("quiz-container");
  const scoreboard = document.getElementById("scoreboard");
  const scoreElement = document.getElementById("score");
  const resultElement = document.getElementById("result");
  const restartButton = document.getElementById("restart-btn");

  // Hide the quiz container and show the scoreboard
  quizContainer.style.display = "none";
  scoreboard.style.display = "block";

  // Display the final score
  scoreElement.textContent = `${score}/${questions.length}`;

  // Display result message based on the score
  if (score >= 6) {
    resultElement.textContent = "Congratulations! You passed the quiz!";
  } else {
    resultElement.textContent = "Oops! You didn't pass the quiz. Try again!";
    restartButton.style.display = "block";
  }
}

// Function to start the quiz
function startQuiz() {
  const homePage = document.getElementById("home-page");
  const quizContainer = document.getElementById("quiz-container");

  // Hide the homepage and show the quiz container
  homePage.style.display = "none";
  quizContainer.style.display = "block";

  // Start the quiz by displaying the first question
  displayQuestion();
}

// Event listener for the "Start Quiz" button
document.getElementById("start-btn").addEventListener("click", startQuiz);

// Event listener for the "Submit" button
document.getElementById("submit-btn").addEventListener("click", () => {
  const selectedChoice = document.querySelector("#choices li.selected");

  if (selectedChoice) {
    const selectedIndex = Array.from(selectedChoice.parentNode.children).indexOf(selectedChoice);
    checkAnswer(selectedIndex);
  }
});

// Event listener for the "Back to Homepage" button in the quiz container
document.getElementById("back-btn").addEventListener("click", backToHomepage);

// Event listener for the "Back to Homepage" button in the scoreboard
document.getElementById("back-to-home").addEventListener("click", backToHomepage);

// Event listener for the "Restart Quiz" button
document.getElementById("restart-btn").addEventListener("click", () => {
  const restartButton = document.getElementById("restart-btn");
  restartButton.style.display = "none";
  resetQuiz();
});

// Function to navigate back to the homepage
function backToHomepage() {
  const homePage = document.getElementById("home-page");
  const quizContainer = document.getElementById("quiz-container");
  const scoreboard = document.getElementById("scoreboard");

  // Hide the quiz container and scoreboard, and show the homepage
  quizContainer.style.display = "none";
  scoreboard.style.display = "none";
  homePage.style.display = "block";

  // Reset quiz variables
  currentQuestionIndex = 0;
  score = 0;
  displayQuestion(); // Display the first question when returning to the homepage
}

// Function to reset the quiz
function resetQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  const restartButton = document.getElementById("restart-btn");
  restartButton.style.display = "none";

  // Display the first question to start the quiz again
  displayQuestion();
}

// Initial setup: Display the homepage
document.getElementById("home-page").style.display = "block";
document.getElementById("quiz-container").style.display = "none";
document.getElementById("scoreboard").style.display = "none";
