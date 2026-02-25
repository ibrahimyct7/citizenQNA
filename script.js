// --- STATE VARIABLES ---
let currentStudyIndex = 0;
let currentFlashcardIndex = 0;
let quizQuestions = [];
let currentQuizIndex = 0;
let score = 0;
let isHardQuiz = false;

// --- AUDIO (Subtle Click & AI Voice) ---
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
const synth = window.speechSynthesis;

function playClickSound() {
    if (audioCtx.state === 'suspended') audioCtx.resume();
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(600, audioCtx.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(200, audioCtx.currentTime + 0.05);
    gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.05);
    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    oscillator.start();
    oscillator.stop(audioCtx.currentTime + 0.05);
}

// Speak the question text
function speakQuestion(text) {
    synth.cancel(); // Stop any current speech
    const utterThis = new SpeechSynthesisUtterance(text);
    utterThis.rate = 1.0; // Normal speed
    synth.speak(utterThis);
}

document.addEventListener('click', function(e) {
    if (e.target.tagName === 'BUTTON' || e.target.classList.contains('answer-card') || e.target.closest('.flip-card')) {
        playClickSound();
    }
});

// --- SPEECH RECOGNITION (For Hard Quiz) ---
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition;
if (SpeechRecognition) {
    recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.onstart = function() {
        document.getElementById('mic-btn').classList.add('recording');
        document.getElementById('mic-btn').innerText = "🎙️ Listening...";
        document.getElementById('mic-status').innerText = "Speak now...";
    };

    recognition.onresult = function(event) {
        const transcript = event.results[0][0].transcript;
        document.getElementById('hard-quiz-input').value = transcript;
        document.getElementById('mic-status').innerText = "Caught it! You can edit or check answer.";
    };

    recognition.onerror = function() {
        document.getElementById('mic-status').innerText = "Didn't hear that. Try again or type.";
        stopMicrophoneUI();
    };

    recognition.onend = function() { stopMicrophoneUI(); };
}

function toggleMicrophone() {
    if (!recognition) {
        alert("Speech recognition isn't supported in this browser. Please type your answer.");
        return;
    }
    synth.cancel(); // Stop AI voice if user starts talking
    try { recognition.start(); } catch (e) { recognition.stop(); }
}

function stopMicrophoneUI() {
    document.getElementById('mic-btn').classList.remove('recording');
    document.getElementById('mic-btn').innerText = "🎤 Tap to Speak";
}

// --- UTILITIES ---
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Removes parenthesis content for cleaner reading/comparing
function cleanText(text) { return text.replace(/\s*\(.*?\)\s*/g, ' ').trim(); }

// Prepares text for flexible comparison (lowercased, stripped punctuation)
function normalizeForComparison(text) {
    return cleanText(text).toLowerCase().replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, "").trim();
}

// --- NAVIGATION ---
function showScreen(screenId) {
    synth.cancel(); // Stop talking when leaving a screen
    document.querySelectorAll('.screen').forEach(screen => screen.classList.remove('active'));
    document.getElementById(screenId).classList.add('active');
    window.scrollTo(0, 0); 
}
function goHome() { showScreen('home-screen'); }

// --- STUDY MODE & FLASHCARDS (Logic is same as before) ---
function startStudy() { currentStudyIndex = 0; renderStudyQuestion(); showScreen('study-screen'); }
function renderStudyQuestion() {
    const q = civicsData[currentStudyIndex];
    document.getElementById('study-progress').innerText = `Question ${currentStudyIndex + 1} of ${civicsData.length}`;
    document.getElementById('study-question').innerText = cleanText(q.question);
    const answersHtml = q.answers.map(ans => `<li>${cleanText(ans)}</li>`).join('');
    document.getElementById('study-answers').innerHTML = answersHtml;
}
function nextStudyQuestion() { currentStudyIndex = (currentStudyIndex + 1) % civicsData.length; renderStudyQuestion(); window.scrollTo(0, 0); }
function skipTenStudyQuestions() { currentStudyIndex = Math.min(currentStudyIndex + 10, civicsData.length - 1); renderStudyQuestion(); window.scrollTo(0, 0); }
function backTenStudyQuestions() { currentStudyIndex = Math.max(currentStudyIndex - 10, 0); renderStudyQuestion(); window.scrollTo(0, 0); }

function startFlashcards() { currentFlashcardIndex = 0; renderFlashcard(); showScreen('flashcard-screen'); }
function renderFlashcard() {
    document.querySelector('.flip-card').classList.remove('flipped');
    const q = civicsData[currentFlashcardIndex];
    document.getElementById('flashcard-progress').innerText = `Question ${currentFlashcardIndex + 1} of ${civicsData.length}`;
    document.getElementById('flashcard-question').innerText = cleanText(q.question);
    const cleanAnswersArray = q.answers.map(ans => cleanText(ans));
    document.getElementById('flashcard-answer').innerText = cleanAnswersArray.length > 1 ? `• ` + cleanAnswersArray.join(`\n• `) : cleanAnswersArray[0];
}
function toggleFlashcard() { document.querySelector('.flip-card').classList.toggle('flipped'); }
function nextFlashcard() { currentFlashcardIndex = (currentFlashcardIndex + 1) % civicsData.length; renderFlashcard(); }
function skipTenFlashcards() { currentFlashcardIndex = Math.min(currentFlashcardIndex + 10, civicsData.length - 1); renderFlashcard(); }
function backTenFlashcards() { currentFlashcardIndex = Math.max(currentFlashcardIndex - 10, 0); renderFlashcard(); }

// --- STANDARD QUIZ MODE ---
function startQuiz() {
    isHardQuiz = false; score = 0; currentQuizIndex = 0;
    quizQuestions = shuffleArray([...civicsData]).slice(0, 20);
    renderQuizQuestion(); showScreen('quiz-screen');
}

function renderQuizQuestion() {
    const q = quizQuestions[currentQuizIndex];
    document.getElementById('quiz-progress-text').innerText = `Question ${currentQuizIndex + 1} of 20`;
    document.getElementById('quiz-progress-bar').style.width = `${((currentQuizIndex) / 20) * 100}%`;
    const cleanQ = cleanText(q.question);
    document.getElementById('quiz-question').innerText = cleanQ;
    
    speakQuestion(cleanQ); // AI reads question
    
    // Pick correct answer
    const correctAnswer = cleanText(q.answers[0]); 
    
    // Pick hardcoded wrong answers (User provided logic)
    // We shuffle the hardcoded wrong answers and take 3
    let wrongAnswersPool = shuffleArray([...q.wrong]); 
    const selectedWrongAnswers = wrongAnswersPool.slice(0, 3).map(ans => cleanText(ans));
    
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
        allCards.forEach(card => { if (card.innerText === correctAnswerText) card.classList.add('correct'); });
    }
    document.getElementById('quiz-next-btn').disabled = false;
}

function nextQuizQuestion() {
    currentQuizIndex++;
    if (currentQuizIndex < 20) { renderQuizQuestion(); window.scrollTo(0, 0); } 
    else { endQuiz(true); }
}

// --- HARD QUIZ MODE (VOICE) ---
function startHardQuiz() {
    isHardQuiz = true; score = 0; currentQuizIndex = 0;
    quizQuestions = shuffleArray([...civicsData]).slice(0, 20);
    renderHardQuizQuestion(); showScreen('hard-quiz-screen');
}

function renderHardQuizQuestion() {
    const q = quizQuestions[currentQuizIndex];
    document.getElementById('hard-quiz-progress-text').innerText = `Question ${currentQuizIndex + 1} of 20`;
    document.getElementById('hard-quiz-progress-bar').style.width = `${((currentQuizIndex) / 20) * 100}%`;
    const cleanQ = cleanText(q.question);
    document.getElementById('hard-quiz-question').innerText = cleanQ;
    
    speakQuestion(cleanQ); // AI reads question
    
    // Reset inputs
    document.getElementById('hard-quiz-input').value = '';
    document.getElementById('hard-quiz-feedback').innerText = '';
    document.getElementById('mic-status').innerText = 'Ready...';
    
    // Toggle buttons
    document.getElementById('hard-quiz-check-btn').style.display = 'block';
    document.getElementById('hard-quiz-next-btn').style.display = 'none';
    
    if (currentQuizIndex === 19) document.getElementById('hard-quiz-next-btn').innerText = "Finish Quiz";
    else document.getElementById('hard-quiz-next-btn').innerText = "Next";
}

function checkHardAnswer() {
    const userInput = normalizeForComparison(document.getElementById('hard-quiz-input').value);
    const q = quizQuestions[currentQuizIndex];
    const feedback = document.getElementById('hard-quiz-feedback');
    
    if (!userInput) {
        feedback.innerText = "Please speak or type an answer first!";
        feedback.className = "feedback-text feedback-incorrect";
        return;
    }

    let isCorrect = false;
    
    // Smart verification: Does their input contain a keyword from ANY valid answer?
    for (let ans of q.answers) {
        const validAns = normalizeForComparison(ans);
        // If what they typed includes the valid answer, OR the valid answer includes what they typed (if it's long enough)
        if (userInput.includes(validAns) || (validAns.includes(userInput) && userInput.length > 3)) {
            isCorrect = true;
            break;
        }
    }

    if (isCorrect) {
        score++;
        feedback.innerText = "✅ Correct!";
        feedback.className = "feedback-text feedback-correct";
    } else {
        feedback.innerText = `❌ Incorrect. Accepted answers: \n• ${q.answers.map(a => cleanText(a)).join('\n• ')}`;
        feedback.className = "feedback-text feedback-incorrect";
    }

    document.getElementById('hard-quiz-check-btn').style.display = 'none';
    document.getElementById('hard-quiz-next-btn').style.display = 'block';
}

function nextHardQuizQuestion() {
    currentQuizIndex++;
    if (currentQuizIndex < 20) { renderHardQuizQuestion(); window.scrollTo(0, 0); } 
    else { endQuiz(true); }
}

// --- END & MODAL ---
function endQuiz(completed = false) {
    if (completed) {
        let finalMessage = "";
        if (score === 20) finalMessage = "🏆 Perfect Citizen!";
        else if (score >= 15) finalMessage = "⭐ Great Job!";
        else finalMessage = "📚 Keep Studying!";
        
        document.getElementById('final-score').innerHTML = `Your Score: ${score} / 20<br><span style="font-size:24px; color:#ffffff;">${finalMessage}</span>`;
        showScreen('result-screen');
    } else { goHome(); }
}

function promptEndQuiz() { document.getElementById('confirmation-modal').classList.add('active'); }
function cancelEndQuiz() { document.getElementById('confirmation-modal').classList.remove('active'); }
function confirmEndQuiz() { document.getElementById('confirmation-modal').classList.remove('active'); endQuiz(false); }
