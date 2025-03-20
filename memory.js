
let memoryCards = [];
let flippedCards = [];
let matchedPairs = 0;
let memoryScore = 0;

const memoryImages = [
    { id: 1, src: "https://pbs.twimg.com/profile_images/1267400480734490624/uq3Cten-_400x400.jpg", name: "@IOTA" },
    { id: 2, src: "https://pbs.twimg.com/profile_images/1897839088537157633/4uNc3CBr_400x400.jpg", name: "@KUTKRAFT" },
    { id: 3, src: "https://pbs.twimg.com/profile_images/1490008172253392898/z6JVqunq_400x400.jpg", name: "@id_iota" },
    { id: 4, src: "https://pbs.twimg.com/profile_images/1867537903091691525/Sjm8H3fd_400x400.jpg", name: "@PhyloIOTA" },
    { id: 5, src: "https://pbs.twimg.com/profile_images/1639823618665226240/yVQrmWhl_400x400.jpg", name: "@MarkMalytschew" },
    { id: 6, src: "https://pbs.twimg.com/profile_images/1871082170342645760/n-0GtgXk_400x400.jpg", name: "@DomSchiener" },
    { id: 7, src: "https://pbs.twimg.com/profile_images/1877282657861545984/QXCCtR7G_400x400.jpg", name: "@Nightly_app" },
    { id: 8, src: "https://pbs.twimg.com/profile_images/1876261964537581568/kLE50Mqq_400x400.png", name: "@DeeprFinance" },
    { id: 9, src: "https://pbs.twimg.com/profile_images/1741529019093233664/g9mk8mYg_400x400.png", name: "@MagicSeaDEX" },
    { id: 10, src: "https://pbs.twimg.com/profile_images/1453865643053182980/s9_nNOkD_400x400.jpg", name: "@StargateFinance" },
    { id: 11, src: "https://pbs.twimg.com/profile_images/1765400587913326593/4yin1aKU_400x400.jpg", name: "@wagmicom" },
    { id: 12, src: "https://pbs.twimg.com/profile_images/1805614841538707456/dI5erRPx_400x400.jpg", name: "@cyberperp" },
    { id: 13, src: "https://pbs.twimg.com/profile_images/1689127977584660480/pX_tl20K_400x400.png", name: "@VelocimeterDEX" },
    { id: 14, src: "https://pbs.twimg.com/profile_images/1805346325925384192/2FsT1FFp_400x400.jpg", name: "@iolendfi" },
    { id: 15, src: "https://pbs.twimg.com/profile_images/1846083823240728579/_jeMlJZq_400x400.png", name: "Additional Image 1" },
    { id: 16, src: "https://pbs.twimg.com/profile_images/1858646093153599488/mtDLTssy_400x400.jpg", name: "Additional Image 2" }
];

function initMemoryGame() {
    const memoryGame = document.getElementById("memory-game");
    memoryGame.innerHTML = "";
    memoryCards = [];
    flippedCards = [];
    matchedPairs = 0;
    memoryScore = 0;
    document.getElementById("memory-score").textContent = `Moves: ${memoryScore}`;

    const cardsToUse = [...memoryImages, ...memoryImages];
    cardsToUse.sort(() => Math.random() - 0.5);

    for (let i = 0; i < 32; i++) {
        const card = cardsToUse[i];
        if (card) {
            const cardElement = document.createElement("div");
            cardElement.classList.add("memory-card");
            cardElement.dataset.id = card.id;
            cardElement.innerHTML = `<img src="${card.src}" alt="${card.name}">`;
            cardElement.addEventListener("click", () => flipCard(cardElement));
            memoryGame.appendChild(cardElement);
            memoryCards.push(cardElement);
        }
    }
}

function flipCard(card) {
    if (flippedCards.length < 2 && !flippedCards.includes(card) && !card.classList.contains("matched")) {
        card.classList.add("flipped");
        flippedCards.push(card);
        memoryScore++;
        document.getElementById("memory-score").textContent = `Moves: ${memoryScore}`;

        if (flippedCards.length === 2) {
            setTimeout(checkMatch, 1000);
        }
    }
}

function checkMatch() {
    const [card1, card2] = flippedCards;
    if (card1.dataset.id === card2.dataset.id) {
        card1.classList.add("matched");
        card2.classList.add("matched");
        matchedPairs++;
        if (matchedPairs === 16) {
            setTimeout(() => {
                document.getElementById("memory-container").style.display = "none";
                document.getElementById("score").style.display = "block";
                document.getElementById("score").textContent = `Memory Moves: ${memoryScore}`;
            }, 500);
        }
    } else {
        card1.classList.remove("flipped");
        card2.classList.remove("flipped");
    }
    flippedCards = [];
}
