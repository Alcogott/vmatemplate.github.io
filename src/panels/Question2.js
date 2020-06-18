import React from 'react'
import PropTypes from 'prop-types'
import { platform, IOS } from '@vkontakte/vkui'
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel'
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader'
import PanelHeaderButton from '@vkontakte/vkui/dist/components/PanelHeaderButton/PanelHeaderButton'
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back'
import Icon24Back from '@vkontakte/icons/dist/24/back'
import Div from '@vkontakte/vkui/dist/components/Div/Div'

import './Persik.css'

const osName = platform()

const Question2 = (props, {go}) => (
  <Panel id={props.id}>
    <PanelHeader
      left={
        <PanelHeaderButton onClick={() => props.go} data-to='home'>
          {osName === IOS ? <Icon28ChevronBack /> : <Icon24Back />}
        </PanelHeaderButton>
      }
    >
      Вопрос 2
    </PanelHeader>
    <Div>
        <h1 id='greeting' className='one'> Привет </h1>
        <br />
        <div className='StartScreen'>
          <h4 id='greeting'> Это второй вопрос </h4>
          <br />
          <h4 id='greeting'> Держу в курсе </h4>
          </div>
        {/* <button id='goto' data-to='persik' onClick={go}> Начать </button> */}
      </Div>

  </Panel>
)

Question2.propTypes = {
  id: PropTypes.string.isRequired,
  go: PropTypes.func.isRequired
}

export default Question2
