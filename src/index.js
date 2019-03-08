import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import {
    Animated,
    Easing,
    Dimensions,
} from 'react-native';

class ModalContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            slideTranslation: new Animated.Value(0)
        }
    }

    // Slide Animation Implementation
    animateSlideIn = (callback) => {
        if (this.state.animationSlide) {
            this.state.animationSlide.stop();
        }

        const animationSlide = Animated.timing(this.state.slideTranslation, {
            toValue: 1,
            easing: Easing.out(Easing.poly(4)),
            duration: 300,
        });

        this.setState(
            {
                animationSlide,
            },
            () => {
                requestAnimationFrame(() => {
                    this.setState({ styleFade: { display: 'flex' } }, () =>
                        this.state.animationSlide.start(callback)
                    );
                });
            }
        );
    }

    animateSlideOut = (callback) => {
        if (this.state.animationSlide) {
            this.state.animationSlide.stop();
        }

        const animationSlide = Animated.timing(this.state.slideTranslation, {
            toValue: 0,
            easing: Easing.in(Easing.poly(4)),
            duration: 300,
        });

        this.setState(
            {
                animationSlide,
            },
            () => {
                requestAnimationFrame(() => {
                    this.state.animationSlide.start(() => {
                        this.setState(
                            {
                                styleFade: { display: 'none' },
                            },
                            callback
                        );
                    });
                });
            }
        );
    }

    handleShow() {
        const { onShow } = this.props;
        this.animateSlideIn(onShow);
    }

    handleClose() {
        const { onDismiss } = this.props;


        this.animateSlideOut(onDismiss);

    }

    componentDidMount() {
        if (this.props.visible) this.handleShow();
    }

    getAnimationStyle() {
        const { visible } = this.props;
        const { styleFade } = this.state;

        return [
            {
                transform: [
                    {
                        translateY: this.state.slideTranslation.interpolate({
                            inputRange: [0, 1],
                            outputRange: [Dimensions.get('window').height, 0],
                            extrapolate: 'clamp',
                        }),
                    },
                ],
            },
            styleFade,
        ];

    }

    componentWillReceiveProps({ visible }) {
        if (visible && !this.props.visible) this.handleShow();
        if (!visible && this.props.visible) this.handleClose();
    }

    render() {
        const animationStyle = this.getAnimationStyle();

        return (
          ReactDOM.createPortal(
            <Animated.View style={[{
              backgroundColor : "rgba(0,0,0,0.65)",
              position: 'fixed',
              top: 0,
              right: 0,
              bottom: 0,
              left: 0,
              zIndex: 9999
            }, animationStyle]}>
                {this.props.children}
            </Animated.View>,
            document.body
          )
        );
    }
}

export default ModalContainer;