// Typewriter Effect for "Penguin_hi0" followed by "-Тимофей and "worpli"
const typewriterElement = document.getElementById('typewriter');
const primaryText = 'Worpli SPLASH';
const secondaryText = '- Worpli Dev';
const characters = 'хуй';
const maxIterations = 8;
const charDelay = 50;
const letterDelay = 200;
const secondaryCharDelay = 10;

function getRandomCharacter() {
  return characters[Math.floor(Math.random() * characters.length)];
}

async function typeCharacter(position) {
  for (let i = 0; i < maxIterations; i++) {
    typewriterElement.textContent = primaryText.substring(0, position) + getRandomCharacter();
    await new Promise(resolve => setTimeout(resolve, charDelay));
  }
  typewriterElement.textContent = primaryText.substring(0, position + 1);
}

async function typeSecondaryText() {
  let currentText = primaryText;
  for (let i = 0; i < secondaryText.length; i++) {
    currentText += secondaryText[i];
    typewriterElement.textContent = currentText;
    await new Promise(resolve => setTimeout(resolve, secondaryCharDelay));
  }
}

async function typewriterEffect() {
  typewriterElement.classList.add('typewriter-cursor');
  for (let i = 0; i < primaryText.length; i++) {
    await typeCharacter(i);
    await new Promise(resolve => setTimeout(resolve, letterDelay));
  }
  await new Promise(resolve => setTimeout(resolve, 500));
  await typeSecondaryText();
  setTimeout(() => {
    typewriterElement.classList.remove('typewriter-cursor');
  }, 1000);
}

// Dots Animation for Skills Text
const skillsTextElement = document.getElementById('skills-text');
const skillsDotsElement = document.getElementById('skills-dots');
const skillsText = 'Делаю недосайтики, ботов и т.д';
const dotDelay = 500;

skillsTextElement.textContent = skillsText;

// Заменяем функцию animateDots
function animateDots() {
  let i = 0;
  const updateDots = () => {
    skillsDotsElement.textContent = '.'.repeat(i);
    i = (i + 1) % 4;
    setTimeout(updateDots, dotDelay);
  };
  updateDots();
}

// Добавляем обработчик загрузки
document.addEventListener('DOMContentLoaded', () => {
  // Запускаем анимации с небольшими задержками
  setTimeout(typewriterEffect, 300);
  setTimeout(animateDots, 600);
  
  // Анимация прогресс-баров
  setTimeout(() => {
    document.getElementById('java-progress').style.width = '80%';
    setTimeout(() => {
      document.getElementById('python-progress').style.width = '15%';
      setTimeout(() => {
        document.getElementById('js-progress').style.width = '5%';
      }, 400);
    }, 200);
  }, 800);
  
  updateDiscordStatus('online');
});

// Progress Bar Animation
setTimeout(() => {
  document.getElementById('java-progress').style.width = '80%';
  setTimeout(() => {
    document.getElementById('python-progress').style.width = '15%';
  }, 200);
  setTimeout(() => {
    document.getElementById('js-progress').style.width = '5%';
  }, 400);
}, 500);

// Discord Status Update
function updateDiscordStatus(status) {
  const statusIndicator = document.getElementById('status-indicator');
  const statusText = document.getElementById('status-text');
  
  statusIndicator.classList.remove('status-online', 'status-idle', 'status-dnd', 'status-offline');
  
  // Hardcode status to 'online'
  statusIndicator.classList.add('status-online');
  statusText.textContent = 'Онлайн';
}

// Start animations and set status
setTimeout(typewriterEffect, 1000);
setTimeout(animateDots, 2000);
updateDiscordStatus('online');