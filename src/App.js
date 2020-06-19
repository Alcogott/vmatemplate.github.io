import React from 'react'
import bridge from '@vkontakte/vk-bridge'
import View from '@vkontakte/vkui/dist/components/View/View'
import ScreenSpinner from '@vkontakte/vkui/dist/components/ScreenSpinner/ScreenSpinner'
import '@vkontakte/vkui/dist/vkui.css'

import Home from './panels/Home'
import Persik from './panels/Questions'
import Final from './panels/Final'
import './panels/Persik.css'

class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      activePanel: 'home',
      fetchedUser: {},
      popout: <ScreenSpinner size='large' />,
      value: {}
    }
  }

  async componentDidMount () {
    bridge.subscribe(({ detail: { type, data } }) => {
      if (type === 'VKWebAppUpdateConfig') {
        const schemeAttribute = document.createAttribute('scheme')
        schemeAttribute.value = data.scheme ? data.scheme : 'client_dark'
        document.body.attributes.setNamedItem(schemeAttribute)
      }
    })
    const user = await bridge.send('VKWebAppGetUserInfo')
    this.setState({
      fetchedUser: user,
      popout: null
    })
  }

  parentFunction=(dataFromChild) => {
    this.setState({ value: dataFromChild })
  }

  go = e => {
    this.setState({ activePanel: e.currentTarget.dataset.to })
  }

  render () {
    console.log(this.state.value)
    return (
      <View className='main' activePanel={this.state.activePanel} popout={this.state.popout}>
        <Home id='home' fetchedUser={this.state.fetchedUser} go={this.go} />
        <Persik id='persik' functionCallFromParent={this.parentFunction.bind(this)} go={this.go} />
        <Final id='final' valueFromParent={this.state.value_key} go={this.go} />
      </View>
    )
  }
}

export default App
