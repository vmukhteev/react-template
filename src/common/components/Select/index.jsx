import Select from 'react-select';

export default class SelectM extends React.Component {
  componentDidMount() {
    setTimeout(() => { //чтобы this.props.value было актуально, если задано предварительно снаружи
      if(this.props.options && this.props.options.length === 1) {
        if(!this.props.value) { //проверка требуется, чтобы избежать события change
          this.element && this.element.selectValue(this.props.options[0]);
        }
      }
    });
  }

  componentWillReceiveProps(newProps) {
      if(this.props.options !== newProps.options) {
        if(newProps.options.length === 1) {
          this.element && this.element.selectValue(newProps.options[0]);
        }
      }
  }

  render() {
    const {...props} = this.props;

    return (
      <Select {...props} ref={ref => this.element = ref }/>
    )
  }
}

