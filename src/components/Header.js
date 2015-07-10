'use strict';

var React = require('react');
var AppAction = require('../action/AppActions');
var shallowCompare = require('../_util/shallowCompare');

class Header extends React.Component {
    _handleAdd() {
        var value = React.findDOMNode(this.refs.input).value;
        AppAction.addTodo(Math.random(), value);
    }

    _handleInput() {
        var value = React.findDOMNode(this.refs.input).value;
        AppAction.updateInput(value);
    }

    shouldComponentUpdate(nextProps, nextState) {
        return shallowCompare(this, nextProps, nextState);
    }

    render() {
        console.log('header render');

        return (
            <div>
                <input type="text" ref="input" value={this.props.inputValue} onChange={this._handleInput.bind(this)}/>
                <button onClick={this._handleAdd.bind(this)}>add</button>
            </div>
        )
    }
}

module.exports = Header;