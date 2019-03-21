
import { IAppChildProps } from './App.js'

export default class Navigation extends React.Component<IAppChildProps> {
  public render () {
    return (
      <div id='navbar' className={'navbar theme-' + this.props.theme}>
        <a href='/'>Navbar</a>
      </div>
    )
  }
}
