class Slider {
  constructor(stories) {
    this.stories = stories;
    this.previousSlider = 0;
    this.activeSlider = 1;
    this.nextSlider = 2;
  }

  static #removeClasslist(element) {
    Array.from(element.classList).forEach((elementClass) => {
      element.classList.remove(elementClass);
    })
  }

  static #createSliderItem(storie) {
    const sliderItem = document.createElement('div');
    const sliderMessage = document.createElement('p');
    const sliderStorieAuthor = document.createElement('div');
  
    sliderItem.classList.add('customer-stories__item');
    sliderMessage.classList.add('customer-stories__message');
    sliderStorieAuthor.classList.add('customer-stories__customer-name');
    
    sliderMessage.textContent = storie.message;
    sliderStorieAuthor.textContent = storie.author;
  
    sliderItem.appendChild(sliderMessage);
    sliderItem.appendChild(sliderStorieAuthor);
  
    return sliderItem;
  }

  #createSliderControl(id) {
    const sliderControl = document.createElement('div');
    sliderControl.classList.add('customer-stories__control');
    
    sliderControl.addEventListener('click', () => {
      this.#resetInterval();
      this.moveSliderTo(id);
      this.#cleanSliderElements();
      this.#updateElementClasses();
      this.#updateControlStyles();
      this.#startInterval();
    })
    return sliderControl;
  }

  #startInterval() {
    this.interval = setInterval(() => {
      this.#cleanSliderElements();
      this.moveSlider();
      this.#updateElementClasses();
      this.#updateControlStyles();
    }, 5000)
  }

  #resetInterval() {
    clearInterval(this.interval);
  }

  #updateControlStyles() {
    this.sliderControls.forEach((control, index) => {
      if (index === this.activeSlider) {
        control.classList.add('customer-stories__control--active');
      } else {
        control.classList.remove('customer-stories__control--active');
      }
    })
  }


  #cleanSliderElements() {
    Slider.#removeClasslist(this.sliderItems[this.activeSlider]); 
    Slider.#removeClasslist(this.sliderItems[this.previousSlider]); 
    Slider.#removeClasslist(this.sliderItems[this.nextSlider]); 
  }

  #updateElementClasses() {
    this.sliderItems[this.activeSlider].classList.add('customer-stories__item');
    this.sliderItems[this.activeSlider].classList.add('customer-stories__item--active');
    this.sliderItems[this.previousSlider].classList.add('customer-stories__item');
    this.sliderItems[this.previousSlider].classList.add('customer-stories__item--left');
    this.sliderItems[this.nextSlider].classList.add('customer-stories__item');
    this.sliderItems[this.nextSlider].classList.add('customer-stories__item--right');
  }
  
  initSlider() {
    this.sliderElement = document.getElementById('customerStoriesSlider');
    this.sliderControl = document.getElementById('sliderControl');
    this.sliderControls = this.stories.map((storie, index) => {
      const sliderControl = this.#createSliderControl(index);
      this.sliderControl.appendChild(sliderControl);
      return sliderControl;
    })
    this.sliderItems = this.stories.map((storie) => {
      const sliderItem = Slider.#createSliderItem(storie);
      this.sliderElement.appendChild(sliderItem);
      return sliderItem;
    })
    this.#cleanSliderElements();
    this.#updateElementClasses();
    this.#updateControlStyles();
    this.#startInterval();
  }

  moveSlider() {
    this.activeSlider++;
    this.previousSlider++;
    this.nextSlider++;
    if (this.activeSlider >= this.sliderItems.length) this.activeSlider = 0;
    if (this.previousSlider >= this.sliderItems.length) this.previousSlider = 0;
    if (this.nextSlider >= this.sliderItems.length) this.nextSlider = 0;
  }

  moveSliderTo(num) {
    this.activeSlider = num;
    this.previousSlider = num - 1;
    this.nextSlider = num + 1;
    if (this.activeSlider >= this.sliderItems.length) this.activeSlider = 0;
    if (this.previousSlider < 0) this.previousSlider = 2;
    if (this.nextSlider >= this.sliderItems.length) this.nextSlider = 0;
  }
}

export default Slider;
