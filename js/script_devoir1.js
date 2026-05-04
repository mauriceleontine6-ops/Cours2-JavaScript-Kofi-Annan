(function() {
var TOTAL = 60;
var score, timeLeft, streak, bestStreak, correctCount, wrongCount, history, current, accepting;
var tickId = null, phase = 'start';

var okMessages  = ['Bravo ! 🎉','Super ! ⚡','Parfait ! 🌟','Excellent ! 🔥','Incroyable ! 😎','C\'est ça ! 💪','Trop fort ! 🚀'];
var badMessages = ['Raté... 😬','Oups ! 😅','Pas cette fois 😮','Presque ! 🤏','Continue ! 💪','Allez ! 😤'];

function pick(arr) { return arr[Math.floor(Math.random()*arr.length)]; }

function show(id) {
['s-start','s-game','s-end'].forEach(function(s){
    document.getElementById(s).className = 'screen' + (s===id ? ' active' : '');
});
}
function setText(id, v) { document.getElementById(id).textContent = v; }

document.getElementById('btn-start').addEventListener('click', beginGame);
document.getElementById('btn-restart').addEventListener('click', beginGame);

function beginGame() {
if (tickId) { clearInterval(tickId); tickId = null; }
score=0; timeLeft=TOTAL; streak=0; bestStreak=0;
correctCount=0; wrongCount=0; history=[]; current=0; accepting=false;
phase = 'game';

setText('score-val','0'); setText('timer-val','60'); setText('streak-val','0');
document.getElementById('timer-val').classList.remove('danger');
document.getElementById('timer-bar').classList.remove('danger');
document.getElementById('timer-bar').style.width = '100%';
document.getElementById('feedback').textContent='';
document.getElementById('feedback').className='';
document.getElementById('num-show').style.display='none';
document.getElementById('num-hide').style.display='flex';
document.getElementById('score-bar').innerHTML='';
buildKeypad();
show('s-game');
tickId = setInterval(tick, 1000);
setTimeout(newRound, 700);
}

function tick() {
if (phase !== 'game') return;
timeLeft--;
setText('timer-val', timeLeft);
document.getElementById('timer-bar').style.width = (timeLeft/TOTAL*100)+'%';
if (timeLeft <= 10) {
    document.getElementById('timer-val').classList.add('danger');
    document.getElementById('timer-bar').classList.add('danger');
}
if (timeLeft <= 0) {
    clearInterval(tickId); tickId=null;
    phase='end';
    setTimeout(showEnd, 400);
}
}

function buildKeypad() {
var kp = document.getElementById('keypad');
kp.innerHTML = '';
for (var i=1; i<=10; i++) {
    (function(n){
    var b = document.createElement('button');
    b.className='key'; b.textContent=n; b.dataset.n=n;
    b.addEventListener('click', function(){ guess(n,b); });
    kp.appendChild(b);
    })(i);
}
}

function newRound() {
if (phase !== 'game' || timeLeft <= 0) return;
accepting = false;
current = Math.floor(Math.random()*10)+1;
var ns = document.getElementById('num-show');
var nh = document.getElementById('num-hide');
ns.textContent = current;
ns.style.animation='none'; ns.offsetWidth; ns.style.animation='';
ns.style.display='block'; nh.style.display='none';
setTimeout(function(){
    if (phase !== 'game') return;
    ns.style.display='none'; nh.style.display='flex';
    accepting=true;
}, 500);
}

function guess(n, btn) {
if (phase !== 'game' || !accepting) return;
accepting = false;
var ok = n===current;
var fb = document.getElementById('feedback');
if (ok) {
    score++; streak++; correctCount++;
    if (streak>bestStreak) bestStreak=streak;
    btn.classList.add('ok');
    fb.innerHTML = pick(okMessages);
    fb.className = 'ok';
} else {
    streak=0; wrongCount++;
    btn.classList.add('bad');
    fb.innerHTML = pick(badMessages);
    fb.className = 'bad';
    document.querySelectorAll('.key').forEach(function(k){
    if (parseInt(k.dataset.n)===current) k.classList.add('ok');
    });
}
history.push(ok);
setText('score-val', score); setText('streak-val', streak);

// Trail dot
var bar=document.getElementById('score-bar');
var dot=document.createElement('div');
dot.className='trail-dot '+(ok?'ok':'bad')+' new';
bar.appendChild(dot);
while(bar.children.length>20) bar.removeChild(bar.firstChild);

setTimeout(function(){
    if (phase !== 'game') return;
    document.querySelectorAll('.key').forEach(function(k){ k.classList.remove('ok','bad'); });
    fb.textContent=''; fb.className='';
    newRound();
}, 650);
}

function showEnd() {
setText('final-score', score);
setText('st-ok', correctCount);
setText('st-bad', wrongCount);
setText('st-str', bestStreak);

// Personalized message based on score
var emoji, title, msg;
if (score >= 20)      { emoji='🏆'; title='Légendaire !';   msg='Tu es une machine à mémoire !'; }
else if (score >= 14) { emoji='🌟'; title='Excellent !';     msg='Vraiment impressionnant !'; }
else if (score >= 9)  { emoji='💪'; title='Bien joué !';     msg='Tu t\'en sors très bien !'; }
else if (score >= 5)  { emoji='😊'; title='Pas mal !';       msg='Continue de t\'entraîner !'; }
else                  { emoji=''; title='Fin du jeu !'; msg='La prochaine fois sera meilleure !'; }

setText('end-emoji', emoji);
setText('end-title', title);
setText('end-msg', msg);

var ed=document.getElementById('end-trail'); ed.innerHTML='';
history.forEach(function(h){
    var d=document.createElement('div'); d.className='trail-dot '+(h?'ok':'bad'); ed.appendChild(d);
});

// Retrigger animation
var fs=document.getElementById('final-score');
fs.style.animation='none'; fs.offsetWidth; fs.style.animation='';

show('s-end');
}
})();