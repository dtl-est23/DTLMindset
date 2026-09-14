/* Typing Animation (Reused from previous, logic unchanged) */
const typeWords = ["Faith", "Focus", "Discipline", "Purpose"];
let wordIndex = 0;
let letterIndex = 0;

function typeWord() {
  const target = document.getElementById("typing-text");
  if (!target) return;

  if (letterIndex < typeWords[wordIndex].length) {
    target.textContent += typeWords[wordIndex].charAt(letterIndex);
    letterIndex++;
    setTimeout(typeWord, 100);
  } else {
    setTimeout(deleteWord, 1500);
  }
}

function deleteWord() {
  const target = document.getElementById("typing-text");
  if (!target) return;

  if (letterIndex > 0) {
    target.textContent = typeWords[wordIndex].substring(0, letterIndex - 1);
    letterIndex--;
    setTimeout(deleteWord, 60);
  } else {
    wordIndex++;
    if (wordIndex >= typeWords.length) wordIndex = 0;
    setTimeout(typeWord, 300);
  }
}

/* Global Content Data */
const scriptures = [
  { text: "I can do all things through Christ who strengthens me.", ref: "Philippians 4:13" },
  { text: "Be strong and courageous. Do not be afraid.", ref: "Joshua 1:9" },
  { text: "Trust in the Lord with all your heart.", ref: "Proverbs 3:5" }
];

const prayers = [
  "God, steady my mind and strengthen my spirit. Help me give my best attention to what You have placed in front of me today.",
  "Lord, guide my steps. Grant me clarity to see distractions before they consume my time and purpose."
];

const actionFocuses = [
  { title: "FAITH MOVES\nWHEN YOU DO.", desc: "Choose the one assignment that matters most. Give it twenty-five undistracted minutes before checking anything else." },
  { title: "STARVE YOUR\nDISTRACTIONS.", desc: "Eliminate your primary phone notification for the next 4 hours. Win back your bandwidth." }
];

const todayWords = [
  { word: "STEADFAST", def: "Firm in purpose, anchored in faith, and unwilling to be moved by distraction." },
  { word: "DISCIPLINE", def: "The intentional action required when emotion fails. Moving because you must, not because you feel." }
];

/* Set Today's Content Logic (Date-based rotation) */
const d = new Date();
const dayOfYear = Math.floor((d - new Date(d.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24));

// Panel 1: Scripture
const scriptureElem = document.getElementById("fuelVerseText");
if (scriptureElem) {
  const scripture = scriptures[dayOfYear % scriptures.length];
  scriptureElem.textContent = scripture.text;
  document.getElementById("fuelVerseRef").textContent = scripture.ref;
}

// Panel 2: Prayer
if (document.getElementById("fuelPrayerText")) {
  document.getElementById("fuelPrayerText").textContent = prayers[dayOfYear % prayers.length];
}

// Panel 3: Action Focus
const actionElem = document.getElementById("fuelActionTitle");
if (actionElem) {
  const action = actionFocuses[dayOfYear % actionFocuses.length];
  actionElem.textContent = action.title;
  document.getElementById("fuelActionDesc").textContent = action.desc;
}

// Grid Footer: Today's Word
const wordElem = document.getElementById("fuelWordTitle");
if (wordElem) {
  const wordObj = todayWords[dayOfYear % todayWords.length];
  wordElem.textContent = wordObj.word;
  document.getElementById("fuelWordDesc").textContent = wordObj.def;
}

/* Dashboard Date Functionality */
function formatDashboardDate(dateObj) {
  const months = ["JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE", "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"];
  return `${months[dateObj.getMonth()]} ${dateObj.getDate()}, ${dateObj.getFullYear()}`;
}
if (document.getElementById("todays-date")) {
  document.getElementById("todays-date").textContent = formatDashboardDate(d);
}

/* Focus Streak Functionality (Simplified Check-In) */
let streak = localStorage.getItem("dtlStreak") || 0;
const streakCountElem = document.getElementById("streakCount");
const checkInBtn = document.getElementById("checkInBtn");

if (streakCountElem) {
  streakCountElem.textContent = streak;
}

if (checkInBtn) {
  checkInBtn.addEventListener("click", function () {
    const lastCheckIn = localStorage.getItem("dtlLastCheckIn");
    const today = formatDashboardDate(new Date());

    if (lastCheckIn === today) {
      this.textContent = "ALREADY MOVED TODAY!";
      this.classList.add("btn-disabled");
      return;
    }

    streak++;
    localStorage.setItem("dtlStreak", streak);
    localStorage.setItem("dtlLastCheckIn", today);
    if (streakCountElem) streakCountElem.textContent = streak;

    this.textContent = "MOVE CHECKED IN!";
    this.classList.add("btn-complete");
  });
}

// Start typing animation on load
if (document.getElementById("typing-text")) {
  typeWord();
}

// Global Footer Year
if (document.getElementById("year")) {
  document.getElementById("year").textContent = new Date().getFullYear();
}
