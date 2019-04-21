class Menu extends React.Component {
    render() {
        let menu = ['home', 'about us', 'contacts'];
        return React.createElement(
            'div',
            null,
            menu.map((el, i) => {
                return React.createElement(Link, { key: i, label: el });
            })
        );
    }
}

const Link = props => {
    const url = '/' + props.label.toLowerCase().trim().replace(' ', '-');
    return React.createElement(
        'a',
        { className: 'link', href: url },
        props.label
    );
};

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            buttonStyle: { filter: 'blur(10px)' },
            active: true,
            disabled: false
        };
        this.state.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.setState({
            buttonStyle: { filter: '' },
            active: true,
            disabled: true
        });
        let time = setTimeout(() => {
            this.setState({
                buttonStyle: { filter: 'blur(10px)' },
                active: false,
                disabled: false
            });
            clearTimeout(time);
        }, 30000);
    }

    render() {
        return React.createElement(
            'div',
            null,
            React.createElement(Header, this.state),
            React.createElement(Form, this.state)
        );
    }
}

class Header extends React.Component {

    render() {
        return React.createElement(
            'div',
            { className: 'main' },
            React.createElement(
                'div',
                { className: 'instructions' },
                '\u041F\u0440\u043E\u0447\u0442\u0438\u0442\u0435 \u0442\u0435\u043A\u0441\u0442 \u0437\u0430 1 \u043C\u0438\u043D\u0443\u0442\u0443 \u0438 \u043F\u0440\u043E\u0439\u0434\u0438\u0442\u0435 \u043A\u043E\u0440\u043E\u0442\u043A\u0438\u0439 \u043E\u043F\u0440\u043E\u0441. ',
                React.createElement('br', null),
                '\u0423\u0437\u043D\u0430\u0439\u0442\u0435 \u0441\u0432\u043E\u0439 \u0443\u0440\u043E\u0432\u0435\u043D\u044C \u0432\u043D\u0438\u043C\u0430\u0442\u0435\u043B\u044C\u043D\u043E\u0441\u0442\u0438!'
            ),
            React.createElement(Button, { handleClick: this.props.handleClick, disable: this.props.disabled }),
            React.createElement(Text, this.props)
        );
    }
}

const Text = props => {
    return React.createElement(
        'div',
        { className: `text`, style: props.buttonStyle },
        React.createElement(
            'p',
            null,
            '\u0411\u044B\u043B\u043E \u0445\u043E\u043B\u043E\u0434\u043D\u043E\u0435 \u0437\u0438\u043C\u043D\u0435\u0435 \u0443\u0442\u0440\u043E. \u0421\u043E\u043B\u043D\u0446\u0435 \u0435\u0449\u0435 \u043D\u0435 \u043F\u043E\u0434\u043D\u044F\u043B\u043E\u0441\u044C. \u0421\u043D\u0435\u0433 \u0433\u0440\u043E\u043C\u043A\u043E \u0445\u0440\u0443\u0441\u0442\u0435\u043B \u043F\u0440\u0438 \u043A\u0430\u0436\u0434\u043E\u043C \u0448\u0430\u0433\u0435, \u0438 \u0432\u0441\u0435 \u0431\u043B\u0435\u0441\u0442\u0435\u043B\u043E \u0438 \u0441\u0438\u044F\u043B\u043E \u043F\u043E\u0434 \u0441\u0432\u0435\u0442\u043E\u043C \u0444\u043E\u043D\u0430\u0440\u044F.'
        ),
        React.createElement(
            'p',
            null,
            '\u041D\u0430 \u043D\u0435\u0431\u0435 \u043D\u0435 \u0431\u044B\u043B\u043E \u043D\u0438 \u043E\u0431\u043B\u0430\u0447\u043A\u0430, \u043F\u043E\u044D\u0442\u043E\u043C\u0443 \u043C\u043E\u0436\u043D\u043E \u0431\u044B\u043B\u043E \u043B\u0435\u0433\u043A\u043E \u0440\u0430\u0437\u0433\u043B\u044F\u0434\u0435\u0442\u044C \u0431\u044B\u0441\u0442\u0440\u043E \u043F\u0440\u0438\u0431\u043B\u0438\u0436\u0430\u044E\u0449\u0435\u0435\u0441\u044F \u044F\u0440\u043A\u043E\u0435 \u043F\u044F\u0442\u043D\u043E \u043F\u0440\u044F\u043C\u043E \u043D\u0430\u0434 \u0433\u043E\u043B\u043E\u0432\u0430\u043C\u0438 \u043F\u0440\u043E\u0445\u043E\u0436\u0438\u0445.'
        ),
        React.createElement(
            'p',
            null,
            '\u041F\u0440\u0430\u0432\u0434\u0430, \u044D\u0442\u043E\u0433\u043E \u043D\u0438\u043A\u0442\u043E \u043D\u0435 \u0437\u0430\u043C\u0435\u0442\u0438\u043B, \u0432\u0435\u0434\u044C \u0432\u0441\u0435 \u0441\u043F\u0435\u0448\u0438\u043B\u0438 \u043F\u043E \u0441\u0432\u043E\u0438\u043C \u0434\u0435\u043B\u0430\u043C: \u043D\u0430 \u0440\u0430\u0431\u043E\u0442\u0443, \u0432 \u0448\u043A\u043E\u043B\u0443, \u0430\u043F\u0442\u0435\u043A\u0443, \u043C\u0430\u0433\u0430\u0437\u0438\u043D, \u0434\u0435\u043B\u043E\u0432\u0443\u044E \u0432\u0441\u0442\u0440\u0435\u0447\u0443, \u043F\u043E\u043B\u0438\u043A\u043B\u0438\u043D\u0438\u043A\u0443.'
        ),
        React.createElement(
            'p',
            null,
            '\u041F\u044F\u0442\u043D\u043E \u0442\u0435\u043C \u0432\u0440\u0435\u043C\u0435\u043D\u0435\u043C \u0432\u0441\u0435 \u043F\u0440\u0438\u0431\u043B\u0438\u0436\u0430\u043B\u043E\u0441\u044C \u0438 \u0443\u0436\u0435 \u0432\u044B\u0433\u043B\u044F\u0434\u0435\u043B\u043E \u043D\u0430 \u0442\u0435\u043C\u043D\u043E\u043C \u043D\u0435\u0431\u0435 \u043A\u0430\u043A \u0440\u0430\u0441\u043A\u0430\u043B\u0435\u043D\u043D\u044B\u0439 \u043E\u0433\u043D\u0435\u043D\u043D\u044B\u0439 \u0448\u0430\u0440. \u0412\u0434\u0440\u0443\u0433 \u0436\u0435\u043D\u0449\u0438\u043D\u0430 \u0432\u0441\u043A\u0440\u0438\u043A\u043D\u0443\u043B\u0430 \u0438 \u043E\u0442\u043F\u0440\u044F\u043D\u0443\u043B\u0430 \u043D\u0430\u0437\u0430\u0434, \u0433\u043B\u044F\u0434\u0430 \u043D\u0430 \u043D\u0435\u0431\u043E. \u041B\u044E\u0434\u0438 \u043C\u0438\u0433\u043E\u043C \u043F\u043E\u0434\u043D\u044F\u043B\u0438 \u0433\u043E\u043B\u043E\u0432\u044B.'
        ),
        React.createElement(
            'p',
            null,
            '\u0412 \u044D\u0442\u043E\u0442 \u043C\u043E\u043C\u0435\u043D\u0442 \u0432\u0440\u0435\u043C\u044F \u0431\u0443\u0434\u0442\u043E \u043E\u0441\u0442\u0430\u043D\u043E\u0432\u0438\u043B\u043E\u0441\u044C. \u041A\u043E\u0440\u0435\u043D\u0430\u0441\u0442\u044B\u0439 \u043C\u0443\u0436\u0447\u0438\u043D\u0430 \u0441 \u0441\u0435\u0434\u043E\u0439 \u0431\u043E\u0440\u043E\u0434\u043E\u0439 \u0443\u043F\u0430\u043B \u0432\u043D\u0438\u0437, \u043F\u0440\u0438\u043A\u0440\u044B\u0432\u0430\u044F \u0433\u043E\u043B\u043E\u0432\u0443 \u0440\u0443\u043A\u0430\u043C\u0438, \u043A\u0430\u043A\u043E\u0439-\u0442\u043E \u043F\u0430\u0440\u0435\u043D\u0435\u043A, \u0432\u0438\u0434\u0438\u043C\u043E, \u0441\u0442\u0443\u0434\u0435\u043D\u0442, \u043E\u0441\u0442\u0430\u043D\u043E\u0432\u0438\u043B\u0441\u044F \u0441 \u0448\u0438\u0440\u043E\u043A\u043E \u0440\u0430\u0441\u043A\u0440\u044B\u0442\u044B\u043C\u0438 \u043E\u0442 \u0443\u0436\u0430\u0441\u0430 \u0433\u043B\u0430\u0437\u0430\u043C\u0438, \u0436\u0435\u043D\u0449\u0438\u043D\u044B \u0432\u0438\u0437\u0436\u0430\u043B\u0438, \u0438 \u0432\u0441\u0435 \u044D\u0442\u043E \u043F\u0440\u043E\u0438\u0441\u0445\u043E\u0434\u0438\u043B\u043E \u0431\u0435\u0441\u043A\u043E\u043D\u0435\u0447\u043D\u043E \u0434\u043E\u043B\u0433\u043E. \u0421\u0430\u043C \u0448\u0430\u0440 \u043A\u0430\u0437\u0430\u043B\u043E\u0441\u044C \u0442\u043E\u0436\u0435 \u0437\u0430\u0432\u0438\u0441 \u0432 \u043D\u0435\u0431\u0435, \u0440\u0435\u0448\u0430\u044F\u0441\u044C, \u0447\u0442\u043E \u0434\u0435\u043B\u0430\u0442\u044C \u0434\u0430\u043B\u044C\u0448\u0435.'
        ),
        React.createElement(
            'p',
            null,
            '-\u0414\u0437\u044B\u044B\u044B\u043D\u044C! 7:45. \u0427\u0442\u043E? \u042D\u0442\u043E \u0431\u044B\u043B \u0441\u043E\u043D? \u041D\u0430\u0434\u043E \u0436\u0435, \u0432\u0441\u0435 \u0442\u0430\u043A \u0440\u0435\u0430\u043B\u0438\u0441\u0442\u0438\u0447\u043D\u043E. \u0412\u0441\u0435\u0433\u043E 30 \u043C\u0438\u043D\u0443\u0442, \u0447\u0442\u043E\u0431\u044B \u0443\u0441\u043F\u0435\u0442\u044C \u0441\u043E\u0431\u0440\u0430\u0442\u044C\u0441\u044F, \u0447\u0442\u043E\u0431\u044B \u043F\u043E\u0442\u043E\u043C \u043F\u043E\u043B\u0442\u043E\u0440\u0430 \u0447\u0430\u0441\u0430 \u0441\u0442\u043E\u044F\u0442\u044C \u0432 \u043F\u0440\u043E\u0431\u043A\u0430\u0445, \u0447\u0442\u043E\u0431\u044B \u043F\u0440\u0438\u0435\u0445\u0430\u0442\u044C \u043D\u0430 \u0440\u0430\u0431\u043E\u0442\u0443 \u0432\u043E\u0432\u0440\u0435\u043C\u044F.'
        )
    );
};

const Button = props => {

    return React.createElement(
        'div',
        { style: { display: 'flex' } },
        React.createElement(
            'button',
            { className: `button`, onClick: props.handleClick, disabled: props.disable },
            '\u041D\u0430\u0447\u0430\u0442\u044C'
        )
    );
};

class Form extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            question1: {
                question: 'Какое время года описано в рассказе-сновидении?',
                answers: [{
                    answer: 'v-1',
                    text: 'Зима'

                }, {
                    answer: 'v-2',
                    text: 'Весна'

                }, {
                    answer: 'v-3',
                    text: 'Осень'

                }]

            },
            question2: {
                question: 'Какая была погода в рассказе-сновидении?',
                answers: [{
                    answer: 'v-4',
                    text: 'облачная'

                }, {
                    answer: 'v-5',
                    text: 'ясная'

                }, {
                    answer: 'v-6',
                    text: 'дождливая'

                }]

            },
            question3: {
                question: 'Сколько времени автор тратит на дорогу, чтобы вовремя приехать на работу?',
                answers: [{
                    answer: 'v-7',
                    text: '30 минут'

                }, {
                    answer: 'v-8',
                    text: 'полтора часа'

                }, {
                    answer: 'v-9',
                    text: 'два часа'

                }]

            },
            result: 0,
            styleResult: { opacity: '0' }

        };
        this.state.handleRadio = this.handleRadio.bind(this);
        this.state.handleClick = this.handleClick.bind(this);
        this.rightAnswers = {
            question1: 'v-1',
            question2: 'v-5',
            question3: 'v-8'
        };
        this.answers = {
            question1: '',
            question2: '',
            question3: ''
        };
    }

    handleRadio(e) {
        let question = e.target.name;
        this.answers[question] = e.target.value;
    }
    handleClick() {
        let arr = [];
        Object.keys(this.answers).map((e, i) => {
            if (this.rightAnswers[e] === this.answers[e]) {
                arr.push(this.answers[e]);
            }
        });
        this.setState({ styleResult: { opacity: '1' } });
        switch (arr.length) {
            case 0:
                this.setState({ result: 'Есть к чему стремиться!' });
                break;
            case 1:
                this.setState({ result: 'Стоит тренироваться' });
                break;
            case 2:
                this.setState({ result: 'У вас хорошая внимательнось' });
                break;
            case 3:
                this.setState({ result: 'Вы очень внимательны :)' });
                break;

        }
    }

    render() {
        let active = this.props.active;
        if (!active) {
            return React.createElement(Question, this.state);
        } else {
            return React.createElement('br', null);
        }
    }

}

const Question = props => {
    return React.createElement(
        'div',
        { className: 'form' },
        React.createElement(
            'div',
            { className: "form__block" },
            React.createElement(
                'div',
                { className: "form__question" },
                props.question1.question
            ),
            props.question1.answers.map((e, i) => {
                return React.createElement(
                    'div',
                    { className: "form__answer", key: i },
                    React.createElement('input', { id: e.answer, type: "radio", name: "question1", value: e.answer,
                        onChange: props.handleRadio }),
                    React.createElement(
                        'label',
                        { htmlFor: e.answer },
                        e.text
                    )
                );
            })
        ),
        React.createElement(
            'div',
            { className: "form__block" },
            React.createElement(
                'div',
                { className: "form__question" },
                props.question2.question
            ),
            props.question2.answers.map((e, i) => {
                return React.createElement(
                    'div',
                    { className: "form__answer", key: i },
                    React.createElement('input', { id: e.answer, type: "radio", name: "question2", value: e.answer,
                        onChange: props.handleRadio }),
                    React.createElement(
                        'label',
                        { htmlFor: e.answer },
                        e.text
                    )
                );
            })
        ),
        React.createElement(
            'div',
            { className: "form__block" },
            React.createElement(
                'div',
                { className: "form__question" },
                props.question3.question
            ),
            props.question3.answers.map((e, i) => {
                return React.createElement(
                    'div',
                    { className: "form__answer", key: i },
                    React.createElement('input', { id: e.answer, type: "radio", name: "question3", value: e.answer,
                        onChange: props.handleRadio }),
                    React.createElement(
                        'label',
                        { htmlFor: e.answer },
                        e.text
                    )
                );
            })
        ),
        React.createElement(
            'div',
            { className: 'button', onClick: props.handleClick },
            '\u041F\u0440\u043E\u0432\u0435\u0440\u0438\u0442\u044C'
        ),
        React.createElement(
            'div',
            { className: 'results', style: props.styleResult },
            props.result
        )
    );
};

ReactDOM.render(React.createElement('div', null, React.createElement(Main, null)), document.getElementById('test'));
