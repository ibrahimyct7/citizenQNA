// --- STATE VARIABLES ---
let currentStudyIndex = 0;
let quizQuestions = [];
let currentQuizIndex = 0;
let score = 0;

// --- NAVIGATION ---
function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    document.getElementById(screenId).classList.add('active');
}

function goHome() {
    showScreen('home-screen');
}

// --- UTILITIES ---
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// --- STUDY MODE ---
function startStudy() {
    currentStudyIndex = 0;
    renderStudyQuestion();
    showScreen('study-screen');
}

function renderStudyQuestion() {
    const q = civicsData[currentStudyIndex];
    document.getElementById('study-progress').innerText = `Question ${currentStudyIndex + 1} of 128`;
    document.getElementById('study-question').innerText = q.question;
    
    const answersHtml = q.answers.map(ans => `<li>${ans}</li>`).join('');
    document.getElementById('study-answers').innerHTML = answersHtml;
}

function nextStudyQuestion() {
    currentStudyIndex++;
    if (currentStudyIndex >= civicsData.length) {
        currentStudyIndex = 0; // Loop back to 1
    }
    renderStudyQuestion();
}

// --- QUIZ MODE ---
function startQuiz() {
    score = 0;
    currentQuizIndex = 0;
    
    // Select 20 random unique questions
    let shuffledData = shuffleArray([...civicsData]);
    quizQuestions = shuffledData.slice(0, 20);
    
    renderQuizQuestion();
    showScreen('quiz-screen');
}

function renderQuizQuestion() {
    const q = quizQuestions[currentQuizIndex];
    document.getElementById('quiz-progress-text').innerText = `Question ${currentQuizIndex + 1} of 20`;
    
    // Update progress bar
    const progressPercent = ((currentQuizIndex) / 20) * 100;
    document.getElementById('quiz-progress-bar').style.width = `${progressPercent}%`;
    
    document.getElementById('quiz-question').innerText = q.question;
    
    // Generate answers: 1 correct, 3 random incorrect from OTHER questions
    const correctAnswer = q.answers[0]; // First official answer
    let wrongAnswersPool = civicsData
        .filter(item => item.id !== q.id)
        .map(item => item.answers[0]);
    
    wrongAnswersPool = shuffleArray(wrongAnswersPool);
    const selectedWrongAnswers = wrongAnswersPool.slice(0, 3);
    
    let options = [
        { text: correctAnswer, isCorrect: true },
        { text: selectedWrongAnswers[0], isCorrect: false },
        { text: selectedWrongAnswers[1], isCorrect: false },
        { text: selectedWrongAnswers[2], isCorrect: false }
    ];
    
    options = shuffleArray(options);
    
    // Render options
    const optionsContainer = document.getElementById('quiz-options');
    optionsContainer.innerHTML = '';
    
    options.forEach(opt => {
        const div = document.createElement('div');
        div.className = 'answer-card';
        div.innerText = opt.text;
        div.onclick = () => handleAnswerClick(div, opt.isCorrect, correctAnswer);
        optionsContainer.appendChild(div);
    });

    document.getElementById('quiz-next-btn').disabled = true;
    
    if (currentQuizIndex === 19) {
        document.getElementById('quiz-next-btn').innerText = "Finish Quiz";
    } else {
        document.getElementById('quiz-next-btn').innerText = "Next";
    }
}

function handleAnswerClick(clickedDiv, isCorrect, correctAnswerText) {
    // Disable all options
    const allCards = document.querySelectorAll('.answer-card');
    allCards.forEach(card => card.classList.add('disabled'));
    
    if (isCorrect) {
        clickedDiv.classList.add('correct');
        score++;
    } else {
        clickedDiv.classList.add('incorrect');
        // Find and highlight the correct one
        allCards.forEach(card => {
            if (card.innerText === correctAnswerText) {
                card.classList.add('correct');
            }
        });
    }
    
    document.getElementById('quiz-next-btn').disabled = false;
}

function nextQuizQuestion() {
    currentQuizIndex++;
    if (currentQuizIndex < 20) {
        renderQuizQuestion();
    } else {
        endQuiz(true);
    }
}

function endQuiz(completed = false) {
    if (completed) {
        document.getElementById('final-score').innerText = `Your Score: ${score} / 20`;
        showScreen('result-screen');
    } else {
        goHome();
    }
}
