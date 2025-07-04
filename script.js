// Typewriter Effect
const typewriterElement = document.getElementById('typewriter');
const primaryText = 'Worpli SPLASH';
const secondaryText = '- Worpli Dev';
const characters = 'хуй❤️пизда';
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

// Discord Status Update
function updateDiscordStatus(status) {
  const statusIndicator = document.getElementById('status-indicator');
  const statusText = document.getElementById('status-text');
  
  statusIndicator.classList.remove('status-online', 'status-idle', 'status-dnd', 'status-offline');
  statusIndicator.classList.add('status-online');
  statusText.textContent = 'Онлайн';
}

// Autoplay Music with Interaction Fallback
function initMusicPlayer() {
  const audio = document.getElementById('background-music');
  if (!audio) return;
  audio.play().catch(() => {
    document.body.addEventListener('click', () => audio.play(), { once: true });
  });
}

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(typewriterEffect, 300);
  updateDiscordStatus('online');
  setTimeout(initMusicPlayer, 1000);
});

const playButton = document.getElementById('play-music-btn');
if (playButton) {
  playButton.addEventListener('click', () => {
    const audio = document.getElementById('background-music');
    if (audio) {
      audio.play().catch(err => console.error('Playback error:', err));
    }
  });
}