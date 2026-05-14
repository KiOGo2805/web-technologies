const cardValues = ['🍎', '🍌', '🍉', '🍇', '🍐', '🥝', '🍑', '🍍'];

const difficulties = {
    easy: { label: 'Easy', pairs: 8, time: 180 },
    normal: { label: 'Normal', pairs: 6, time: 120 },
    hard: { label: 'Hard', pairs: 4, time: 60 }
};

const shuffle = (array) => [...array].sort(() => Math.random() - 0.5);

const createDeck = (values) => {
    const deck = [...values, ...values];
    return shuffle(deck).map((value, index) => ({
        id: index,
        value,
        isFlipped: false,
        isMatched: false
    }));
};

const createInitialState = (playerNames, totalRounds, difficultyKey) => {
    const difficulty = difficulties[difficultyKey] || difficulties.easy;
    const selectedCards = cardValues.slice(0, difficulty.pairs);

    return {
        mode: 'playing',
        players: playerNames.map(name => ({ name, score: 0, moves: 0 })),
        currentPlayerIndex: 0,
        currentRound: 1,
        totalRounds,
        difficultyKey,
        difficultyLabel: difficulty.label,
        cards: createDeck(selectedCards),
        flippedIndices: [],
        timeLeft: difficulty.time,
        history: []
    };
};

const flipCard = (state, index) => {
    if (state.cards[index].isFlipped || state.cards[index].isMatched || state.flippedIndices.length === 2) {
        return state;
    }
    return {
        ...state,
        cards: state.cards.map((card, i) => i === index ? { ...card, isFlipped: true } : card),
        flippedIndices: [...state.flippedIndices, index]
    };
};

const checkMatch = (state) => {
    const [firstIndex, secondIndex] = state.flippedIndices;
    const isMatch = state.cards[firstIndex].value === state.cards[secondIndex].value;

    const nextPlayers = state.players.map((p, i) => i === state.currentPlayerIndex
        ? { ...p, moves: p.moves + 1, score: p.score + (isMatch ? 1 : 0) }
        : p
    );

    const nextCards = state.cards.map((card, i) => 
        (i === firstIndex || i === secondIndex)
            ? { ...card, isMatched: isMatch ? true : card.isMatched, isFlipped: isMatch }
            : card
    );

    const isRoundComplete = nextCards.every(c => c.isMatched);
    let nextPlayerIndex = state.currentPlayerIndex;

    if (!isMatch && state.players.length > 1) {
        nextPlayerIndex = (state.currentPlayerIndex + 1) % state.players.length;
    }

    return {
        ...state,
        cards: nextCards,
        players: nextPlayers,
        flippedIndices: [],
        currentPlayerIndex: nextPlayerIndex,
        isRoundComplete
    };
};

const endCurrentRound = (state) => {
    const difficulty = difficulties[state.difficultyKey] || difficulties.easy;
    const elapsed = difficulty.time - state.timeLeft;

    return {
        ...state,
        mode: 'end',
        history: [...state.history, {
            round: state.currentRound,
            time: elapsed,
            players: [...state.players]
        }]
    };
};

const advanceRound = (state) => {
    const difficulty = difficulties[state.difficultyKey] || difficulties.easy;
    const elapsed = difficulty.time - state.timeLeft;
    const roundStat = {
        round: state.currentRound,
        time: elapsed,
        players: [...state.players]
    };

    if (state.currentRound >= state.totalRounds) {
        return { ...state, mode: 'end', history: [...state.history, roundStat] };
    }

    const selectedCards = cardValues.slice(0, difficulty.pairs);
    return {
        ...state,
        currentRound: state.currentRound + 1,
        cards: createDeck(selectedCards),
        flippedIndices: [],
        timeLeft: difficulty.time,
        players: state.players.map(p => ({ ...p, score: 0, moves: 0 })),
        history: [...state.history, roundStat]
    };
};

const tickTime = (state) => ({ ...state, timeLeft: state.timeLeft - 1 });

const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
};

let currentState = null;
let timerInterval = null;

const screens = {
    setup: document.getElementById('setup-screen'),
    game: document.getElementById('game-screen'),
    result: document.getElementById('result-screen')
};

const domElements = {
    board: document.getElementById('game-board'),
    status: document.getElementById('status-display'),
    timer: document.getElementById('timer-display'),
    stats: document.getElementById('stats-display'),
    playerCount: document.getElementById('player-count'),
    p2Group: document.getElementById('p2-group'),
    p1Name: document.getElementById('p1-name'),
    p2Name: document.getElementById('p2-name'),
    difficulty: document.getElementById('difficulty'),
    roundsCount: document.getElementById('rounds-count'),
    resetBtn: document.getElementById('reset-btn')
};

const switchScreen = (screenName) => {
    Object.values(screens).forEach(s => s.classList.add('hidden'));
    screens[screenName].classList.remove('hidden');
};

const renderGame = (state) => {
    domElements.status.textContent = `${state.difficultyLabel} | Round ${state.currentRound}/${state.totalRounds} | Turn: ${state.players[state.currentPlayerIndex].name}`;
    domElements.timer.textContent = formatTime(state.timeLeft);

    domElements.board.innerHTML = '';
    state.cards.forEach((card, index) => {
        const el = document.createElement('div');
        el.className = `card ${card.isFlipped || card.isMatched ? 'flipped' : ''}`;
        
        const front = document.createElement('div');
        front.className = 'front';
        front.textContent = card.value;

        const back = document.createElement('div');
        back.className = 'back';

        el.appendChild(back);
        el.appendChild(front);
        el.addEventListener('click', () => handleCardClick(index));
        domElements.board.appendChild(el);
    });
};

const renderResults = (state) => {
    let html = `<table class="stats-table"><tr><th>Round</th><th>Time</th>`;
    state.history[0].players.forEach(p => {
        html += `<th>${p.name} Moves</th><th>${p.name} Score</th>`;
    });
    html += `</tr>`;

    state.history.forEach(stat => {
        html += `<tr><td>${stat.round}</td><td>${formatTime(stat.time)}</td>`;
        stat.players.forEach(p => {
            html += `<td>${p.moves}</td><td>${p.score}</td>`;
        });
        html += `</tr>`;
    });
    html += `</table>`;
    domElements.stats.innerHTML = html;
};

const updateAndRender = (newState) => {
    currentState = newState;
    
    if (currentState.mode === 'playing') {
        renderGame(currentState);
    } else if (currentState.mode === 'end') {
        clearInterval(timerInterval);
        switchScreen('result');
        renderResults(currentState);
    }
};

const handleCardClick = (index) => {
    if (currentState.flippedIndices.length < 2 && !currentState.cards[index].isFlipped && !currentState.cards[index].isMatched) {
        const stateAfterFlip = flipCard(currentState, index);
        updateAndRender(stateAfterFlip);

        if (stateAfterFlip.flippedIndices.length === 2) {
            setTimeout(() => {
                const stateAfterMatch = checkMatch(stateAfterFlip);
                if (stateAfterMatch.isRoundComplete) {
                    updateAndRender(advanceRound(stateAfterMatch));
                } else {
                    updateAndRender(stateAfterMatch);
                }
            }, 1000);
        }
    }
};

const resetSettings = () => {
    domElements.playerCount.value = '1';
    domElements.p1Name.value = 'Player 1';
    domElements.p2Name.value = 'Player 2';
    domElements.difficulty.value = 'easy';
    domElements.roundsCount.value = 1;
    domElements.p2Group.classList.add('hidden');
};

domElements.playerCount.addEventListener('change', (e) => {
    if (e.target.value === '2') {
        domElements.p2Group.classList.remove('hidden');
    } else {
        domElements.p2Group.classList.add('hidden');
    }
});

domElements.resetBtn.addEventListener('click', resetSettings);

document.getElementById('start-btn').addEventListener('click', () => {
    const pCount = domElements.playerCount.value;
    const names = [domElements.p1Name.value];
    if (pCount === '2') names.push(domElements.p2Name.value);
    const rounds = parseInt(domElements.roundsCount.value, 10);
    const difficultyKey = domElements.difficulty.value;

    currentState = createInitialState(names, rounds, difficultyKey);
    switchScreen('game');
    
    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        if (currentState && currentState.mode === 'playing') {
            const nextState = tickTime(currentState);
            if (nextState.timeLeft <= 0) {
                updateAndRender(endCurrentRound({ ...nextState, timeLeft: 0 }));
            } else {
                updateAndRender(nextState);
            }
        }
    }, 1000);
    
    updateAndRender(currentState);
});

document.getElementById('restart-btn').addEventListener('click', () => {
    switchScreen('setup');
});