import React from "react"
import Immutable from "immutable"
import shallowCompare from "../_util/shallowCompare"
import AppAction from "../action/AppActions"

class List extends React.Component {
    //得用不可变数据,提高比较的效率
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
