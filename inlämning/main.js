let questions = [];
let currentQuestionsIndex = 0;
let score = 0;

fetch("quiz.json")
.then((response) => response.json())
.then((data) => {
    questions = data;

    document.getElementById("start-btn").addEventListener("click", startGame);
})

function startGame(){
    document.getElementById("start-game").classList.add("hidden");
    document.getElementById("quiz").classList.remove("hidden");
    showQuestion();
}

function showQuestion(){
    const questionText = document.getElementById("question");
    const options = document.getElementById("options");
    const result = document.getElementById("result");
    const nextButton = document.getElementById("next-btn");

    options.innerHTML = "";
    result.textContent = "";
    nextButton.classList.add("hidden");

    const currentQuestion = questions[currentQuestionsIndex];
    questionText.textContent = currentQuestion.question;


currentQuestion.options.forEach((option) => {
    const buttonOpt = document.createElement("button");
    buttonOpt.textContent = option;
    buttonOpt.addEventListener("click", () => handleAnswer(option, buttonOpt));
    options.appendChild(buttonOpt);
});

}


function handleAnswer(selectedOption, buttonOpt){
    const currentQuestion = questions[currentQuestionsIndex];
    const isCorrect = selectedOption === currentQuestion.answer;
    const result = document.getElementById("result");


    if(isCorrect){
        buttonOpt.classList.add("correct");
        result.textContent = "Correct";
        result.style.color = "green";
        score++;
    }else{
        buttonOpt.classList.add("wrong");
        result.textContent = ("Wrong");
        result.style.color = "red";
    }

    document.querySelectorAll("#options button").forEach((btn) => {
        btn.disabled = true;
        if(btn.textContent === currentQuestion.answer){
            btn.classList.add("correct");
        }
    });

    const nextButton = document.getElementById("next-btn");
    nextButton.classList.remove("hidden");

    nextButton.onclick = () => {
        currentQuestionsIndex++;
        if(currentQuestionsIndex < questions.length){
            showQuestion();
        }else{
            showSummary();
        }
    };
}

function showSummary(){
    document.getElementById("quiz").classList.add("hidden");
    document.getElementById("next-btn").classList.add("hidden");

    const summary = document.getElementById("summary");
    summary.classList.remove("hidden");

    const scoreElement = document.getElementById("score");
    scoreElement.textContent = `You got ${score} of ${questions.length} points.`;
}


