
import { IAppChildProps } from './App.js'

export default class AppNavigation extends React.Component<IAppChildProps> {
  public render () {
    return (
      <div id='navbar' className={'navbar theme-' + this.props.theme}>
        <a href='/' className='navbar-brand'>Dokkit</a>
      </div>
    )
  }
}
