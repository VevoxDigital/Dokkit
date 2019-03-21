import Navigation from './Navigation.js'

interface IAppProps {
  specialPrefix: string
  specialCaseSensitive: boolean
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
export default class App extends React.Component<IAppProps> {

  /** @inheritdoc */
  public render () {
    return (
      <>
        <Navigation app={this} theme={this.props.theme} />
        <h2>pageok</h2>
      </>
    )
  }

}
