class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            systems: []
        };
        this.activityHandler = this.activityHandler.bind(this);
    }

    componentDidMount() {
        let that = this;
        fetch('data.json').then(function (response) {
            return response.json();
        }).then(function (json) {
            that.setState({ systems: json });
        });
    }

    activityHandler(e) {
        let obj = Object.assign(this.state.systems);
        let index = e.target.getAttribute('data-index');
        obj.map(el => {
            if (+el.id === +index) {
                el.enable = !el.enable;
            }
        });
        this.setState({
            systems: obj
        });
    }

    render() {
        return React.createElement(
            'div',
            { className: 'content' },
            this.state.systems.map((system, i) => React.createElement(
                'div',
                { id: system.id, key: system.name,
                    className: `content__system ${system.active ? 'active' : ''}  ${system.enable ? '' : 'disabled'}` },
                React.createElement(
                    'div',
                    { className: 'content__line' },
                    React.createElement(
                        'div',
                        { className: 'content__left' },
                        React.createElement(
                            'div',
                            { className: 'content__name' },
                            system.name
                        ),
                        React.createElement(Settings, { info: system.info })
                    ),
                    React.createElement(Activity, { handler: this.activityHandler, enable: system.enable ? 'false' : 'true',
                        index: system.id })
                ),
                React.createElement(Buttons, { buttonList: system, disable: !system.enable,
                    creatingButton: system.creatingButton }),
                React.createElement(
                    'div',
                    { className: 'content__flex' },
                    React.createElement(
                        'div',
                        null,
                        React.createElement(
                            'div',
                            { className: 'content__left' },
                            React.createElement(Searching, { search: system.search }),
                            React.createElement(
                                'div',
                                { className: 'content__flex content__rating' },
                                React.createElement(Additional, { rating: system.rate }),
                                React.createElement(Feedback, { feedback: system.feedback })
                            )
                        ),
                        React.createElement(TurnedOff, { enable: system.enable })
                    ),
                    React.createElement(
                        'div',
                        { className: 'content__right' },
                        React.createElement(NeedActions, { actions: system.needActions }),
                        React.createElement(Upgrading, { upgrade: system.upgrade })
                    )
                )
            ))
        );
    }
}

const Feedback = props => {
    if (props.feedback.length > 0) return React.createElement(
        'div',
        { className: 'content__feedback' },
        props.feedback
    );else return React.createElement('div', null);
};

const Upgrading = props => {
    return React.createElement(
        'div',
        { className: 'content__upgrade' },
        props.upgrade
    );
};

const NeedActions = props => {
    if (props.actions === true) return React.createElement(
        'div',
        { className: 'content__need-actions' },
        props.actions ? "Требует действий" : ""
    );else return React.createElement('div', null);
};

const Searching = props => {

    if (props.search.length > 0) return React.createElement(
        'div',
        { className: 'content__searching' },
        props.search
    );else return React.createElement('div', null);
};

const Settings = props => {
    let info = props.info;
    return React.createElement(
        'div',
        null,
        info.map((el, i) => React.createElement(
            'span',
            { className: 'content__info', key: i },
            el
        ))
    );
};

const Additional = props => {
    if (props.rating === "Портал без рейтинга") {
        return React.createElement(
            'div',
            { className: 'content__star' },
            props.rating
        );
    } else if (props.rating.length === 0) {
        return React.createElement('div', null);
    } else {
        return React.createElement(
            'div',
            { className: 'content__star active' },
            props.rating
        );
    }
};

const TurnedOff = props => {
    if (props.enable) {
        return React.createElement('div', null);
    } else {
        return React.createElement(
            'div',
            { className: 'content__turned-off' },
            '\u041F\u043B\u043E\u0449\u0430\u0434\u043A\u0430 \u043E\u0442\u043A\u043B\u044E\u0447\u0435\u043D\u0430'
        );
    }
};

class Activity extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            opacity: 0
        };
        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState({
            opacity: !this.state.opacity
        });
    }

    render() {

        let pointerEvents = +this.state.opacity === 0 ? 'none' : 'auto';
        return React.createElement(
            'div',
            null,
            React.createElement('img', { className: 'content__dots', src: 'img/dots.svg', onClick: this.toggle,
                alt: 'dots' }),
            React.createElement(
                'div',
                { className: 'content__activity', style: { opacity: +this.state.opacity, pointerEvents: pointerEvents },
                    onClick: this.props.handler },
                React.createElement(
                    'span',
                    { 'data-index': this.props.index },
                    this.props.enable === "true" ? 'Включить' : 'Выключить'
                )
            )
        );
    }

}

class Buttons extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            buttons: props.buttonList.buttons,
            creatingActive: false
        };
    }

    handleClick(e) {
        let obj = Object.assign(this.state.buttons);
        let index = e.target.getAttribute('data-index');
        let chosen = !e.target.classList.contains('active');
        obj[index]['isActive'] = chosen;
        this.setState({
            buttons: obj
        });
    }

    handleCreating() {
        this.setState({
            creatingActive: !this.state.creatingActive
        });
    }

    render() {
        return React.createElement(
            'div',
            { className: 'content__buttons' },
            this.props.creatingButton.length > 0 ? React.createElement(
                'button',
                {
                    'data-index': this.props.id,
                    disabled: this.props.disable,
                    className: `content__button content__button--creating ${this.state.creatingActive ? 'active' : ''}`,
                    onClick: this.handleCreating.bind(this) },
                '\u0421\u043E\u0437\u0434\u0430\u0435\u043C ',
                this.props.creatingButton,
                ' \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u044B'
            ) : "",
            this.state.buttons.map((button, index) => React.createElement(
                'button',
                { key: index, 'data-index': index,
                    disabled: this.props.disable,
                    className: `content__button ${button.isActive ? 'active' : ''}`,
                    onClick: this.handleClick.bind(this) },
                button.title
            ))
        );
    }
}

ReactDOM.render(React.createElement('div', null, React.createElement(Main, null)), document.getElementById('test'));
