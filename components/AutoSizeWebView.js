import { WebView, View, Text, ViewPropTypes } from 'react-native';
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
  }

  handleNavigationChange(navState) {
    if (navState.title) {
      const realContentHeight = parseInt(navState.title, 10) || 0; // turn NaN to 0
      this.setState({realContentHeight});
    }
    if (typeof this.props.onNavigationStateChange === "function") {
      this.props.onNavigationStateChange(navState);
    }
  }

  render() {
    const { source, style, minHeight, ...otherProps } = this.props;
    const html = source.html;

    if (!html) {
      throw new Error("WebViewAutoHeight supports only source.html");
    }

    return (
      <WebView
        {...otherProps}
        source={{html: codeInject(html)}}
        scrollEnabled={false}
        style={[style, {height: Math.max(this.state.realContentHeight, minHeight)}]}
        javaScriptEnabled
        onNavigationStateChange={this.handleNavigationChange.bind(this)}
      />
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
  minHeight: 100,
};
