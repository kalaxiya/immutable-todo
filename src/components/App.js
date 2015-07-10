var React = require('react');
var Header = require('./Header');
var List = require('./List');

var AppStore = require('../store/AppStore');
var shallowCompare = require('../_util/shallowCompare');

function getState() {
    return {
        data: AppStore.getData()
    };
}

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = getState();
    }

    componentDidMount() {
        AppStore.addChangeListener(this._onStoreChange.bind(this));
    }

    _onStoreChange() {
        console.log('get new data ...');

        this.setState(
            getState()
        );
    }

    shouldComponentUpdate(nextProps, nextState) {
        return shallowCompare(this, nextProps, nextState);
    }

    render() {
        console.log('app render');

        var data = this.state.data;
        return (
            <div>
                <Header inputValue={data.get('inputValue')} />
                <List list={data.get('todo')} />
            </div>
        )
    }
}

module.exports = App;