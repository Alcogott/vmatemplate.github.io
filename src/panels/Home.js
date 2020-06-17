import React from 'react'
import PropTypes from 'prop-types'
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel'
import Group from '@vkontakte/vkui/dist/components/Group/Group'
import Div from '@vkontakte/vkui/dist/components/Div/Div'

const Home = ({ id, go }) => (
  <Panel id={id}>
    <Group title='Navigation Example'>
      <Div> </Div>
    </Group>
  </Panel>
)

Home.propTypes = {
  id: PropTypes.string.isRequired,
  go: PropTypes.func.isRequired
}

export default Home
