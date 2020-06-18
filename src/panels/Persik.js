import React, { useState} from 'react'
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
  const [answers,setAnswers] = useState(null)
  const [checkedValue,setCheckedValue] = useState(null)
  const [questions,setQuestions] = useState(null)

  axios.get('https://dmitrii-shulgin.noname.team:8443/quiz/1')
  .then(function (response) {
    setQuestions(response.data.questions)
    console.log(questions)
  })
  .catch(function (error) {
    console.log(error)
  })

  function getNextQuestion () {
    setAnswers(answers.push(checkedValue))
  }

  return(
    <Panel id={props.id}>
      <PanelHeader
        left={
          <PanelHeaderButton onClick={() => props.go} data-to='home'>
            {osName === IOS ? <Icon28ChevronBack /> : <Icon24Back />}
          </PanelHeaderButton>
        }
      >
        Вопрос 1
      </PanelHeader>
      <Div>
        <h1 id='greeting' className='one'> {`${questions[0].title}`} </h1>
        <br />
        <div className='StartScreen'>
          <div className='radio'>
            <label>
              <p className='answer'>
                <input id='loh' name='radiob' type='radio' value={`${questions[0].answers[0].title}`} onChange={setCheckedValue(this.value)} /> 
                {`${questions[0].answers[0].title}`}
              </p>
            </label>
            <label>
              <p className='answer'>
                <input id='pidor' name='radiob' type='radio' value={`${questions[0].answers[1].title}`} onChange={setCheckedValue(this.value)} /> 
                {`${questions[0].answers[1].title}`}
              </p>
            </label>
            <label>
              <p className='answer'>
                <input id='natural' name='radiob' type='radio' value={`${questions[0].answers[2].title}`} onChange={setCheckedValue(this.value)} /> 
                {`${questions[0].answers[2].title}`}
              </p>
            </label>
            <label>
              <p className='answer'>
                <input id='devka' name='radiob' type='radio' value={`${questions[0].answers[3].title}`} onChange={setCheckedValue(this.value)} /> 
                {`${questions[0].answers[3].title}`}
              </p>
            </label>
          </div>
        </div>
        <button id='goto2' data-to='question2' onClick={getNextQuestion()}> Ответить </button>
      </Div>

    </Panel>
    )
  }

  Persik.propTypes = {
    id: PropTypes.string.isRequired,
    go: PropTypes.func.isRequired
  }

export default Persik
