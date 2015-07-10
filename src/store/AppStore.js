var Immutable = require('immutable');
var Cursor = require('immutable/contrib/cursor');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var Dispatcher = require('../dispatcher/Dispatcher');

var CHANGE_EVENT = 'change';

//Record
var Item = new Immutable.Record({
    id: '',
    text: '',
    done: false
});

//顶层数据
var data = Immutable.fromJS({
    inputValue: '',
    todo: {}
});

////////////////////////////////////////////////////
var AppStore = assign({}, EventEmitter.prototype, {
    addChangeListener: function(callback) {
        this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener: function(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    },

    getData: function() {
        return data;
    },

    cursor: function() {
        return Cursor.from(data, function(newData){

            console.log('data changed ...');

            data = newData;
            this.emit(CHANGE_EVENT);
        }.bind(this));
    }
});

///////////////////////////////////////
function updateInput(text) {
    AppStore.cursor().set('inputValue', text);
}

function add(id, text) {
    AppStore.cursor().update(function(data){
        return data.set('inputValue', '').updateIn(['todo', id], function(){
            return new Item({
                id: id,
                text: text
            });
        });
    });
}

function remove(id) {
    AppStore.cursor().get('todo').delete(id);
}

//////////////////////////////////////
Dispatcher.register(function(action){
    switch (action.action) {
        case 'UPDATE_INPUT':
            updateInput(action.text);
            break;

        case 'ADD':
            add(action.id, action.text);
            break;

        case 'REMOVE':
            remove(action.id);
            break;
    }
});

module.exports = AppStore;
