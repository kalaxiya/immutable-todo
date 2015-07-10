var React = require('react');
var Immutable = require('immutable');
var shallowCompare = require('../_util/shallowCompare');
var AppAction = require('../action/AppActions');

class List extends React.Component {
    shouldComponentUpdate(nextProps, nextState) {
        return shallowCompare(this, nextProps, nextState);
    }

    _handleDelete(id) {
        AppAction.remove(id);
    }

    render() {
        console.log('list render');

        var list = this.props.list.map(function(v, i){
            return <li key={i} onClick={this._handleDelete.bind(this, v.id)}>{v.get('text')}</li>
        }, this);

        return (
            <ul>
                {list.toList()}
            </ul>
        )
    }
}

module.exports = List;