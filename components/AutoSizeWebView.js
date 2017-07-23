import { WebView, ViewPropTypes, Animated } from 'react-native';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

var script = `
;(function() {
var wrapper = document.createElement("div");
wrapper.id = "height-wrapper";
while (document.body.firstChild) {
    wrapper.appendChild(document.body.firstChild);
}
document.body.appendChild(wrapper);
var i = 0;
function updateHeight() {
    document.title = wrapper.clientHeight;
    window.location.hash = ++i;
}
updateHeight();
window.addEventListener("load", function() {
    updateHeight();
    setTimeout(updateHeight, 1000);
});
window.addEventListener("resize", updateHeight);
}());
`;


const style = `
<style>
body, html, #height-wrapper {
    margin: 0;
    padding: 0;
}
#height-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
}
</style>
<script>${script}</script>
`;

const codeInject = (html) => `<html><body>${html}${style}</body></html>`;

export default class WebViewAutoHeight extends Component {
  constructor(props) {
    super(props);
    this.state = {
      realContentHeight: props.minHeight,
    };
    this.opacityAnimatedValue = new Animated.Value(0);
  }

  handleNavigationChange(navState) {
    if (navState.title) {
      const realContentHeight = parseInt(navState.title, 10) || 0; // turn NaN to 0
      this.setState({ realContentHeight }, () => {
        Animated.timing(this.opacityAnimatedValue, {
          toValue: 1,
          duration: 200
        }).start();
      });
    }
  }

  render() {
    const { source, style, minHeight, ...otherProps } = this.props;
    const html = source.html;
    const { realContentHeight } = this.state;
    const realHeight = Math.max(realContentHeight, minHeight);

    if (!html) {
      throw new Error("WebViewAutoHeight supports only source.html");
    }

    return (
      <Animated.View style={{ opacity: this.opacityAnimatedValue }}>
        <WebView
          {...otherProps}
          source={{html: codeInject(html)}}
          scrollEnabled={false}
          style={[style, { height: realHeight }]}
          javaScriptEnabled
          onNavigationStateChange={this.handleNavigationChange.bind(this)}
        />
      </Animated.View>
    );
  }
}

WebViewAutoHeight.propTypes = {
  source: PropTypes.object.isRequired,
  injectedJavaScript: PropTypes.string,
  minHeight: PropTypes.number,
  onNavigationStateChange: PropTypes.func,
  style: ViewPropTypes.style,
};

WebViewAutoHeight.defaultProps = {
  minHeight: 70,
};
