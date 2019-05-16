class Tooltip extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            opacity: false
        };
        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        const node = ReactDOM.findDOMNode(this);
        console.log(node);
        this.setState({
            opacity: !this.state.opacity
        })
    }

    render() {
        const style = {
            position: 'absolute',
            opacity: +this.state.opacity,
            bottom: '1.4em',
            left: 0,
            background: '#fff',
            padding: '.2em',
            color: '#62038e',
            borderRadius: '5px',
            pointerEvents: 'none'
        };
        return (
            <div style={{display: 'inline', position: 'relative'}}>
                <span style={{color: 'yellow', cursor: 'pointer'}} onClick={this.toggle}>
                    {this.props.children}
                </span>
                <span className="tooltip"
                      style={style}>
                    {this.props.text}
                </span>
            </div>
        )
    }
}


ReactDOM.render(<div className={"content"}>
    <div className={"content__line"}>
        <span>Angel </span>
        <Tooltip text="oсьминог"> octopys </Tooltip>
        <span>
        and his
        </span>
        <Tooltip text="дедушка"> grandpa </Tooltip>
        <span>
             live on the Great Barrier Reef in Australia.
    Grandpa is
        </span>
        <Tooltip text="устал"> tired. </Tooltip>
    </div>
    <div className={"content__line"}>
        <span>
             ‘I’m going to sleep now, Angel.
        </span>

        <Tooltip text="Веди хорошо"> Be good, </Tooltip>

        <span>
             and don’t go
        </span>
        <Tooltip text="за"> past </Tooltip>
        <span>
             the coral!
        </span>
        <span> There are lots of

        </span>
        <Tooltip text="опасных"> dangerous </Tooltip>
        <span>
             animals
        </span>
        <Tooltip text="за ними."> out there.’ </Tooltip>

    </div>
    <div className="content__line">
        <span>Angel </span>
        <Tooltip text="встретил черепаху."> met tortoise. </Tooltip>
        <div>
            T: - Hi, Angel. What are you doing?
        </div>
        <div>
            A: -
            <Tooltip text="Мне скучно."> I’m bored. </Tooltip>
            Grandpa is
            <Tooltip text="спит."> asleep. </Tooltip>
        </div>
        <div>
            T: - Do you want to come and play?
        </div>
        <div>
            A: - Yes, let’s go!
        </div>

    </div>
    <div className="content__line">
        <div>
            A: - Look, Turtle! A ball!
        </div>
        <div>
            T: -
            <Tooltip text="Осторожно!">  Look out! </Tooltip>
            That isn’t a ball! It’s a dangerous
            <Tooltip text="медуза"> jellyfish. </Tooltip>
            Swim!
        </div>
        <div>
            T: - Angel! Look out! There’s a dangerous fish
            <Tooltip text="за"> behind </Tooltip>
             you! Angel, you must
            <Tooltip text="быть осторожнее">   be careful </Tooltip>
            here.
            <Tooltip text="Ты должен оставаться со мной!">  You’ve got to stay with me! </Tooltip>
        </div>
        <div>
            A: - I’m sorry, Turtle. Look! I’ve got a present for you.
        </div>
        <div>
            T: - Aargh! This is a dangerous
            <Tooltip text="ядовитая улитка!"> cone shell! </Tooltip>
            <Tooltip text="Положи это">  Drop it </Tooltip>
             quickly, Angel!
        </div>


    </div>


</div>, document.getElementById('tooltip'));