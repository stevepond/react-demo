/*global _*/
var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var merge = require('react/lib/merge');
var _data = require('./data.json');

var CHANGE_EVENT = 'change';

var DemoStore = merge(EventEmitter.prototype, {
    search: function(payload) {
        this.results = _.filter(
            _data,
            function(item) {
                var startDate = moment(item.booked),
                    endDate = moment(item.booked).add('days', item.nights),
                    range = moment().range(startDate.toDate(), endDate.toDate());
                return !range.contains(moment(payload.start).toDate()) && range.contains(moment(payload.end).toDate());
            }
        );
        return this.results;
    },

    emitChange: function() {
        this.emit(CHANGE_EVENT);
    },

    /**
     * @param {function} callback
     */
    addChangeListener: function(callback) {
        this.on(CHANGE_EVENT, callback);
    },

    /**
     * @param {function} callback
     */
    removeChangeListener: function(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    }
});

// Register to handle all updates
AppDispatcher.register(function(payload) {
    var action = payload.action;

    switch (action.actionType) {
        case 'search':
            DemoStore.search(action.payload);
            DemoStore.state = 'results';
            break;
        default:
            return true;
    }

    DemoStore.emitChange();

    return true; // No errors.  Needed by promise in Dispatcher.
});

module.exports = DemoStore;
