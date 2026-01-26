/**
 * MERGE GAME - Research & Synthesis
 * Educational version: Students learn to synthesize by doing the cognitive work
 */

// Game Configuration
const CONFIG = {
    levels: {
        1: { name: 'Citation', emoji: '📚', color: 'level-1', description: 'Raw research data' },
        2: { name: 'Synthesis Statement', emoji: '💡', color: 'level-2', description: 'Connected insights' },
        3: { name: 'Synthesis Paragraph', emoji: '📝', color: 'level-3', description: 'Developed argument' },
        4: { name: 'Section Header', emoji: '📑', color: 'level-4', description: 'Paper section' },
        5: { name: 'Thesis Statement', emoji: '🏆', color: 'level-5', description: 'Final thesis' }
    },
    relationships: {
        supports: {
            emoji: '🤝',
            label: 'Support Each Other',
            description: 'Both sources point toward the same conclusion or reinforce the same idea',
            hint: 'Look for: similar claims, aligned evidence, complementary data'
        },
        contrasts: {
            emoji: '⚔️',
            label: 'Contrast/Tension',
            description: 'The sources present different perspectives, conflicting data, or opposing views',
            hint: 'Look for: disagreement, different conclusions, competing interpretations'
        },
        extends: {
            emoji: '🔗',
            label: 'One Extends the Other',
            description: 'One source builds upon, explains, or adds depth to the other',
            hint: 'Look for: cause-effect, general-to-specific, problem-solution relationships'
        }
    }
};

// Research Topics - relationships are hidden from students (they must identify them)
const TOPICS = {
    climate: {
        name: 'Climate Change',
        emoji: '🌍',
        description: 'Global warming, environmental impact, and sustainable solutions',
        citations: [
            {
                id: 1, level: 1,
                content: '"Global temperatures have risen by 1.1°C since the pre-industrial era, with the last decade being the warmest on record."',
                source: 'IPCC Climate Report, 2023',
                // Hidden from student - used for feedback
                _relationships: { 2: 'supports', 6: 'supports', 8: 'extends' }
            },
            {
                id: 2, level: 1,
                content: '"Arctic sea ice is declining at a rate of 13% per decade, with summer ice coverage at historic lows."',
                source: 'NASA Climate Research, 2022',
                _relationships: { 1: 'supports', 8: 'extends', 6: 'supports' }
            },
            {
                id: 3, level: 1,
                content: '"The cost of solar energy has dropped 89% since 2010, making renewables increasingly competitive with fossil fuels."',
                source: 'International Energy Agency, 2023',
                _relationships: { 7: 'supports', 4: 'contrasts' }
            },
            {
                id: 4, level: 1,
                content: '"Transportation remains a major challenge, accounting for 29% of US greenhouse gas emissions with limited decline."',
                source: 'EPA Environmental Report, 2023',
                _relationships: { 3: 'contrasts', 7: 'extends' }
            },
            {
                id: 5, level: 1,
                content: '"A comprehensive review found 97% of actively publishing climate scientists agree that human activities are causing global warming."',
                source: 'Nature Journal, 2021',
                _relationships: { 1: 'supports', 6: 'supports' }
            },
            {
                id: 6, level: 1,
                content: '"Climate-related extreme weather events have increased five-fold since the 1970s, causing $2.8 trillion in damages."',
                source: 'World Meteorological Organization, 2022',
                _relationships: { 1: 'supports', 2: 'supports', 8: 'extends' }
            },
            {
                id: 7, level: 1,
                content: '"Global investment in clean energy reached $1.1 trillion in 2022, surpassing fossil fuel investment for the first time."',
                source: 'Bloomberg Energy Finance, 2023',
                _relationships: { 3: 'supports', 4: 'extends' }
            },
            {
                id: 8, level: 1,
                content: '"Sea levels are projected to rise 1-2 feet by 2100, threatening coastal communities housing 680 million people."',
                source: 'NOAA Ocean Service, 2023',
                _relationships: { 1: 'extends', 2: 'extends', 6: 'supports' }
            }
        ]
    },
    ai: {
        name: 'Artificial Intelligence',
        emoji: '🤖',
        description: 'AI advancement, ethics, and societal impact',
        citations: [
            {
                id: 1, level: 1,
                content: '"Large language models have achieved human-level performance on standardized tests, professional exams, and complex reasoning tasks."',
                source: 'OpenAI Research, 2023',
                _relationships: { 5: 'supports', 3: 'contrasts', 7: 'supports' }
            },
            {
                id: 2, level: 1,
                content: '"AI automation could displace 300 million full-time jobs globally by 2030, fundamentally reshaping labor markets."',
                source: 'Goldman Sachs Report, 2023',
                _relationships: { 7: 'contrasts', 4: 'extends' }
            },
            {
                id: 3, level: 1,
                content: '"Studies reveal AI systems exhibit measurable biases in hiring, lending, and criminal justice applications, often reflecting historical inequalities."',
                source: 'MIT Technology Review, 2022',
                _relationships: { 1: 'contrasts', 6: 'extends', 8: 'supports' }
            },
            {
                id: 4, level: 1,
                content: '"Training a single large AI model can emit as much carbon as five cars over their entire lifetimes."',
                source: 'Nature Machine Intelligence, 2023',
                _relationships: { 2: 'extends', 7: 'contrasts' }
            },
            {
                id: 5, level: 1,
                content: '"AI-assisted medical diagnosis achieves 94% accuracy in early cancer detection, outperforming human radiologists in controlled studies."',
                source: 'The Lancet Digital Health, 2023',
                _relationships: { 1: 'supports', 7: 'supports' }
            },
            {
                id: 6, level: 1,
                content: '"Analysis of 84 AI ethics guidelines found 80% lack concrete enforcement mechanisms or accountability measures."',
                source: 'Harvard Berkman Klein Center, 2022',
                _relationships: { 3: 'extends', 8: 'supports' }
            },
            {
                id: 7, level: 1,
                content: '"AI applications could contribute $15.7 trillion to the global economy by 2030 through productivity gains and new products."',
                source: 'PwC Global AI Study, 2023',
                _relationships: { 2: 'contrasts', 5: 'supports' }
            },
            {
                id: 8, level: 1,
                content: '"Calls for AI regulation have increased 300% among policymakers, with the EU, US, and China proposing comprehensive frameworks."',
                source: 'Brookings Institution, 2023',
                _relationships: { 6: 'supports', 3: 'extends' }
            }
        ]
    },
    education: {
        name: 'Future of Education',
        emoji: '📖',
        description: 'Learning innovation, accessibility, and educational technology',
        citations: [
            {
                id: 1, level: 1,
                content: '"Online learning enrollment increased 186% from 2019 to 2023, with 40% of students now taking at least one digital course."',
                source: 'UNESCO Education Report, 2023',
                _relationships: { 3: 'contrasts', 5: 'extends', 6: 'supports' }
            },
            {
                id: 2, level: 1,
                content: '"Students using adaptive learning platforms demonstrate 30% faster mastery of concepts compared to traditional instruction."',
                source: 'Journal of Educational Psychology, 2022',
                _relationships: { 7: 'supports', 4: 'contrasts' }
            },
            {
                id: 3, level: 1,
                content: '"2.7 billion people worldwide lack reliable internet access, creating a growing digital divide in educational opportunity."',
                source: 'World Bank Digital Development, 2023',
                _relationships: { 1: 'contrasts', 6: 'contrasts' }
            },
            {
                id: 4, level: 1,
                content: '"Teachers report 40% higher workload due to technology integration demands, with many feeling inadequately trained."',
                source: 'OECD Teaching Survey, 2023',
                _relationships: { 2: 'contrasts', 8: 'extends' }
            },
            {
                id: 5, level: 1,
                content: '"Rigorous studies show hybrid learning models achieve equivalent academic outcomes to fully in-person instruction."',
                source: 'Harvard Graduate School of Education, 2022',
                _relationships: { 1: 'extends', 7: 'supports' }
            },
            {
                id: 6, level: 1,
                content: '"The global edtech market is projected to reach $404 billion by 2025, with venture capital investment at record highs."',
                source: 'HolonIQ EdTech Report, 2023',
                _relationships: { 3: 'contrasts', 1: 'supports' }
            },
            {
                id: 7, level: 1,
                content: '"Personalized learning paths improve student engagement by 45% and reduce dropout rates by 25%."',
                source: 'Bill & Melinda Gates Foundation, 2022',
                _relationships: { 2: 'supports', 5: 'supports' }
            },
            {
                id: 8, level: 1,
                content: '"Experts estimate 65% of children entering primary school today will work in jobs that don\'t yet exist."',
                source: 'World Economic Forum, 2023',
                _relationships: { 4: 'extends', 7: 'supports' }
            }
        ]
    }
};

// Synthesis prompts for different levels
const SYNTHESIS_PROMPTS = {
    2: {
        supports: {
            starters: [
                "Both sources demonstrate that...",
                "The evidence consistently shows...",
                "These findings together reveal...",
                "Taken together, these sources confirm..."
            ],
            guidance: "When sources support each other, your synthesis should show HOW they reinforce the same point. What shared conclusion do they point toward?"
        },
        contrasts: {
            starters: [
                "While one source suggests..., the other indicates...",
                "These sources present a tension between...",
                "Although... according to one source, another shows...",
                "The apparent contradiction between these sources reveals..."
            ],
            guidance: "When sources contrast, your synthesis should acknowledge BOTH perspectives and explore what the tension teaches us. Don't just pick a side—analyze the disagreement."
        },
        extends: {
            starters: [
                "Building on the finding that..., we can see...",
                "The first source establishes..., which the second expands by showing...",
                "This evidence suggests a progression from... to...",
                "One source provides context that helps explain..."
            ],
            guidance: "When one source extends another, show the CONNECTION between them. How does one add depth, context, or consequence to the other?"
        }
    },
    3: {
        guidance: "Now you're connecting two synthesis statements into a cohesive paragraph. Think about: What larger argument emerges when these ideas are combined? How do they build toward a bigger point?",
        starters: [
            "These interconnected findings point to a broader pattern...",
            "When we consider both of these insights together...",
            "The relationship between these ideas suggests...",
            "Synthesizing these perspectives reveals..."
        ]
    },
    4: {
        guidance: "You're creating a section header that captures the main argument of your combined paragraphs. A good section header is specific enough to be meaningful but broad enough to encompass the evidence below it.",
        prompt: "What single phrase or sentence captures the core argument of these combined ideas?"
    },
    5: {
        guidance: "Your thesis statement should make a clear, arguable claim that your entire paper supports. It should answer: 'So what? Why does this matter?' A thesis is not just a topic—it's a POSITION on that topic.",
        prompt: "Based on all your synthesis work, what is the central argument of your paper?"
    }
};

// Feedback messages
const FEEDBACK = {
    relationshipCorrect: [
        "Excellent analysis! You correctly identified how these sources relate.",
        "Great thinking! You recognized the connection between these sources.",
        "Well done! Understanding source relationships is key to good synthesis."
    ],
    relationshipIncorrect: {
        supports: "These sources actually support each other—they point toward similar conclusions. Look for how the evidence aligns rather than conflicts.",
        contrasts: "There's actually tension between these sources—they present different perspectives or conflicting information. Consider how they disagree.",
        extends: "One source actually builds upon or extends the other—there's a deeper connection where one adds to what the other establishes."
    },
    synthesisGood: [
        "Strong synthesis! You've connected the sources meaningfully.",
        "Good work! Your synthesis shows clear thinking about how these ideas relate.",
        "Nice job! You've moved beyond summary to actual synthesis."
    ],
    synthesisTips: [
        "Remember: synthesis is not just summarizing both sources—it's showing what NEW insight emerges from combining them.",
        "Try to articulate why these sources matter TOGETHER, not just what each says separately.",
        "Good synthesis answers the question: 'What do we understand now that we wouldn't from either source alone?'"
    ]
};

// Game State
let gameState = {
    cards: [],
    mergeSlot1: null,
    mergeSlot2: null,
    mergeCount: 0,
    highestLevel: 1,
    nextId: 100,
    currentTopic: 'climate',
    workshopOpen: false,
    workshopStep: 0,
    selectedRelationship: null,
    synthesisText: '',
    correctAnalyses: 0,
    totalAnalyses: 0,
    paperParts: [],
    customCitationsAdded: 0
};

// DOM Elements
const elements = {};

// Initialize the game
function init() {
    cacheElements();
    setupEventListeners();
    loadGame();
    updateTopicSelector();
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
    elements.workshopModal = document.getElementById('workshopModal');
    elements.resultPanel = document.getElementById('resultPanel');
    elements.resultContent = document.getElementById('resultContent');
    elements.topicSelector = document.getElementById('topicSelector');
    elements.paperBuilder = document.getElementById('paperBuilder');
    elements.paperContent = document.getElementById('paperContent');
    elements.customCitationModal = document.getElementById('customCitationModal');
    elements.analysisScore = document.getElementById('analysisScore');
}

function setupEventListeners() {
    document.getElementById('startBtn')?.addEventListener('click', startGame);
    document.getElementById('resetBtn')?.addEventListener('click', resetGame);
    document.getElementById('helpBtn')?.addEventListener('click', showInstructions);
    elements.mergeBtn?.addEventListener('click', openWorkshop);
    document.getElementById('playAgainBtn')?.addEventListener('click', resetGame);
    document.getElementById('celebrateBtn')?.addEventListener('click', showVictory);

    if (elements.topicSelector) {
        elements.topicSelector.addEventListener('change', handleTopicChange);
    }

    document.getElementById('addCitationBtn')?.addEventListener('click', showCustomCitationModal);
    document.getElementById('customCitationForm')?.addEventListener('submit', handleCustomCitation);
    document.getElementById('closeCustomModal')?.addEventListener('click', hideCustomCitationModal);
    document.getElementById('togglePaperBtn')?.addEventListener('click', togglePaperBuilder);

    // Workshop navigation
    document.getElementById('workshopNext')?.addEventListener('click', workshopNext);
    document.getElementById('workshopBack')?.addEventListener('click', workshopBack);
    document.getElementById('workshopClose')?.addEventListener('click', closeWorkshop);

    setupMergeSlots();
}

function setupMergeSlots() {
    [elements.slot1, elements.slot2].forEach(slot => {
        if (slot) {
            slot.addEventListener('dragover', handleDragOver);
            slot.addEventListener('dragleave', handleDragLeave);
            slot.addEventListener('drop', handleDrop);
            slot.addEventListener('click', handleSlotClick);
        }
    });
}

function loadGame() {
    const saved = localStorage.getItem('mergeGameState_v2');
    if (saved) {
        const parsed = JSON.parse(saved);
        gameState = { ...gameState, ...parsed };
        elements.instructionsModal?.classList.add('hidden');
        renderCards();
        updateUI();
        updatePaperBuilder();
    }
}

function saveGame() {
    localStorage.setItem('mergeGameState_v2', JSON.stringify(gameState));
}

function showInstructions() {
    elements.instructionsModal?.classList.remove('hidden');
}

function startGame() {
    elements.instructionsModal?.classList.add('hidden');
    if (gameState.cards.length === 0) {
        resetGame();
    }
}

function handleTopicChange(e) {
    const newTopic = e.target.value;
    if (newTopic !== gameState.currentTopic) {
        if (confirm('Changing topics will reset your current progress. Continue?')) {
            gameState.currentTopic = newTopic;
            resetGame();
        } else {
            e.target.value = gameState.currentTopic;
        }
    }
}

function updateTopicSelector() {
    if (!elements.topicSelector) return;
    elements.topicSelector.innerHTML = '';
    Object.entries(TOPICS).forEach(([key, topic]) => {
        const option = document.createElement('option');
        option.value = key;
        option.textContent = `${topic.emoji} ${topic.name}`;
        option.selected = key === gameState.currentTopic;
        elements.topicSelector.appendChild(option);
    });
}

function resetGame() {
    const topic = TOPICS[gameState.currentTopic] || TOPICS.climate;

    // Deep copy citations without exposing relationships
    const citations = topic.citations.map(c => ({
        id: c.id,
        level: c.level,
        content: c.content,
        source: c.source
    }));

    gameState = {
        ...gameState,
        cards: citations,
        mergeSlot1: null,
        mergeSlot2: null,
        mergeCount: 0,
        highestLevel: 1,
        nextId: 100,
        workshopOpen: false,
        workshopStep: 0,
        selectedRelationship: null,
        synthesisText: '',
        paperParts: []
    };

    clearSlots();
    elements.victoryModal?.classList.remove('visible');
    elements.resultPanel?.classList.remove('visible');
    closeWorkshop();

    renderCards();
    updateUI();
    updatePaperBuilder();
    saveGame();
}

function renderCards() {
    if (!elements.cardsContainer) return;
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

    // For student-created content (level 2+), show it was their synthesis
    const studentBadge = card.studentCreated ? '<span class="student-badge">Your Synthesis</span>' : '';

    cardEl.innerHTML = `
        <div class="card-header">
            <span class="card-level level-${card.level}">Level ${card.level}: ${levelInfo.name}</span>
            <span class="card-type">${levelInfo.emoji}</span>
        </div>
        <div class="card-content">${card.content}</div>
        ${card.source ? `<div class="card-source">— ${card.source}</div>` : ''}
        ${studentBadge}
    `;

    cardEl.addEventListener('dragstart', handleDragStart);
    cardEl.addEventListener('dragend', handleDragEnd);
    cardEl.addEventListener('click', () => handleCardClick(card));

    return cardEl;
}

// Drag and Drop
function handleDragStart(e) {
    e.target.classList.add('dragging');
    e.dataTransfer.setData('text/plain', e.target.dataset.cardId);
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
    if (card) {
        addCardToSlot(card, e.currentTarget.dataset.slot);
    }
}

function handleCardClick(card) {
    if (!gameState.mergeSlot1) {
        addCardToSlot(card, '1');
    } else if (!gameState.mergeSlot2 && gameState.mergeSlot1.id !== card.id) {
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
    if (gameState.mergeSlot1?.id === card.id || gameState.mergeSlot2?.id === card.id) return;

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
    if (elements.slot1) {
        if (gameState.mergeSlot1) {
            elements.slot1.innerHTML = createMiniCard(gameState.mergeSlot1);
            elements.slot1.classList.add('filled');
        } else {
            elements.slot1.innerHTML = '<span class="slot-label">Select first source</span>';
            elements.slot1.classList.remove('filled');
        }
    }

    if (elements.slot2) {
        if (gameState.mergeSlot2) {
            elements.slot2.innerHTML = createMiniCard(gameState.mergeSlot2);
            elements.slot2.classList.add('filled');
        } else {
            elements.slot2.innerHTML = '<span class="slot-label">Select second source</span>';
            elements.slot2.classList.remove('filled');
        }
    }
}

function createMiniCard(card) {
    const levelInfo = CONFIG.levels[card.level];
    return `
        <div class="mini-card level-${card.level}">
            <div class="mini-card-header">
                <span class="mini-level">L${card.level}</span>
                <span>${levelInfo.emoji}</span>
            </div>
            <div class="mini-content">${card.content.substring(0, 80)}...</div>
        </div>
    `;
}

function checkMergeEligibility() {
    if (!elements.mergeBtn) return;

    const canMerge = gameState.mergeSlot1 &&
        gameState.mergeSlot2 &&
        gameState.mergeSlot1.level === gameState.mergeSlot2.level &&
        gameState.mergeSlot1.level < 5;

    elements.mergeBtn.disabled = !canMerge;

    if (gameState.mergeSlot1 && gameState.mergeSlot2) {
        if (gameState.mergeSlot1.level !== gameState.mergeSlot2.level) {
            elements.mergeBtn.textContent = '⚠️ Levels must match';
        } else if (gameState.mergeSlot1.level >= 5) {
            elements.mergeBtn.textContent = '🏆 Maximum level reached!';
        } else {
            elements.mergeBtn.innerHTML = '⚡ Begin Synthesis';
        }
    } else {
        elements.mergeBtn.innerHTML = '⚡ Begin Synthesis';
    }
}

// ============================================
// SYNTHESIS WORKSHOP - The Learning Core
// ============================================

function openWorkshop() {
    if (!gameState.mergeSlot1 || !gameState.mergeSlot2) return;

    gameState.workshopOpen = true;
    gameState.workshopStep = 1;
    gameState.selectedRelationship = null;
    gameState.synthesisText = '';

    renderWorkshop();
    elements.workshopModal?.classList.add('visible');
}

function closeWorkshop() {
    gameState.workshopOpen = false;
    elements.workshopModal?.classList.remove('visible');
}

function workshopNext() {
    if (gameState.workshopStep === 1) {
        // Moving from reading to relationship identification
        gameState.workshopStep = 2;
    } else if (gameState.workshopStep === 2) {
        // Check if relationship selected
        if (!gameState.selectedRelationship) {
            alert('Please select how you think these sources relate to each other.');
            return;
        }
        gameState.workshopStep = 3;
    } else if (gameState.workshopStep === 3) {
        // Check if synthesis written
        const textarea = document.getElementById('synthesisInput');
        if (textarea) {
            gameState.synthesisText = textarea.value.trim();
        }
        if (gameState.synthesisText.length < 20) {
            alert('Please write a more complete synthesis statement (at least a full sentence).');
            return;
        }
        gameState.workshopStep = 4;
    } else if (gameState.workshopStep === 4) {
        // Complete the merge
        completeMerge();
        return;
    }
    renderWorkshop();
}

function workshopBack() {
    if (gameState.workshopStep > 1) {
        gameState.workshopStep--;
        renderWorkshop();
    }
}

function renderWorkshop() {
    const workshopContent = document.getElementById('workshopContent');
    const workshopProgress = document.getElementById('workshopProgress');
    const workshopNext = document.getElementById('workshopNext');
    const workshopBack = document.getElementById('workshopBack');

    if (!workshopContent) return;

    const card1 = gameState.mergeSlot1;
    const card2 = gameState.mergeSlot2;
    const newLevel = card1.level + 1;

    // Update progress indicator
    if (workshopProgress) {
        workshopProgress.innerHTML = `
            <div class="progress-step ${gameState.workshopStep >= 1 ? 'active' : ''}">1. Read</div>
            <div class="progress-step ${gameState.workshopStep >= 2 ? 'active' : ''}">2. Analyze</div>
            <div class="progress-step ${gameState.workshopStep >= 3 ? 'active' : ''}">3. Synthesize</div>
            <div class="progress-step ${gameState.workshopStep >= 4 ? 'active' : ''}">4. Review</div>
        `;
    }

    // Render step content
    switch (gameState.workshopStep) {
        case 1:
            workshopContent.innerHTML = renderStep1_Read(card1, card2);
            workshopNext.textContent = 'Continue →';
            workshopBack.style.display = 'none';
            break;
        case 2:
            workshopContent.innerHTML = renderStep2_Analyze(card1, card2);
            setupRelationshipButtons();
            workshopNext.textContent = 'Continue →';
            workshopBack.style.display = 'block';
            break;
        case 3:
            workshopContent.innerHTML = renderStep3_Synthesize(card1, card2, newLevel);
            workshopNext.textContent = 'Review →';
            workshopBack.style.display = 'block';
            break;
        case 4:
            workshopContent.innerHTML = renderStep4_Review(card1, card2, newLevel);
            workshopNext.textContent = '✓ Complete Synthesis';
            workshopBack.style.display = 'block';
            break;
    }
}

function renderStep1_Read(card1, card2) {
    return `
        <div class="workshop-step">
            <h3>📖 Step 1: Carefully Read Both Sources</h3>
            <p class="step-instruction">Before synthesizing, make sure you understand what each source is saying. Read each one carefully.</p>

            <div class="source-cards">
                <div class="source-card">
                    <h4>Source A</h4>
                    <blockquote>${card1.content}</blockquote>
                    <cite>— ${card1.source || 'Your synthesis'}</cite>
                </div>
                <div class="source-card">
                    <h4>Source B</h4>
                    <blockquote>${card2.content}</blockquote>
                    <cite>— ${card2.source || 'Your synthesis'}</cite>
                </div>
            </div>

            <div class="reading-prompts">
                <h4>🤔 As you read, consider:</h4>
                <ul>
                    <li>What is the main claim or finding of each source?</li>
                    <li>What evidence does each source provide?</li>
                    <li>Do these sources seem to agree, disagree, or is one building on the other?</li>
                </ul>
            </div>
        </div>
    `;
}

function renderStep2_Analyze(card1, card2) {
    return `
        <div class="workshop-step">
            <h3>🔍 Step 2: How Do These Sources Relate?</h3>
            <p class="step-instruction">This is the key analytical skill in synthesis: identifying HOW sources connect to each other.</p>

            <div class="source-summary">
                <div class="source-brief">
                    <strong>Source A:</strong> ${card1.content.substring(0, 100)}...
                </div>
                <div class="source-brief">
                    <strong>Source B:</strong> ${card2.content.substring(0, 100)}...
                </div>
            </div>

            <div class="relationship-choices">
                <h4>Select the relationship between these sources:</h4>

                <button class="relationship-btn ${gameState.selectedRelationship === 'supports' ? 'selected' : ''}" data-rel="supports">
                    <span class="rel-icon">🤝</span>
                    <div class="rel-info">
                        <strong>They Support Each Other</strong>
                        <p>${CONFIG.relationships.supports.hint}</p>
                    </div>
                </button>

                <button class="relationship-btn ${gameState.selectedRelationship === 'contrasts' ? 'selected' : ''}" data-rel="contrasts">
                    <span class="rel-icon">⚔️</span>
                    <div class="rel-info">
                        <strong>They Contrast/Create Tension</strong>
                        <p>${CONFIG.relationships.contrasts.hint}</p>
                    </div>
                </button>

                <button class="relationship-btn ${gameState.selectedRelationship === 'extends' ? 'selected' : ''}" data-rel="extends">
                    <span class="rel-icon">🔗</span>
                    <div class="rel-info">
                        <strong>One Extends the Other</strong>
                        <p>${CONFIG.relationships.extends.hint}</p>
                    </div>
                </button>
            </div>

            ${gameState.selectedRelationship ? `
                <div class="relationship-feedback">
                    <p><strong>You selected:</strong> ${CONFIG.relationships[gameState.selectedRelationship].label}</p>
                    <p class="rel-description">${CONFIG.relationships[gameState.selectedRelationship].description}</p>
                </div>
            ` : ''}
        </div>
    `;
}

function renderStep3_Synthesize(card1, card2, newLevel) {
    const prompts = SYNTHESIS_PROMPTS[newLevel] || SYNTHESIS_PROMPTS[2];
    const relPrompts = prompts[gameState.selectedRelationship] || prompts;
    const starters = relPrompts.starters || prompts.starters || [];
    const guidance = relPrompts.guidance || prompts.guidance || '';

    return `
        <div class="workshop-step">
            <h3>✍️ Step 3: Write Your Synthesis</h3>
            <p class="step-instruction">${guidance}</p>

            <div class="source-summary compact">
                <div class="source-brief"><strong>A:</strong> ${card1.content.substring(0, 80)}...</div>
                <div class="source-brief"><strong>B:</strong> ${card2.content.substring(0, 80)}...</div>
                <div class="relationship-badge">
                    ${CONFIG.relationships[gameState.selectedRelationship].emoji}
                    ${CONFIG.relationships[gameState.selectedRelationship].label}
                </div>
            </div>

            <div class="synthesis-writing">
                <label for="synthesisInput">Your synthesis statement:</label>
                <textarea id="synthesisInput" placeholder="Write how these sources connect and what insight emerges from considering them together...">${gameState.synthesisText}</textarea>

                <div class="writing-helpers">
                    <p><strong>Sentence starters you might use:</strong></p>
                    <div class="starter-chips">
                        ${starters.map(s => `<button class="starter-chip" onclick="useStarter('${s.replace(/'/g, "\\'")}')">${s.substring(0, 40)}...</button>`).join('')}
                    </div>
                </div>
            </div>

            <div class="synthesis-tips">
                <h4>💡 Remember:</h4>
                <ul>
                    <li>Synthesis is NOT just summarizing both sources</li>
                    <li>Show what NEW understanding emerges from combining them</li>
                    <li>Use your own words to connect the ideas</li>
                </ul>
            </div>
        </div>
    `;
}

function renderStep4_Review(card1, card2, newLevel) {
    // Check if the student's relationship analysis was correct
    const actualRelationship = getActualRelationship(card1, card2);
    const wasCorrect = gameState.selectedRelationship === actualRelationship;

    const levelInfo = CONFIG.levels[newLevel];

    let feedbackHtml = '';
    if (actualRelationship) {
        if (wasCorrect) {
            feedbackHtml = `
                <div class="feedback-box correct">
                    <h4>✅ Great Analysis!</h4>
                    <p>${FEEDBACK.relationshipCorrect[Math.floor(Math.random() * FEEDBACK.relationshipCorrect.length)]}</p>
                </div>
            `;
        } else {
            feedbackHtml = `
                <div class="feedback-box incorrect">
                    <h4>📚 Learning Opportunity</h4>
                    <p>You identified these as "${CONFIG.relationships[gameState.selectedRelationship].label}" but they actually "${CONFIG.relationships[actualRelationship].label.toLowerCase()}".</p>
                    <p class="feedback-explanation">${FEEDBACK.relationshipIncorrect[actualRelationship]}</p>
                    <p><em>That's okay! Identifying relationships takes practice. Your synthesis is still valuable.</em></p>
                </div>
            `;
        }
    }

    return `
        <div class="workshop-step">
            <h3>📋 Step 4: Review Your Synthesis</h3>

            ${feedbackHtml}

            <div class="synthesis-preview">
                <div class="preview-header">
                    <span class="preview-level level-${newLevel}">${levelInfo.emoji} Level ${newLevel}</span>
                    <span class="preview-type">${levelInfo.name}</span>
                </div>
                <div class="preview-content">
                    <p>"${gameState.synthesisText}"</p>
                </div>
            </div>

            <div class="synthesis-reflection">
                <h4>🎯 Synthesis Quality Check:</h4>
                <ul class="quality-checklist">
                    <li>Does your synthesis go beyond just summarizing?</li>
                    <li>Does it show how the sources relate to each other?</li>
                    <li>Does it offer an insight that emerges from combining them?</li>
                </ul>
                <p class="tip">${FEEDBACK.synthesisTips[Math.floor(Math.random() * FEEDBACK.synthesisTips.length)]}</p>
            </div>
        </div>
    `;
}

function setupRelationshipButtons() {
    document.querySelectorAll('.relationship-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.relationship-btn').forEach(b => b.classList.remove('selected'));
            btn.classList.add('selected');
            gameState.selectedRelationship = btn.dataset.rel;
            renderWorkshop(); // Re-render to show feedback
        });
    });
}

function useStarter(starter) {
    const textarea = document.getElementById('synthesisInput');
    if (textarea) {
        textarea.value = starter + ' ';
        textarea.focus();
        gameState.synthesisText = textarea.value;
    }
}

// Make useStarter available globally for onclick
window.useStarter = useStarter;

function getActualRelationship(card1, card2) {
    // Look up the actual relationship from the topic data
    const topic = TOPICS[gameState.currentTopic];
    if (!topic) return null;

    const originalCard1 = topic.citations.find(c => c.id === card1.id);
    const originalCard2 = topic.citations.find(c => c.id === card2.id);

    if (originalCard1?._relationships?.[card2.id]) {
        return originalCard1._relationships[card2.id];
    }
    if (originalCard2?._relationships?.[card1.id]) {
        return originalCard2._relationships[card1.id];
    }
    return null;
}

function completeMerge() {
    const card1 = gameState.mergeSlot1;
    const card2 = gameState.mergeSlot2;
    const newLevel = card1.level + 1;

    // Track analysis accuracy
    const actualRelationship = getActualRelationship(card1, card2);
    if (actualRelationship) {
        gameState.totalAnalyses++;
        if (gameState.selectedRelationship === actualRelationship) {
            gameState.correctAnalyses++;
        }
    }

    // Create the new card with student's synthesis
    const newCard = {
        id: gameState.nextId++,
        level: newLevel,
        content: gameState.synthesisText,
        source: null,
        studentCreated: true,
        relationship: gameState.selectedRelationship,
        mergedFrom: [card1.id, card2.id]
    };

    // Store in paper builder
    gameState.paperParts.push({
        level: newLevel,
        content: gameState.synthesisText,
        relationship: gameState.selectedRelationship,
        timestamp: Date.now()
    });

    // Update cards
    gameState.cards = gameState.cards.filter(c => c.id !== card1.id && c.id !== card2.id);
    gameState.cards.push(newCard);

    // Update stats
    gameState.mergeCount++;
    if (newLevel > gameState.highestLevel) {
        gameState.highestLevel = newLevel;
        updateLevelLadder(newLevel);
    }

    // Close workshop and clear slots
    closeWorkshop();
    clearSlots();

    // Re-render
    renderCards();
    updateUI();
    updatePaperBuilder();
    saveGame();

    // Show success animation
    showMergeSuccess(newLevel);

    // Check for victory
    if (newLevel === 5) {
        setTimeout(() => showThesisResult(gameState.synthesisText), 1500);
    }
}

function showMergeSuccess(level) {
    const levelInfo = CONFIG.levels[level];
    const notification = document.createElement('div');
    notification.className = 'merge-success-notification';
    notification.innerHTML = `
        <span class="success-emoji">${levelInfo.emoji}</span>
        <div class="success-text">
            <strong>Level ${level} Created!</strong>
            <span>${levelInfo.name}</span>
        </div>
    `;
    document.body.appendChild(notification);

    setTimeout(() => notification.classList.add('visible'), 100);
    setTimeout(() => {
        notification.classList.remove('visible');
        setTimeout(() => notification.remove(), 500);
    }, 2500);
}

function updateUI() {
    if (elements.mergeCount) {
        elements.mergeCount.textContent = gameState.mergeCount;
    }

    if (elements.progressFill) {
        const progress = ((gameState.highestLevel - 1) / 4) * 100;
        elements.progressFill.style.width = `${progress}%`;
    }

    if (elements.analysisScore) {
        if (gameState.totalAnalyses > 0) {
            const accuracy = Math.round((gameState.correctAnalyses / gameState.totalAnalyses) * 100);
            elements.analysisScore.textContent = `${accuracy}%`;
            elements.analysisScore.parentElement.style.display = 'flex';
        }
    }
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
    if (elements.resultPanel && elements.resultContent) {
        elements.resultPanel.classList.add('visible');
        elements.resultContent.innerHTML = `<p>${content}</p>`;
    }
}

function showVictory() {
    const finalMerges = document.getElementById('finalMerges');
    const finalAccuracy = document.getElementById('finalAccuracy');

    if (finalMerges) finalMerges.textContent = gameState.mergeCount;
    if (finalAccuracy && gameState.totalAnalyses > 0) {
        const accuracy = Math.round((gameState.correctAnalyses / gameState.totalAnalyses) * 100);
        finalAccuracy.textContent = `${accuracy}%`;
        finalAccuracy.parentElement.style.display = 'block';
    }

    elements.victoryModal?.classList.add('visible');
    createConfetti();
}

function createConfetti() {
    const colors = ['#fbbf24', '#f59e0b', '#6366f1', '#a855f7', '#4ade80'];
    for (let i = 0; i < 100; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.className = 'confetti-piece';
            confetti.style.left = `${Math.random() * 100}vw`;
            confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.animationDuration = `${2 + Math.random() * 2}s`;
            document.body.appendChild(confetti);
            setTimeout(() => confetti.remove(), 4000);
        }, i * 20);
    }
}

// Custom Citation
function showCustomCitationModal() {
    elements.customCitationModal?.classList.add('visible');
}

function hideCustomCitationModal() {
    elements.customCitationModal?.classList.remove('visible');
    document.getElementById('customCitationForm')?.reset();
}

function handleCustomCitation(e) {
    e.preventDefault();
    const content = document.getElementById('citationContent')?.value;
    const source = document.getElementById('citationSource')?.value;

    if (!content) return;

    const newCitation = {
        id: gameState.nextId++,
        level: 1,
        content: `"${content}"`,
        source: source || 'Your Research'
    };

    gameState.cards.push(newCitation);
    gameState.customCitationsAdded++;

    hideCustomCitationModal();
    renderCards();
    saveGame();
}

// Paper Builder
function togglePaperBuilder() {
    elements.paperBuilder?.classList.toggle('visible');
}

function updatePaperBuilder() {
    if (!elements.paperContent) return;

    if (gameState.paperParts.length === 0) {
        elements.paperContent.innerHTML = '<p class="paper-empty">Your paper will be built here as you synthesize sources. Each synthesis you write becomes part of your final paper.</p>';
        return;
    }

    const byLevel = {};
    gameState.paperParts.forEach(part => {
        if (!byLevel[part.level]) byLevel[part.level] = [];
        byLevel[part.level].push(part);
    });

    let html = '<div class="paper-structure">';
    for (let level = 5; level >= 2; level--) {
        if (byLevel[level]) {
            const levelInfo = CONFIG.levels[level];
            html += `
                <div class="paper-section level-${level}">
                    <h4>${levelInfo.emoji} ${levelInfo.name}${byLevel[level].length > 1 ? 's' : ''}</h4>
                    ${byLevel[level].map(part => `
                        <div class="paper-part">
                            <p>${part.content}</p>
                            <span class="part-meta">Your synthesis</span>
                        </div>
                    `).join('')}
                </div>
            `;
        }
    }
    html += '</div>';
    elements.paperContent.innerHTML = html;
}

// Initialize
document.addEventListener('DOMContentLoaded', init);
