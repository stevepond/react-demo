/**
 *
 * @jsx React.DOM
 */

var React = require('react');
var DemoActions = require('../actions/DemoActions');
var DemoStore = require('../stores/DemoStore');

var Results = React.createClass({

   getInitialState: function() {
        return {page: 1, pageSize: 3};
   },

    _next: function() {
        if (this.state.page < Math.floor(this.props.results.length / this.state.pageSize)) {
            this.setState({page: this.state.page + 1});
        }
    },

    _previous: function() {
        if (this.state.page > 1) {
            this.setState({page: this.state.page - 1});
        }
    },

    _getPage: function(results, page) {
        return results.slice((3 * (page - 1)), (3*(page -1)) + this.state.pageSize);
    },

  /**
   * @return {object}
   */
  render: function() {
     var page = this._getPage(this.props.results, this.state.page);
     var createRow = function(item) {
        return (
            <tr>
                <td>{item.room}</td>
                <td>{item.description}</td>
                <td>{item.price}</td>
            </tr>
        );
    };
    return (
        <div>
            <h1>Search Results</h1>
            <table>
                <tbody>
                <tr>
                    <th>Room</th>
                    <th>Description</th>
                    <th>Price</th>
                </tr>

                {page.map(createRow)}
                </tbody>
            </table>
        <button className="prev" onClick={this._previous}>Previous</button>
        <button className="next" onClick={this._next}>Next</button>
        </div>
    );
   }

});

module.exports = Results;
