import React from 'react'
import PropTypes from 'prop-types'
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel'
import Group from '@vkontakte/vkui/dist/components/Group/Group'
import Div from '@vkontakte/vkui/dist/components/Div/Div'
import axios from 'axios'

import './Persik.css'

class Home extends React.Component {
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
    const response = await axios.get('https://dmitrii-shulgin.noname.team:8443/quiz/3')
    this.setState({
      data: response.data.startPage
    })
  }

  render () {
    return (
      <Panel id={this.props.id}>
        <div
          // style={{
          //   backgroundImage: `url(${this.state.data.image})`,
          //   height: '88vh'
          // }}
        >
          {this.props.fetchedUser &&
            <Group title='Navigation Example'>
              <Div>
                <h1 style={{
                  fontSize: '24px'
                }}
                  id='greeting' className='one'> Привет, {`${this.props.fetchedUser.first_name}!`} </h1>
                <br />
                <div
                  style={{
                    maxWidth: '300px',
                  }}
                  className='StartScreen'>
                  <h4 id='greeting'> {`${this.state.data.title}`} </h4>
                  <br />
                  <h4 id='greeting'> {`${this.state.data.description}`} </h4>
                  <img
                    style={{
                    width: '200px'
                  }}
                    src={this.state.data.image} />
                </div>
                <button id='goto' data-to='persik' onClick={(e) => this.props.go(e)}> Начать </button>
              </Div>
            </Group>}
        </div>
      </Panel>
    )
  }
}
export default Home
