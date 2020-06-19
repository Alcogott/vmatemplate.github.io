import React from 'react'
import { platform, IOS } from '@vkontakte/vkui'
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel'
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader'
import PanelHeaderButton from '@vkontakte/vkui/dist/components/PanelHeaderButton/PanelHeaderButton'
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back'
import Icon24Back from '@vkontakte/icons/dist/24/back'
import Div from '@vkontakte/vkui/dist/components/Div/Div'
import axios from 'axios'
import PropTypes from 'prop-types'

import './Persik.css'

const osName = platform()

class Persik extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      questions: [],
      usersAnswers: [],
      checkedValue: {}
    }
  }

  static get propTypes () {
    return {
      go: PropTypes.any,
      id: PropTypes.func
    }
  }

  async componentDidMount () {
    const response = await axios.get('https://dmitrii-shulgin.noname.team:8443/quiz/1')

    this.setState({
      questions: response.data.questions,
      currentQuestion: 0
    })
  }

  render () {
    const renderedQuestions = this.state.questions.map((question) => {
      return (
        <div key={question.id}>
          <h1 id='greeting' className='one'>{question.title}</h1>
          {question.answers.map((answer) => (
            <div key={answer.id} className='StartScreen'>
              <div className='radio'>
                <label key={answer.id}>
                  <p className='answer'>
                    <input id={`${answer.id}`} name='radiob' type='radio' value={`${answer.title}`} onChange={() => this.setState({ checkedValue: { questionId: question.id, answerId: answer.id } })} />
                    {`${answer.title}`}
                  </p>
                </label>
              </div>
            </div>
          ))}
        </div>
      )
    })
    return (
      <Panel id={this.props.id}>
        <PanelHeader
          left={
            <PanelHeaderButton onClick={(e) => this.props.go(e)} data-to='home'>
              {osName === IOS ? <Icon28ChevronBack /> : <Icon24Back />}
            </PanelHeaderButton>
          }
        >
          Вопрос {this.state.currentQuestion + 1}
        </PanelHeader>
        <Div>
          {renderedQuestions[this.state.currentQuestion]}
        </Div>
        <button
          id='goto2' data-to='final' onClick={(e) => {
            this.setState({
              usersAnswers: this.state.usersAnswers.push(this.state.checkedValue)
            })
            if (this.state.currentQuestion < this.state.questions.length - 1) {
              this.setState({
                ...this.state,
                currentQuestion: this.state.currentQuestion + 1
              })
            } else {
              console.log(this.state.usersAnswers)
              axios.post('https://dmitrii-shulgin.noname.team:8443/quiz/1/think', {
                responses: this.state.usersAnswers
              }).then((res) => {
                console.log(res.data)
              })
              this.props.go(e)
            }
          }}
        > Ответить
        </button>
      </Panel>
    )
  }
}

// const Persik = (props) => {

//   const [answers, setAnswers] = useState([])
//   const [checkedValue, setCheckedValue] = useState('')
//   const [questions, setQuestions] = useState([])
//   const [usersAnswers, setUserAnswer] = useState([])
//   const [questArrLength, setLength] = useState (0)
//   const [questionIndex,setIndex] = useState(0)
//   let j = questionIndex

//   const getNextQuestion = () => {
//     if (questionIndex < questions){
//       // console.log(checkedValue)
//       setUserAnswer([...usersAnswers, { questionid: questions.id, answerid: checkedValue }])
//       j+=1
//       if(j <= questArrLength-1){
//         setIndex(j)
//       }
//     }
//   }

//   useEffect(() => {
//     axios.get('https://dmitrii-shulgin.noname.team:8443/quiz/1')
//       .then(res => {
//         setQuestions(res.data.questions)
//       })
//       .catch(err => {
//         console.log(err)
//       })
//   })

//   console.log('questions', questions[0].title)

//   return (
//     <Panel id={props.id}>
//       <PanelHeader
//         left={
//           <PanelHeaderButton onClick={(e) => props.go(e)} data-to='home'>
//             {osName === IOS ? <Icon28ChevronBack /> : <Icon24Back />}
//           </PanelHeaderButton>
//         }
//       >
//         {console.log(usersAnswers)}
//         Вопрос {`${questionIndex + 1}`}
//       </PanelHeader>
//       <Div>
// <h1 id='greeting' className='one'> {`${questions.title}`}</h1>
//         <br />
// <div className='StartScreen'>
//   <div className='radio'>
//             {answers.map(answer => (
// <label key={answer.id}>
//   <p className='answer'>
//     <input id={`${answer.id}`} name='radiob' type='radio' value={`${answer.title}`} onChange={() => setCheckedValue(answer.id)} />
//     {`${answer.title} ${questions.id}`}
//   </p>
// </label>
//             ))}
//           </div>
//         </div>
//         <button id='goto2' data-to='final' onClick={() => getNextQuestion()}> Ответить </button>
//       </Div>

//     </Panel>
//   )
// }

export default Persik
