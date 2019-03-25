import { AppContent } from './AppContent.js'
import AppNavigation from './AppNavigation.js'
import { AppSidebar } from './AppSidebar.js'

interface IAppProps {
  specialPrefix: string
  specialCaseSensitive: boolean
}

interface IAppState {
  theme: string
}

/** A property interface for all direct children of the app */
export interface IAppChildProps {
  app: App
  theme: string
}

/**
 * The main app {@link React.Component Component} for Dokkit
 */
export default class App extends React.Component<IAppProps, IAppState> {

  public constructor (props: IAppProps) {
    super(props)
    this.state = {
      theme: 'generic'
    }
  }

  /** @inheritdoc */
  public render () {
    return (
      <>
        <AppNavigation app={this} theme={this.state.theme} />
        <div className='container container-fluid container-main'>
          <AppSidebar app={this} theme={this.state.theme} />
          <AppContent app={this} theme={this.state.theme} />
        </div>
      </>
    )
  }

}
