/**
 * SlayerZone - script.js
 * Matched to your actual HTML (IDs, onclick names, structure)
 * Defensive + safe auto-recovery
 */

(function () {
  'use strict';

  // ==================== GLOBAL ERROR HANDLER ====================
  window.addEventListener('error', function (e) {
    console.error('[SlayerZone]', e.message, e.filename, e.lineno);
  });
  window.addEventListener('unhandledrejection', function (e) {
    console.error('[SlayerZone] Promise:', e.reason);
  });

  // ==================== SAFE HELPERS ====================
  function getElement(id) {
    try {
      return document.getElementById(id) || null;
    } catch (e) {
      return null;
    }
  }

  function qs(sel, parent) {
    try {
      return (parent || document).querySelector(sel);
    } catch (e) {
      return null;
    }
  }

  function qsa(sel, parent) {
    try {
      return Array.from((parent || document).querySelectorAll(sel));
    } catch (e) {
      return [];
    }
  }

  function safeOn(el, event, fn) {
    if (el && typeof el.addEventListener === 'function') {
      el.addEventListener(event, fn);
    }
  }

  // ==================== AUTO RECOVERY ====================
  function autoFixProblems() {
    try {
      if (document.body) {
        document.body.style.overflow = '';
        document.body.style.pointerEvents = '';
      }
      var seek = getElement('musicSeek');
      if (seek && !seek.getAttribute('max')) {
        seek.max = 100;
        seek.value = 0;
      }
      console.log('[SlayerZone] autoFixProblems ran');
    } catch (e) {
      console.warn('[SlayerZone] autoFix failed', e);
    }
  }

  setInterval(function () {
    try {
      if (document.body && document.body.style.overflow === 'hidden') {
        var anyOpen = qsa('.popup.show, #quizPopup.show, #animePopup[style*="flex"], #allAnimePopup[style*="flex"]');
        if (anyOpen.length === 0) {
          document.body.style.overflow = '';
        }
      }
    } catch (e) {}
  }, 4000);

  // ==================== ANIME DATA (keys match HTML onclick) ====================
  var animeData = {
    ds: {
      title: 'Demon Slayer',
      alt: 'Kimetsu no Yaiba',
      genre: 'Action, Supernatural, Historical',
      year: '2019',
      status: 'Ongoing',
      rating: '8.7',
      episodes: '44+',
      studio: 'ufotable',
      synopsis: 'Tanjiro Kamado becomes a demon slayer after his family is slaughtered and his sister Nezuko is turned into a demon. He joins the Demon Corps to find a cure and avenge his family.',
      trailer: 'https://www.youtube.com/watch?v=VQGCKyvzIM4'
    },
    demonslayer: {
      title: 'Demon Slayer',
      alt: 'Kimetsu no Yaiba',
      genre: 'Action, Supernatural, Historical',
      year: '2019',
      status: 'Ongoing',
      rating: '8.7',
      episodes: '44+',
      studio: 'ufotable',
      synopsis: 'Tanjiro Kamado becomes a demon slayer after his family is slaughtered and his sister Nezuko is turned into a demon. He joins the Demon Corps to find a cure and avenge his family.',
      trailer: 'https://www.youtube.com/watch?v=VQGCKyvzIM4'
    },
    jjk: {
      title: 'Jujutsu Kaisen',
      alt: 'JJK',
      genre: 'Action, Supernatural, Dark Fantasy',
      year: '2020',
      status: 'Ongoing',
      rating: '8.6',
      episodes: '47+',
      studio: 'MAPPA',
      synopsis: 'Yuji Itadori swallows a cursed finger and becomes the host of Sukuna, the King of Curses. He joins Tokyo Jujutsu High to fight cursed spirits.',
      trailer: 'https://www.youtube.com/watch?v=pkKu9hLT-t8'
    },
    jjk0: {
      title: 'Jujutsu Kaisen 0',
      alt: 'JJK 0',
      genre: 'Action, Supernatural',
      year: '2021',
      status: 'Movie',
      rating: '8.5',
      episodes: '1',
      studio: 'MAPPA',
      synopsis: 'Yuta Okkotsu struggles with the curse of his childhood friend Rika and joins Jujutsu High to learn to control her power.',
      trailer: 'https://www.youtube.com/watch?v=2MOXZk5TnYk'
    },
    bl: {
      title: 'Blue Lock',
      alt: 'ブルーロック',
      genre: 'Sports, Psychological',
      year: '2022',
      status: 'Ongoing',
      rating: '8.3',
      episodes: '24+',
      studio: '8bit',
      synopsis: 'Japan creates Blue Lock — a radical training program to produce the world\'s greatest striker. Yoichi Isagi competes against 299 other strikers.',
      trailer: 'https://www.youtube.com/watch?v=6ZQ7_9y0v5w'
    },
    bluelock: {
      title: 'Blue Lock',
      alt: 'ブルーロック',
      genre: 'Sports, Psychological',
      year: '2022',
      status: 'Ongoing',
      rating: '8.3',
      episodes: '24+',
      studio: '8bit',
      synopsis: 'Japan creates Blue Lock — a radical training program to produce the world\'s greatest striker. Yoichi Isagi competes against 299 other strikers.',
      trailer: 'https://www.youtube.com/watch?v=6ZQ7_9y0v5w'
    },
    sololeveling: {
      title: 'Solo Leveling',
      alt: 'Ore dake Level Up na Ken',
      genre: 'Action, Fantasy, Adventure',
      year: '2024',
      status: 'Ongoing',
      rating: '8.7',
      episodes: '12+',
      studio: 'A-1 Pictures',
      synopsis: 'Sung Jinwoo, the weakest hunter, gains a mysterious system that allows him to level up infinitely after surviving a double dungeon.',
      trailer: 'https://www.youtube.com/watch?v=fiR1k4Kq6a0'
    },
    op: {
      title: 'One Piece',
      alt: 'ワンピース',
      genre: 'Adventure, Fantasy, Comedy',
      year: '1999',
      status: 'Ongoing',
      rating: '9.0',
      episodes: '1100+',
      studio: 'Toei Animation',
      synopsis: 'Monkey D. Luffy sets sail with his Straw Hat Pirates to find the legendary One Piece and become King of the Pirates.',
      trailer: 'https://www.youtube.com/watch?v=Ades3pQbeh8'
    },
    onepiece: {
      title: 'One Piece',
      alt: 'ワンピース',
      genre: 'Adventure, Fantasy, Comedy',
      year: '1999',
      status: 'Ongoing',
      rating: '9.0',
      episodes: '1100+',
      studio: 'Toei Animation',
      synopsis: 'Monkey D. Luffy sets sail with his Straw Hat Pirates to find the legendary One Piece and become King of the Pirates.',
      trailer: 'https://www.youtube.com/watch?v=Ades3pQbeh8'
    },
    naruto: {
      title: 'Naruto',
      alt: 'ナルト',
      genre: 'Action, Adventure, Martial Arts',
      year: '2002',
      status: 'Completed',
      rating: '8.4',
      episodes: '720',
      studio: 'Pierrot',
      synopsis: 'Naruto Uzumaki, a young ninja with a sealed Nine-Tails, dreams of becoming Hokage and gaining recognition from his village.',
      trailer: 'https://www.youtube.com/watch?v=1LQkd6t7x8c'
    },
    aot: {
      title: 'Attack on Titan',
      alt: 'Shingeki no Kyojin',
      genre: 'Action, Drama, Dark Fantasy',
      year: '2013',
      status: 'Completed',
      rating: '9.1',
      episodes: '89',
      studio: 'Wit Studio / MAPPA',
      synopsis: 'Humanity lives behind walls to protect themselves from Titans. Eren Yeager joins the Survey Corps after his hometown is destroyed.',
      trailer: 'https://www.youtube.com/watch?v=MGRm4IzFx3A'
    },
    bleach: {
      title: 'Bleach',
      alt: 'ブリーチ',
      genre: 'Action, Supernatural, Adventure',
      year: '2004',
      status: 'Completed / TYBW',
      rating: '8.2',
      episodes: '366+',
      studio: 'Pierrot',
      synopsis: 'Ichigo Kurosaki becomes a Soul Reaper and fights Hollows while protecting the living world and Soul Society.',
      trailer: 'https://www.youtube.com/watch?v=1sV1r9v1Z1E'
    },
    blackclover: {
      title: 'Black Clover',
      alt: 'ブラッククローバー',
      genre: 'Action, Fantasy, Adventure',
      year: '2017',
      status: 'Completed (Anime)',
      rating: '8.1',
      episodes: '170',
      studio: 'Pierrot',
      synopsis: 'Asta, born without magic, aims to become the Wizard King using an anti-magic grimoire and pure determination.',
      trailer: 'https://www.youtube.com/watch?v=u7js9g5x1kA'
    },
    chainsawman: {
      title: 'Chainsaw Man',
      alt: 'チェンソーマン',
      genre: 'Action, Horror, Dark Fantasy',
      year: '2022',
      status: 'Ongoing',
      rating: '8.5',
      episodes: '12+',
      studio: 'MAPPA',
      synopsis: 'Denji merges with his pet devil Pochita and becomes Chainsaw Man. He joins Public Safety to hunt devils for a better life.',
      trailer: 'https://www.youtube.com/watch?v=v4yLeNt-kCU'
    },
    haikyuu: {
      title: 'Haikyuu!!',
      alt: 'ハイキュー!!',
      genre: 'Sports, Drama, Comedy',
      year: '2014',
      status: 'Completed',
      rating: '8.7',
      episodes: '85+',
      studio: 'Production I.G',
      synopsis: 'Shoyo Hinata joins Karasuno High\'s volleyball team and aims to become a top player despite his short stature.',
      trailer: 'https://www.youtube.com/watch?v=J2pL1a6kZ5w'
    },
    hxh: {
      title: 'Hunter x Hunter',
      alt: 'ハンター×ハンター',
      genre: 'Adventure, Fantasy, Action',
      year: '2011',
      status: 'Hiatus',
      rating: '9.0',
      episodes: '148',
      studio: 'Madhouse',
      synopsis: 'Gon Freecss becomes a Hunter to find his father and embarks on dangerous adventures with new friends.',
      trailer: 'https://www.youtube.com/watch?v=d6kBeJjTGnY'
    },
    mha: {
      title: 'My Hero Academia',
      alt: 'Boku no Hero Academia',
      genre: 'Action, Superhero, School',
      year: '2016',
      status: 'Ongoing',
      rating: '8.3',
      episodes: '138+',
      studio: 'Bones',
      synopsis: 'Izuku Midoriya, born without a Quirk, inherits One For All from All Might and trains to become the greatest hero.',
      trailer: 'https://www.youtube.com/watch?v=EPVgqlpl7q0'
    },
    deathnote: {
      title: 'Death Note',
      alt: 'デスノート',
      genre: 'Mystery, Psychological, Thriller',
      year: '2006',
      status: 'Completed',
      rating: '8.6',
      episodes: '37',
      studio: 'Madhouse',
      synopsis: 'Light Yagami finds a notebook that kills anyone whose name is written in it and decides to create a new world free of criminals.',
      trailer: 'https://www.youtube.com/watch?v=NlJZ-YgBB-0'
    },
    dragonball: {
      title: 'Dragon Ball',
      alt: 'ドラゴンボール',
      genre: 'Action, Adventure, Martial Arts',
      year: '1986',
      status: 'Completed / Super',
      rating: '8.5',
      episodes: '500+',
      studio: 'Toei Animation',
      synopsis: 'Goku, a Saiyan raised on Earth, trains to become the strongest fighter and protects the planet from powerful enemies.',
      trailer: 'https://www.youtube.com/watch?v=sxufB6kJe1U'
    },
    dandadan: {
      title: 'Dandadan',
      alt: 'ダンダダン',
      genre: 'Action, Comedy, Supernatural',
      year: '2024',
      status: 'Ongoing',
      rating: '8.4',
      episodes: '12+',
      studio: 'Science SARU',
      synopsis: 'Momo Ayase and Ken Takakura encounter ghosts and aliens after a bet about the supernatural, leading to chaotic adventures.',
      trailer: 'https://www.youtube.com/watch?v=0m3n6k8p9qA'
    },
    hellsparadise: {
      title: "Hell's Paradise",
      alt: 'Jigokuraku',
      genre: 'Action, Adventure, Dark Fantasy',
      year: '2023',
      status: 'Ongoing',
      rating: '8.1',
      episodes: '13+',
      studio: 'MAPPA',
      synopsis: 'Gabimaru the Hollow and other death row convicts are sent to a mysterious island to find the elixir of immortality.',
      trailer: 'https://www.youtube.com/watch?v=1v2w3x4y5z6'
    },
    windbreaker: {
      title: 'Wind Breaker',
      alt: 'ウィンドブレイカー',
      genre: 'Action, Drama, School',
      year: '2024',
      status: 'Ongoing',
      rating: '7.9',
      episodes: '13+',
      studio: 'CloverWorks',
      synopsis: 'Haruka Sakura joins Furin High, a school of delinquents known for protecting their town, and fights to become the strongest.',
      trailer: 'https://www.youtube.com/watch?v=7a8b9c0d1e2'
    }
  };

  var animeKeys = Object.keys(animeData);

  // ==================== SCORE / LEVEL ====================
  var userScore = parseInt(localStorage.getItem('sz-score') || '0', 10) || 0;

  function updateScoreUI() {
    var scoreEl = getElement('score');
    var levelEl = getElement('level');
    if (scoreEl) scoreEl.textContent = '🏆 Score : ' + userScore;
    if (levelEl) {
      var level = '🌱 Beginner';
      if (userScore >= 50) level = '⚡ Elite';
      else if (userScore >= 25) level = '🔥 Pro';
      else if (userScore >= 10) level = '⭐ Intermediate';
      levelEl.textContent = level;
    }
  }

  function addScore(points) {
    userScore += points || 1;
    localStorage.setItem('sz-score', String(userScore));
    updateScoreUI();
  }

  // ==================== TOAST / NOTIFICATION ====================
  function showToast(msg, duration) {
    duration = duration || 2500;
    try {
      var toast = getElement('toast') || qs('.toast');
      if (!toast) {
        toast = document.createElement('div');
        toast.id = 'toast';
        toast.className = 'toast';
        document.body.appendChild(toast);
      }
      toast.textContent = msg;
      toast.classList.add('show');
      clearTimeout(toast._t);
      toast._t = setTimeout(function () {
        toast.classList.remove('show');
      }, duration);
    } catch (e) {
      console.warn('showToast', e);
    }
  }

  function showNotification(msg, duration) {
    duration = duration || 3000;
    try {
      var n = getElement('notification') || qs('.notification');
      if (!n) {
        n = document.createElement('div');
        n.id = 'notification';
        n.className = 'notification';
        n.innerHTML = '<p></p>';
        document.body.appendChild(n);
      }
      var p = n.querySelector('p') || n;
      p.textContent = msg;
      n.classList.add('show');
      clearTimeout(n._t);
      n._t = setTimeout(function () {
        n.classList.remove('show');
      }, duration);
    } catch (e) {
      showToast(msg, duration);
    }
  }

  // ==================== THEME ====================
  function loadTheme() {
    try {
      var saved = localStorage.getItem('sz-theme');
      var dark = saved !== 'light';
      document.body.classList.toggle('dark-theme', dark);
      document.body.classList.toggle('light-theme', !dark);
      document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
      var btn = qs('.theme-btn');
      if (btn) btn.textContent = dark ? '☀️ Theme' : '🌙 Theme';
    } catch (e) {}
  }

  function toggleTheme() {
    try {
      var isDark = !document.body.classList.contains('light-theme');
      var next = isDark ? 'light' : 'dark';
      localStorage.setItem('sz-theme', next);
      loadTheme();
      showToast(next === 'dark' ? 'Dark mode' : 'Light mode');
    } catch (e) {
      console.warn('toggleTheme', e);
    }
  }

  // ==================== CLOCK ====================
  function updateClock() {
    var el = getElement('liveClock');
    if (!el) return;
    try {
      var now = new Date();
      var h = String(now.getHours()).padStart(2, '0');
      var m = String(now.getMinutes()).padStart(2, '0');
      var s = String(now.getSeconds()).padStart(2, '0');
      el.textContent = h + ':' + m + ':' + s;
    } catch (e) {}
  }

  // ==================== LOADING SCREEN ====================
  function animateLoadingDice() {
    var dice = getElement('dice');
    if (!dice) return;
    var faces = ['🎲', '🎯', '⚔️', '🔥', '🌟'];
    var i = 0;
    var t = setInterval(function () {
      i = (i + 1) % faces.length;
      dice.textContent = faces[i];
      var screen = getElement('loadingScreen');
      if (!screen || screen.style.display === 'none' || screen.classList.contains('hidden')) {
        clearInterval(t);
      }
    }, 400);
  }

  function hideLoadingScreen() {
    var screen = getElement('loadingScreen');
    if (!screen) return;
    try {
      screen.style.transition = 'opacity 0.8s ease, visibility 0.8s';
      screen.style.opacity = '0';
      screen.style.visibility = 'hidden';
      setTimeout(function () {
        screen.style.display = 'none';
        screen.classList.add('hidden');
      }, 850);
    } catch (e) {
      if (screen) screen.style.display = 'none';
    }
  }

  function initLoadingScreen() {
    var screen = getElement('loadingScreen');
    if (!screen) {
      setTimeout(showWelcome, 500);
      return;
    }
    try {
      screen.style.display = 'flex';
      screen.style.opacity = '1';
      animateLoadingDice();
      setTimeout(function () {
        hideLoadingScreen();
        setTimeout(showWelcome, 400);
      }, 3000);
    } catch (e) {
      hideLoadingScreen();
      showWelcome();
    }
  }

  // ==================== WELCOME POPUP ====================
  function showWelcome() {
    var popup = getElement('welcomePopup');
    if (!popup) return;
    try {
      if (sessionStorage.getItem('sz-welcomed')) return;
      popup.style.display = 'flex';
      popup.classList.add('show');
      document.body.style.overflow = 'hidden';
    } catch (e) {}
  }

  function closeWelcome() {
    try {
      var popup = getElement('welcomePopup');
      if (popup) {
        popup.style.display = 'none';
        popup.classList.remove('show');
      }
      document.body.style.overflow = '';
      sessionStorage.setItem('sz-welcomed', '1');
    } catch (e) {}
  }

  // ==================== MUSIC PLAYER ====================
  var playlist = [
    { src: 'music/jjk.mp3', title: 'Jujutsu Kaisen' },
    { src: 'music/demon-slayer.mp3', title: 'Demon Slayer' },
    { src: 'music/blue-lock.mp3', title: 'Blue Lock' },
    { src: 'music/solo-leveling.mp3', title: 'Solo Leveling' }
  ];
  var trackIndex = 0;
  var isPlaying = false;
  var audio = null;

  function initMusic() {
    try {
      audio = getElement('bgMusic');
      if (!audio) {
        audio = document.createElement('audio');
        audio.id = 'bgMusic';
        audio.preload = 'metadata';
        document.body.appendChild(audio);
      }

      if (!audio.src || audio.src.indexOf('music/') === -1) {
        audio.src = playlist[0].src;
      }

      updateSongName();

      safeOn(audio, 'timeupdate', onTimeUpdate);
      safeOn(audio, 'loadedmetadata', onMeta);
      safeOn(audio, 'ended', function () {
        nextSong();
      });
      safeOn(audio, 'error', function () {
        console.warn('[Music] load error, trying next');
        setTimeout(nextSong, 600);
      });

      var seek = getElement('musicSeek');
      if (seek) {
        safeOn(seek, 'input', seekMusic);
        safeOn(seek, 'change', seekMusic);
      }
    } catch (e) {
      console.warn('initMusic', e);
    }
  }

  function updateSongName() {
    var el = getElement('songName');
    if (el && playlist[trackIndex]) {
      el.textContent = playlist[trackIndex].title;
    }
  }

  function formatTime(sec) {
    if (!isFinite(sec) || isNaN(sec)) return '0:00';
    var m = Math.floor(sec / 60);
    var s = Math.floor(sec % 60);
    return m + ':' + String(s).padStart(2, '0');
  }

  function onTimeUpdate() {
    if (!audio) return;
    try {
      var cur = getElement('currentTime');
      var fill = getElement('musicProgress');
      var seek = getElement('musicSeek');
      if (cur) cur.textContent = formatTime(audio.currentTime);
      if (audio.duration) {
        var pct = (audio.currentTime / audio.duration) * 100;
        if (fill) fill.style.width = pct + '%';
        if (seek) {
          seek.value = pct;
          seek.style.setProperty('--progress', pct + '%');
        }
        var bar = qs('.music-seekbar');
        if (bar) bar.style.setProperty('--progress', pct + '%');
      }
    } catch (e) {}
  }

  function onMeta() {
    if (!audio) return;
    try {
      var dur = getElement('duration');
      if (dur) dur.textContent = formatTime(audio.duration);
    } catch (e) {}
  }

  function toggleMusic() {
    if (!audio) return;
    try {
      if (audio.paused) {
        if (!audio.src || audio.readyState === 0) {
          audio.src = playlist[trackIndex].src;
        }
        audio.play().then(function () {
          isPlaying = true;
          updatePlayBtn(true);
        }).catch(function (err) {
          console.warn('play failed', err);
          showToast('Music play blocked — tap again');
        });
      } else {
        audio.pause();
        isPlaying = false;
        updatePlayBtn(false);
      }
    } catch (e) {
      console.warn('toggleMusic', e);
    }
  }

  function updatePlayBtn(playing) {
    var btn = getElement('musicBtn');
    if (btn) {
      btn.textContent = playing ? '⏸' : '▶';
    }
  }

  function nextSong() {
    if (!audio) return;
    try {
      trackIndex = (trackIndex + 1) % playlist.length;
      audio.src = playlist[trackIndex].src;
      updateSongName();
      if (isPlaying) {
        audio.play().catch(function () {});
      }
      onTimeUpdate();
    } catch (e) {
      console.warn('nextSong', e);
    }
  }

  function previousSong() {
    if (!audio) return;
    try {
      trackIndex = (trackIndex - 1 + playlist.length) % playlist.length;
      audio.src = playlist[trackIndex].src;
      updateSongName();
      if (isPlaying) {
        audio.play().catch(function () {});
      }
      onTimeUpdate();
    } catch (e) {
      console.warn('previousSong', e);
    }
  }

  function seekMusic(e) {
    if (!audio || !audio.duration) return;
    try {
      var val = parseFloat((e && e.target && e.target.value) || 0);
      audio.currentTime = (val / 100) * audio.duration;
      var bar = qs('.music-seekbar');
      if (bar) bar.style.setProperty('--progress', val + '%');
      var fill = getElement('musicProgress');
      if (fill) fill.style.width = val + '%';
    } catch (err) {
      console.warn('seekMusic', err);
    }
  }

  // ==================== SEARCH ====================
  function searchAnime(query) {
    try {
      var input = getElement('searchInput');
      if (typeof query !== 'string') {
        query = input ? input.value : '';
      }
      query = (query || '').trim().toLowerCase();

      var cards = qsa('.anime-card, .news-card, .anime-mini-card, .card');
      var found = 0;

      cards.forEach(function (card) {
        var text = (card.textContent || '').toLowerCase();
        var match = !query || text.indexOf(query) !== -1;
        card.style.display = match ? '' : 'none';
        if (match) found++;
      });

      if (query && found === 0) {
        showToast('No results for "' + query + '"');
      } else if (query) {
        showToast(found + ' result(s)');
      }
    } catch (e) {
      console.warn('searchAnime', e);
    }
  }

  function initSearch() {
    var input = getElement('searchInput');
    if (!input) return;
    safeOn(input, 'input', function () {
      searchAnime(input.value);
    });
    safeOn(input, 'keydown', function (e) {
      if (e.key === 'Enter') {
        e.preventDefault();
        searchAnime(input.value);
      }
    });
  }

  // ==================== HERO / EXPLORE ====================
  function exploreNow() {
    try {
      var news = getElement('news') || getElement('popular') || qs('.popular');
      if (news) {
        news.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        window.scrollTo({ top: 400, behavior: 'smooth' });
      }
      showToast('Exploring anime...');
    } catch (e) {
      console.warn('exploreNow', e);
    }
  }

  function initHeroSlider() {
    var img = getElement('sliderImage');
    if (!img) return;
    safeOn(img, 'error', function () {
      img.style.display = 'none';
    });
  }

  function updateBanner() {}
  function startSlider() {}
  function nextBanner() {}
  function previousBanner() {}

  // ==================== ANIME POPUP ====================
  function showAnime(key) {
    try {
      key = (key || '').toLowerCase().replace(/\s+/g, '');
      var data = animeData[key];

      if (!data) {
        for (var i = 0; i < animeKeys.length; i++) {
          if (animeKeys[i].indexOf(key) !== -1 || key.indexOf(animeKeys[i]) !== -1) {
            data = animeData[animeKeys[i]];
            break;
          }
        }
      }

      if (!data) {
        showToast('Anime info not found');
        return;
      }

      var popup = getElement('animePopup');
      if (!popup) {
        popup = document.createElement('div');
        popup.id = 'animePopup';
        popup.className = 'popup';
        popup.innerHTML =
          '<div class="popup-content">' +
          '<button class="close" onclick="closePopup()">✖</button>' +
          '<h2 id="animeTitle"></h2>' +
          '<p id="animeAlt"></p>' +
          '<p><strong>Genre:</strong> <span id="animeGenre"></span></p>' +
          '<p><strong>Year:</strong> <span id="animeYear"></span> | <strong>Status:</strong> <span id="animeStatus"></span></p>' +
          '<p><strong>Rating:</strong> <span id="animeRating"></span> | <strong>Episodes:</strong> <span id="animeEpisodes"></span></p>' +
          '<p><strong>Studio:</strong> <span id="animeStudio"></span></p>' +
          '<p id="animeSynopsis" style="margin-top:12px;line-height:1.6;"></p>' +
          '<div class="popup-buttons">' +
          '<button id="trailerBtn">🎬 Trailer</button>' +
          '</div></div>';
        document.body.appendChild(popup);
        safeOn(popup, 'click', function (e) {
          if (e.target === popup) closePopup();
        });
      }

      function set(id, val) {
        var el = getElement(id) || popup.querySelector('#' + id);
        if (el) el.textContent = val || '';
      }

      set('animeTitle', data.title);
      set('animeAlt', data.alt || '');
      set('animeGenre', data.genre);
      set('animeYear', data.year);
      set('animeStatus', data.status);
      set('animeRating', data.rating);
      set('animeEpisodes', data.episodes);
      set('animeStudio', data.studio);
      set('animeSynopsis', data.synopsis);

      var titleEl = getElement('animeTitle') || popup.querySelector('h2');
      if (titleEl) titleEl.textContent = data.title;

      // If HTML is truncated and only has title, inject full info
      var content = popup.querySelector('.popup-content');
      if (content) {
        var syn = getElement('animeSynopsis') || content.querySelector('#animeSynopsis') || content.querySelector('.sz-synopsis');
        if (!syn) {
          syn = document.createElement('p');
          syn.id = 'animeSynopsis';
          syn.className = 'sz-synopsis';
          syn.style.marginTop = '12px';
          syn.style.lineHeight = '1.6';
          content.appendChild(syn);
        }
        syn.textContent = data.synopsis;

        // Ensure genre/year etc. exist
        if (!getElement('animeGenre') && !content.querySelector('#animeGenre')) {
          var extra = document.createElement('div');
          extra.className = 'sz-extra';
          extra.innerHTML =
            '<p><strong>Genre:</strong> ' + (data.genre || '') + '</p>' +
            '<p><strong>Year:</strong> ' + (data.year || '') + ' | <strong>Status:</strong> ' + (data.status || '') + '</p>' +
            '<p><strong>Rating:</strong> ' + (data.rating || '') + ' | <strong>Episodes:</strong> ' + (data.episodes || '') + '</p>' +
            '<p><strong>Studio:</strong> ' + (data.studio || '') + '</p>';
          content.insertBefore(extra, syn);
        }
      }

      var trailerBtn = getElement('trailerBtn') || popup.querySelector('#trailerBtn');
      if (trailerBtn) {
        trailerBtn.onclick = function () {
          watchTrailer(key);
        };
      }

      popup.style.display = 'flex';
      popup.classList.add('show');
      document.body.style.overflow = 'hidden';
    } catch (e) {
      console.warn('showAnime', e);
      showToast('Could not open info');
    }
  }

  function closePopup() {
    try {
      ['animePopup', 'allAnimePopup'].forEach(function (id) {
        var p = getElement(id);
        if (p) {
          p.style.display = 'none';
          p.classList.remove('show');
        }
      });
      document.body.style.overflow = '';
    } catch (e) {}
  }

  function watchTrailer(key) {
    try {
      key = (key || '').toLowerCase().replace(/\s+/g, '');
      var data = animeData[key] || animeData.ds;
      if (data && data.trailer) {
        window.open(data.trailer, '_blank', 'noopener');
      } else {
        showToast('Trailer not available');
      }
    } catch (e) {
      console.warn('watchTrailer', e);
    }
  }

  // ==================== ALL ANIME POPUP ====================
  function openAllAnime() {
    try {
      var p = getElement('allAnimePopup');
      if (p) {
        p.style.display = 'flex';
        p.classList.add('show');
        document.body.style.overflow = 'hidden';
      }
    } catch (e) {}
  }

  function closeAllAnime() {
    try {
      var p = getElement('allAnimePopup');
      if (p) {
        p.style.display = 'none';
        p.classList.remove('show');
      }
      document.body.style.overflow = '';
    } catch (e) {}
  }

  // ==================== RANDOM ANIME ====================
  function randomAnime() {
    try {
      var key = animeKeys[Math.floor(Math.random() * animeKeys.length)];
      showAnime(key);
      showToast('Recommended: ' + (animeData[key] && animeData[key].title));
    } catch (e) {
      console.warn('randomAnime', e);
    }
  }

  // ==================== LIKES ====================
  function initLikes() {
    try {
      qsa('.like-btn').forEach(function (btn, idx) {
        var key = 'like-' + idx;
        if (localStorage.getItem(key) === '1') {
          btn.classList.add('liked');
          btn.textContent = '❤️ Liked';
        }
        safeOn(btn, 'click', function (e) {
          e.preventDefault();
          e.stopPropagation();
          var liked = btn.classList.toggle('liked');
          localStorage.setItem(key, liked ? '1' : '0');
          btn.textContent = liked ? '❤️ Liked' : '❤️ Like';
          showToast(liked ? 'Added to favourites' : 'Removed');
          if (liked) addScore(1);
        });
      });
    } catch (e) {
      console.warn('initLikes', e);
    }
  }

  // ==================== QUIZ / BATTLE / CHALLENGE ====================
  var quizMode = 'quiz';
  var quizIndex = 0;
  var quizScore = 0;

  var quizQuestions = [
    {
      q: 'Who is the main protagonist of Demon Slayer?',
      options: { A: 'Zenitsu', B: 'Tanjiro', C: 'Inosuke' },
      correct: 'B'
    },
    {
      q: 'What is the name of the King of Curses in Jujutsu Kaisen?',
      options: { A: 'Mahito', B: 'Sukuna', C: 'Gojo' },
      correct: 'B'
    },
    {
      q: 'Blue Lock is about creating the best...?',
      options: { A: 'Goalkeeper', B: 'Striker', C: 'Coach' },
      correct: 'B'
    },
    {
      q: 'What rank was Sung Jinwoo before the System?',
      options: { A: 'S-Rank', B: 'A-Rank', C: 'E-Rank' },
      correct: 'C'
    },
    {
      q: 'What is Luffy looking for?',
      options: { A: 'Dragon Balls', B: 'One Piece', C: 'Death Note' },
      correct: 'B'
    },
    {
      q: 'Who is Naruto\'s rival?',
      options: { A: 'Sasuke', B: 'Kakashi', C: 'Gaara' },
      correct: 'A'
    },
    {
      q: 'What are the giant creatures in Attack on Titan called?',
      options: { A: 'Hollows', B: 'Titans', C: 'Curses' },
      correct: 'B'
    }
  ];

  var battleQuestions = [
    { q: 'Who uses Water Breathing? (first name)', a: 'giyu' },
    { q: 'Name of Yuji\'s cursed technique host?', a: 'sukuna' },
    { q: 'Blue Lock protagonist surname?', a: 'isagi' },
    { q: 'Jinwoo\'s shadow general with red eyes?', a: 'igris' },
    { q: 'Straw Hat captain first name?', a: 'luffy' }
  ];

  var challengeQuestions = [
    { q: 'Type the word: Hashira', a: 'hashira' },
    { q: 'Type the word: Domain Expansion', a: 'domain expansion' },
    { q: 'Type the word: Egoist', a: 'egoist' },
    { q: 'Type the word: Arise', a: 'arise' },
    { q: 'Type the word: Haki', a: 'haki' }
  ];

  function openQuizPopup(title) {
    var popup = getElement('quizPopup');
    if (!popup) {
      showToast('Quiz popup missing in HTML');
      return false;
    }
    popup.style.display = 'flex';
    popup.classList.add('show');
    document.body.style.overflow = 'hidden';
    var t = getElement('quizTitle');
    if (t) t.textContent = title || '🧠 Anime Quiz';
    var res = getElement('quizResult');
    if (res) res.textContent = '';
    return true;
  }

  function closeQuiz() {
    try {
      var popup = getElement('quizPopup');
      if (popup) {
        popup.style.display = 'none';
        popup.classList.remove('show');
      }
      document.body.style.overflow = '';
    } catch (e) {}
  }

  function setOptionsVisible(show) {
    var opts = getElement('quizOptions');
    if (opts) opts.style.display = show ? 'flex' : 'none';
    var input = getElement('answerInput');
    var submit = getElement('submitAnswer');
    if (input) input.style.display = show ? 'none' : 'block';
    if (submit) submit.style.display = show ? 'none' : 'block';
  }

  function startQuiz() {
    try {
      quizMode = 'quiz';
      quizIndex = 0;
      quizScore = 0;
      if (!openQuizPopup('🧠 Anime Quiz')) return;
      setOptionsVisible(true);
      showQuizQuestion();
    } catch (e) {
      console.warn('startQuiz', e);
      showToast('Quiz error');
    }
  }

  function showQuizQuestion() {
    try {
      if (quizIndex >= quizQuestions.length) {
        var res = getElement('quizResult');
        if (res) res.textContent = 'Finished! Score: ' + quizScore + '/' + quizQuestions.length;
        showToast('Quiz complete! +' + quizScore + ' XP');
        addScore(quizScore);
        setTimeout(closeQuiz, 2000);
        return;
      }
      var q = quizQuestions[quizIndex];
      var qEl = getElement('quizQuestion');
      if (qEl) qEl.textContent = q.q;

      var a = getElement('optionA');
      var b = getElement('optionB');
      var c = getElement('optionC');
      if (a) a.textContent = 'A. ' + q.options.A;
      if (b) b.textContent = 'B. ' + q.options.B;
      if (c) c.textContent = 'C. ' + q.options.C;

      var res = getElement('quizResult');
      if (res) res.textContent = '';
    } catch (e) {
      console.warn('showQuizQuestion', e);
    }
  }

  function checkAnswer(letter) {
    try {
      if (quizMode !== 'quiz') return;
      var q = quizQuestions[quizIndex];
      if (!q) return;
      var res = getElement('quizResult');
      if (letter === q.correct) {
        quizScore++;
        if (res) res.textContent = '✅ Correct!';
        showToast('Correct!');
        addScore(2);
      } else {
        if (res) res.textContent = '❌ Wrong! Answer: ' + q.correct;
        showToast('Wrong');
      }
      quizIndex++;
      setTimeout(showQuizQuestion, 900);
    } catch (e) {
      console.warn('checkAnswer', e);
    }
  }

  function startBattle() {
    try {
      quizMode = 'battle';
      quizIndex = 0;
      quizScore = 0;
      if (!openQuizPopup('⚔️ Character Battle')) return;
      setOptionsVisible(false);
      showBattleQuestion();
    } catch (e) {
      console.warn('startBattle', e);
    }
  }

  function showBattleQuestion() {
    try {
      if (quizIndex >= battleQuestions.length) {
        var res = getElement('quizResult');
        if (res) res.textContent = 'Battle over! Score: ' + quizScore;
        showToast('Battle complete!');
        addScore(quizScore * 2);
        setTimeout(closeQuiz, 2000);
        return;
      }
      var q = battleQuestions[quizIndex];
      var qEl = getElement('quizQuestion');
      if (qEl) qEl.textContent = q.q;
      var input = getElement('answerInput');
      if (input) {
        input.value = '';
        input.focus();
      }
      var res = getElement('quizResult');
      if (res) res.textContent = '';
    } catch (e) {}
  }

  function randomChallenge() {
    try {
      quizMode = 'challenge';
      quizIndex = Math.floor(Math.random() * challengeQuestions.length);
      quizScore = 0;
      if (!openQuizPopup('🎯 Random Challenge')) return;
      setOptionsVisible(false);
      var q = challengeQuestions[quizIndex];
      var qEl = getElement('quizQuestion');
      if (qEl) qEl.textContent = q.q;
      var input = getElement('answerInput');
      if (input) {
        input.value = '';
        input.focus();
      }
      var res = getElement('quizResult');
      if (res) res.textContent = '';
    } catch (e) {
      console.warn('randomChallenge', e);
    }
  }

  function submitTypedAnswer() {
    try {
      var input = getElement('answerInput');
      if (!input) return;
      var answer = (input.value || '').trim().toLowerCase();
      var res = getElement('quizResult');

      if (quizMode === 'battle') {
        var bq = battleQuestions[quizIndex];
        if (!bq) return;
        if (answer && (answer.indexOf(bq.a) !== -1 || bq.a.indexOf(answer) !== -1)) {
          quizScore++;
          if (res) res.textContent = '✅ Correct!';
          showToast('Correct! +XP');
          addScore(3);
        } else {
          if (res) res.textContent = '❌ Wrong! Answer: ' + bq.a;
          showToast('Wrong');
        }
        quizIndex++;
        setTimeout(showBattleQuestion, 900);
      } else if (quizMode === 'challenge') {
        var cq = challengeQuestions[quizIndex];
        if (!cq) return;
        if (answer && (answer === cq.a || answer.indexOf(cq.a) !== -1)) {
          if (res) res.textContent = '✅ Correct!';
          showToast('Challenge cleared!');
          addScore(5);
        } else {
          if (res) res.textContent = '❌ Wrong! Answer: ' + cq.a;
          showToast('Try again');
        }
      } else {
        showToast('Use the option buttons for Quiz');
      }
    } catch (e) {
      console.warn('submitTypedAnswer', e);
    }
  }

  function initAnswerInput() {
    var input = getElement('answerInput');
    if (!input) return;
    safeOn(input, 'keydown', function (e) {
      if (e.key === 'Enter') {
        e.preventDefault();
        submitTypedAnswer();
      }
    });
  }

  // ==================== TOP BUTTON ====================
  function setupTopButton() {
    try {
      var btn = qs('.top-btn') || getElement('topBtn');
      if (!btn) {
        btn = document.createElement('button');
        btn.className = 'top-btn';
        btn.innerHTML = '↑';
        btn.setAttribute('aria-label', 'Back to top');
        btn.style.display = 'none';
        document.body.appendChild(btn);
      }
      safeOn(btn, 'click', function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
      safeOn(window, 'scroll', function () {
        if (window.scrollY > 350) {
          btn.style.display = 'block';
        } else {
          btn.style.display = 'none';
        }
      });
    } catch (e) {}
  }

  // ==================== SOCIAL ====================
  function openInstagram() {
    window.open('https://www.instagram.com/', '_blank', 'noopener');
  }
  function openYoutube() {
    window.open('https://www.youtube.com/', '_blank', 'noopener');
  }
  function openDiscord() {
    window.open('https://discord.com/', '_blank', 'noopener');
  }

  function playClickSound() {}
  function playSuccessSound() {}

  // ==================== EXPOSE ALL FUNCTIONS FOR HTML onclick ====================
  window.getElement = getElement;
  window.showAnime = showAnime;
  window.closePopup = closePopup;
  window.searchAnime = searchAnime;
  window.updateBanner = updateBanner;
  window.startSlider = startSlider;
  window.nextBanner = nextBanner;
  window.previousBanner = previousBanner;
  window.toggleMusic = toggleMusic;
  window.nextSong = nextSong;
  window.previousSong = previousSong;
  window.seekMusic = seekMusic;
  window.initMusic = initMusic;
  window.initSearch = initSearch;
  window.initLikes = initLikes;
  window.initHeroSlider = initHeroSlider;
  window.loadTheme = loadTheme;
  window.toggleTheme = toggleTheme;
  window.setupTopButton = setupTopButton;
  window.showToast = showToast;
  window.showNotification = showNotification;
  window.closeQuiz = closeQuiz;
  window.submitTypedAnswer = submitTypedAnswer;
  window.hideLoadingScreen = hideLoadingScreen;
  window.animateLoadingDice = animateLoadingDice;
  window.updateClock = updateClock;
  window.openInstagram = openInstagram;
  window.openYoutube = openYoutube;
  window.openDiscord = openDiscord;
  window.playClickSound = playClickSound;
  window.playSuccessSound = playSuccessSound;
  window.exploreNow = exploreNow;
  window.randomAnime = randomAnime;
  window.openAllAnime = openAllAnime;
  window.closeAllAnime = closeAllAnime;
  window.closeWelcome = closeWelcome;
  window.startQuiz = startQuiz;
  window.startBattle = startBattle;
  window.randomChallenge = randomChallenge;
  window.checkAnswer = checkAnswer;
  window.watchTrailer = watchTrailer;
  window.autoFixProblems = autoFixProblems;

  // ==================== INIT ====================
  function init() {
    try {
      loadTheme();
      updateScoreUI();
      initLoadingScreen();
      initMusic();
      initHeroSlider();
      initSearch();
      initLikes();
      initAnswerInput();
      setupTopButton();
      updateClock();
      setInterval(updateClock, 1000);

      safeOn(document, 'keydown', function (e) {
        if (e.key === 'Escape') {
          closePopup();
          closeQuiz();
          closeAllAnime();
          closeWelcome();
        }
      });

      ['animePopup', 'allAnimePopup', 'quizPopup', 'welcomePopup'].forEach(function (id) {
        var p = getElement(id);
        if (p) {
          safeOn(p, 'click', function (e) {
            if (e.target === p) {
              if (id === 'quizPopup') closeQuiz();
              else if (id === 'welcomePopup') closeWelcome();
              else if (id === 'allAnimePopup') closeAllAnime();
              else closePopup();
            }
          });
        }
      });

      setTimeout(autoFixProblems, 4500);

      console.log('[SlayerZone] script.js ready');
    } catch (e) {
      console.error('[SlayerZone] init error', e);
      autoFixProblems();
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

/* ======================================
   ⚔️ ANIME EFFECTS — SAFE INIT
====================================== */

function initAnimeEffects() {

    const effects = document.querySelectorAll(".anime-effects .effect");

    if (!effects.length) return;

    effects.forEach((effect, index) => {
        effect.style.animationDelay = `${index * -0.8}s`;
    });

}

document.addEventListener("DOMContentLoaded", initAnimeEffects);
