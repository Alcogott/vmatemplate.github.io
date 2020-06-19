import React, { useState, useEffect } from 'react'
import bridge from '@vkontakte/vk-bridge'
import View from '@vkontakte/vkui/dist/components/View/View'
import ScreenSpinner from '@vkontakte/vkui/dist/components/ScreenSpinner/ScreenSpinner'
import '@vkontakte/vkui/dist/vkui.css'

import Home from './panels/Home'
import Persik from './panels/Persik'
import Final from './panels/Final'
import './panels/Persik.css'

const App = () => {
  const [activePanel, setActivePanel] = useState('home')
  const [fetchedUser, setUser] = useState(null)
  const [popout, setPopout] = useState(<ScreenSpinner size='large' />)

  useEffect(() => {
  // Определение цветовой схемы пользователя
    bridge.subscribe(({ detail: { type, data } }) => {
      if (type === 'VKWebAppUpdateConfig') {
        const schemeAttribute = document.createAttribute('scheme')
        schemeAttribute.value = data.scheme ? data.scheme : 'client_dark'
        document.body.attributes.setNamedItem(schemeAttribute)
      }
    })
    // Получение данных пользователя
    async function fetchData () {
      const user = await bridge.send('VKWebAppGetUserInfo')
      setUser(user)
      setPopout(null)
    }
    fetchData()
  }, [])

  // Переход по экранам
  const go = e => {
    setActivePanel(e.currentTarget.dataset.to)
  }

  return (
    <View className='main' activePanel={activePanel} popout={popout}>
      <Home id='home' fetchedUser={fetchedUser} go={go} />
      <Persik id='persik' go={go} />
      <Final id='final' go={go} />
    </View>
  )
}

export default App
