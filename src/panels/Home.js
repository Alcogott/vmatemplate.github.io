import React from 'react'
import PropTypes from 'prop-types'
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel'
import Group from '@vkontakte/vkui/dist/components/Group/Group'
import Div from '@vkontakte/vkui/dist/components/Div/Div'

import './Persik.css'

const axios = require('axios')
let data = {}
axios.get('https://dmitrii-shulgin.noname.team:8443/quiz/1')
  .then(function (response) {
    data = response.data.startPage
  })
  .catch(function (error) {
    console.log(error)
  })

const Home = ({ id, go, fetchedUser }) => (
  <Panel id={id}>
    <div
      style={{
        backgroundImage: `url(${data.image})`,
        height: '88vh'

      }}
    >
      {fetchedUser &&
        <Group title='Navigation Example'>
          <Div>
            <h1 id='greeting' className='one'> Привет, {`${fetchedUser.first_name}`} </h1>
            <br />
            <div className='StartScreen'>
              <h4 id='greeting'> {`${data.title}`} </h4>
              <br />
              <h4 id='greeting'> {`${data.description}`} </h4>
            </div>
            <button id='goto' data-to='persik' onClick={go}> Начать </button>
          </Div>
        </Group>}
    </div>
  </Panel>
)

Home.propTypes = {
  id: PropTypes.string.isRequired,
  go: PropTypes.func.isRequired,
  fetchedUser: PropTypes.shape({
    first_name: PropTypes.string,
    last_name: PropTypes.string
  })
}

export default Home
