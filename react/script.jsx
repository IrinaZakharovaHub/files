class Menu extends React.Component {
    render() {
        let menu = [
            'home',
            'about us',
            'contacts'
        ];
        return <div>
            {menu.map((el, i) => {
                return <Link key={i} label={el}/>
            })}
        </div>
    }
}

const Link = (props) => {
    const url = '/' + props.label.toLowerCase().trim().replace(' ', '-');
    return (
        <a className="link" href={url}>{props.label}</a>
    )
};

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            buttonStyle: {filter: 'blur(10px)'},
            active: true,
            disabled: false
        };
        this.state.handleClick = this.handleClick.bind(this);

    }

    handleClick() {
        this.setState({
            buttonStyle: {filter: ''},
            active: true,
            disabled: true
        });
        let time = setTimeout(() => {
            this.setState({
                buttonStyle: {filter: 'blur(10px)'},
                active: false,
                disabled: false
            });
            clearTimeout(time);
        }, 30000);

    }

    render() {
        return (
            <div>
                <Header {...this.state}/>
                <Form {...this.state}/>
            </div>
        )
    }
}

class Header extends React.Component {

    render() {
        return (
            <div className="main">
                <div className="instructions">
                    Прочтите текст за 1 минуту и пройдите короткий опрос. <br></br>
                    Узнайте свой уровень внимательности!
                </div>
                <Button handleClick={this.props.handleClick} disable={this.props.disabled}/>
                <Text {...this.props} />
            </div>

        )
    }
}


const Text = (props) => {
    return (
        <div className={`text`} style={props.buttonStyle}>
            <p>
                Было холодное зимнее утро. Солнце еще не поднялось.
                Снег громко хрустел при каждом шаге, и все блестело и сияло под светом фонаря.
            </p>
            <p>
                На небе не было ни облачка, поэтому можно было легко разглядеть быстро приближающееся
                яркое пятно прямо над головами прохожих.
            </p>
            <p>
                Правда, этого никто не заметил, ведь все спешили по своим делам:
                на работу, в школу, аптеку, магазин, деловую встречу, поликлинику.
            </p>
            <p>
                Пятно тем временем все приближалось и уже выглядело
                на темном небе как раскаленный огненный шар.
                Вдруг женщина вскрикнула и отпрянула назад, гляда на небо.
                Люди мигом подняли головы.
            </p>
            <p>
                В этот момент время будто остановилось.
                Коренастый мужчина с седой бородой упал вниз, прикрывая голову руками,
                какой-то паренек, видимо, студент, остановился с широко раскрытыми
                от ужаса глазами, женщины визжали, и все это происходило бесконечно долго.
                Сам шар казалось тоже завис в небе, решаясь, что делать дальше.
            </p>
            <p>
                -Дзыыынь! 7:45. Что? Это был сон? Надо же, все так реалистично. Всего 30 минут,
                чтобы успеть собраться, чтобы потом полтора часа стоять в пробках, чтобы приехать
                на работу вовремя.
            </p>
        </div>
    )
};

const Button = (props) => {

    return (
        <div style={{display: 'flex'}}>
            <button className={`button`} onClick={props.handleClick} disabled={props.disable}>
                Начать
            </button>
        </div>
    )

};


class Form extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            question1:
                {
                    question: 'Какое время года описано в рассказе-сновидении?',
                    answers: [
                        {
                            answer: 'v-1',
                            text: 'Зима'

                        },
                        {
                            answer: 'v-2',
                            text: 'Весна'

                        },
                        {
                            answer: 'v-3',
                            text: 'Осень'

                        }
                    ],

                },
            question2:
                {
                    question: 'Какая была погода в рассказе-сновидении?',
                    answers: [
                        {
                            answer: 'v-4',
                            text: 'облачная'

                        },
                        {
                            answer: 'v-5',
                            text: 'ясная'

                        },
                        {
                            answer: 'v-6',
                            text: 'дождливая'

                        }
                    ],

                },
            question3:
                {
                    question: 'Сколько времени автор тратит на дорогу, чтобы вовремя приехать на работу?',
                    answers: [
                        {
                            answer: 'v-7',
                            text: '30 минут'

                        },
                        {
                            answer: 'v-8',
                            text: 'полтора часа'

                        },
                        {
                            answer: 'v-9',
                            text: 'два часа'

                        }
                    ],

                },
            result: 0,
            styleResult: {opacity: '0'}

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
        Object.keys(this.answers).map((e,i)=> {
            if(this.rightAnswers[e] === this.answers[e]) {
                arr.push(this.answers[e])
            }
        });
        this.setState({styleResult: {opacity: '1'}});
        switch (arr.length) {
            case 0:
                this.setState({result: 'Есть к чему стремиться!'});
                break;
            case 1:
                this.setState({result: 'Стоит тренироваться'});
                break;
            case 2:
                this.setState({result: 'У вас хорошая внимательнось'});
                break;
            case 3:
                this.setState({result: 'Вы очень внимательны :)'});
                break;


        }
    }

    render() {
        let active = this.props.active;
        if (!active) {
            return (
                <Question {...this.state} />
            )
        } else {
            return (
                <br></br>
            )
        }
    }


}

const Question = (props) => {
    return (
        <div className={
            'form'
        }>
            <div className={"form__block"}>
                <div className={"form__question"}>
                    {props.question1.question}
                </div>
                {
                    props.question1.answers.map((e, i) => {
                        return (
                            <div className={"form__answer"} key={i}>
                                <input id={e.answer} type={"radio"} name={"question1"} value={e.answer}
                                       onChange={props.handleRadio}></input>
                                <label htmlFor={e.answer}>
                                    {e.text}
                                </label>
                            </div>
                        )
                    })
                }

            </div>
            <div className={"form__block"}>
                <div className={"form__question"}>
                    {props.question2.question}
                </div>
                {
                    props.question2.answers.map((e, i) => {
                        return (
                            <div className={"form__answer"} key={i}>
                                <input id={e.answer} type={"radio"} name={"question2"} value={e.answer}
                                       onChange={props.handleRadio}></input>
                                <label htmlFor={e.answer}>
                                    {e.text}
                                </label>
                            </div>
                        )
                    })
                }

            </div>
            <div className={"form__block"}>
                <div className={"form__question"}>
                    {props.question3.question}
                </div>
                {
                    props.question3.answers.map((e, i) => {
                        return (
                            <div className={"form__answer"} key={i}>
                                <input id={e.answer} type={"radio"} name={"question3"} value={e.answer}
                                       onChange={props.handleRadio}></input>
                                <label htmlFor={e.answer}>
                                    {e.text}
                                </label>

                            </div>
                        )
                    })
                }

            </div>
            <div className="button" onClick={props.handleClick}>
               Проверить
            </div>

            <div className="results" style={props.styleResult}>
                {props.result}
            </div>
        </div>
    )
};



ReactDOM.render(
    React.createElement(
        'div',
        null,
        <Main/>
    ), document.getElementById('test'));