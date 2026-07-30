"use strict";

/* =========================================
   Общие настройки
========================================= */

const reduceMotionQuery = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
);

const desktopPointerQuery = window.matchMedia(
  "(hover: hover) and (pointer: fine)"
);

function wait(delay) {
  return new Promise((resolve) => {
    window.setTimeout(resolve, delay);
  });
}

/* =========================================
   Эффект печатающегося заголовка
========================================= */

const typewriterText = "worprli";
const randomCharacters = "01<>/{}[]#$%&@";

const typewriterSettings = {
  randomIterations: 6,
  randomCharacterDelay: 45,
  letterDelay: 90,
  cursorDuration: 700
};

function getRandomCharacter() {
  const randomIndex = Math.floor(
    Math.random() * randomCharacters.length
  );

  return randomCharacters[randomIndex];
}

async function typeCharacter(element, position) {
  for (
    let iteration = 0;
    iteration < typewriterSettings.randomIterations;
    iteration += 1
  ) {
    element.textContent =
      typewriterText.slice(0, position) +
      getRandomCharacter();

    await wait(typewriterSettings.randomCharacterDelay);
  }

  element.textContent = typewriterText.slice(
    0,
    position + 1
  );
}

async function typewriterEffect() {
  const element = document.getElementById("typewriter");

  if (!element) {
    return;
  }

  if (reduceMotionQuery.matches) {
    element.textContent = typewriterText;
    return;
  }

  element.textContent = "";
  element.classList.add("typewriter-cursor");

  for (
    let position = 0;
    position < typewriterText.length;
    position += 1
  ) {
    await typeCharacter(element, position);
    await wait(typewriterSettings.letterDelay);
  }

  await wait(typewriterSettings.cursorDuration);

  element.classList.remove("typewriter-cursor");
  element.textContent = typewriterText;
}

/* =========================================
   Статус пользователя
========================================= */

const statusSettings = {
  online: {
    className: "status-online",
    label: "Онлайн"
  },

  idle: {
    className: "status-idle",
    label: "Неактивен"
  },

  dnd: {
    className: "status-dnd",
    label: "Не беспокоить"
  },

  offline: {
    className: "status-offline",
    label: "Офлайн"
  }
};

function updateDiscordStatus(status = "offline") {
  const indicator = document.getElementById(
    "status-indicator"
  );

  const text = document.getElementById("status-text");

  if (!indicator || !text) {
    return;
  }

  const currentStatus =
    statusSettings[status] || statusSettings.offline;

  indicator.classList.remove(
    "status-online",
    "status-idle",
    "status-dnd",
    "status-offline"
  );

  indicator.classList.add(currentStatus.className);
  text.textContent = currentStatus.label;
}

/* =========================================
   Музыкальный проигрыватель
========================================= */

function initMusicPlayer() {
  const audio = document.getElementById(
    "background-music"
  );

  const button = document.getElementById(
    "play-music-btn"
  );

  if (!audio || !button) {
    return;
  }

  const icon = button.querySelector("i");
  const label = button.querySelector("span");

  function updateMusicButton(isPlaying) {
    button.classList.toggle(
      "is-playing",
      isPlaying
    );

    button.setAttribute(
      "aria-pressed",
      String(isPlaying)
    );

    button.setAttribute(
      "aria-label",
      isPlaying
        ? "Выключить фоновую музыку"
        : "Включить фоновую музыку"
    );

    if (icon) {
      icon.className = isPlaying
        ? "fas fa-pause"
        : "fas fa-play";
    }

    if (label) {
      label.textContent = isPlaying
        ? "Выключить музыку"
        : "Включить музыку";
    }
  }

  button.addEventListener("click", async () => {
    if (audio.paused) {
      try {
        await audio.play();
      } catch (error) {
        console.error(
          "Не удалось запустить музыку:",
          error
        );
      }
    } else {
      audio.pause();
    }
  });

  audio.addEventListener("play", () => {
    updateMusicButton(true);
  });

  audio.addEventListener("pause", () => {
    updateMusicButton(false);
  });

  audio.addEventListener("ended", () => {
    updateMusicButton(false);
  });

  audio.addEventListener("error", () => {
    updateMusicButton(false);

    if (label) {
      label.textContent = "Музыка недоступна";
    }

    if (icon) {
      icon.className = "fas fa-exclamation-triangle";
    }

    button.disabled = true;
    button.setAttribute(
      "aria-label",
      "Музыкальный файл недоступен"
    );
  });

  updateMusicButton(!audio.paused);
}

/* =========================================
   Подсветка за курсором и касанием
========================================= */

function updatePointerGlow(clientX, clientY) {
  document.documentElement.style.setProperty(
    "--pointer-x",
    `${clientX}px`
  );

  document.documentElement.style.setProperty(
    "--pointer-y",
    `${clientY}px`
  );
}

function initPointerGlow() {
  let animationFrame = null;
  let pointerX = window.innerWidth / 2;
  let pointerY = window.innerHeight / 2;

  function requestGlowUpdate(clientX, clientY) {
    pointerX = clientX;
    pointerY = clientY;

    if (animationFrame !== null) {
      return;
    }

    animationFrame = window.requestAnimationFrame(() => {
      updatePointerGlow(pointerX, pointerY);
      animationFrame = null;
    });
  }

  document.addEventListener(
    "pointermove",
    (event) => {
      requestGlowUpdate(
        event.clientX,
        event.clientY
      );
    },
    { passive: true }
  );

  document.addEventListener(
    "touchstart",
    (event) => {
      const touch = event.touches[0];

      if (!touch) {
        return;
      }

      requestGlowUpdate(
        touch.clientX,
        touch.clientY
      );
    },
    { passive: true }
  );

  document.addEventListener(
    "touchmove",
    (event) => {
      const touch = event.touches[0];

      if (!touch) {
        return;
      }

      requestGlowUpdate(
        touch.clientX,
        touch.clientY
      );
    },
    { passive: true }
  );
}

/* =========================================
   Наклон и подсветка карточек
========================================= */

function resetCardEffect(card) {
  card.style.setProperty("--rotate-x", "0deg");
  card.style.setProperty("--rotate-y", "0deg");
  card.style.setProperty("--card-light-x", "50%");
  card.style.setProperty("--card-light-y", "50%");
}

function initCardEffects() {
  const cards = document.querySelectorAll(".card");

  cards.forEach((card) => {
    let animationFrame = null;

    card.addEventListener("pointermove", (event) => {
      if (
        !desktopPointerQuery.matches ||
        reduceMotionQuery.matches
      ) {
        return;
      }

      const rect = card.getBoundingClientRect();

      const relativeX = event.clientX - rect.left;
      const relativeY = event.clientY - rect.top;

      const percentX = relativeX / rect.width;
      const percentY = relativeY / rect.height;

      const rotateY = (percentX - 0.5) * 8;
      const rotateX = (0.5 - percentY) * 8;

      if (animationFrame !== null) {
        window.cancelAnimationFrame(animationFrame);
      }

      animationFrame = window.requestAnimationFrame(() => {
        card.style.setProperty(
          "--rotate-x",
          `${rotateX.toFixed(2)}deg`
        );

        card.style.setProperty(
          "--rotate-y",
          `${rotateY.toFixed(2)}deg`
        );

        card.style.setProperty(
          "--card-light-x",
          `${(percentX * 100).toFixed(2)}%`
        );

        card.style.setProperty(
          "--card-light-y",
          `${(percentY * 100).toFixed(2)}%`
        );

        animationFrame = null;
      });
    });

    card.addEventListener("pointerleave", () => {
      if (animationFrame !== null) {
        window.cancelAnimationFrame(animationFrame);
        animationFrame = null;
      }

      resetCardEffect(card);
    });
  });
}

/* =========================================
   Светящиеся частицы при нажатии
========================================= */

function createClickParticles(clientX, clientY) {
  if (reduceMotionQuery.matches) {
    return;
  }

  const particleCount = desktopPointerQuery.matches
    ? 8
    : 5;

  for (
    let index = 0;
    index < particleCount;
    index += 1
  ) {
    const particle = document.createElement("span");

    const angle =
      (Math.PI * 2 * index) / particleCount +
      Math.random() * 0.45;

    const distance = 25 + Math.random() * 45;
    const size = 3 + Math.random() * 4;

    const moveX = Math.cos(angle) * distance;
    const moveY = Math.sin(angle) * distance;

    particle.className = "click-particle";

    particle.style.left = `${clientX}px`;
    particle.style.top = `${clientY}px`;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;

    particle.style.setProperty(
      "--particle-x",
      `${moveX.toFixed(2)}px`
    );

    particle.style.setProperty(
      "--particle-y",
      `${moveY.toFixed(2)}px`
    );

    document.body.appendChild(particle);

    particle.addEventListener(
      "animationend",
      () => {
        particle.remove();
      },
      { once: true }
    );

    window.setTimeout(() => {
      particle.remove();
    }, 1000);
  }
}

function initClickParticles() {
  document.addEventListener("pointerdown", (event) => {
    if (event.button !== 0) {
      return;
    }

    createClickParticles(
      event.clientX,
      event.clientY
    );
  });
}

/* =========================================
   Очистка эффектов при изменении экрана
========================================= */

function resetAllCardEffects() {
  document.querySelectorAll(".card").forEach((card) => {
    resetCardEffect(card);
  });
}

function initResponsiveEffectReset() {
  desktopPointerQuery.addEventListener?.(
    "change",
    resetAllCardEffects
  );

  reduceMotionQuery.addEventListener?.(
    "change",
    resetAllCardEffects
  );

  window.addEventListener(
    "resize",
    resetAllCardEffects,
    { passive: true }
  );
}

/* =========================================
   Запуск сайта
========================================= */

document.addEventListener("DOMContentLoaded", () => {
  typewriterEffect();

  // Доступные статусы:
  // online, idle, dnd, offline
  updateDiscordStatus("online");

  initMusicPlayer();
  initPointerGlow();
  initCardEffects();
  initClickParticles();
  initResponsiveEffectReset();
});

