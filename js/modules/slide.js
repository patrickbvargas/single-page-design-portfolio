export default class Slide {
  constructor(activeItemIndex = 0) {
    this.slide = document.querySelector(".js-slide");
    this.wrapper = document.querySelector(".js-slide-wrapper");
    this.items = document.querySelectorAll(".js-slide-item");
    this.userEvents = ["click", "touchend"];
    this.controls = this.getSlideControls();
    this.activeIndex =
      Number.isInteger(activeItemIndex) &&
      activeItemIndex >= 0 &&
      activeItemIndex <= this.items.length - 1
        ? activeItemIndex
        : 0;
    this.changeSlideItem = this.changeSlideItem.bind(this);
  }

  getSlideControls() {
    return {
      previous: document.querySelector(".js-slide-previous"),
      next: document.querySelector(".js-slide-next"),
    };
  }

  changeSlideItem(event) {
    event.preventDefault();
    const lastIndex = this.items.length - 1;
    if (this.isPreviousAction(event)) {
      this.activeIndex = this.activeIndex > 0 ? --this.activeIndex : lastIndex;
    } else if (this.isNextAction(event)) {
      this.activeIndex = this.activeIndex < lastIndex ? ++this.activeIndex : 0;
    }
    this.updateSlidePosition();
  }

  isPreviousAction(event) {
    const isPreviousBtnClick =
      (event.type === "click" || event.type === "touchend") &&
      this.controls.previous.contains(event.target);
    const isPreviousKeyUp = event.type === "keyup" && event.key === "ArrowLeft";
    return isPreviousBtnClick || isPreviousKeyUp;
  }

  isNextAction(event) {
    const isNextBtnClick =
      (event.type === "click" || event.type === "touchend") &&
      this.controls.next.contains(event.target);
    const isNextKeyUp = event.type === "keyup" && event.key === "ArrowRight";
    return isNextBtnClick || isNextKeyUp;
  }

  getUpdatedPosition() {
    const activeItem = this.items[this.activeIndex];
    const margin = (this.slide.offsetWidth - activeItem.offsetWidth) / 2;
    return -(activeItem.offsetLeft - margin);
  }

  updateSlidePosition() {
    this.wrapper.style.transform = `translate3d(${this.getUpdatedPosition()}px, 0, 0)`;
  }

  handleKeyboardEvent(event) {
    console.log(event.key);
  }

  addEventListeners() {
    this.userEvents.forEach((userEvent) => {
      this.controls.previous.addEventListener(userEvent, this.changeSlideItem);
      this.controls.next.addEventListener(userEvent, this.changeSlideItem);
    });
    document.addEventListener("keyup", this.changeSlideItem);
  }

  init() {
    this.addEventListeners();
    this.updateSlidePosition();
    return this;
  }
}
