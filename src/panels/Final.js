import React from 'react'
import { platform, IOS } from '@vkontakte/vkui'
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel'
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader'
import PanelHeaderButton from '@vkontakte/vkui/dist/components/PanelHeaderButton/PanelHeaderButton'
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back'
import Icon24Back from '@vkontakte/icons/dist/24/back'
import Div from '@vkontakte/vkui/dist/components/Div/Div'
import PropTypes from 'prop-types'

import './Persik.css'

const osName = platform()

class Final extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
    }
  }

  static get propTypes () {
    return {
      go: PropTypes.any,
      id: PropTypes.func,
      receivedData: PropTypes.object
    }
  }

  render () {
    return (
      <Panel id={this.props.id}>
        <PanelHeader
          left={
            <PanelHeaderButton onClick={(e) => this.props.go(e)} data-to='home'>
              {osName === IOS ? <Icon28ChevronBack /> : <Icon24Back />}
            </PanelHeaderButton>
          }
        >
          Title
        </PanelHeader>
        <Div>
          {this.props.receivedData}
        </Div>
      </Panel>
    )
  }
}

export default Final
