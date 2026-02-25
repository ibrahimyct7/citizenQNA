let currentStudyIndex = 0, currentFlashcardIndex = 0, quizQuestions = [], currentQuizIndex = 0, score = 0;
const synth = window.speechSynthesis;

window.onload = () => { loadUserData(); };

function loadUserData() {
    currentStudyIndex = parseInt(localStorage.getItem(`civ_studyIndex`)) || 0;
    currentFlashcardIndex = parseInt(localStorage.getItem(`civ_flashcardIndex`)) || 0;
    const totalQ = parseInt(localStorage.getItem(`civ_totalQ`)) || 0, correctA = parseInt(localStorage.getItem(`civ_correctA`)) || 0;
    let mastery = totalQ > 0 ? Math.round((correctA / totalQ) * 100) : 0;
    document.getElementById('mastery-percentage').innerText = mastery + "%";
    let hue = Math.round((mastery / 100) * 120); 
    document.getElementById('progress-circle').style.background = `conic-gradient(hsl(${hue}, 80%, 45%) ${mastery * 3.6}deg, rgba(255,255,255,0.1) 0deg)`;
    let rt = document.getElementById('resume-text');
    rt.innerText = totalQ === 0 ? "Take a quiz to see your mastery!" : mastery >= 90 ? "You are ready!" : "Keep studying!";
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
        u.rate = 1.05;
        const v = synth.getVoices();
        u.voice = v.find(n => n.name.includes('Google') || n.name.includes('Samantha')) || v[0];
        synth.speak(u);
    }, 100);
}

function cleanText(t) { return t.replace(/\s*\(.*?\)\s*/g, ' ').trim(); }
function norm(t) { return cleanText(t).toLowerCase().replace(/[.,/#!$%^&*;:{}=\-_`~()""'“”’‘]/g, "").trim(); }

function isMatch(inp, ansList) {
    const stop = ['the', 'a', 'it', 'is', 'of', 'for', 'in', 'that', 'from', 'because', 'they', 'have'];
    const cleanInp = norm(inp);
    for (let a of ansList) {
        const cleanA = norm(a);
        if (cleanInp.includes(cleanA) || (cleanA.includes(cleanInp) && cleanInp.length > 4)) return true;
        const words = cleanA.split(' ').filter(w => !stop.includes(w) && w.length > 1);
        let m = 0;
        words.forEach(w => { if (cleanInp.includes(w)) m++; });
        if (words.length <= 2 ? m === words.length : m / words.length >= 0.5) return true;
    }
    return false;
}

function showScreen(id) {
    synth.cancel();
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(id).classList.add('active');
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
}
function nextQuizQuestion() { currentQuizIndex++; if (currentQuizIndex < 20) renderQuiz(); else finishQuiz(); }

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
    const inp = document.getElementById('hard-quiz-input').value;
    const q = quizQuestions[currentQuizIndex];
    if (isMatch(inp, q.answers)) { score++; document.getElementById('hard-quiz-feedback').innerText = "✅ Correct!"; }
    else document.getElementById('hard-quiz-feedback').innerText = "❌ Incorrect. Try: " + cleanText(q.answers[0]);
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
    rec.onstart = () => { document.getElementById('mic-btn').classList.add('recording'); };
    rec.onresult = (e) => { document.getElementById('hard-quiz-input').value = e.results[0][0].transcript; };
    rec.onend = () => { document.getElementById('mic-btn').classList.remove('recording'); };
}
function toggleMicrophone() { try { rec.start(); } catch(e) { rec.stop(); } }
