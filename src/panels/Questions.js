import React from 'react'
import axios from 'axios'
import PropTypes from 'prop-types'
import { platform, IOS, Group } from '@vkontakte/vkui'
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel'
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader'
import PanelHeaderButton from '@vkontakte/vkui/dist/components/PanelHeaderButton/PanelHeaderButton'
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back'
import Icon24Back from '@vkontakte/icons/dist/24/back'
import Div from '@vkontakte/vkui/dist/components/Div/Div'
import constants from './Constants'

import './Style.css'

const osName = platform()

class Questions extends React.Component {
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
    const response = await axios.get(constants.URL)

    this.setState({
      applicationLink: response.data.applicationLink,
      communityId: response.data.communityId,
      repostMessage: response.data.repostMessage,
      questions: response.data.questions,
      currentQuestion: 0
    })
  }

  goNextScreen = () => {
    this.setState({
      usersAnswers: [...this.state.usersAnswers, this.state.checkedValue]
    })
    if (this.state.currentQuestion < this.state.questions.length - 1) {
      this.setState({
        currentQuestion: this.state.currentQuestion + 1
      })
    } else {
      axios.post(constants.URL_THINK, {
        responses: this.state.usersAnswers
      }).then((res) => {
        this.props.updateData({
          result: res.data,
          quiz: {
            link: this.state.applicationLink,
            community: this.state.communityId,
            repostMessage: this.state.repostMessage
          }
        })
      })
    }
  }

  render () {
    const renderedQuestions = this.state.questions.map((question) => {
      return (
        <div key={question.id}>
          <h1 id='greetings'>{question.title}</h1>
          <div id='answers'>
            {question.answers.map((answer) => (
              <div id='answer' key={answer.id}>
                <label htmlFor={answer.id}>
                  <input
                    id={answer.id} type='radio' value={answer.title} onChange={() => {
                      this.setState({ checkedValue: { questionId: question.id, answerId: answer.id } })
                    }}
                  />
                  {answer.title}
                </label>
              </div>
            ))}
          </div>
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
        <Group id='main'>
          <Div id='questions'>
            {renderedQuestions[this.state.currentQuestion]}
          </Div>
          <Div id='nextScreen'>
            <button
              id='nextScreen__button' data-to='final' onClick={() => this.goNextScreen()}
            >
              Ответить
            </button>
          </Div>
        </Group>
      </Panel>
    )
  }
}

export default Questions
