// --- STATE VARIABLES ---
let currentStudyIndex = 0;
let currentFlashcardIndex = 0;
let quizQuestions = [];
let currentQuizIndex = 0;
let score = 0;

// --- AUDIO (Subtle Click Sound) ---
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
function playClickSound() {
    if (audioCtx.state === 'suspended') audioCtx.resume();
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(600, audioCtx.currentTime); // Pitch
    oscillator.frequency.exponentialRampToValueAtTime(200, audioCtx.currentTime + 0.05); // Quick drop
    gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime); // Very quiet
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.05);
    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    oscillator.start();
    oscillator.stop(audioCtx.currentTime + 0.05);
}

// Add click sound to all buttons
document.addEventListener('click', function(e) {
    if (e.target.tagName === 'BUTTON' || e.target.classList.contains('answer-card') || e.target.closest('.flip-card')) {
        playClickSound();
    }
});

// --- UTILITIES ---
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Cleans text by removing parenthesis formatting e.g. "(Because) they have more people" -> "Because they have more people"
function cleanText(text) {
    return text.replace(/[()]/g, '');
}

// Ultra-Smart Vibe Matcher
function getQuestionCategory(qText) {
    const lowerQ = qText.toLowerCase();
    if (lowerQ.includes("how many") || lowerQ.includes("how long") || lowerQ.includes("age") || lowerQ.includes("years")) return "number";
    if (lowerQ.includes("who") || lowerQ.includes("name one") || lowerQ.includes("name two") || lowerQ.includes("president") || lowerQ.includes("leader")) return "person";
    if (lowerQ.includes("when") || lowerQ.includes("what year") || lowerQ.includes("what month")) return "date";
    if (lowerQ.includes("where") || lowerQ.includes("ocean") || lowerQ.includes("territory") || lowerQ.includes("state") || lowerQ.includes("capital") || lowerQ.includes("country")) return "geography";
    if (lowerQ.includes("war") || lowerQ.includes("conflict") || lowerQ.includes("attacked")) return "war";
    if (lowerQ.includes("document") || lowerQ.includes("constitution") || lowerQ.includes("declaration")) return "document";
    if (lowerQ.includes("branch") || lowerQ.includes("part of the government") || lowerQ.includes("court")) return "government_branch";
    if (lowerQ.includes("rights") || lowerQ.includes("freedom") || lowerQ.includes("amendment")) return "rights";
    return "general";
}

// --- NAVIGATION ---
function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => screen.classList.remove('active'));
    document.getElementById(screenId).classList.add('active');
    window.scrollTo(0, 0); 
}
function goHome() { showScreen('home-screen'); }

// --- STUDY MODE ---
function startStudy() { currentStudyIndex = 0; renderStudyQuestion(); showScreen('study-screen'); }

function renderStudyQuestion() {
    const q = civicsData[currentStudyIndex];
    document.getElementById('study-progress').innerText = `Question ${currentStudyIndex + 1} of ${civicsData.length}`;
    document.getElementById('study-question').innerText = cleanText(q.question);
    const answersHtml = q.answers.map(ans => `<li>${cleanText(ans)}</li>`).join('');
    document.getElementById('study-answers').innerHTML = answersHtml;
}

function nextStudyQuestion() {
    currentStudyIndex++;
    if (currentStudyIndex >= civicsData.length) currentStudyIndex = 0; 
    renderStudyQuestion();
    window.scrollTo(0, 0);
}

function skipTenStudyQuestions() {
    currentStudyIndex += 10;
    if (currentStudyIndex >= civicsData.length) currentStudyIndex = civicsData.length - 1; 
    renderStudyQuestion();
    window.scrollTo(0, 0);
}

function backTenStudyQuestions() {
    currentStudyIndex -= 10;
    if (currentStudyIndex < 0) currentStudyIndex = 0; 
    renderStudyQuestion();
    window.scrollTo(0, 0);
}

// --- FLASHCARDS MODE ---
function startFlashcards() { currentFlashcardIndex = 0; renderFlashcard(); showScreen('flashcard-screen'); }

function renderFlashcard() {
    document.querySelector('.flip-card').classList.remove('flipped');
    const q = civicsData[currentFlashcardIndex];
    document.getElementById('flashcard-progress').innerText = `Question ${currentFlashcardIndex + 1} of ${civicsData.length}`;
    document.getElementById('flashcard-question').innerText = cleanText(q.question);
    
    // Map multiple answers if they exist, cleaned
    const cleanAnswersArray = q.answers.map(ans => cleanText(ans));
    const answerText = cleanAnswersArray.length > 1 ? `• ` + cleanAnswersArray.join(`\n• `) : cleanAnswersArray[0];
    document.getElementById('flashcard-answer').innerText = answerText;
}

function toggleFlashcard() { document.querySelector('.flip-card').classList.toggle('flipped'); }

function nextFlashcard() {
    currentFlashcardIndex++;
    if (currentFlashcardIndex >= civicsData.length) currentFlashcardIndex = 0; 
    renderFlashcard();
}

function skipTenFlashcards() {
    currentFlashcardIndex += 10;
    if (currentFlashcardIndex >= civicsData.length) currentFlashcardIndex = civicsData.length - 1; 
    renderFlashcard();
}

function backTenFlashcards() {
    currentFlashcardIndex -= 10;
    if (currentFlashcardIndex < 0) currentFlashcardIndex = 0; 
    renderFlashcard();
}

// --- QUIZ MODE ---
function startQuiz() {
    score = 0; currentQuizIndex = 0;
    let shuffledData = shuffleArray([...civicsData]);
    quizQuestions = shuffledData.slice(0, 20);
    renderQuizQuestion(); showScreen('quiz-screen');
}

function renderQuizQuestion() {
    const q = quizQuestions[currentQuizIndex];
    document.getElementById('quiz-progress-text').innerText = `Question ${currentQuizIndex + 1} of 20`;
    const progressPercent = ((currentQuizIndex) / 20) * 100;
    document.getElementById('quiz-progress-bar').style.width = `${progressPercent}%`;
    document.getElementById('quiz-question').innerText = cleanText(q.question);
    
    const correctAnswer = cleanText(q.answers[0]); 
    const currentCategory = getQuestionCategory(q.question);
    
    // Vibe-Matching!
    let similarQuestions = civicsData.filter(item => item.id !== q.id && getQuestionCategory(item.question) === currentCategory);
    if (similarQuestions.length < 3) { similarQuestions = civicsData.filter(item => item.id !== q.id); }
    
    let wrongAnswersPool = similarQuestions.map(item => cleanText(item.answers[0]));
    wrongAnswersPool = shuffleArray([...new Set(wrongAnswersPool)]); // Ensure unique wrong answers
    const selectedWrongAnswers = wrongAnswersPool.slice(0, 3);
    
    let options = [
        { text: correctAnswer, isCorrect: true },
        { text: selectedWrongAnswers[0], isCorrect: false },
        { text: selectedWrongAnswers[1], isCorrect: false },
        { text: selectedWrongAnswers[2], isCorrect: false }
    ];
    options = shuffleArray(options);
    
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
    document.getElementById('quiz-next-btn').innerText = currentQuizIndex === 19 ? "Finish Quiz" : "Next";
}

function handleAnswerClick(clickedDiv, isCorrect, correctAnswerText) {
    const allCards = document.querySelectorAll('.answer-card');
    allCards.forEach(card => card.classList.add('disabled'));
    
    if (isCorrect) {
        clickedDiv.classList.add('correct');
        score++;
    } else {
        clickedDiv.classList.add('incorrect');
        allCards.forEach(card => {
            if (card.innerText === correctAnswerText) card.classList.add('correct');
        });
    }
    document.getElementById('quiz-next-btn').disabled = false;
}

function nextQuizQuestion() {
    currentQuizIndex++;
    if (currentQuizIndex < 20) {
        renderQuizQuestion();
        window.scrollTo(0, 0);
    } else { endQuiz(true); }
}

function endQuiz(completed = false) {
    if (completed) {
        document.getElementById('final-score').innerText = `Your Score: ${score} / 20`;
        showScreen('result-screen');
    } else { goHome(); }
}

// --- MODAL CONFIRMATION LOGIC ---
function promptEndQuiz() { document.getElementById('confirmation-modal').classList.add('active'); }
function cancelEndQuiz() { document.getElementById('confirmation-modal').classList.remove('active'); }
function confirmEndQuiz() { document.getElementById('confirmation-modal').classList.remove('active'); endQuiz(false); }
