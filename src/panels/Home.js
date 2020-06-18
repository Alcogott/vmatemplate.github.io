import React from 'react'
import PropTypes from 'prop-types'
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel'
import Group from '@vkontakte/vkui/dist/components/Group/Group'
import Div from '@vkontakte/vkui/dist/components/Div/Div'

import './Persik.css'

const backgroundImage = 'https://sun9-72.userapi.com/c855336/v855336345/13ca7f/4dztLT5lb_A.jpg'

const Home = ({ id, go, fetchedUser }) => (
  <Panel id={id}>
    <div
      style={{
        backgroundImage: `url(${backgroundImage})`,
        height: '88.5vh',
      }}
    >
      {fetchedUser &&
        <Group title='Navigation Example'>
          <Div>
            <h1 id='greeting'> Привет {`${fetchedUser.first_name}`} </h1>
            <br />
            <div className='StartScreen'>
              <h4 id='greeting'> Title </h4>
              <br />
              <h4 id='greeting'> Description </h4>
            </div>
            <button id='goto' data-to='persik' onClick={go}> Go </button>
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
