import React from 'react'
import bridge from '@vkontakte/vk-bridge'
import { platform, IOS } from '@vkontakte/vkui'
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel'
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader'
import PanelHeaderButton from '@vkontakte/vkui/dist/components/PanelHeaderButton/PanelHeaderButton'
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back'
import Icon24Back from '@vkontakte/icons/dist/24/back'
import Div from '@vkontakte/vkui/dist/components/Div/Div'
import PropTypes from 'prop-types'

import './Style.css'

const osName = platform()

class Final extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  static get propTypes () {
    return {
      go: PropTypes.any,
      id: PropTypes.func,
      quiz: PropTypes.object,
      result: PropTypes.object
    }
  }

  render () {
    return (
      <Panel id={this.props.id}>
        <PanelHeader
          left={
            <PanelHeaderButton onClick={(e) => this.props.go(e)} data-to='home'>
              {osName === IOS ? <Icon28ChevronBack /> : <Icon24Back />}
            </PanelHeaderButton>
          }
        >
          Результат
        </PanelHeader>
        <Div id='final'>
          <h1 id='greetings'>Поздравляем! Ваш кофе - это {this.props.result.title}</h1>
          <Div id='actions'>
            <button
              id='action' onClick={(e) => {
                bridge.send('VKWebAppShowWallPostBox', {
                  message: this.props.quiz.repostMessage.split('|').join(` ${this.props.result.title} `),
                  attachments: this.props.quiz.link
                })
              }}
            >
              Поделиться с друзьями
            </button>
            <button
              id='action' onClick={(e) => {
                bridge.send('VKWebAppShowStoryBox', {
                  background_type: 'image',
                  url: 'https://sun9-65.userapi.com/c850136/v850136098/1b77eb/0YK6suXkY24.jpg'
                })
              }}
            >
              История
            </button>
            <button
              id='action' onClick={() => {
                bridge.send('VKWebAppJoinGroup', { group_id: parseInt(this.props.quiz.community, 10) })
              }}
            >
              Подписаться на сообщество
            </button>
          </Div>
        </Div>
      </Panel>
    )
  }
}

export default Final
