import React from 'react'
import PropTypes from 'prop-types'
import { platform, IOS } from '@vkontakte/vkui'
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel'
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader'
import PanelHeaderButton from '@vkontakte/vkui/dist/components/PanelHeaderButton/PanelHeaderButton'
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back'
import Icon24Back from '@vkontakte/icons/dist/24/back'
// import Div from '@vkontakte/vkui/dist/components/Div/Div'
// import axios from 'axios'

import './Persik.css'

const osName = platform()

const Final = (props) => {
  return (
    <Panel id={props.id}>
      <PanelHeader
        left={
          <PanelHeaderButton onClick={(e) => props.go(e)} data-to='home'>
            {osName === IOS ? <Icon28ChevronBack /> : <Icon24Back />}
          </PanelHeaderButton>
        }
      >
        Финал
      </PanelHeader>
      {/* <Div>
        <h1 id='greeting' className='one'> {`${questions.title}`}</h1>
        <br />
        <div className='StartScreen'>
          <div className='radio'>
            {answers.map(answer => (
              <label key={answer.id}>
                <p className='answer'>
                  <input id={`${answer.id}`} name='radiob' type='radio' value={`${answer.title}`} onChange={() => setCheckedValue(answer.id)} />
                  {`${answer.title} ${questions.id}`}
                </p>
              </label>
            ))}
          </div>
        </div>
        <button id='goto2' data-to='persik' onClick={() => getNextQuestion()}> Ответить </button>
      </Div> */}
    </Panel>
  )
}

Final.propTypes = {
  id: PropTypes.string.isRequired,
  go: PropTypes.func.isRequired
}

export default Final
