import React from 'react'

export default class Header extends React.Component {
    constructor() {
        super()
    }

    onAdd = () => {
        const text = this.refs.input.value.trim()

        if (text) {
            this.props.onAddTodo(text)
            this.refs.input.value = ''
        }
    }

    render() {
        return (
            <div>
                <input ref="input" />

                <button onClick={this.onAdd}>add</button>
            </div>
        )
    }
}
