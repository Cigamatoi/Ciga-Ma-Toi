// quiz.js 
let quizScore = 0;
let currentQuestionIndex = 0;

const questions = [
    { question: "What does DeFi stand for?", options: ["Decentralized Finance", "Distributed Finance", "Digital Funding", "Decentralized Funding"], correct: 0 },
    { question: "Which blockchain is most commonly associated with DeFi?", options: ["Bitcoin", "Ethereum", "Binance Smart Chain", "Solana"], correct: 1 },
    { question: "What is a key feature of DeFi platforms?", options: ["Centralized control", "Permissionless access", "High fees", "Restricted access"], correct: 1 },
    { question: "What is the purpose of a smart contract in DeFi?", options: ["To mine cryptocurrency", "To execute agreements automatically", "To store user data", "To create new tokens"], correct: 1 },
    { question: "What is 'yield farming' in DeFi?", options: ["Mining new coins", "Lending assets to earn interest", "Trading NFTs", "Hacking smart contracts"], correct: 1 },
    { question: "What is IOTA EVM?", options: ["A Layer 1 solution for IOTA", "A fully EVM-compatible Layer 2 solution for IOTA", "A new cryptocurrency", "A centralized exchange"], correct: 1 },
    { question: "What is a key benefit of IOTA EVM for developers?", options: ["It supports only Move smart contracts", "It allows deployment of existing Solidity smart contracts", "It has no interoperability with other chains", "It requires rewriting all smart contracts"], correct: 1 },
    { question: "What does IOTA Rebased introduce to the IOTA ecosystem?", options: ["Centralized governance", "Full programmability with MoveVM and EVM on Layer 1", "A new token", "Higher transaction fees"], correct: 1 },
    { question: "What is the transaction speed capability of IOTA Rebased?", options: ["1,000 TPS", "10,000 TPS", "50,000+ TPS", "100 TPS"], correct: 2 },
    { question: "What staking reward range does IOTA Rebased offer for $IOTA holders?", options: ["1-2% APY", "5-7% APY", "10-15% APY", "20-25% APY"], correct: 2 },
    { question: "What key milestone was achieved with the IOTA Rebased vote in December 2024?", options: ["Approval by token holders", "Launch of the mainnet", "Removal of all validators", "Increase in transaction fees"], correct: 0 },
    { question: "What new tool is being prepared for IOTA Rebased as part of the mainnet preparations in March 2025?", options: ["A new cryptocurrency", "A wallet extension and dashboard dApp", "A centralized exchange", "A hardware mining device"], correct: 1 },
    { question: "What is a new feature included in the updated IOTA Rebased SDKs mentioned in March 2025?", options: ["Support for Bitcoin smart contracts", "Move IDE plugins and CLI enhancements", "Increased transaction fees", "Removal of EVM compatibility"], correct: 1 },
    { question: "What was a focus of the IOTA Rebased test network update in December 2024?", options: ["Adding more centralized nodes", "Increasing the number of validators", "Reducing staking rewards", "Launching a new token"], correct: 1 },
    { question: "What type of integration was highlighted for IOTA Rebased in March 2025?", options: ["Integration with traditional banking systems", "Ledger integration for wallet support", "Support for fiat currencies", "Removal of smart contracts"], correct: 1 }
];

function loadQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    document.getElementById("question").textContent = currentQuestion.question;
    const optionsElement = document.getElementById("options");
    optionsElement.innerHTML = "";
    document.getElementById("feedback").style.display = "none";
    document.getElementById("next-btn").style.display = "none";

    currentQuestion.options.forEach((option, index) => {
        const optionButton = document.createElement("div");
        optionButton.classList.add("option");
        optionButton.textContent = option;
        optionButton.addEventListener("click", () => checkAnswer(index));
        optionsElement.appendChild(optionButton);
    });
}

function checkAnswer(selectedIndex) {
    const currentQuestion = questions[currentQuestionIndex];
    const feedbackElement = document.getElementById("feedback");
    feedbackElement.style.display = "block";
    if (selectedIndex === currentQuestion.correct) {
        feedbackElement.textContent = "Correct!";
        feedbackElement.style.color = "#90E0EF";
        quizScore++;
    } else {
        feedbackElement.textContent = `Wrong! The correct answer was: ${currentQuestion.options[currentQuestion.correct]}`;
        feedbackElement.style.color = "#FF6B6B";
    }
    document.getElementById("next-btn").style.display = "block";
    const optionButtons = document.getElementsByClassName("option");
    for (let button of optionButtons) {
        button.style.pointerEvents = "none";
    }
}

function initQuiz() {
    currentQuestionIndex = 0;
    quizScore = 0;
    loadQuestion();
    document.getElementById("next-btn").addEventListener("click", () => {
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            loadQuestion();
        } else {
            document.getElementById("quiz-container").style.display = "none";
            document.getElementById("score").style.display = "block";
            document.getElementById("score").textContent = `Quiz Score: ${quizScore}/${questions.length}`;
            saveScore("quiz", quizScore);
            updateTop10();
        }
    });
}
