/* =========================================================
   DTL MINDSET
   Main Website JavaScript
   ========================================================= */


/* =========================================================
   TYPING ANIMATION
   ========================================================= */

const typeWords = [
  "Faith",
  "Focus",
  "Discipline",
  "Purpose"
];

let wordIndex = 0;
let letterIndex = 0;


function typeWord() {

  const target =
    document.getElementById("typing-text");

  if (!target) return;

  const currentWord =
    typeWords[wordIndex];


  if (letterIndex < currentWord.length) {

    target.textContent +=
      currentWord.charAt(letterIndex);

    letterIndex++;

    setTimeout(typeWord, 100);

  } else {

    setTimeout(deleteWord, 1500);

  }

}


function deleteWord() {

  const target =
    document.getElementById("typing-text");

  if (!target) return;

  const currentWord =
    typeWords[wordIndex];


  if (letterIndex > 0) {

    target.textContent =
      currentWord.substring(
        0,
        letterIndex - 1
      );

    letterIndex--;

    setTimeout(deleteWord, 60);

  } else {

    wordIndex++;

    if (wordIndex >= typeWords.length) {
      wordIndex = 0;
    }

    setTimeout(typeWord, 300);

  }

}


/* =========================================================
   DAILY CONTENT
   ========================================================= */

const scriptures = [

  {
    text:
      "I can do all things through Christ who strengthens me.",
    ref:
      "Philippians 4:13"
  },

  {
    text:
      "Be strong and courageous. Do not be afraid.",
    ref:
      "Joshua 1:9"
  },

  {
    text:
      "Trust in the Lord with all your heart.",
    ref:
      "Proverbs 3:5"
  }

];


const prayers = [

  "God, steady my mind and strengthen my spirit. Help me give my best attention to what You have placed in front of me today.",

  "Lord, guide my steps. Grant me clarity to see distractions before they consume my time and purpose."

];


const actionFocuses = [

  {
    title:
      "FAITH MOVES\nWHEN YOU DO.",

    desc:
      "Choose the one assignment that matters most. Give it twenty-five undistracted minutes before checking anything else."
  },

  {
    title:
      "STARVE YOUR\nDISTRACTIONS.",

    desc:
      "Eliminate your primary phone notification for the next four hours. Win back your bandwidth."
  }

];


const todayWords = [

  {
    word:
      "STEADFAST",

    def:
      "Firm in purpose, anchored in faith, and unwilling to be moved by distraction."
  },

  {
    word:
      "DISCIPLINE",

    def:
      "The intentional action required when emotion fails. Moving because you must, not because you feel."
  }

];


/* =========================================================
   DATE CALCULATIONS
   ========================================================= */

const today = new Date();

const startOfYear = new Date(
  today.getFullYear(),
  0,
  0
);

const dayOfYear = Math.floor(
  (today - startOfYear) /
  (1000 * 60 * 60 * 24)
);


/* =========================================================
   TODAY'S VERSE
   ========================================================= */

const scriptureElem =
  document.getElementById(
    "fuelVerseText"
  );

const scriptureRefElem =
  document.getElementById(
    "fuelVerseRef"
  );


if (
  scriptureElem &&
  scriptureRefElem
) {

  const scripture =
    scriptures[
      dayOfYear % scriptures.length
    ];

  scriptureElem.textContent =
    scripture.text;

  scriptureRefElem.textContent =
    scripture.ref;

}


/* =========================================================
   TODAY'S PRAYER
   ========================================================= */

const prayerElem =
  document.getElementById(
    "fuelPrayerText"
  );


if (prayerElem) {

  prayerElem.textContent =
    prayers[
      dayOfYear % prayers.length
    ];

}


/* =========================================================
   FOCUS ACTION
   ========================================================= */

const actionTitleElem =
  document.getElementById(
    "fuelActionTitle"
  );

const actionDescElem =
  document.getElementById(
    "fuelActionDesc"
  );


if (
  actionTitleElem &&
  actionDescElem
) {

  const action =
    actionFocuses[
      dayOfYear % actionFocuses.length
    ];

  actionTitleElem.textContent =
    action.title;

  actionDescElem.textContent =
    action.desc;

}


/* =========================================================
   TODAY'S WORD
   ========================================================= */

const wordTitleElem =
  document.getElementById(
    "fuelWordTitle"
  );

const wordDescElem =
  document.getElementById(
    "fuelWordDesc"
  );


if (
  wordTitleElem &&
  wordDescElem
) {

  const word =
    todayWords[
      dayOfYear % todayWords.length
    ];

  wordTitleElem.textContent =
    word.word;

  wordDescElem.textContent =
    word.def;

}


/* =========================================================
   DASHBOARD DATE
   ========================================================= */

function formatDashboardDate(dateObj) {

  const months = [
    "JANUARY",
    "FEBRUARY",
    "MARCH",
    "APRIL",
    "MAY",
    "JUNE",
    "JULY",
    "AUGUST",
    "SEPTEMBER",
    "OCTOBER",
    "NOVEMBER",
    "DECEMBER"
  ];


  return (
    `${months[dateObj.getMonth()]} ` +
    `${dateObj.getDate()}, ` +
    `${dateObj.getFullYear()}`
  );

}


const dateElement =
  document.getElementById(
    "todays-date"
  );


if (dateElement) {

  dateElement.textContent =
    formatDashboardDate(today);

}


/* =========================================================
   STREAK SYSTEM
   ========================================================= */

let streak =
  Number(
    localStorage.getItem(
      "dtlStreak"
    )
  ) || 0;


const streakCountElem =
  document.getElementById(
    "streakCount"
  );

const checkInBtn =
  document.getElementById(
    "checkInBtn"
  );


/* Creates date keys like:
   2026-09-24
*/

function getDateKey(date) {

  const year =
    date.getFullYear();

  const month =
    String(
      date.getMonth() + 1
    ).padStart(2, "0");

  const day =
    String(
      date.getDate()
    ).padStart(2, "0");


  return `${year}-${month}-${day}`;

}


/* Get yesterday's date key */

function getYesterdayKey() {

  const yesterday =
    new Date();

  yesterday.setDate(
    yesterday.getDate() - 1
  );

  return getDateKey(yesterday);

}


const todayKey =
  getDateKey(new Date());

const lastCheckIn =
  localStorage.getItem(
    "dtlLastCheckIn"
  );


/* =========================================================
   RESET STREAK AFTER MISSED FULL DAY
   ========================================================= */

if (
  lastCheckIn &&
  lastCheckIn !== todayKey &&
  lastCheckIn !== getYesterdayKey()
) {

  streak = 0;

  localStorage.setItem(
    "dtlStreak",
    streak
  );

}


/* Display stored streak */

if (streakCountElem) {

  streakCountElem.textContent =
    streak;

}


/* =========================================================
   USER ALREADY CHECKED IN TODAY
   ========================================================= */

if (
  checkInBtn &&
  lastCheckIn === todayKey
) {

  checkInBtn.innerHTML =
    '<span class="check-icon">&#10003;</span> MOVE COMPLETED TODAY';

  checkInBtn.classList.add(
    "btn-complete"
  );

}


/* =========================================================
   CHECK-IN BUTTON
   ========================================================= */

if (checkInBtn) {

  checkInBtn.addEventListener(
    "click",
    function () {

      const storedLastCheckIn =
        localStorage.getItem(
          "dtlLastCheckIn"
        );


      /* Already checked in today */

      if (
        storedLastCheckIn === todayKey
      ) {

        this.innerHTML =
          '<span class="check-icon">&#10003;</span> ALREADY MOVED TODAY';

        this.classList.add(
          "btn-complete"
        );

        return;

      }


      /* Checked in yesterday:
         continue existing streak
      */

      if (
        storedLastCheckIn ===
        getYesterdayKey()
      ) {

        streak += 1;

      } else {

        /*
          No check-in yesterday:
          begin new streak
        */

        streak = 1;

      }


      /* Save new streak */

      localStorage.setItem(
        "dtlStreak",
        streak
      );


      /* Save today's check-in */

      localStorage.setItem(
        "dtlLastCheckIn",
        todayKey
      );


      /* Update visible streak */

      if (streakCountElem) {

        streakCountElem.textContent =
          streak;

      }


      /* Update button */

      this.innerHTML =
        '<span class="check-icon">&#10003;</span> MOVE CHECKED IN!';

      this.classList.add(
        "btn-complete"
      );

    }
  );

}


/* =========================================================
   START TYPING ANIMATION
   ========================================================= */

const typingTarget =
  document.getElementById(
    "typing-text"
  );


if (typingTarget) {

  typeWord();

}


/* =========================================================
   FOOTER YEAR
   ========================================================= */

const yearElement =
  document.getElementById(
    "year"
  );


if (yearElement) {

  yearElement.textContent =
    new Date().getFullYear();

}
