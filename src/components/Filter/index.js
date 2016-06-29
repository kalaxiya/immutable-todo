import React from 'react'

export default class Filter extends React.Component {
    constructor() {
        super()
    }

    render() {
        const { filterText, onEditFilterText } = this.props

        return (
            <div>
                Filter:
                <input
                    value={filterText}
                    onChange={onEditFilterText}
                />
            </div>
        )
    }
}
