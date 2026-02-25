// --- STATE VARIABLES ---
let currentStudyIndex = 0;
let currentFlashcardIndex = 0;
let quizQuestions = [];
let currentQuizIndex = 0;
let score = 0;

// --- ADVANCED VOICE LOGIC (SEARCH FOR BEST VOICE) ---
const synth = window.speechSynthesis;
let voices = [];

function populateVoices() {
    voices = synth.getVoices();
}

// Ensure voices are loaded (some browsers load them asynchronously)
populateVoices();
if (speechSynthesis.onvoiceschanged !== undefined) {
    speechSynthesis.onvoiceschanged = populateVoices;
}

function speakQuestion(text) {
    synth.cancel(); // Kill any current speech
    
    setTimeout(() => {
        const utterThis = new SpeechSynthesisUtterance(text);
        utterThis.rate = 1.08; // Your requested speed
        utterThis.pitch = 1.0; 

        // PRIORITIZE PREMIUM VOICES
        // Looks for Google (Android/Chrome), Enhanced/Samantha (iOS), or Premium
        const bestVoice = voices.find(v => 
            v.name.includes('Google US English') || 
            v.name.includes('Enhanced') || 
            v.name.includes('Samantha') || 
            v.name.includes('Premium') ||
            v.name.includes('Natural')
        );

        if (bestVoice) {
            utterThis.voice = bestVoice;
        } else {
            // Fallback to any English voice
            utterThis.voice = voices.find(v => v.lang.startsWith('en'));
        }

        synth.speak(utterThis);
    }, 100);
}

// --- INSTANT DATA LOAD & PROGRESS RING ---
window.onload = () => { loadUserData(); };

function loadUserData() {
    currentStudyIndex = parseInt(localStorage.getItem(`civ_studyIndex`)) || 0;
    currentFlashcardIndex = parseInt(localStorage.getItem(`civ_flashcardIndex`)) || 0;
    
    const totalQ = parseInt(localStorage.getItem(`civ_totalQ`)) || 0;
    const correctA = parseInt(localStorage.getItem(`civ_correctA`)) || 0;
    
    let mastery = totalQ > 0 ? Math.round((correctA / totalQ) * 100) : 0;
    
    // Update the UI Number
    document.getElementById('mastery-percentage').innerText = mastery + "%";
    
    // Calculate Ring Growth and Patriotic Color Shift
    let degrees = mastery * 3.6;
    let hue = Math.round((mastery / 100) * 120); // 0=Red, 60=Yellow, 120=Green
    let activeColor = `hsl(${hue}, 80%, 50%)`;
    let emptyColor = `rgba(255, 255, 255, 0.1)`;

    document.getElementById('progress-circle').style.background = 
        `conic-gradient(${activeColor} ${degrees}deg, ${emptyColor} ${degrees}deg)`;
    
    let rt = document.getElementById('resume-text');
    if (totalQ === 0) {
        rt.innerText = "Take a quiz to see your mastery!";
    } else {
        rt.innerText = mastery >= 90 ? "Excellent Mastery!" : "Keep Practicing!";
    }
}

function updateMastery(qCount, correctCount) {
    localStorage.setItem(`civ_totalQ`, (parseInt(localStorage.getItem(`civ_totalQ`)) || 0) + qCount);
    localStorage.setItem(`civ_correctA`, (parseInt(localStorage.getItem(`civ_correctA`)) || 0) + correctCount);
    loadUserData();
}

// --- UTILITIES ---
function cleanText(t) { return t.replace(/\s*\(.*?\)\s*/g, ' ').replace(/[“”"']/g, '').trim(); }
function norm(t) { return cleanText(t).toLowerCase().replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, "").trim(); }

// Forgiving matching for Hard Quiz
function isMatch(inp, ansList) {
    const stop = ['the', 'a', 'an', 'it', 'is', 'are', 'was', 'were', 'to', 'of', 'for', 'in', 'on', 'that', 'says', 'from', 'because', 'they', 'have', 'and', 'by', 'our'];
    const cleanInp = norm(inp);
    for (let a of ansList) {
        const cleanA = norm(a);
        // Instant pass if keywords overlap significantly
        if (cleanInp.includes(cleanA) || (cleanA.includes(cleanInp) && cleanInp.length > 4)) return true;
        
        const words = cleanA.split(' ').filter(w => !stop.includes(w) && w.length > 1);
        if (words.length === 0) continue;
        
        let m = 0;
        words.forEach(w => { if (cleanInp.includes(w)) m++; });
        
        // 50% keyword threshold for long answers
        if (words.length <= 2 ? m === words.length : m / words.length >= 0.5) return true;
    }
    return false;
}

// --- NAVIGATION ---
function showScreen(id) {
    synth.cancel();
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(id).classList.add('active');
    window.scrollTo(0, 0);
}

function goHome() { showScreen('home-screen'); loadUserData(); }

// --- STUDY MODE ---
function startStudy() { renderStudy(); showScreen('study-screen'); }
function renderStudy() {
    const q = civicsData[currentStudyIndex];
    document.getElementById('study-progress').innerText = `Question ${currentStudyIndex + 1} of 128`;
    document.getElementById('study-question').innerText = cleanText(q.question);
    document.getElementById('study-answers').innerHTML = q.answers.map(a => `<li>${cleanText(a)}</li>`).join('');
    localStorage.setItem('civ_studyIndex', currentStudyIndex);
}
function nextStudyQuestion() { currentStudyIndex = (currentStudyIndex + 1) % 128; renderStudy(); }
function skipTenStudyQuestions() { currentStudyIndex = Math.min(currentStudyIndex + 10, 127); renderStudy(); }
function backTenStudyQuestions() { currentStudyIndex = Math.max(currentStudyIndex - 10, 0); renderStudy(); }

// --- FLASHCARDS ---
function startFlashcards() { renderFlash(); showScreen('flashcard-screen'); }
function renderFlash() {
    document.querySelector('.flip-card').classList.remove('flipped');
    const q = civicsData[currentFlashcardIndex];
    document.getElementById('flashcard-progress').innerText = `Question ${currentFlashcardIndex + 1} of 128`;
    document.getElementById('flashcard-question').innerText = cleanText(q.question);
    document.getElementById('flashcard-answer').innerText = q.answers.map(cleanText).join('\n• ');
    localStorage.setItem('civ_flashcardIndex', currentFlashcardIndex);
}
function toggleFlashcard() { document.querySelector('.flip-card').classList.toggle('flipped'); }
function nextFlashcard() { currentFlashcardIndex = (currentFlashcardIndex + 1) % 128; renderFlash(); }
function skipTenFlashcards() { currentFlashcardIndex = Math.min(currentFlashcardIndex + 10, 127); renderFlash(); }
function backTenFlashcards() { currentFlashcardIndex = Math.max(currentFlashcardIndex - 10, 0); renderFlash(); }

// --- STANDARD QUIZ ---
function startQuiz() { quizQuestions = [...civicsData].sort(() => 0.5 - Math.random()).slice(0, 20); currentQuizIndex = 0; score = 0; renderQuiz(); showScreen('quiz-screen'); }
function renderQuiz() {
    const q = quizQuestions[currentQuizIndex];
    document.getElementById('quiz-progress-text').innerText = `Question ${currentQuizIndex + 1} of 20`;
    document.getElementById('quiz-progress-bar').style.width = (currentQuizIndex / 20 * 100) + "%";
    document.getElementById('quiz-question').innerText = cleanText(q.question);
    speakQuestion(cleanText(q.question));
    
    // Mix the correct answer with the curated wrong ones
    const opts = [{t: q.answers[0], c: true}, ...q.wrong.slice(0, 3).map(w => ({t: w, c: false}))].sort(() => 0.5 - Math.random());
    const container = document.getElementById('quiz-options');
    container.innerHTML = '';
    opts.forEach(o => {
        const d = document.createElement('div'); d.className = 'answer-card'; d.innerText = cleanText(o.t);
        d.onclick = () => {
            if (o.c) { d.classList.add('correct'); score++; } else d.classList.add('incorrect');
            document.querySelectorAll('.answer-card').forEach(card => card.style.pointerEvents = 'none');
            document.getElementById('quiz-next-btn').disabled = false;
        };
        container.appendChild(d);
    });
    document.getElementById('quiz-next-btn').disabled = true;
    document.getElementById('quiz-next-btn').innerText = currentQuizIndex === 19 ? "Finish Quiz" : "Next";
}
function nextQuizQuestion() { currentQuizIndex++; if (currentQuizIndex < 20) renderQuiz(); else finishQuiz(); }

// --- HARD QUIZ (VOICE) ---
function startHardQuiz() { quizQuestions = [...civicsData].sort(() => 0.5 - Math.random()).slice(0, 20); currentQuizIndex = 0; score = 0; renderHard(); showScreen('hard-quiz-screen'); }
function renderHard() {
    const q = quizQuestions[currentQuizIndex];
    document.getElementById('hard-quiz-progress-text').innerText = `Question ${currentQuizIndex+1} of 20`;
    document.getElementById('hard-quiz-progress-bar').style.width = (currentQuizIndex / 20 * 100) + "%";
    document.getElementById('hard-quiz-question').innerText = cleanText(q.question);
    speakQuestion(cleanText(q.question));
    
    document.getElementById('hard-quiz-input').value = '';
    document.getElementById('hard-quiz-feedback').innerText = '';
    document.getElementById('hard-quiz-check-btn').style.display = 'block';
    document.getElementById('hard-quiz-next-btn').style.display = 'none';
}
function checkHardAnswer() {
    if(rec) { try { rec.stop(); } catch(e){} }
    const inp = document.getElementById('hard-quiz-input').value;
    const q = quizQuestions[currentQuizIndex];
    
    if (isMatch(inp, q.answers)) { 
        score++; 
        document.getElementById('hard-quiz-feedback').innerText = "✅ Correct!";
        document.getElementById('hard-quiz-feedback').className = "feedback-text feedback-correct";
    } else { 
        document.getElementById('hard-quiz-feedback').innerText = "❌ Incorrect. Correct: " + cleanText(q.answers[0]);
        document.getElementById('hard-quiz-feedback').className = "feedback-text feedback-incorrect";
    }
    document.getElementById('hard-quiz-check-btn').style.display = 'none';
    document.getElementById('hard-quiz-next-btn').style.display = 'block';
    document.getElementById('hard-quiz-next-btn').innerText = currentQuizIndex === 19 ? "Finish Quiz" : "Next";
}
function nextHardQuizQuestion() { currentQuizIndex++; if (currentQuizIndex < 20) renderHard(); else finishQuiz(); }

// --- END LOGIC ---
function finishQuiz() { 
    updateMastery(20, score); 
    document.getElementById('final-score').innerText = `Your Final Score: ${score} / 20`; 
    showScreen('result-screen'); 
}

function promptEndQuiz() { document.getElementById('confirmation-modal').classList.add('active'); }
function cancelEndQuiz() { document.getElementById('confirmation-modal').classList.remove('active'); }
function confirmEndQuiz() { cancelEndQuiz(); goHome(); }

// --- SPEECH RECOGNITION ---
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let rec;
if (SpeechRecognition) {
    rec = new SpeechRecognition();
    rec.onstart = () => { 
        document.getElementById('mic-btn').classList.add('recording'); 
        document.getElementById('mic-btn').innerText = "🎙️ Listening...";
    };
    rec.onresult = (e) => { 
        document.getElementById('hard-quiz-input').value = e.results[0][0].transcript; 
    };
    rec.onend = () => { 
        document.getElementById('mic-btn').classList.remove('recording'); 
        document.getElementById('mic-btn').innerText = "🎤 Tap to Speak";
    };
}
function toggleMicrophone() { try { rec.start(); } catch(e) { rec.stop(); } }
