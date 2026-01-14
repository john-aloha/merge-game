/**
 * MERGE GAME - Research & Synthesis
 * A gamified approach to academic writing
 */

// Game Configuration
const CONFIG = {
    levels: {
        1: { name: 'Citation', emoji: '📚', color: 'level-1' },
        2: { name: 'Synthesis Statement', emoji: '💡', color: 'level-2' },
        3: { name: 'Synthesis Paragraph', emoji: '📝', color: 'level-3' },
        4: { name: 'Section Header', emoji: '📑', color: 'level-4' },
        5: { name: 'Thesis Statement', emoji: '🏆', color: 'level-5' }
    }
};

// Sample research data - Climate Change topic
const INITIAL_CITATIONS = [
    {
        id: 1, level: 1,
        content: '"Global temperatures have risen by 1.1°C since the pre-industrial era."',
        source: 'IPCC Climate Report, 2023'
    },
    {
        id: 2, level: 1,
        content: '"Arctic ice is melting at a rate of 13% per decade."',
        source: 'NASA Climate Research, 2022'
    },
    {
        id: 3, level: 1,
        content: '"Renewable energy costs have dropped 89% since 2010."',
        source: 'International Energy Agency, 2023'
    },
    {
        id: 4, level: 1,
        content: '"Carbon emissions from transportation account for 29% of US greenhouse gases."',
        source: 'EPA Environmental Report, 2023'
    },
    {
        id: 5, level: 1,
        content: '"Studies show 97% of climate scientists agree on human-caused warming."',
        source: 'Nature Journal, 2021'
    },
    {
        id: 6, level: 1,
        content: '"Extreme weather events have increased 5x since the 1970s."',
        source: 'World Meteorological Organization, 2022'
    },
    {
        id: 7, level: 1,
        content: '"Green technology investments reached $1.1 trillion in 2022."',
        source: 'Bloomberg Energy Finance, 2023'
    },
    {
        id: 8, level: 1,
        content: '"Sea levels are projected to rise 1-2 feet by 2100."',
        source: 'NOAA Ocean Service, 2023'
    }
];

// Merge templates for creating higher-level content
const MERGE_TEMPLATES = {
    2: [
        'The evidence shows {0} Furthermore, {1} Together, these findings suggest significant environmental shifts are occurring.',
        'Research indicates {0} This is supported by {1} These data points reveal interconnected climate patterns.',
        'According to sources, {0} Additionally, {1} The synthesis of these facts demonstrates clear trends.'
    ],
    3: [
        'The interplay between rising temperatures and environmental impacts creates a compelling narrative. {0} {1} This convergence of evidence points to systemic climate changes requiring urgent attention.',
        'Multiple lines of research converge on a critical finding. {0} {1} When viewed together, these synthesis statements build a strong foundation for understanding climate dynamics.'
    ],
    4: [
        'Climate Change: Evidence, Impact, and Response — {0} {1}',
        'The Climate Crisis: A Multi-Faceted Analysis — {0} {1}'
    ],
    5: [
        'This paper argues that climate change represents the defining challenge of our era, as demonstrated by converging scientific evidence of rising temperatures, environmental degradation, and the urgent need for sustainable solutions. {0} {1}'
    ]
};

// Game State
let gameState = {
    cards: [],
    mergeSlot1: null,
    mergeSlot2: null,
    mergeCount: 0,
    highestLevel: 1,
    nextId: 100
};

// DOM Elements
const elements = {
    cardsContainer: null,
    slot1: null,
    slot2: null,
    mergeBtn: null,
    mergeCount: null,
    progressFill: null,
    instructionsModal: null,
    victoryModal: null,
    mergeAnimation: null,
    mergeParticles: null,
    mergeResultPreview: null,
    resultPanel: null,
    resultContent: null
};

// Initialize the game
function init() {
    cacheElements();
    setupEventListeners();
    loadGame();
}

function cacheElements() {
    elements.cardsContainer = document.getElementById('cardsContainer');
    elements.slot1 = document.getElementById('slot1');
    elements.slot2 = document.getElementById('slot2');
    elements.mergeBtn = document.getElementById('mergeBtn');
    elements.mergeCount = document.getElementById('mergeCount');
    elements.progressFill = document.getElementById('progressFill');
    elements.instructionsModal = document.getElementById('instructionsModal');
    elements.victoryModal = document.getElementById('victoryModal');
    elements.mergeAnimation = document.getElementById('mergeAnimation');
    elements.mergeParticles = document.getElementById('mergeParticles');
    elements.mergeResultPreview = document.getElementById('mergeResultPreview');
    elements.resultPanel = document.getElementById('resultPanel');
    elements.resultContent = document.getElementById('resultContent');
}

function setupEventListeners() {
    // Start button
    document.getElementById('startBtn').addEventListener('click', startGame);

    // Reset button
    document.getElementById('resetBtn').addEventListener('click', resetGame);

    // Help button - shows instructions
    document.getElementById('helpBtn').addEventListener('click', showInstructions);

    // Merge button
    elements.mergeBtn.addEventListener('click', performMerge);

    // Play again button
    document.getElementById('playAgainBtn').addEventListener('click', resetGame);

    // Celebrate button
    document.getElementById('celebrateBtn').addEventListener('click', showVictory);

    // Setup merge slots for drag and drop
    setupMergeSlots();
}

function setupMergeSlots() {
    [elements.slot1, elements.slot2].forEach(slot => {
        slot.addEventListener('dragover', handleDragOver);
        slot.addEventListener('dragleave', handleDragLeave);
        slot.addEventListener('drop', handleDrop);
        slot.addEventListener('click', handleSlotClick);
    });
}

function loadGame() {
    // Check if there's a saved game
    const saved = localStorage.getItem('mergeGameState');
    if (saved) {
        gameState = JSON.parse(saved);
        elements.instructionsModal.classList.add('hidden');
        renderCards();
        updateUI();
    }
}

function showInstructions() {
    elements.instructionsModal.classList.remove('hidden');
}

function startGame() {
    elements.instructionsModal.classList.add('hidden');
    resetGame();
}

function resetGame() {
    // Reset state
    gameState = {
        cards: [...INITIAL_CITATIONS],
        mergeSlot1: null,
        mergeSlot2: null,
        mergeCount: 0,
        highestLevel: 1,
        nextId: 100
    };

    // Clear slots
    clearSlots();

    // Hide modals and result panel
    elements.victoryModal.classList.remove('visible');
    elements.resultPanel.classList.remove('visible');

    // Render cards and update UI
    renderCards();
    updateUI();
    saveGame();
}

function saveGame() {
    localStorage.setItem('mergeGameState', JSON.stringify(gameState));
}

function renderCards() {
    elements.cardsContainer.innerHTML = '';

    gameState.cards.forEach(card => {
        const cardEl = createCardElement(card);
        elements.cardsContainer.appendChild(cardEl);
    });
}

function createCardElement(card) {
    const levelInfo = CONFIG.levels[card.level];

    const cardEl = document.createElement('div');
    cardEl.className = `research-card level-${card.level}`;
    cardEl.draggable = true;
    cardEl.dataset.cardId = card.id;

    cardEl.innerHTML = `
        <div class="card-header">
            <span class="card-level level-${card.level}">Level ${card.level}</span>
            <span class="card-type">${levelInfo.emoji}</span>
        </div>
        <div class="card-content">${card.content}</div>
        ${card.source ? `<div class="card-source">— ${card.source}</div>` : ''}
    `;

    // Drag events
    cardEl.addEventListener('dragstart', handleDragStart);
    cardEl.addEventListener('dragend', handleDragEnd);
    cardEl.addEventListener('click', () => handleCardClick(card));

    return cardEl;
}

// Drag and Drop Handlers
function handleDragStart(e) {
    e.target.classList.add('dragging');
    e.dataTransfer.setData('text/plain', e.target.dataset.cardId);
    e.dataTransfer.effectAllowed = 'move';
}

function handleDragEnd(e) {
    e.target.classList.remove('dragging');
}

function handleDragOver(e) {
    e.preventDefault();
    e.currentTarget.classList.add('drag-over');
}

function handleDragLeave(e) {
    e.currentTarget.classList.remove('drag-over');
}

function handleDrop(e) {
    e.preventDefault();
    e.currentTarget.classList.remove('drag-over');

    const cardId = parseInt(e.dataTransfer.getData('text/plain'));
    const card = gameState.cards.find(c => c.id === cardId);

    if (!card) return;

    const slotNum = e.currentTarget.dataset.slot;
    addCardToSlot(card, slotNum);
}

function handleCardClick(card) {
    // Try to add to first empty slot
    if (!gameState.mergeSlot1) {
        addCardToSlot(card, '1');
    } else if (!gameState.mergeSlot2) {
        addCardToSlot(card, '2');
    }
}

function handleSlotClick(e) {
    const slotNum = e.currentTarget.dataset.slot;
    if (slotNum === '1' && gameState.mergeSlot1) {
        removeCardFromSlot('1');
    } else if (slotNum === '2' && gameState.mergeSlot2) {
        removeCardFromSlot('2');
    }
}

function addCardToSlot(card, slotNum) {
    // Check if already in a slot
    if (gameState.mergeSlot1?.id === card.id || gameState.mergeSlot2?.id === card.id) {
        return;
    }

    // Remove from other slot if exists
    if (slotNum === '1') {
        gameState.mergeSlot1 = card;
    } else {
        gameState.mergeSlot2 = card;
    }

    updateSlotDisplay();
    checkMergeEligibility();
}

function removeCardFromSlot(slotNum) {
    if (slotNum === '1') {
        gameState.mergeSlot1 = null;
    } else {
        gameState.mergeSlot2 = null;
    }

    updateSlotDisplay();
    checkMergeEligibility();
}

function clearSlots() {
    gameState.mergeSlot1 = null;
    gameState.mergeSlot2 = null;
    updateSlotDisplay();
    checkMergeEligibility();
}

function updateSlotDisplay() {
    // Slot 1
    if (gameState.mergeSlot1) {
        elements.slot1.innerHTML = createMiniCard(gameState.mergeSlot1);
        elements.slot1.classList.add('filled');
    } else {
        elements.slot1.innerHTML = '<span class="slot-label">Drop Card 1</span>';
        elements.slot1.classList.remove('filled');
    }

    // Slot 2
    if (gameState.mergeSlot2) {
        elements.slot2.innerHTML = createMiniCard(gameState.mergeSlot2);
        elements.slot2.classList.add('filled');
    } else {
        elements.slot2.innerHTML = '<span class="slot-label">Drop Card 2</span>';
        elements.slot2.classList.remove('filled');
    }
}

function createMiniCard(card) {
    const levelInfo = CONFIG.levels[card.level];
    return `
        <div class="research-card level-${card.level}">
            <div class="card-header">
                <span class="card-level level-${card.level}">L${card.level}</span>
                <span class="card-type">${levelInfo.emoji}</span>
            </div>
            <div class="card-content">${card.content.substring(0, 60)}...</div>
        </div>
    `;
}

function checkMergeEligibility() {
    const canMerge = gameState.mergeSlot1 &&
        gameState.mergeSlot2 &&
        gameState.mergeSlot1.level === gameState.mergeSlot2.level &&
        gameState.mergeSlot1.level < 5;

    elements.mergeBtn.disabled = !canMerge;

    if (gameState.mergeSlot1 && gameState.mergeSlot2 &&
        gameState.mergeSlot1.level !== gameState.mergeSlot2.level) {
        elements.mergeBtn.textContent = '⚠️ Levels must match!';
    } else if (gameState.mergeSlot1?.level === 5 || gameState.mergeSlot2?.level === 5) {
        elements.mergeBtn.textContent = '🏆 Max Level!';
    } else {
        elements.mergeBtn.innerHTML = '<span class="merge-btn-icon">⚡</span> Merge';
    }
}

async function performMerge() {
    if (!gameState.mergeSlot1 || !gameState.mergeSlot2) return;

    const card1 = gameState.mergeSlot1;
    const card2 = gameState.mergeSlot2;
    const newLevel = card1.level + 1;

    // Create merged content
    const templates = MERGE_TEMPLATES[newLevel];
    const template = templates[Math.floor(Math.random() * templates.length)];
    const newContent = template
        .replace('{0}', card1.content)
        .replace('{1}', card2.content);

    // Show merge animation
    await showMergeAnimation(newLevel, newContent);

    // Create new card
    const newCard = {
        id: gameState.nextId++,
        level: newLevel,
        content: newContent,
        source: null
    };

    // Remove old cards and add new one
    gameState.cards = gameState.cards.filter(c => c.id !== card1.id && c.id !== card2.id);
    gameState.cards.push(newCard);

    // Update stats
    gameState.mergeCount++;
    if (newLevel > gameState.highestLevel) {
        gameState.highestLevel = newLevel;
        updateLevelLadder(newLevel);
    }

    // Clear slots
    clearSlots();

    // Re-render
    renderCards();
    updateUI();
    saveGame();

    // Check for victory
    if (newLevel === 5) {
        showThesisResult(newContent);
    }
}

function showMergeAnimation(level, content) {
    return new Promise(resolve => {
        // Create particles
        elements.mergeParticles.innerHTML = '';
        const colors = ['#6366f1', '#a855f7', '#ec4899', '#4ade80', '#60a5fa'];

        for (let i = 0; i < 30; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = '50%';
            particle.style.top = '50%';
            particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            particle.style.setProperty('--tx', `${(Math.random() - 0.5) * 300}px`);
            particle.style.setProperty('--ty', `${(Math.random() - 0.5) * 300}px`);
            elements.mergeParticles.appendChild(particle);
        }

        // Show preview
        const levelInfo = CONFIG.levels[level];
        elements.mergeResultPreview.innerHTML = `
            <h3>${levelInfo.emoji} Level ${level} Created!</h3>
            <p>${levelInfo.name}</p>
        `;

        // Show overlay
        elements.mergeAnimation.classList.add('active');

        // Hide after animation
        setTimeout(() => {
            elements.mergeAnimation.classList.remove('active');
            resolve();
        }, 1500);
    });
}

function updateUI() {
    // Update merge count
    elements.mergeCount.textContent = gameState.mergeCount;

    // Update progress (based on highest level achieved)
    const progress = ((gameState.highestLevel - 1) / 4) * 100;
    elements.progressFill.style.width = `${progress}%`;
}

function updateLevelLadder(activeLevel) {
    document.querySelectorAll('.level-item').forEach(item => {
        const level = parseInt(item.dataset.level);
        item.classList.remove('active', 'completed');

        if (level === activeLevel) {
            item.classList.add('active');
        } else if (level < activeLevel) {
            item.classList.add('completed');
        }
    });
}

function showThesisResult(content) {
    elements.resultPanel.classList.add('visible');
    elements.resultContent.innerHTML = `<p>${content}</p>`;
}

function showVictory() {
    document.getElementById('finalMerges').textContent = gameState.mergeCount;
    elements.victoryModal.classList.add('visible');

    // Confetti effect
    createConfetti();
}

function createConfetti() {
    const colors = ['#fbbf24', '#f59e0b', '#6366f1', '#a855f7', '#4ade80'];
    const confettiCount = 100;

    for (let i = 0; i < confettiCount; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.style.cssText = `
                position: fixed;
                width: 10px;
                height: 10px;
                background: ${colors[Math.floor(Math.random() * colors.length)]};
                left: ${Math.random() * 100}vw;
                top: -10px;
                border-radius: ${Math.random() > 0.5 ? '50%' : '0'};
                animation: confettiFall ${2 + Math.random() * 2}s linear forwards;
                z-index: 1000;
                pointer-events: none;
            `;
            document.body.appendChild(confetti);

            setTimeout(() => confetti.remove(), 4000);
        }, i * 20);
    }

    // Add confetti animation if not exists
    if (!document.getElementById('confettiStyle')) {
        const style = document.createElement('style');
        style.id = 'confettiStyle';
        style.textContent = `
            @keyframes confettiFall {
                to {
                    transform: translateY(100vh) rotate(720deg);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', init);
