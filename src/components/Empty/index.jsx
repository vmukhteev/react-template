import styles from '../../theme/styles/index.scss';
import CSSModules from 'react-css-modules';

class Component extends React.Component {
  render() {
    const {
      view = 'default'
    } = this.props;

    return (
      <div className={classNames([`NAME--view-${view}`])}>

      </div>
    )
  }
}

export default CSSModules(Component, styles, {
  allowMultiple: true,
  handleNotFoundStyleName: 'ignore'
});

