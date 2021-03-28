/**
 * Austin Jenchi
 * 03/27/2021
 * CSE 154 TA
 *
 * Javascript for my about me page. Handles events for advancing the slideshow of tips.
 */
"use strict";

/*global
  AOS
*/

(function() {
  const CLASS_HIDDEN = "hidden";
  const CLASS_SLIDE_ON = "animate-on";
  const CLASS_SLIDE_OFF = "animate-off";

  const ANIM_TIME_SLIDE = 1000;

  window.addEventListener("load", init);

  /**
   * Handles page load by initializing button event listeners.
   */
  function init() {
    id("btn-left").addEventListener("click", () => changeSlide(-1));
    id("btn-right").addEventListener("click", () => changeSlide()); // default param
    window.addEventListener('beforeunload', () => {
      document.getElementById('pdrops').contentWindow.dispatchEvent(new CustomEvent("pdrops"));
    });
    AOS.init({
      once: true
    });
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
})();
