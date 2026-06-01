/**
 * Charos — Premium Romantic Greeting
 * HTML, CSS, JavaScript + GSAP
 */

(function () {
  "use strict";

  const MESSAGE = "Men sizni juda juda sevaman!";
  const HEART_TEXT = "Sizni sevaman ❤️";
  const FLOATING_HEART_COUNT = 42;
  const PETAL_INTERVAL = 380;
  const MOUSE_THROTTLE = 45;

  const $ = (sel) => document.querySelector(sel);
  const app = $("#app");
  const starCanvas = $("#starfield");
  const particlesLayer = $("#particlesLayer");
  const sparklesLayer = $("#sparklesLayer");
  const petalsLayer = $("#petalsLayer");
  const mouseHeartsLayer = $("#mouseHearts");
  const floatingHeartsLayer = $("#floatingHeartsLayer");
  const openingScene = $("#openingScene");
  const messageScene = $("#messageScene");
  const envelopeWrapper = $("#envelopeWrapper");
  const envelope = $("#envelope");
  const envelopeFlap = $("#envelopeFlap");
  const envelopeSeal = $("#envelopeSeal");
  const envelopeLetter = $("#envelopeLetter");
  const magicLight = $("#magicLight");
  const burstHearts = $("#burstHearts");
  const openBtn = $("#openBtn");
  const messageTitle = $("#messageTitle");
  const typewriterEl = $("#typewriterText");
  const typewriterCursor = $("#typewriterCursor");
  const bgMusic = $("#bgMusic");

  let opened = false;
  let petalsTimer = null;
  let floatingHeartsStarted = false;
  let lastMouseHeart = 0;
  let starCtx;
  let stars = [];
  let animationId;

  /* ---------- Starfield ---------- */
  function initStarfield() {
    const ctx = starCanvas.getContext("2d");
    starCtx = ctx;
    resizeStarfield();
    stars = Array.from({ length: 180 }, () => ({
      x: Math.random() * starCanvas.width,
      y: Math.random() * starCanvas.height,
      r: Math.random() * 1.8 + 0.3,
      twinkle: Math.random() * Math.PI * 2,
      speed: 0.02 + Math.random() * 0.04,
    }));
    window.addEventListener("resize", resizeStarfield);
    drawStars();
  }

  function resizeStarfield() {
    starCanvas.width = window.innerWidth;
    starCanvas.height = window.innerHeight;
  }

  function drawStars() {
    starCtx.clearRect(0, 0, starCanvas.width, starCanvas.height);
    const t = Date.now() * 0.001;
    stars.forEach((s) => {
      const alpha = 0.35 + Math.sin(t * s.speed * 60 + s.twinkle) * 0.35;
      starCtx.beginPath();
      starCtx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      starCtx.fillStyle = `rgba(255, 240, 250, ${alpha})`;
      starCtx.fill();
      if (Math.random() < 0.002) {
        s.x = Math.random() * starCanvas.width;
        s.y = Math.random() * starCanvas.height;
      }
    });
    animationId = requestAnimationFrame(drawStars);
  }

  /* ---------- Background drifting hearts (opening) ---------- */
  function initBackgroundHearts() {
    const hearts = ["♥", "❤", "💕", "✨"];
    const count = Math.min(18, Math.floor(window.innerWidth / 40));
    for (let i = 0; i < count; i++) {
      const el = document.createElement("span");
      el.setAttribute("aria-hidden", "true");
      el.textContent = hearts[i % hearts.length];
      el.style.cssText = `
        position:absolute;
        left:${Math.random() * 100}%;
        top:${Math.random() * 100}%;
        font-size:${0.6 + Math.random() * 1.2}rem;
        opacity:${0.15 + Math.random() * 0.25};
        color:#ff8fab;
        text-shadow:0 0 12px rgba(255,120,180,0.5);
        pointer-events:none;
      `;
      particlesLayer.appendChild(el);
      gsap.to(el, {
        y: -80 - Math.random() * 120,
        x: (Math.random() - 0.5) * 100,
        rotation: (Math.random() - 0.5) * 40,
        duration: 8 + Math.random() * 10,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: Math.random() * 4,
      });
    }
  }

  /* ---------- Ambient particles ---------- */
  function initAmbientParticles() {
    const count = Math.min(35, Math.floor(window.innerWidth / 25));
    for (let i = 0; i < count; i++) {
      const el = document.createElement("div");
      el.className = "ambient-particle";
      const size = 3 + Math.random() * 6;
      el.style.width = `${size}px`;
      el.style.height = `${size}px`;
      el.style.left = `${Math.random() * 100}%`;
      el.style.top = `${Math.random() * 100}%`;
      el.style.setProperty("--dur", `${6 + Math.random() * 8}s`);
      el.style.setProperty("--delay", `${Math.random() * 5}s`);
      el.style.setProperty("--tx", `${(Math.random() - 0.5) * 60}px`);
      el.style.setProperty("--ty", `${-20 - Math.random() * 40}px`);
      particlesLayer.appendChild(el);
    }
  }

  /* ---------- Sparkles ---------- */
  function initSparkles() {
    const count = Math.min(60, Math.floor(window.innerWidth / 15));
    for (let i = 0; i < count; i++) {
      const el = document.createElement("div");
      el.className = "sparkle";
      el.style.left = `${Math.random() * 100}%`;
      el.style.top = `${Math.random() * 100}%`;
      el.style.setProperty("--dur", `${1.5 + Math.random() * 2.5}s`);
      el.style.animationDelay = `${Math.random() * 3}s`;
      sparklesLayer.appendChild(el);
    }
  }

  /* ---------- Rose petals ---------- */
  function spawnPetal() {
    const petal = document.createElement("div");
    petal.className = "petal";
    const startX = Math.random() * 100;
    petal.style.left = `${startX}%`;
    petal.style.setProperty("--fall-dur", `${10 + Math.random() * 8}s`);
    petal.style.setProperty("--rot-start", `${Math.random() * 360}deg`);
    petal.style.setProperty("--rot-end", `${360 + Math.random() * 720}deg`);
    petal.style.setProperty("--drift", `${(Math.random() - 0.5) * 160}px`);
    petal.style.width = `${10 + Math.random() * 8}px`;
    petal.style.height = `${14 + Math.random() * 10}px`;
    petalsLayer.appendChild(petal);
    petal.addEventListener("animationend", () => petal.remove());
  }

  function startPetals() {
    if (petalsTimer) return;
    spawnPetal();
    petalsTimer = setInterval(spawnPetal, PETAL_INTERVAL);
  }

  /* ---------- Mouse hearts ---------- */
  function onMouseMove(e) {
    const now = Date.now();
    if (now - lastMouseHeart < MOUSE_THROTTLE) return;
    lastMouseHeart = now;

    const heart = document.createElement("span");
    heart.className = "mouse-heart";
    heart.textContent = "♥";
    heart.style.left = `${e.clientX}px`;
    heart.style.top = `${e.clientY}px`;
    mouseHeartsLayer.appendChild(heart);

    gsap.fromTo(
      heart,
      { scale: 0, opacity: 1, x: 0, y: 0 },
      {
        scale: 1.2,
        opacity: 0,
        x: (Math.random() - 0.5) * 40,
        y: -30 - Math.random() * 30,
        duration: 1.2,
        ease: "power2.out",
        onComplete: () => heart.remove(),
      }
    );
  }

  /* ---------- Burst hearts on open ---------- */
  function burstHeartParticles() {
    const count = 36;
    for (let i = 0; i < count; i++) {
      const h = document.createElement("span");
      h.className = "burst-heart";
      h.textContent = Math.random() > 0.5 ? "❤" : "♥";
      burstHearts.appendChild(h);

      const angle = (i / count) * Math.PI * 2 + Math.random() * 0.5;
      const dist = 80 + Math.random() * 180;
      const x = Math.cos(angle) * dist;
      const y = Math.sin(angle) * dist - 40;

      gsap.fromTo(
        h,
        { x: 0, y: 0, scale: 0, opacity: 1, rotation: 0 },
        {
          x,
          y,
          scale: 0.6 + Math.random() * 1.2,
          opacity: 0,
          rotation: (Math.random() - 0.5) * 360,
          duration: 1.4 + Math.random() * 0.8,
          ease: "power3.out",
          delay: Math.random() * 0.15,
          onComplete: () => h.remove(),
        }
      );
    }
  }

  /* ---------- Floating hearts with text ---------- */
  function createFloatingHeart() {
    const el = document.createElement("div");
    el.className = "floating-heart";
    el.textContent = HEART_TEXT;
    if (Math.random() > 0.6) el.classList.add("floating-heart--pulse");

    const w = window.innerWidth;
    const h = window.innerHeight;
    const startX = Math.random() * w;
    el.style.left = `${startX}px`;
    el.style.top = `${h + 20}px`;
    floatingHeartsLayer.appendChild(el);

    const pathType = Math.floor(Math.random() * 3);
    const duration = 12 + Math.random() * 10;
    const driftX = (Math.random() - 0.5) * w * 0.55;
    const onDone = () => {
      el.remove();
      if (floatingHeartsStarted) createFloatingHeart();
    };

    gsap.set(el, { x: 0, y: 0 });

    if (pathType === 0) {
      gsap.to(el, {
        y: -(h + 120),
        x: driftX,
        rotation: Math.random() > 0.5 ? 360 : -360,
        duration,
        ease: "none",
        onComplete: onDone,
      });
    } else if (pathType === 1) {
      gsap.to(el, {
        y: -(h + 100),
        x: driftX,
        rotation: 240,
        duration,
        ease: "sine.inOut",
        onComplete: onDone,
      });
      gsap.to(el, {
        x: `+=${driftX * 0.4}`,
        duration: duration / 2,
        repeat: 1,
        yoyo: true,
        ease: "sine.inOut",
      });
    } else {
      gsap.to(el, {
        y: -(h + 80),
        x: driftX,
        rotation: (Math.random() - 0.5) * 120,
        duration,
        ease: "power1.inOut",
        onComplete: onDone,
      });
      gsap.to(el, {
        scale: 1.1,
        duration: 1.4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }

    gsap.to(el, {
      opacity: 0,
      delay: duration * 0.78,
      duration: duration * 0.22,
    });
  }

  function startFloatingHearts() {
    if (floatingHeartsStarted) return;
    floatingHeartsStarted = true;
    for (let i = 0; i < FLOATING_HEART_COUNT; i++) {
      setTimeout(createFloatingHeart, i * 280);
    }
  }

  /* ---------- Music ---------- */
  function playMusic() {
    if (!bgMusic) return;
    bgMusic.volume = 0.55;
    const playPromise = bgMusic.play();
    if (playPromise && typeof playPromise.catch === "function") {
      playPromise.catch(() => {
        /* Autoplay blocked until gesture — already on click */
      });
    }
  }

  /* ---------- Typewriter ---------- */
  function runTypewriter(text, onComplete) {
    typewriterEl.textContent = "";
    typewriterCursor.classList.remove("hidden");
    let i = 0;

    function type() {
      if (i < text.length) {
        typewriterEl.textContent += text.charAt(i);
        i++;
        setTimeout(type, 55 + Math.random() * 35);
      } else {
        typewriterCursor.classList.add("hidden");
        if (onComplete) onComplete();
      }
    }
    type();
  }

  /* ---------- Open envelope sequence ---------- */
  function openEnvelope() {
    if (opened) return;
    opened = true;
    openBtn.disabled = true;

    playMusic();
    startPetals();

    const tl = gsap.timeline({
      defaults: { ease: "power3.inOut" },
    });

    tl.to(openBtn, { opacity: 0, y: 20, duration: 0.4 })
      .to(
        ".decor-hearts",
        { opacity: 0, scale: 0.8, duration: 0.5 },
        "<"
      )
      .to(
        envelopeSeal,
        { scale: 0, opacity: 0, duration: 0.35, ease: "back.in(2)" },
        "-=0.1"
      )
      .to(
        envelopeFlap,
        {
          rotateX: 180,
          duration: 0.9,
          ease: "power2.inOut",
          transformOrigin: "top center",
          transformPerspective: 800,
        },
        "-=0.05"
      )
      .to(
        magicLight,
        {
          opacity: 1,
          scale: 25,
          duration: 1.1,
          ease: "power2.out",
        },
        "-=0.5"
      )
      .to(
        envelopeLetter,
        {
          y: -90,
          duration: 0.85,
          ease: "power2.out",
        },
        "-=0.7"
      )
      .add(() => burstHeartParticles(), "-=0.6")
      .to(
        app,
        {
          scale: 1.08,
          duration: 1.2,
          ease: "power2.inOut",
        },
        "-=0.8"
      )
      .to(
        envelopeWrapper,
        {
          opacity: 0,
          scale: 0.85,
          y: -40,
          duration: 0.7,
        },
        "-=0.4"
      )
      .to(
        openingScene,
        {
          opacity: 0,
          duration: 0.6,
          onComplete: () => {
            openingScene.classList.add("hidden");
            showMessageScene();
          },
        },
        "-=0.3"
      )
      .to(app, { scale: 1, duration: 0.5 }, "-=0.2");
  }

  function showMessageScene() {
    messageScene.classList.remove("hidden");
    gsap.set(messageScene, { opacity: 0 });
    gsap.to(messageScene, { opacity: 1, duration: 0.8 });

    gsap.fromTo(
      messageTitle,
      { opacity: 0, y: 40, scale: 0.9 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1.2,
        ease: "back.out(1.4)",
        onComplete: () => {
          gsap.to(".title-charos", {
            textShadow: "0 0 40px rgba(255,150,200,0.9)",
            duration: 2,
            repeat: -1,
            yoyo: true,
          });
          setTimeout(() => {
            runTypewriter(MESSAGE, startFloatingHearts);
          }, 400);
        },
      }
    );
  }

  /* ---------- Intro animations ---------- */
  function introAnimations() {
    gsap.from(envelopeWrapper, {
      y: 60,
      opacity: 0,
      scale: 0.85,
      duration: 1.4,
      ease: "power3.out",
      delay: 0.3,
    });

    gsap.from(openBtn, {
      y: 30,
      opacity: 0,
      duration: 1,
      ease: "power2.out",
      delay: 0.9,
    });

    gsap.from(".decor-heart", {
      scale: 0,
      opacity: 0,
      duration: 0.8,
      stagger: 0.08,
      ease: "back.out(2)",
      delay: 0.6,
    });

    gsap.to(envelope, {
      rotateY: 5,
      rotateX: 10,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });
  }

  /* ---------- Init ---------- */
  function init() {
    initStarfield();
    initAmbientParticles();
    initBackgroundHearts();
    initSparkles();
    introAnimations();

    openBtn.addEventListener("click", openEnvelope);
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener(
      "touchmove",
      (e) => {
        if (e.touches[0]) onMouseMove(e.touches[0]);
      },
      { passive: true }
    );
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
