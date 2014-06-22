/**
 * @jsx React.DOM
 */

var React = require('react');
var DemoApp = require('./components/DemoApp.react');

React.renderComponent(
  <DemoApp />,
  document.getElementById('demoapp')
);
