import AppNavigation from './AppNavigation.js'

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
        <h2>pageok</h2>
      </>
    )
  }

}
