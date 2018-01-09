import Scroll from '../Scroll2'
import {SCROLLBAR_WIDTH} from '../../basic';

export default class Modal extends React.Component {
  static count = 0;
  state = {};
  componentDidMount() {
    const {overlay, overlayContent, modal, close1, close2} = this.refs;
    $(overlay).click((e) => {
      if(e.target === overlay || e.target === overlayContent || e.target === close1 ||  e.target === close2){
        this.close();
      }
    });
    this.bodyScrollTop = $(document).scrollTop();
    $('html').addClass('xModal-open');
    $('body').css({
      marginRight: SCROLLBAR_WIDTH
    });
    if(false) {
      $(overlay).insertAfter($(`body > .xModal-overlay`).eq(Modal.count - 1));
    }
    else {
      $('body').prepend(overlay)
    }
    $(overlay).scroll((e) => {
      $(window).trigger('scroll', e);
    });
    Modal.count++;
  }
  componentWillUnmount() {
    Modal.count--;
    const {overlay} = this.refs;
    if(Modal.count === 0) {
      $('html').removeClass('xModal-open');
      $('body').css({
        marginRight: ''
      });
      if(device.mobile()) {
        $(document).scrollTop(this.bodyScrollTop);
      }
    }
    $(overlay).remove();
  }
  render() {
    const {closeText, customHeader, view = 'default', title, logoLink, className} = this.props;

    return (
      <div style={{position: 'static'}}>
        <div
          className
            ={classNames([
            className,
            'xModal-overlay',
            `xModal-overlay--view-${view}`,
            '--scrollHost',
            this.state.willClose && 'xModal-overlay--will-close'
          ])}
          ref='overlay'
        >
          <Scroll>
            <div className={classNames(['xModal-overlay_content'])} ref='overlayContent'>
              <div className={classNames([
                'xModal',
                closeText ? 'xModal--custom-close':''
              ])} ref="xModal"
              >
                <div className="xModal_content">
                  {this.props.children}
                </div>
              </div>
            </div>
          </Scroll>
        </div>
      </div>
    )
  }
  close = () => {
    this.setState(
      {
        willClose: true
      }
    );
    setTimeout(() => {
      this.props.onClose && this.props.onClose();
    }, 300);
  };
}

