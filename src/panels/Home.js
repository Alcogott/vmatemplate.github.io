import React from 'react'
import PropTypes from 'prop-types'
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel'
import Group from '@vkontakte/vkui/dist/components/Group/Group'
// import Button from '@vkontakte/vkui/dist/components/Button/Button'
import Div from '@vkontakte/vkui/dist/components/Div/Div'

import './Persik.css'

const backgroundImage = 'https://i.pinimg.com/originals/f2/cd/cd/f2cdcd38244b172234eb35cc408d0a13.jpg'

const Home = ({ id, go, fetchedUser }) => (
  <Panel id={id}>
    <div
      style={{
        width: '700px',
        height: '500px',
        backgroundImage: `url(${backgroundImage})`
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
          {/* <Button size='xl' level='2' onClick={go} data-to='persik'>
            Go
          </Button> */}
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
