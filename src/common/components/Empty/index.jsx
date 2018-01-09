import './style.scss';

export default class extends React.Component {
  componentDidMount() {

  }
  render() {
    const {className} = this.props;
    return (
      <div className={classNames([className])}>

      </div>
    )
  }

}

