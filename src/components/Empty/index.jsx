import './style';

export default class extends React.Component {
  render() {
    const {
      className,
      view='default'
    } = this.props;

    return (
      <div className={classNames([className, `[NAME]--view-${view}`])}>

      </div>
    )
  }
}

