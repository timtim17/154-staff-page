/**
 * Austin Jenchi
 * June 20, 2020
 * CSE 154 20su
 *
 * Javascript for my about me page. Handles generating elements based on information about
 * individual anime, and handles events for advancing the slideshow of tips.
 */
"use strict";

(function() {
  const CLASS_HIDDEN = "hidden";
  const CLASS_SLIDE_ON = "animate-on";
  const CLASS_SLIDE_OFF = "animate-off";

  const ANIM_TIME_SLIDE = 1000;

  const KEY_ARROW_UP = "ARROWUP";
  const KEY_ARROW_DOWN = "ARROWDOWN";
  const KEY_ARROW_LEFT = "ARROWLEFT";
  const KEY_ARROW_RIGHT = "ARROWRIGHT";
  const KEY_ENTER = "ENTER";
  const EGG_KEY_COMBO = [KEY_ARROW_UP, KEY_ARROW_UP, KEY_ARROW_DOWN, KEY_ARROW_DOWN,
    KEY_ARROW_LEFT, KEY_ARROW_RIGHT, KEY_ARROW_LEFT, KEY_ARROW_RIGHT, "B", "A", KEY_ENTER];
  const EGG_COLORS = ["red", "#ff991a", "yellow", "green", "blue", "purple"];

  /*
   * list of anime entries manipulated from MyAnimeList.
   * ideally this would be from an API or something
   */
  const ANIME_JSON = [
    {
      "title": "Boku no Hero Academia",
      "img": "https://cdn.myanimelist.net/r/96x136/images/anime/10/78745.webp?s=b33bc12c5dc1c7ecbc64ea30089936b4",
      "url": "https://myanimelist.net/anime/31964/Boku_no_Hero_Academia"
    },
    {
      "title": "Boku no Hero Academia 2nd Season",
      "img": "https://cdn.myanimelist.net/r/96x136/images/anime/12/85221.webp?s=5a81da9dd25c8acb78d8e9a62f4bff03",
      "url": "https://myanimelist.net/anime/33486/Boku_no_Hero_Academia_2nd_Season"
    },
    {
      "title": "Boku no Hero Academia 3rd Season",
      "img": "https://cdn.myanimelist.net/r/96x136/images/anime/1319/92084.webp?s=b30010ffdcc772d3ac92a9ea9db5b8b9",
      "url": "https://myanimelist.net/anime/36456/Boku_no_Hero_Academia_3rd_Season"
    },
    {
      "title": "Boku no Hero Academia 4th Season",
      "img": "https://cdn.myanimelist.net/r/96x136/images/anime/1315/102961.webp?s=2691928071f8d47f567b431b9d0cdd2e",
      "url": "https://myanimelist.net/anime/38408/Boku_no_Hero_Academia_4th_Season"
    },
    {
      "title": "Code Geass: Hangyaku no Lelouch",
      "img": "https://cdn.myanimelist.net/r/96x136/images/anime/5/50331.webp?s=9f5ae826089bc8b3fdc06e732b655614",
      "url": "https://myanimelist.net/anime/1575/Code_Geass__Hangyaku_no_Lelouch"
    },
    {
      "title": "Code Geass: Hangyaku no Lelouch R2",
      "img": "https://cdn.myanimelist.net/r/96x136/images/anime/4/9391.webp?s=520774c6158f5e1cd71531295335aa2d",
      "url": "https://myanimelist.net/anime/2904/Code_Geass__Hangyaku_no_Lelouch_R2"
    },
    {
      "title": "Death Note",
      "img": "https://cdn.myanimelist.net/r/96x136/images/anime/9/9453.webp?s=786dfb74ff7cd8b85a16d9b00093bb4b",
      "url": "https://myanimelist.net/anime/1535/Death_Note"
    },
    {
      "title": "Dr. Stone",
      "img": "https://cdn.myanimelist.net/r/96x136/images/anime/1613/102576.webp?s=17d18915e3303786eec1ec6769fc5aa5",
      "url": "https://myanimelist.net/anime/38691/Dr_Stone"
    },
    {
      "title": "JoJo no Kimyou na Bouken (TV)",
      "img": "https://cdn.myanimelist.net/r/96x136/images/anime/3/40409.webp?s=b1de7c264c08ad59138a7e7acf6b22b9",
      "url": "https://myanimelist.net/anime/14719/JoJo_no_Kimyou_na_Bouken_TV"
    },
    {
      "title": "JoJo no Kimyou na Bouken Part 3: Stardust Crusaders",
      "img": "https://cdn.myanimelist.net/r/96x136/images/anime/11/55267.webp?s=a8783bfe0eeacfb52b6b5b8fbd167635",
      "url": "https://myanimelist.net/anime/20899/JoJo_no_Kimyou_na_Bouken_Part_3__Stardust_Crusaders"
    },
    {
      "title": "JoJo no Kimyou na Bouken Part 3: Stardust Crusaders 2nd Season",
      "img": "https://cdn.myanimelist.net/r/96x136/images/anime/11/75045.webp?s=b9704ad2c8053f35410ec723f2435720",
      "url": "https://myanimelist.net/anime/26055/JoJo_no_Kimyou_na_Bouken_Part_3__Stardust_Crusaders_2nd_Season"
    },
    {
      "title": "JoJo no Kimyou na Bouken Part 4: Diamond wa Kudakenai",
      "img": "https://cdn.myanimelist.net/r/96x136/images/anime/3/79156.webp?s=3e0f5f80dd3eae7165adc2a38e8101f0",
      "url": "https://myanimelist.net/anime/31933/JoJo_no_Kimyou_na_Bouken_Part_4__Diamond_wa_Kudakenai"
    },
    {
      "title": "JoJo no Kimyou na Bouken Part 5: Ougon no Kaze",
      "img": "https://cdn.myanimelist.net/r/96x136/images/anime/1572/95010.webp?s=1bcdd09479f680146c10f6a36030fbe1",
      "url": "https://myanimelist.net/anime/37991/JoJo_no_Kimyou_na_Bouken_Part_5__Ougon_no_Kaze"
    },
    {
      "title": "Kimi no Na wa.",
      "img": "https://cdn.myanimelist.net/r/96x136/images/anime/5/87048.webp?s=1113e6e8f2c4f1b51b5f9ffeda1ab334",
      "url": "https://myanimelist.net/anime/32281/Kimi_no_Na_wa"
    },
    {
      "title": "RoboMasters the Animated Series",
      "img": "https://cdn.myanimelist.net/r/96x136/images/anime/11/86297.webp?s=a72ffaf612e6f77d75831dab618c6a44",
      "url": "https://myanimelist.net/anime/34903/RoboMasters_the_Animated_Series"
    },
    {
      "title": "Tokyo Ghoul",
      "img": "https://cdn.myanimelist.net/r/96x136/images/anime/5/64449.webp?s=eecdebc7522f6af8e3304a84c7bdee1c",
      "url": "https://myanimelist.net/anime/22319/Tokyo_Ghoul"
    },
    {
      "title": "Tokyo Ghoul √A",
      "img": "https://cdn.myanimelist.net/r/96x136/images/anime/13/71777.webp?s=ef99a1ef23af166e78a9b1c3ac4e29b4",
      "url": "https://myanimelist.net/anime/27899/Tokyo_Ghoul_√A"
    },
    {
      "title": "Tokyo Ghoul:re",
      "img": "https://cdn.myanimelist.net/r/96x136/images/anime/1063/95086.webp?s=a86424a1def9f87bd00957cc46d75c7d",
      "url": "https://myanimelist.net/anime/36511/Tokyo_Ghoul_re"
    },
    {
      "title": "Tokyo Ghoul:re 2nd Season",
      "img": "https://cdn.myanimelist.net/r/96x136/images/anime/1271/95623.webp?s=5fda4f57946bc2b6477929a773d74f66",
      "url": "https://myanimelist.net/anime/37799/Tokyo_Ghoul_re_2nd_Season"
    },
    {
      "title": "Zankyou no Terror",
      "img": "https://cdn.myanimelist.net/r/96x136/images/anime/4/64447.webp?s=7e88fa5fde7c82921dbc27595f11222b",
      "url": "https://myanimelist.net/anime/23283/Zankyou_no_Terror"
    }
  ];

  let eggKeysTyped = [];
  let eggFound = false;
  let curColor = 1;

  window.addEventListener("load", init);

  /**
   * Handles page load by initializing button event listeners.
   */
  function init() {
    id("btn-left").addEventListener("click", () => changeSlide(-1));
    id("btn-right").addEventListener("click", () => changeSlide()); // default param
    document.body.addEventListener("keydown", easterEggTyped);
    generateAnimeEntries();
  }

  /**
   * Changes the slide shown by advancing by the given number. Assumes that at least one slide,
   * the current slide, is not hidden using the hidden class.
   *
   * @param {number} [advance] - The number of slides to advance by
   */
  function changeSlide(advance = 1) {
    let slides = qsa("#slideshow ol li");
    let i = 0;
    while (slides[i].classList.contains(CLASS_HIDDEN)) {
      i++;
    }
    animateOff(slides[i]);
    i += advance;
    while (i < 0 || i >= slides.length) {
      if (i < 0) {
        i = slides.length + i - 1;
      } else {
        i -= slides.length;
      }
    }
    animateOn(slides[i]);
  }

  /**
   * Animates the slide on. Assumes that the slide is already hidden.
   *
   * @param {HTMLElement} slide - The slide to animate
   */
  function animateOn(slide) {
    slide.classList.add(CLASS_SLIDE_ON);
    slide.classList.toggle(CLASS_HIDDEN);
    setTimeout(() => {
      slide.classList.remove(CLASS_SLIDE_ON);
    }, ANIM_TIME_SLIDE);
  }

  /**
   * Animates the slide off. Assumes that the slide is already not hidden.
   *
   * @param {HTMLElement} slide - The slide to animate
   */
  function animateOff(slide) {
    slide.classList.add(CLASS_SLIDE_OFF);
    setTimeout(() => {
      slide.classList.toggle(CLASS_HIDDEN);
      slide.classList.remove(CLASS_SLIDE_OFF);
    }, ANIM_TIME_SLIDE);
  }

  /**
   * Handles a key press to check if it matches the trigger for the easter egg. If the combo has
   * been entered, start the easter egg.
   *
   * @param {KeyboardEvent} event - The event from the keydown event of the button being pressed
   */
  function easterEggTyped(event) {
    if (!eggFound) {
      eggKeysTyped.push(event.key.toUpperCase());
      while (eggKeysTyped.length > EGG_KEY_COMBO.length) {
        eggKeysTyped.shift(); // drop elements from the beginning,
        // since keys are added to the end
      }
      if (twoArraysEqual(eggKeysTyped, EGG_KEY_COMBO)) {
        setInterval(doEasterEgg, 1000); // should only happen once
        eggFound = true;
      }
    }
  }

  /**
   * Does the easter egg color-changing shenanigans by advancing the color by 1 (looping around
   * if needed), and changing the css variable for the color.
   */
  function doEasterEgg() {
    if (++curColor >= EGG_COLORS.length) {
      curColor = 0;
    }
    document.documentElement.style.setProperty('--theme-color', EGG_COLORS[curColor]);
  }

  /**
   * Checks if the two arrays have the same items. Neither array is modified.
   * If they are not the same length they are assumed to be different. The items
   * are considered equal if they have the same value and type (check by `===`).
   *
   * @param {any[]} arrayOne - The first array
   * @param {any[]} arrayTwo - The second array
   * @return {boolean} true if they have the same items, false otherwise
   */
  function twoArraysEqual(arrayOne, arrayTwo) {
    if (arrayOne.length === arrayTwo.length) {
      for (let i = 0; i < arrayOne.length; i++) {
        if (arrayOne[i] !== arrayTwo[i]) {
          return false;
        }
      }
      return true;
    } else {
      return false;
    }
  }

  /**
   * Generates elements for favorite anime based on the constant array.
   */
  function generateAnimeEntries() {
    let parent = id("favorites");
    let first = true;
    ANIME_JSON.forEach(anime => {
      // "stupid" shuffle: just wait a few random milliseconds, producing a random order
      setTimeout(() => {
        if (first) {
          first = false;
          parent.innerHTML = "";
        }
        let li = gen("li");
        li.style.backgroundImage = "url('" + anime.img + "')";
        let a = gen("a");
        a.href = anime.url;
        a.textContent = anime.title;
        li.appendChild(a);
        parent.appendChild(li);
      }, Math.random() * 1000);
    });
    setTimeout(() => {
      // constant styles shouldn't be set like this; a class is probably more appropriate here (but lazy)
      let li = gen("li");
      // gif from the internet, tenor gif search
      li.style.backgroundImage = "url('https://cdn.discordapp.com/attachments/197492450238005248/694035787053924372/ezgif.com-gif-maker_4.gif')";
      li.style.backgroundSize = "cover";
      li.style.backgroundPosition = "center center";
      li.style.minWidth = "140px";
      // layout issues
      li.style.color = "transparent";
      li.style.textShadow = "none";
      li.textContent = ":)";
      parent.appendChild(li);
    }, 1001);
  }

  /* CSE 154 HELPER FUNCTIONS */

  /**
   * Returns the DOM element with the given id.
   *
   * @param {string} id - The id to search for
   * @returns {HTMLElement} The element with that id
   */
  function id(id) {
    return document.getElementById(id);
  }

  /**
   * Returns all the elements in the DOM that match the given selector.
   *
   * @param {string} selector - The selector to search with
   * @returns {HTMLElement[]} All elements in the DOM that match that selector
   */
  function qsa(selector) {
    return document.querySelectorAll(selector);
  }

  /**
   * Generates the element of the given type.
   *
   * @param {string} type - The type of HTML element
   * @returns {HTMLElement} The generated element
   */
  function gen(type) {
    return document.createElement(type);
  }

  /* END HELPERS */
})();
