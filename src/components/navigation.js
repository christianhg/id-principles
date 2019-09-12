import React, { Component } from 'react';
import { navigate } from 'gatsby';
import { Swipeable } from 'react-swipeable';
import { Transition } from './transition';

const KEY_CODE_ARROW_LEFT = 37;
const KEY_CODE_ARROW_RIGHT = 39;
const KEY_CODE_ENTER = 13;
const KEY_CODE_SPACE = 32;
const KEY_NEXT = [KEY_CODE_ARROW_RIGHT, KEY_CODE_ENTER, KEY_CODE_SPACE];
const KEY_PREV = [KEY_CODE_ARROW_LEFT];

const isKeyNext = keyCode => KEY_NEXT.includes(keyCode);
const isKeyPrev = keyCode => KEY_PREV.includes(keyCode);
const onFirstSlide = slideIndex => slideIndex === 0;
const onLastSlide = ({ slideIndex, slidesLength }) =>
  slideIndex === slidesLength - 1;

const createNav = ({ slideIndex, slidesLength }) => ({ keyCode }) => {
  if (isKeyPrev(keyCode) && onFirstSlide(slideIndex)) {
    return false;
  } else if (isKeyNext(keyCode) && onLastSlide({ slideIndex, slidesLength })) {
    return false;
  } else if (isKeyNext(keyCode)) {
    navigate(`/${slideIndex + 1}`);
  } else if (isKeyPrev(keyCode)) {
    navigate(`/${slideIndex - 1}`);
  }
};

export class Navigation extends Component {
  constructor(props) {
    super(props);

    this.nav = createNav({
      slideIndex: props.slideIndex,
      slidesLength: props.slidesLength,
    }).bind(this);

    this.onKeyDown = this.onKeyDown.bind(this);
  }

  swipeLeft = () => {
    this.nav({
      keyCode: KEY_CODE_ARROW_LEFT,
    });
  };

  swipeRight = () => {
    this.nav({
      keyCode: KEY_CODE_ARROW_RIGHT,
    });
  };

  onKeyDown({ keyCode }) {
    this.nav({
      keyCode,
    });
  }

  componentDidMount() {
    document.addEventListener('keydown', this.onKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.onKeyDown);
  }

  render() {
    const { location, children } = this.props;

    return (
      <Swipeable onSwipedLeft={this.swipeLeft} onSwipedRight={this.swipeRight}>
        <Transition location={location}>{children}</Transition>
      </Swipeable>
    );
  }
}
