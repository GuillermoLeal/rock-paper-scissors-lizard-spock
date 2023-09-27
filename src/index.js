const OPTIONS = [
  {
    name: "rock",
    emoji: "🗿",
    loseTo: ["paper", "spock"],
  },
  {
    name: "paper",
    emoji: "📄",
    loseTo: ["scissors", "lizard"],
  },
  {
    name: "scissors",
    emoji: "✂️",
    loseTo: ["rock", "spock"],
  },
  {
    name: "lizard",
    emoji: "🦎",
    loseTo: ["rock", "scissors"],
  },
  {
    name: "spock",
    emoji: "🖖",
    loseTo: ["lizard", "paper"],
  },
];

const containerOptions = document.querySelector(".container-options");
const containerGameResult = document.querySelector(".container-game-result");
const divPlayerChoise = document.querySelector(".player-choise");
const divCpuChoise = document.querySelector(".cpu-choise");
const divTextResultGame = document.querySelector(".text-result-game");

const makeButtonsPlayer = () => {
  OPTIONS.forEach(option => {
    const button = document.createElement("button");
    button.classList.add("btn");
    button.textContent = option.emoji;
    button.setAttribute("data-user-option", option.name);

    containerOptions.insertAdjacentElement("beforeend", button);
  });
};

const getRandomNumber = (maxValue) => Math.floor(Math.random() * maxValue);

const determineWinner = (playerChoice, cpuChoice) => {
  const getOption = (option) => OPTIONS.find(opt => opt.name === option);

  const optionPlayer = getOption(playerChoice);
  const optionCpu = getOption(cpuChoice);

  divPlayerChoise.textContent = optionPlayer.emoji;
  divCpuChoise.textContent = optionCpu.emoji;

  const losePlayer = optionPlayer.loseTo.includes(cpuChoice);
  const loseCpu = optionCpu.loseTo.includes(playerChoice);

  if (losePlayer) {
    return "You LOSE 😔";
  } else if (loseCpu) {
    return "You WIN 😎";
  }

  return "tie! 🤯";
};

const handleUserOption = (button) => {
  const cpuChoice = OPTIONS[getRandomNumber(OPTIONS.length)].name;
  const playerChoice = button.getAttribute("data-user-option");

  const textGameResult = determineWinner(playerChoice, cpuChoice);

  divTextResultGame.textContent = textGameResult;
  containerGameResult.classList.remove("hidden");
};

makeButtonsPlayer();

const buttons = [...document.querySelectorAll(".btn")];
buttons.forEach(button => {
  button.addEventListener("click", () => handleUserOption(button));
});
