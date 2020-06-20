import React from 'react'
import bridge from '@vkontakte/vk-bridge'
import View from '@vkontakte/vkui/dist/components/View/View'
import ScreenSpinner from '@vkontakte/vkui/dist/components/ScreenSpinner/ScreenSpinner'
import '@vkontakte/vkui/dist/vkui.css'

import StartPage from './panels/StartPage'
import Questions from './panels/Questions'
import Final from './panels/Final'
import './panels/Style.css'

class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      activePanel: 'home',
      fetchedUser: {},
      popout: <ScreenSpinner size='large' />,
      quiz: {},
      result: {}
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
    this.setState({ activePanel: 'final', result: data.result, quiz: data.quiz })
  }

  go = e => {
    this.setState({ activePanel: e.currentTarget.dataset.to })
  }

  render () {
    return (
      <View className='main' activePanel={this.state.activePanel} popout={this.state.popout}>
        <StartPage id='home' fetchedUser={this.state.fetchedUser} go={this.go} />
        <Questions id='questions' updateData={this.updateData} go={this.go} />
        <Final id='final' quiz={this.state.quiz} result={this.state.result} go={this.go} />
      </View>
    )
  }
}

export default App
