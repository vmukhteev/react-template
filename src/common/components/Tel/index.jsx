export default class extends React.Component {
  render() {
    const {
      className,
      view='default',
      children,
      phone
    } = this.props;

    const _phone = phone || children || '';

    return device.mobile() ?
      <a href={`tel:${_phone.replace(/[\s()-]*/g, '')}`} className={className} >
        {children}
      </a>
      :
      <span className={className} >
        {children}
      </span>
      ;
  }
}

