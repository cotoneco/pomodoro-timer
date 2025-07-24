// --- HTMLの要素を取得 ---
const timerDisplay = document.getElementById('timer-display');
const startBtn = document.getElementById('start-btn');
const pauseBtn = document.getElementById('pause-btn');
const resetBtn = document.getElementById('reset-btn');
const progressRing = document.getElementById('progress-ring');
const catVideo = document.getElementById('cat-video'); // 動画要素を取得

// --- 円の初期設定 ---
const radius = progressRing.r.baseVal.value;
const circumference = 2 * Math.PI * radius;

progressRing.style.strokeDasharray = `${circumference} ${circumference}`;
progressRing.style.strokeDashoffset = circumference;

// --- タイマーの初期設定 ---
const WORK_TIME = 25 * 60; // 25分を秒で計算
let timeLeft = WORK_TIME;
let countdown;
let isPaused = true;

// --- 関数定義 ---

function setProgress(percent) {
    const offset = circumference - (percent / 100) * circumference;
    progressRing.style.strokeDashoffset = offset;
}

function updateDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timerDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    
    const percent = ((WORK_TIME - timeLeft) / WORK_TIME) * 100;
    setProgress(percent);
}

// タイマーを開始する関数
function startTimer() {
    if (isPaused) {
        isPaused = false;
        catVideo.classList.remove('hidden'); // 動画を表示
        catVideo.play(); // 動画を再生

        countdown = setInterval(() => {
            timeLeft--;
            updateDisplay();

            if (timeLeft <= 0) {
                clearInterval(countdown);
                const meowSound = new Audio('neco.mp3'); // 猫の鳴き声
                meowSound.play();
                alert('休憩しましょう！');
                resetTimer();
            }
        }, 1000);
    }
}

// タイマーを一時停止する関数
function pauseTimer() {
    isPaused = true;
    catVideo.pause(); // 動画を一時停止
    clearInterval(countdown);
}

// タイマーをリセットする関数
function resetTimer() {
    pauseTimer();
    timeLeft = WORK_TIME;
    catVideo.classList.add('hidden'); // 動画を非表示
    catVideo.currentTime = 0; // 動画を最初に戻す
    updateDisplay();
}

// --- イベントリスナーの設定 ---
startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', resetTimer);

// --- 初期表示 ---
updateDisplay();
