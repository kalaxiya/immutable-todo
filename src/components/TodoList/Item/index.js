import React from 'react'

export default class Item extends React.Component {
    constructor() {
        super()
    }

    render() {
        const { todo, show } = this.props

        return (
            <li style={{display: show ? 'block' : 'none'}}>
                {todo.get('text')}
            </li>
        )
    }
}
