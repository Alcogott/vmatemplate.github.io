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

  updateData = (data) => {
    this.setState({ value: data })
  }

  go = e => {
    this.setState({ activePanel: e.currentTarget.dataset.to })
  }

  render () {
    return (
      <View className='main' activePanel={this.state.activePanel} popout={this.state.popout}>
        <Home id='home' fetchedUser={this.state.fetchedUser} go={this.go} />
        <Persik id='persik' updateData={this.updateData} go={this.go} />
        <Final id='final' val={this.state.value} go={this.go} />
      </View>
    )
  }
}

export default App
