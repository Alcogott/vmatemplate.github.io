import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { platform, IOS } from '@vkontakte/vkui'
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel'
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader'
import PanelHeaderButton from '@vkontakte/vkui/dist/components/PanelHeaderButton/PanelHeaderButton'
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back'
import Icon24Back from '@vkontakte/icons/dist/24/back'
import Div from '@vkontakte/vkui/dist/components/Div/Div'
import axios from 'axios'

import './Persik.css'

const osName = platform()

const Persik = (props) => {
  const [answers, setAnswers] = useState([])
  const [checkedValue, setCheckedValue] = useState({ answerid: '' })
  const [questions, setQuestions] = useState([])
  const [usersAnswers, setUserAnswer] = useState([{ questionid: '', answerid: '' }])
  const i = 0

  const getNextQuestion = () => {
    setUserAnswer([...usersAnswers, { questionid: questions.id, answerid: checkedValue }])
  }

  useEffect(() => {
    axios.get('https://dmitrii-shulgin.noname.team:8443/quiz/1')
      .then(res => {
        setQuestions(res.data.questions[i])
        setAnswers(res.data.questions[i].answers)
      })
      .catch(err => {
        console.log(err)
      })
  })
  return (
    <Panel id={props.id}>
      <PanelHeader
        left={
          <PanelHeaderButton onClick={(e) => props.go(e)} data-to='home'>
            {osName === IOS ? <Icon28ChevronBack /> : <Icon24Back />}
          </PanelHeaderButton>
        }
      >
        Вопрос {`${i + 1}`}
      </PanelHeader>
      <Div>
        <h1 id='greeting' className='one'> {`${questions.title}`}</h1>
        <br />
        <div className='StartScreen'>
          <div className='radio'>
            {answers.map(answer => (
              <label key={answer.id}>
                <p className='answer'>
                  <input id={`${answer.id}`} name='radiob' type='radio' value={`${answer.title}`} onChange={() => setCheckedValue(answer.id)} />
                  {`${answer.title}`}
                </p>
              </label>
            ))}
          </div>
        </div>
        <button id='goto2' data-to='persik' onClick={() => getNextQuestion()}> Ответить </button>
      </Div>

    </Panel>
  )
}

Persik.propTypes = {
  id: PropTypes.string.isRequired,
  go: PropTypes.func.isRequired
}

export default Persik
