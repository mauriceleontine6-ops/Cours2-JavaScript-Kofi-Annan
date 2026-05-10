(function() {
    var TOTAL = 60;
    var score, timeLeft, streak, bestStreak, correctCount, wrongCount, history, current;
    var tickId = null;
    var autoRoundId = null; // Gère le changement automatique des nombres
    var phase = 'start';

    var music = document.getElementById('bg-music');
    var soundSuccess = document.getElementById('sound-success'); 
    var soundFail = document.getElementById('sound-fail'); 
    var okMessages  = ['Bravo ! 🎉','Super ! ⚡','Parfait ! 🌟','Excellent ! 🔥','Incroyable ! 😎','C\'est ça ! 💪','Trop fort ! 🚀'];
    var badMessages = ['Raté... 😬','Oups ! 😅','Pas cette fois 😮','Presque ! 🤏','Continue ! 💪','Allez ! 😤'];

    const muteBtn = document.getElementById('mute-btn');
    let isMuted = false;
    const allSounds = [music, soundSuccess, soundFail];

    muteBtn.onclick = () => {
        isMuted = !isMuted;
        allSounds.forEach(sound => {sound.muted = isMuted;});
        muteBtn.textContent = isMuted ? '🔇' : '🔊';
        isMuted ? muteBtn.classList.add('is-muted') : muteBtn.classList.remove('is-muted');
    };

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
        music.play();
        music.volume = 0.5;

        // Nettoyage des intervalles si une partie était déjà en cours
        if (tickId) clearInterval(tickId);
        if (autoRoundId) clearInterval(autoRoundId);

        score=0; timeLeft=TOTAL; streak=0; bestStreak=0;
        correctCount=0; wrongCount=0; history=[]; current=0;
        phase = 'game';
        
        setText('score-val','0'); setText('timer-val','60'); setText('streak-val','0');
        document.getElementById('timer-val').classList.remove('danger');
        document.getElementById('timer-bar').classList.remove('danger');
        document.getElementById('timer-bar').style.width = '100%';
        document.getElementById('feedback').textContent='';
        document.getElementById('feedback').className='';
        
        // Configuration de l'affichage pour le mode rapide
        document.getElementById('num-show').style.display='block';
        document.getElementById('num-hide').style.display='none';
        document.getElementById('score-bar').innerHTML='';
        
        buildKeypad();
        show('s-game');

        tickId = setInterval(tick, 1000);
        
        // Lance le premier nombre immédiatement
        newRound();
        // Puis change le nombre toutes les 500ms automatiquement
        autoRoundId = setInterval(newRound, 500);
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
            endGame();
        }
    }
    
    function buildKeypad() {
        var kp = document.getElementById('keypad');
        kp.innerHTML = '';
        for (var i=1; i<=10; i++) {
            (function(n){
                var b = document.createElement('button');
                b.className='key'; b.textContent=n; b.dataset.n=n;
                b.addEventListener('click', function(){ guess(n, b); });
                kp.appendChild(b);
            })(i);
        }
    }
    
    function newRound() {
        if (phase !== 'game' || timeLeft <= 0) return;

        // On nettoie les couleurs des touches du mini-tour précédent
        document.querySelectorAll('.key').forEach(k => k.classList.remove('ok','bad'));
        
        // Nouveau chiffre aléatoire
        current = Math.floor(Math.random()*10)+1;
        var ns = document.getElementById('num-show');
        ns.textContent = current;
        
        // Animation de rafraîchissement
        ns.style.animation = 'none';
        ns.offsetWidth; 
        ns.style.animation = 'numPop .2s cubic-bezier(.34,1.56,.64,1)';
    }
    
    function guess(n, btn) {
        if (phase !== 'game') return;

        var ok = (n === current);
        var fb = document.getElementById('feedback');

        if (ok) {
            soundSuccess.currentTime = 0;
            soundSuccess.play();
            score++; streak++; correctCount++;
            if (streak > bestStreak) bestStreak = streak;
            btn.classList.add('ok');
            fb.innerHTML = pick(okMessages);
            fb.className = 'ok';
        } else {
            soundFail.currentTime = 0;
            soundFail.play();
            streak = 0; wrongCount++;
            btn.classList.add('bad');
            fb.innerHTML = pick(badMessages);
            fb.className = 'bad';
        }

        history.push(ok);
        setText('score-val', score); 
        setText('streak-val', streak);
        
        var bar = document.getElementById('score-bar');
        var dot = document.createElement('div');
        dot.className = 'trail-dot ' + (ok ? 'ok' : 'bad') + ' new';
        bar.appendChild(dot);
        if(bar.children.length > 20) bar.removeChild(bar.firstChild);
    }

    function endGame() {
        phase = 'end';
        clearInterval(tickId);
        clearInterval(autoRoundId);
        setTimeout(showEnd, 400);
    }
    
    function showEnd() {
        music.pause();
        music.currentTime = 0;
        setText('final-score', score);
        setText('st-ok', correctCount);
        setText('st-bad', wrongCount);
        setText('st-str', bestStreak);
    
        var emoji, title, msg;
        if (score >= 40)      { emoji='🏆'; title='Légendaire !';   msg='Tes réflexes sont surhumains !'; }
        else if (score >= 25) { emoji='🌟'; title='Excellent !';     msg='Quelle rapidité !'; }
        else if (score >= 15) { emoji='💪'; title='Bien joué !';     msg='Tu as le rythme dans la peau !'; }
        else                  { emoji='😊'; title='Pas mal !';       msg='Concentration... essaye encore !'; }
    
        setText('end-emoji', emoji);
        setText('end-title', title);
        setText('end-msg', msg);
    
        var ed = document.getElementById('end-trail'); ed.innerHTML = '';
        history.slice(-40).forEach(function(h){ // On affiche les 40 derniers pour ne pas surcharger
            var d = document.createElement('div'); d.className = 'trail-dot ' + (h ? 'ok' : 'bad'); ed.appendChild(d);
        });
    
        show('s-end');
    }
})();