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

// Добавляем в конец файла
function initMusicPlayer() {
  const playerHeader = document.querySelector('.player-header');
  const playerPanel = document.querySelector('.music-player-panel');
  const musicToggle = document.getElementById('music-toggle');
  const playPauseBtn = document.getElementById('play-pause-btn');
  const stopBtn = document.getElementById('stop-btn');
  const audio = document.getElementById('background-music');
  const volumeSlider = document.getElementById('volume-slider');
  const volumeBar = document.querySelector('.volume-bar');
  const progressBar = document.querySelector('.progress-current');
  const progressContainer = document.querySelector('.progress-bar-container');
  const currentTimeEl = document.querySelector('.current-time');
  const totalTimeEl = document.querySelector('.total-time');
  const repeatBtn = document.getElementById('repeat-btn');
  const volumeBtn = document.getElementById('volume-btn');
  const playerTitle = document.getElementById('player-title-text');
  const reloadBtn = document.getElementById('reload-btn');

  if (!audio) {
    console.error('Audio element not found');
    return;
  }

  function updateVolumeBar() {
    if (volumeBar && volumeSlider) {
      volumeBar.style.width = volumeSlider.value + '%';
    }
  }

  updateVolumeBar();

  if (playerHeader) {
    playerHeader.addEventListener('click', (e) => {
      if (e.target.closest('.player-toggle-btn')) return;
      playerPanel.classList.toggle('expanded');
      if (playerPanel.classList.contains('expanded')) {
        musicToggle.querySelector('i').className = 'fas fa-chevron-up';
      } else {
        musicToggle.querySelector('i').className = 'fas fa-chevron-down';
      }
    });
  }

  audio.addEventListener('timeupdate', () => {
    if (audio.duration) {
      const currentTime = audio.currentTime;
      const duration = audio.duration;
      const progressPercent = (currentTime / duration) * 100;
      if (progressBar) progressBar.style.width = `${progressPercent}%`;
      
      // Update time display
      if (currentTimeEl) {
        const minutes = Math.floor(currentTime / 60);
        const seconds = Math.floor(currentTime % 60);
        currentTimeEl.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
      }
      
      if (totalTimeEl && !totalTimeEl.dataset.set) {
        const minutes = Math.floor(duration / 60);
        const seconds = Math.floor(duration % 60);
        totalTimeEl.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        totalTimeEl.dataset.set = true;
      }
    }
  });

  if (volumeSlider) {
    volumeSlider.addEventListener('input', () => {
      audio.volume = volumeSlider.value / 100;
      updateVolumeBar();
      
      // Update volume button icon
      if (volumeBtn) {
        if (audio.volume > 0.5) {
          volumeBtn.querySelector('i').className = 'fas fa-volume-up';
        } else if (audio.volume > 0) {
          volumeBtn.querySelector('i').className = 'fas fa-volume-down';
        } else {
          volumeBtn.querySelector('i').className = 'fas fa-volume-mute';
        }
      }
    });
  }

  if (progressContainer) {
    progressContainer.addEventListener('click', (e) => {
      const progressContainerWidth = progressContainer.clientWidth;
      const clickPosition = e.offsetX;
      const seekTime = (clickPosition / progressContainerWidth) * audio.duration;
      if (!isNaN(seekTime)) {
        audio.currentTime = seekTime;
      }
    });
  }

  function updatePlayerState(state) {
    playerPanel.classList.remove('playing', 'paused', 'stopped');
    playerPanel.classList.add(state);
    if (playerTitle) {
      playerTitle.setAttribute('data-status', 
        state === 'playing' ? 'Играет...' : 
        state === 'paused' ? 'Пауза' : 'Остановлено');
    }
  }

  function playMusic() {
    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          if (playPauseBtn) {
            playPauseBtn.querySelector('i').className = 'fas fa-pause';
          }
          updatePlayerState('playing');
        })
        .catch(err => {
          console.error('Playback error:', err);
          updatePlayerState('stopped');
        });
    }
  }

  function pauseMusic() {
    audio.pause();
    if (playPauseBtn) {
      playPauseBtn.querySelector('i').className = 'fas fa-play';
    }
    updatePlayerState('paused');
  }

  function stopMusic() {
    audio.pause();
    audio.currentTime = 0;
    if (playPauseBtn) {
      playPauseBtn.querySelector('i').className = 'fas fa-play';
    }
    if (progressBar) progressBar.style.width = '0%';
    if (currentTimeEl) currentTimeEl.textContent = '00:00';
    updatePlayerState('stopped');
  }

  if (musicToggle) {
    musicToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      playerPanel.classList.toggle('expanded');
      if (playerPanel.classList.contains('expanded')) {
        musicToggle.querySelector('i').className = 'fas fa-chevron-up';
      } else {
        musicToggle.querySelector('i').className = 'fas fa-chevron-down';
      }
      if (!audio.paused) {
        pauseMusic();
      } else {
        playMusic();
      }
    });
  }

  if (playPauseBtn) {
    playPauseBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (audio.paused) {
        playMusic();
      } else {
        pauseMusic();
      }
    });
  }

  if (stopBtn) {
    stopBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      stopMusic();
    });
  }

  if (repeatBtn) {
    repeatBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      audio.loop = !audio.loop;
      repeatBtn.classList.toggle('active', audio.loop);
    });
    repeatBtn.classList.toggle('active', audio.loop);
  }

  if (volumeBtn) {
    volumeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (audio.volume > 0) {
        volumeBtn.dataset.prevVolume = audio.volume;
        audio.volume = 0;
        if (volumeSlider) volumeSlider.value = 0;
        volumeBtn.querySelector('i').className = 'fas fa-volume-mute';
      } else {
        const prevVolume = parseFloat(volumeBtn.dataset.prevVolume || 0.7);
        audio.volume = prevVolume;
        if (volumeSlider) volumeSlider.value = prevVolume * 100;
        volumeBtn.querySelector('i').className = 'fas fa-volume-up';
      }
      updateVolumeBar();
    });
  }

  if (reloadBtn) {
    reloadBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const wasPlaying = !audio.paused;
      audio.currentTime = 0;
      audio.load();
      if (progressBar) progressBar.style.width = '0%';
      if (currentTimeEl) currentTimeEl.textContent = '00:00';
      if (wasPlaying) {
        audio.play();
      }
      reloadBtn.querySelector('i').classList.add('fa-spin');
      setTimeout(() => {
        reloadBtn.querySelector('i').classList.remove('fa-spin');
      }, 1000);
    });
  }
}

// Вызываем инициализацию плеера после загрузки DOM
document.addEventListener('DOMContentLoaded', () => {
  // ... ваш существующий код ...
  
  // Инициализируем плеер с небольшой задержкой
  setTimeout(initMusicPlayer, 1000);
});