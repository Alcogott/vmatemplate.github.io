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
      checkedValue: {},
      receivedData: {},
      applicationLink: '',
      communityId: ''
    }
  }

  static get propTypes () {
    return {
      go: PropTypes.any,
      id: PropTypes.func,
      updateData: PropTypes.func
    }
  }

  async componentDidMount () {
    const response = await axios.get('https://dmitrii-shulgin.noname.team:8443/quiz/3')

    this.setState({
      applicationLink: response.data.applicationLink,
      communityId: response.data.communityId,
      repostMessage: response.data.repostMessage,
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
              axios.post('https://dmitrii-shulgin.noname.team:8443/quiz/3/think', {
                responses: this.state.usersAnswers
              }).then((res) => {
                this.props.updateData({ result: res.data, quiz: { link: this.state.applicationLink, community: this.state.communityId, repostMessage: this.state.repostMessage } })
              })
            }
          }}
        > Ответить
        </button>
      </Panel>
    )
  }
}

export default Persik
