let currentStudyIndex = 0, currentFlashcardIndex = 0, quizQuestions = [], currentQuizIndex = 0, score = 0;
const synth = window.speechSynthesis;
let voices = [];

function populateVoices() { voices = synth.getVoices(); }
populateVoices();
if (speechSynthesis.onvoiceschanged !== undefined) { speechSynthesis.onvoiceschanged = populateVoices; }

window.onload = () => { loadUserData(); };

function loadUserData() {
    currentStudyIndex = parseInt(localStorage.getItem(`civ_studyIndex`)) || 0;
    currentFlashcardIndex = parseInt(localStorage.getItem(`civ_flashcardIndex`)) || 0;
    const totalQ = parseInt(localStorage.getItem(`civ_totalQ`)) || 0, correctA = parseInt(localStorage.getItem(`civ_correctA`)) || 0;
    let mastery = totalQ > 0 ? Math.round((correctA / totalQ) * 100) : 0;
    document.getElementById('mastery-percentage').innerText = mastery + "%";
    let degrees = mastery * 3.6;
    let hue = Math.round((mastery / 100) * 120); 
    document.getElementById('progress-circle').style.background = `conic-gradient(hsl(${hue}, 80%, 50%) ${degrees}deg, rgba(255,255,255,0.1) ${degrees}deg)`;
    document.getElementById('resume-text').innerText = totalQ === 0 ? "Take a quiz to see your mastery!" : mastery >= 90 ? "Excellent Mastery!" : "Keep Practicing!";
}

function updateMastery(q, c) {
    localStorage.setItem(`civ_totalQ`, (parseInt(localStorage.getItem(`civ_totalQ`)) || 0) + q);
    localStorage.setItem(`civ_correctA`, (parseInt(localStorage.getItem(`civ_correctA`)) || 0) + c);
    loadUserData();
}

function speakQuestion(text) {
    synth.cancel();
    setTimeout(() => {
        const u = new SpeechSynthesisUtterance(text);
        u.rate = 1.08;
        const v = synth.getVoices();
        u.voice = v.find(n => n.name.includes('Google') || n.name.includes('Samantha') || n.name.includes('Enhanced')) || v[0];
        synth.speak(u);
    }, 100);
}

function cleanText(t) { return t.replace(/\s*\(.*?\)\s*/g, ' ').trim(); }
function norm(t) { return cleanText(t).toLowerCase().replace(/[.,/#!$%^&*;:{}=\-_`~()""'“”’‘]/g, "").trim(); }

// --- SUPER FORGIVING ENGINE ---
function isMatch(inp, ansList) {
    const cleanInp = norm(inp);
    const stopWords = ['the', 'a', 'an', 'it', 'is', 'are', 'was', 'were', 'to', 'of', 'for', 'in', 'on', 'that', 'says', 'from', 'because', 'they', 'have', 'and', 'by', 'our'];
    
    // Keywords for 'Writer' vs 'Wrote' handling
    const stems = { "writer": "wrote", "writing": "wrote", "written": "wrote", "wrote": "wrote" };

    for (let a of ansList) {
        const cleanA = norm(a);
        
        // 1. Direct contains check
        if (cleanInp.includes(cleanA) || cleanA.includes(cleanInp)) return true;

        // 2. Keyword density check with stemming
        const aWords = cleanA.split(' ').filter(w => !stopWords.includes(w) && w.length > 2);
        const iWords = cleanInp.split(' ').filter(w => !stopWords.includes(w) && w.length > 2);
        
        let matches = 0;
        aWords.forEach(aw => {
            const stemA = stems[aw] || aw;
            if (iWords.some(iw => (stems[iw] || iw) === stemA || iw.includes(stemA) || stemA.includes(iw))) {
                matches++;
            }
        });

        // If you hit 50% of core words, you pass.
        if (matches / aWords.length >= 0.5) return true;
    }
    return false;
}

function showScreen(id) {
    synth.cancel();
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(id).classList.add('active');
    window.scrollTo(0, 0);
}

function goHome() { showScreen('home-screen'); loadUserData(); }

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

function startQuiz() { quizQuestions = [...civicsData].sort(() => 0.5 - Math.random()).slice(0, 20); currentQuizIndex = 0; score = 0; renderQuiz(); showScreen('quiz-screen'); }
function renderQuiz() {
    const q = quizQuestions[currentQuizIndex];
    document.getElementById('quiz-progress-text').innerText = `Question ${currentQuizIndex + 1} of 20`;
    document.getElementById('quiz-progress-bar').style.width = (currentQuizIndex / 20 * 100) + "%";
    document.getElementById('quiz-question').innerText = cleanText(q.question);
    speakQuestion(cleanText(q.question));
    const opts = [{t: q.answers[0], c: true}, ...q.wrong.slice(0, 3).map(w => ({t: w, c: false}))].sort(() => 0.5 - Math.random());
    const container = document.getElementById('quiz-options'); container.innerHTML = '';
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
}
function nextQuizQuestion() { currentQuizIndex++; if (currentQuizIndex < 20) renderQuiz(); else finishQuiz(); }

function startHardQuiz() { quizQuestions = [...civicsData].sort(() => 0.5 - Math.random()).slice(0, 20); currentQuizIndex = 0; score = 0; renderHard(); showScreen('hard-quiz-screen'); }
function renderHard() {
    const q = quizQuestions[currentQuizIndex];
    document.getElementById('hard-quiz-progress-text').innerText = `Question ${currentQuizIndex + 1} of 20`;
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
        document.getElementById('hard-quiz-feedback').style.color = "#28a745"; 
    } else { 
        document.getElementById('hard-quiz-feedback').innerText = "❌ No. Answer: " + cleanText(q.answers[0]); 
        document.getElementById('hard-quiz-feedback').style.color = "#ff4d4d"; 
    }
    document.getElementById('hard-quiz-check-btn').style.display = 'none';
    document.getElementById('hard-quiz-next-btn').style.display = 'block';
}
function nextHardQuizQuestion() { currentQuizIndex++; if (currentQuizIndex < 20) renderHard(); else finishQuiz(); }

function finishQuiz() { updateMastery(20, score); document.getElementById('final-score').innerText = `Score: ${score} / 20`; showScreen('result-screen'); }
function promptEndQuiz() { document.getElementById('confirmation-modal').classList.add('active'); }
function cancelEndQuiz() { document.getElementById('confirmation-modal').classList.remove('active'); }
function confirmEndQuiz() { cancelEndQuiz(); goHome(); }

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let rec;
if (SpeechRecognition) {
    rec = new SpeechRecognition();
    rec.onstart = () => { 
        document.getElementById('mic-btn').classList.add('recording'); 
        document.getElementById('mic-status').innerText = "Speak";
    };
    rec.onresult = (e) => { document.getElementById('hard-quiz-input').value = e.results[0][0].transcript; };
    rec.onend = () => { 
        document.getElementById('mic-btn').classList.remove('recording'); 
        document.getElementById('mic-status').innerText = "";
    };
}
function toggleMicrophone() { try { rec.start(); } catch(e) { rec.stop(); } }
