import './style.scss';

export default class extends React.Component {
  state = {};
  toggle = () => {
    this.setState({checked: !this.state.checked});
  };
  componentWillMount() {
    this.setState({checked: !!this.props.checked || false});
  }
  componentDidMount() {

  }
  render() {
    const {className} = this.props;
    return (
      <div className={classNames(['checkbox', this.state.checked && 'checkbox--checked', className])} onClick={this.toggle}>
        {this.props.children}
      </div>
    )
  }

}

