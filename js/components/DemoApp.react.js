/**
 * @jsx React.DOM
 */

var React = require('react');
var ReactPropTypes = React.PropTypes;
var Search = require('./Search.react');
var Results = require('./Results.react');
var DemoActions = require('../actions/DemoActions');
var DemoStore = require('../stores/DemoStore');

function getDemoState() {
    return {
        viewState: DemoStore.state,
        results: DemoStore.results
    };
}

var DempApp = React.createClass({

  getInitialState: function() {
    return {viewState: 'search', results: []};
  },

  componentDidMount: function() {
    DemoStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    DemoStore.removeChangeListener(this._onChange);
  },

  /**
   * @return {object}
   */
  render: function() {
        switch(this.state.viewState) {
            case 'results':
                return (
                  <div>
                    <Results results={this.state.results} />
                  </div>
                );
            default:
                return (
                  <div>
                    <Search />
                  </div>
                );
        }
  },

  _onChange: function() {
    this.setState(getDemoState());
  }

});


module.exports = DempApp;
