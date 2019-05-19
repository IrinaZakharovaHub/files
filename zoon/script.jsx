class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            systems: [],
        };
        this.activityHandler = this.activityHandler.bind(this);
    }

    componentDidMount() {
        let that = this;
        fetch('data.json')
            .then(function (response) {
                return response.json()
            })
            .then(function (json) {
                that.setState({systems: json});
            });
    }

    activityHandler(e) {
        let obj = Object.assign(this.state.systems);
        let index = e.target.getAttribute('data-index');
        obj.map((el) => {
            if (+el.id === +index) {
                el.enable = !el.enable
            }
        });
        this.setState({
            systems: obj
        });
    }

    render() {
        return (
            <div className="content">
                {
                    this.state.systems.map((system, i) =>
                        <div id={system.id} key={system.name}
                             className={`content__system ${system.active ? 'active' : ''}  ${system.enable ? '' : 'disabled'}`}>
                            <div className="content__line">
                                <div className="content__left">
                                    <div className="content__name">{system.name}</div>
                                    <Settings info={system.info}/>
                                </div>
                                <Activity handler={this.activityHandler} enable={system.enable ? 'false' : 'true'}
                                          index={system.id}/>
                            </div>

                            <Buttons buttonList={system} disable={!system.enable}
                                     creatingButton={system.creatingButton}/>
                            <div className="content__flex">
                                <div>
                                    <div className="content__left">
                                        <Searching search={system.search}/>
                                        <div className="content__flex content__rating">
                                            <Additional rating={system.rate}/>
                                            <Feedback feedback={system.feedback}/>
                                        </div>
                                    </div>
                                    <TurnedOff enable={system.enable}/>
                                </div>
                                <div className="content__right">
                                    <NeedActions actions={system.needActions}/>
                                    <Upgrading upgrade={system.upgrade}/>
                                </div>
                            </div>

                        </div>
                    )
                }
            </div>
        )

    }
}

const Feedback = (props) => {
    if (props.feedback.length > 0)
        return (
            <div className="content__feedback">{props.feedback}</div>
        );
    else return (
        <div></div>
    )
};

const Upgrading = (props) => {
    return (
        <div className="content__upgrade">{props.upgrade}</div>
    )
};

const NeedActions = (props) => {
    if (props.actions === true)
        return (
            <div className="content__need-actions">{props.actions ? "Требует действий" : ""}</div>
        );
    else return (
        <div></div>
    )
};

const Searching = (props) => {

    if (props.search.length > 0)
        return (
            <div className="content__searching">{props.search}</div>
        );
    else return (
        <div></div>
    )
};

const Settings = (props) => {
    let info = props.info;
    return (
        <div>
            {
                info.map((el, i) =>
                    <span className="content__info" key={i}>{el}</span>
                )
            }
        </div>
    )
};

const Additional = (props) => {
    if (props.rating === "Портал без рейтинга") {
        return (
            <div className="content__star">{props.rating}</div>
        )

    } else if (props.rating.length === 0) {
        return (
            <div></div>
        )
    } else {
        return (
            <div className="content__star active">{props.rating}</div>
        )
    }
};

const TurnedOff = (props) => {
    if (props.enable) {
        return (
            <div></div>
        )
    } else {
        return (
            <div className="content__turned-off">Площадка отключена</div>
        )
    }


};

class Activity extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            opacity: 0,
        };
        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState({
            opacity: !this.state.opacity
        })
    }

    render() {

        let pointerEvents = (+this.state.opacity === 0) ? 'none' : 'auto';
        return (
            <div>
                <img className="content__dots" src="img/dots.svg" onClick={this.toggle}
                     alt="dots"/>
                <div className="content__activity" style={{opacity: +this.state.opacity, pointerEvents: pointerEvents}}
                     onClick={this.props.handler}>
                    <span data-index={this.props.index}>{this.props.enable === "true" ? 'Включить' : 'Выключить'}</span>
                </div>
            </div>

        )
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
        })
    }

    render() {
        return (
            <div className="content__buttons">
                {
                    (this.props.creatingButton.length > 0 ?
                            <button
                                data-index={this.props.id}
                                disabled={this.props.disable}
                                className={`content__button content__button--creating ${this.state.creatingActive ? 'active' : ''}`}
                                onClick={this.handleCreating.bind(this)}>Создаем {this.props.creatingButton} страницы
                            </button>
                            : ""
                    )
                }
                {
                    this.state.buttons.map((button, index) =>
                        <button key={index} data-index={index}
                                disabled={this.props.disable}
                                className={`content__button ${button.isActive ? 'active' : ''}`}
                                onClick={this.handleClick.bind(this)}>{button.title}</button>)
                }
            </div>
        )
    }
}


ReactDOM.render(
    React.createElement(
        'div',
        null,
        <Main/>
    ), document.getElementById('test'));