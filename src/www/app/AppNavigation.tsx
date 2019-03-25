
import { IAppChildProps } from './App.js'

export default class AppNavigation extends React.Component<IAppChildProps> {

  public render () {
    return (
      <div id='navbar' className={'navbar theme-' + this.props.theme}>
        <div className='navbar-wrapper-left'>
          <a href='/' className='navbar-brand'>Dokkit</a>
        </div>
      </div>
    )
  }
}
