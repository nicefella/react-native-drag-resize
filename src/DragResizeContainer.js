import React, {PureComponent} from 'react';
import {
  TouchableWithoutFeedback, View, TouchableOpacity
} from 'react-native';
import PropTypes from 'prop-types';

/**
 * Drag resize container.
 * Allow calculate limitation by container size.
 */
export class DragResizeContainer extends PureComponent {

  render() {
    const {
      style,
      onInit,
      children,
      onPress
    } = this.props;

    return (
      <TouchableOpacity
      activeOpacity={1}
        ref={view => {
          this.canvas = view;
        }}
        style={style}
        onPress={onPress}
        onLayout={() => {
          this.canvas.measure(
            (fx, fy, w, h, x, y) => {
              onInit({
                x: 0,
                y: 0,
                w,
                h,
              });
            }
          );
        }}
      >
        {children}
      </TouchableOpacity>
    );
  }
};

DragResizeContainer.propTypes = {
  onInit: PropTypes.func.isRequired,
  style: PropTypes.object,
};
