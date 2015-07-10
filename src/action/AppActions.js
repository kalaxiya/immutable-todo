'use strict';

var Dispatcher = require('../dispatcher/Dispatcher');

module.exports = {
    updateInput: function(text) {
        Dispatcher.dispatch({
            action: 'UPDATE_INPUT',
            text: text
        });
    },

    addTodo: function(id, text) {
        Dispatcher.dispatch({
            action: 'ADD',
            id: id,
            text: text
        });
    },

    remove: function(id) {
        Dispatcher.dispatch({
            action: 'REMOVE',
            id: id
        });
    }
};