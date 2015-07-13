'use strict';

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

    //获取最新数据的cursor
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
    /**
     * `cursor`的每次修改操作都会触发`onChange`回调
     * 所以将一次以上的操作都放进一个`update`里,
     * 这样只触发一次`onChange`
     */
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
