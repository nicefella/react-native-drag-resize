import React, {Component} from 'react';
import {
  PanResponder,
  View,
} from 'react-native';
import PropTypes from 'prop-types';

export const CONNECTOR_TOP_LEFT = 'tl';
export const CONNECTOR_TOP_MIDDLE = 'tm';
export const CONNECTOR_TOP_RIGHT = 'tr';
export const CONNECTOR_MIDDLE_RIGHT = 'mr';
export const CONNECTOR_BOTTOM_RIGHT = 'br';
export const CONNECTOR_BOTTOM_MIDDLE = 'bm';
export const CONNECTOR_BOTTOM_LEFT = 'bl';
export const CONNECTOR_MIDDLE_LEFT = 'ml';
export const CONNECTOR_CENTER = 'c';
export const CONNECTOR_REMOVE_ITEM = 'ri';

/**
 * Connector component for handle touch events.
 */
export class Connector extends Component {

  constructor(props) {
    super(props);

    this.position = {
      x: 0,
      y: 0,
    };

    this._panResponder = PanResponder.create({
      // Ask to be the responder:


      onStartShouldSetPanResponder: (event, gestureState) => true,  
      onStartShouldSetPanResponderCapture: (event, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (event, gestureState) => true,


      
      onMoveShouldSetPanResponder: (event, gestureState) => true,




      onPanResponderGrant: (event, gestureState) => {
        // The gesture has started. Show visual feedback so the user knows
        // what is happening!
        // gestureState.d{x,y} will be set to zero now
        const {
          onStart
        } = this.props;

        this.position = {
          x: 0,
          y: 0,
        };

        onStart([
          0,
          0,
        ]);
      },
      onPanResponderMove: (event, gestureState) => {
        const {
          onMove
        } = this.props;

        onMove([
          gestureState.dx - this.position.x,
          gestureState.dy - this.position.y,
        ]);

        this.position = {
          x: gestureState.dx,
          y: gestureState.dy,
        };
      },
      onPanResponderTerminationRequest: (event, gestureState) => true,
      onPanResponderRelease: (event, gestureState) => {
        // The user has released all touches while this view is the
        // responder. This typically means a gesture has succeeded
        const {
          onEnd
        } = this.props;

        onEnd([
          gestureState.moveX,
          gestureState.moveY,
        ]);
      },
      onPanResponderTerminate: (event, gestureState) => {
        // Another component has become the responder, so this gesture
        // should be cancelled
      },
      onShouldBlockNativeResponder: (event, gestureState) => {
        // Returns whether this component should block native components from becoming the JS
        // responder. Returns true by default. Is currently only supported on android.
        return true;
      },
    });
  }

  render() {
    const {
      x,
      y,
    //  size,
      width,
      height,
      type,
      removeItemComponent
    } = this.props;

    const removeIcon = type === CONNECTOR_REMOVE_ITEM && removeItemComponent;

      return (
        <View
          style={{
            position: 'absolute',
            left: x,
            top: y,
            width: width,
            height: height,
            borderWidth: 1,
            borderColor: 'black',
            backgroundColor: type === CONNECTOR_REMOVE_ITEM ? 'black': 'white',
            justifyContent:'center',
            alignItems:'center',
            borderRadius: type === CONNECTOR_CENTER ? 0 : width / 2,
            opacity: type === CONNECTOR_CENTER ? 0 : 1,
          }}
          {...this._panResponder.panHandlers}
        >
          {removeIcon}
        </View>
      );
    }

  }


Connector.propTypes = {
  x: PropTypes.number,
  y: PropTypes.number,
  size: PropTypes.number,
  onStart: PropTypes.func.isRequired,
  onMove: PropTypes.func.isRequired,
  onEnd: PropTypes.func.isRequired,
};
