/**
 * @jsx React.DOM
 */

var React = require('react');
var ReactPropTypes = React.PropTypes;
var DemoActions = require('../actions/DemoActions');

var Search = React.createClass({

  getInitialState: function() {
    return {
        searched: false,
        start: new Date(),
        end: new Date() + 1,
        numAdults: '1'
    };
  },

  /**
   * @return {object}
   */
  render: function() {
    return (
        <div>
            <h1>Hotel Room Search</h1>
            <div className="row">
                <label>Start Date</label>
                <input onChange={this._onChange} value={this.state.start} id="start" type="date"></input>
                <label>End Date</label>
                <input onChange={this._onChange} value={this.state.end} id="end" type="date"></input>
            </div>
            <div className="row">
                <label>Number of Adults</label>
                <select size="2" onChange={this._onChange} value={this.state.numAdults} id="numAdults">
                    <option value="1">1</option>
                </select>
            </div>
            <div className="row">
                <button onClick={this._search} >Search</button>
            </div>
        </div>
    );
  },

  _search: function(text) {
    var filtered = DemoActions.search({
        start: this.state.start,
        end: this.state.end
    });
    this.setState({searched: true});
  },

    _onChange: function(e) {
        var params = {};
        params[e.target.id] = e.target.value;
        this.setState(params);
    }

});

module.exports = Search;
