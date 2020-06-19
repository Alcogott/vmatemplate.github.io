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

class Final extends React.Component {
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
      id: PropTypes.func,
      receivedData: PropTypes.any
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
          <h1 id='greeting' className='one'>Title</h1>
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
          Финал
        </PanelHeader>
        <Div>
          {renderedQuestions[this.state.currentQuestion]}
        </Div>
      </Panel>
    )
  }
}

export default Final
