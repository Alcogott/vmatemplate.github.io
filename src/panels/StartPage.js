import React from 'react'
import axios from 'axios'
import PropTypes from 'prop-types'
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel'
import Group from '@vkontakte/vkui/dist/components/Group/Group'
import Div from '@vkontakte/vkui/dist/components/Div/Div'
import constants from './Constants'

import './Style.css'

class StartPage extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      data: {}
    }
  }

  static get propTypes () {
    return {
      go: PropTypes.any,
      id: PropTypes.func,
      fetchedUser: PropTypes.any
    }
  }

  async componentDidMount () {
    const response = await axios.get(constants.URL)
    this.setState({
      data: response.data.startPage
    })
  }

  render () {
    return (
      <Panel id={this.props.id}>
        {this.props.fetchedUser &&
          <Group id='main'>
            <Div id='startPage'>
              <h1 id='greetings'>Привет, {this.props.fetchedUser.first_name}!</h1>
              <h4 id='title'>{this.state.data.title} </h4>
              <h4 id='description'>{this.state.data.description}</h4>
              <img id='logo' src={this.state.data.image} alt='' />
            </Div>
            <Div id='nextScreen'>
              <button id='nextScreen__button' data-to='questions' onClick={(e) => this.props.go(e)}>Начать</button>
            </Div>
          </Group>}
      </Panel>
    )
  }
}
export default StartPage
