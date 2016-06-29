import React from 'react'
import { Map, List } from 'immutable'
import Header from '../../components/Header'
import Filter from '../../components/Filter'
import TodoList from '../../components/TodoList'

export default class App extends React.Component {
    constructor() {
        super()

        this.state = {
            filterText: '',
            todos: List()
        }
    }

    onEditFilterText = e => {
        this.setState({
            filterText: e.target.value
        })
    }

    onAddTodo = text => {
        const newTodo = {
            text,
            id: Math.random()
        }

        this.setState({
            todos: this.state.todos.push(Map(newTodo))
        })
    }

    render() {
        const state = this.state

        return (
            <div>
                <Header
                    onAddTodo={this.onAddTodo}
                />

                <Filter
                    filterText={state.filterText}
                    onEditFilterText={this.onEditFilterText}
                />

                <TodoList
                    filterText={state.filterText}
                    todos={state.todos}
                />
            </div>
        )
    }
}
