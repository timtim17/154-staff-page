/**
 * Austin Jenchi
 * CSE 154 19au
 * September 22, 2019
 *
 * Basic JS to handle my about me page. Handles page events for the slideshow.
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
  const eggKeysTyped = [];
  let eggFound = false;
  let curColor = 1;

  /* CSE 154 HELPER FUNCTIONS */

  /**
   * Returns the DOM element with the given id.
   *
   * @param {string} id - The id to search for
   * @returns {HTMLElement} The element with that id
   */
  const id = id => document.getElementById(id);

  /**
   * Returns all the elements in the DOM that match the given selector.
   *
   * @param {string} selector - The selector to search with
   * @returns {HTMLElement[]} All elements in the DOM that match that selector
   */
  const qsa = selector => document.querySelectorAll(selector);

  /* END HELPERS */

  window.addEventListener("load", init);

  /**
   * Handles page load by initializing button event listeners.
   */
  function init() {
    id("btn-left").addEventListener("click", () => changeSlide(-1));
    id("btn-right").addEventListener("click", () => changeSlide()); // default param
    document.body.addEventListener("keydown", easterEggTyped);
  }

  /**
   * Changes the slide shown by advancing by the given number. Assumes that at least one slide,
   * the current slide, is not hidden using the hidden class.
   *
   * @param {int} [advance] - The number of slides to advance by
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
})();
