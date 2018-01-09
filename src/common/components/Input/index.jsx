
export default class Input extends React.Component {
  componentWillReceiveProps(nextProps) {
    if(nextProps.value !== this.props.value){
      if(typeof(this.props.onChange) === 'function'){
        this.props.onChange(nextProps.value)
      }
    }
  }
  render() {
    return (
      <input {...this.props} onChange={(e) => {this.props.onChange(e.target.value)}} ref={ ref => this.element = ref }/>
    )
  }
}

