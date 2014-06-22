var AppDispatcher = require('../dispatcher/AppDispatcher');

var DemoActions = {

  search: function(payload) {
    AppDispatcher.handleViewAction({
      actionType: 'search',
      payload: payload
    });
  }
};

module.exports = DemoActions;
