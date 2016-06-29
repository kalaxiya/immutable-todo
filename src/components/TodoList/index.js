import React from 'react'
import Item from './Item'

export default class TodoList extends React.Component {
    constructor() {
        super()
    }

    render() {
        const { todos, filterText } = this.props

        const items = todos.map(todo => {
            return (
                <Item
                    key={todo.get('id')}
                    todo={todo}
                    show={todo.get('text').indexOf(filterText) > -1}
                />
            )
        })

        return <ul>{items}</ul>
    }
}
