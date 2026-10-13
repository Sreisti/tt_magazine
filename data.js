/* ============================================================
   SCRAPBOOK DATA — edit everything in this file
   ------------------------------------------------------------
   This is the ONLY file you need to touch to customize the
   scrapbook for a friend. Swap photos, text, colors here.

   To make a SECOND version for a different friend:
   1. Duplicate the whole "friendship-scrapbook" folder
   2. Rename it (e.g. "scrapbook-jamie")
   3. Edit THIS file inside the new folder
   Everything else (index.html, style.css, script.js) can stay
   exactly the same.
   ============================================================ */

const SCRAPBOOK = {

  /* ---------- THEME ----------
     Change these hex codes to re-color the whole magazine
     for each friend (e.g. pink+gold for one, teal+orange
     for another). */
  theme: {
    primary: "#161616",     // near-black — main accent (titles, ribbons)
    secondary: "#9a9a9a",   // silver-grey — second accent (highlights, tape)
    paper: "#f5f3ee",       // ivory page background, classic magazine paper
    ink: "#181818",         // main text color, soft black
    fontDisplay: "'Cinzel', serif",   // elegant Roman-capitals, red-carpet feel
    fontScript: "'Tangerine', cursive", // old-Hollywood starlet autograph style
  },

  magazineName: "THY THY MAGAZINE",  // big masthead title on the cover
  friendName: "Thy Thy Nguyen",
  birthday: "October 15",
  issueNumber: "01",
  coverPhoto: "images/IMG_4944.JPG",

  /* ---------- COVER ---------- */
  cover: {
    kicker: "TURNING 20",
    title: "A DEATH TO YOUR TEENAGE YEARS",
    subtitle: "Starring [FRIEND NAME]",
    coverLines: [
      "Lights, Camera, Birthday! →",
      "Exclusive: Our Favorite Memories",
      "This Day in History",
    ],
  },

  /* ---------- EDITOR'S NOTE ---------- */
  editorsNote: {
    heading: "From the Editor",
    paragraphs: [
      "Dear Thy Thy,",
      "As an engineer at Purdue on your birthday, I had to make something digital for you. I hope you have a wonderful birthday at FSU!",
    ],
    signOff: "With love,",
    signature: "Sreisti Chowdhury",
  },

  /* ---------- PHOTO ALBUM ----------
     Add/remove objects freely. "src" is the image path,
     "caption" shows under the photo and in the popup. */
  photos: [
    { src: "images/IMG_4944.JPG", caption: "Bad days are part of a good life too" },
    { src: "images/Screenshot 2026-08-29 215418.png", caption: "You can not use someone else's map to find yourself" },
    { src: "images/IMG_4948.JPG", caption: "Everything is a win when a goal is to experience" },
    { src: "images/Screenshot 2026-08-29 215316.png", caption: "In the end you will win" },
    { src: "images/Screenshot 2026-08-29 215352.png", caption: "Train like you never won and compete like you never lost" },
    { src: "images/Screenshot 2026-08-29 220019.png", caption: "You can't control the winds, but you can adjust your sails" },
  ],

  /* ---------- ON THIS DAY ----------
     Fun / historical facts about their birth date. Look some
     up at onthisday.com or Wikipedia's "Month Day" page. */
  onThisDay: {
    heading: "On This Day",
    subheading: "October 15 Through the Years",
    facts: [
      "1815 — Napoleon Bonaparte arrives on the island of Saint Helena to begin his exile",
      "1844 — Philosopher Friedrich Nietzsche is born",
      "1920 — Mario Puzo, author of The Godfather, is born",
      "1989 — Wayne Gretzky surpasses Gordie Howe as the NHL's all-time top scorer",
      "1993 — Nelson Mandela and F. W. de Klerk are awarded the Nobel Peace Prize",
      "Birthstone: October's birthstone is the opal. Ancient Romans believed it was the luckiest gem of all because it seemed to hold the colors of every other gemstone inside it. Tourmaline is October's other birthstone, and it can grow in almost every color of the rainbow, sometimes several in a single crystal.",
    ],
  },

  /* ---------- AWARDS ---------- */
  awards: {
    heading: "Academy Superlatives",
    subheading: "As voted by their #1 fan (me)",
    items: [
      { title: "Best Supporting Friend", detail: "", icon: "⭐" },
      { title: "Most Sarcastic", detail: "", icon: "🎭" },
      { title: "Most Likely to Survive a Zombie Apocalypse", detail: "", icon: "🧟" },
      { title: "Most Likely to Have a Netflix Documentary", detail: "", icon: "🎬" },
    ],
  },

  /* ---------- TOP TEN ---------- */
  topTen: {
    heading: "Top Ten Things I Love About You",
    subheading: "In no particular order",
    items: [
      "Your striking beauty",
      "Being a rock for hard times",
      "A history nerd",
      "Your openness to see all perspectives",
      "Open to discussing tea",
      "Logical solutions",
      "Your sarcastic and dark humor",
      "Being true to yourself",
      "Good baker",
      "Creative mind",
    ],
  },

  /* ---------- RECIPE ---------- */
  recipe: {
    heading: "Recipe Recommendation",
    subheading: "Desi Gumbo — because it reminds me of you",
    image: "images/recipe-photo.webp",
    servings: "Serves 8 people",
    time: "40 min cooking time",
    ingredients: [
      "1 sausage of your choosing",
      "1 lb shrimp",
      "1/2 onion",
      "2 bell peppers",
      "1/2 bulb of garlic",
      "1/4 cup of flour (slightly less)",
      "1/2 a carton of chicken stock",
      "1/2 bag of okra",
      "1 bag of corn",
      "Ghee",
      "Olive oil",
      "Bay leaf",
      "Red chili",
      "Hing (optional)",
      "Spices: Cajun, chili powder, turmeric powder, cumin powder (half a spoon of each, except the chili powder, which is just a pinch)",
    ],
    steps: [
      "Mix the flour with a little bit of water.",
      "Fry the sausage in a pan or an air fryer and cut it up.",
      "Dice and cube the vegetables.",
      "Season the shrimp with Cajun seasoning and fry it in the pot with olive oil.",
      "In a pot, add hing (optional), bay leaf, red chili, and the vegetables.",
      "Take the vegetables out into a bowl. In the pot, mix the flour and ghee. Make sure it is well combined and bubbling.",
      "Add the vegetables and sausage to the pot.",
      "Add the spices: Cajun, chili powder, turmeric powder, and cumin powder (half a spoon of each, except the chili powder, which is just a pinch). Then season to taste.",
      "Add the chicken stock and wait until it bubbles, then add the shrimp.",
    ],
  },

  /* ---------- LETTER ---------- */
  letter: {
    heading: "A Letter From Me",
    paragraphs: [
      "Dear Thy Thy,",
      "Happy 20th Birthday! You're old 😃. Anyway, I hope you liked this magazine I made for you. Even though we don't see each other very often, you're still very special to me!",
      "Best wishes from Purdue,",
    ],
    signature: "Sreisti",
  },

};
