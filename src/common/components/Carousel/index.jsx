import './style.scss';
import 'owl.carousel/dist/assets/owl.carousel.css';
//TODO
require('owl.carousel');

export default class extends React.Component {
  ref = {};
  state = {
    visible: false
  };
  goTo = (index) => {
    this.owl.trigger('to.owl.carousel', [index]);
  };
  shift = (dir) => {
    const {onShift} = this.props;
    this.isArrowClocked = true;
    this.owl.trigger(`${dir}.owl.carousel`);
  };


  componentDidMount() {
    const {onChange, options, active, onDrag, onShift, onTranslate, isEqualHeight = 1} = this.props;
    const {carousel} = this.ref;
    this.owl = $(carousel).owlCarousel({
      loop: true,
      items:1,
      center: true,
      nav: true,
      ...options
    });
    if(isEqualHeight) {
      setTimeout(() => {
        this.owl.find('.owl-item').height(this.owl.find('.owl-stage').height());
      }, 0);
      this.owl.on('refresh.owl.carousel', (e) => {
        this.owl.find('.owl-item').height('');
      });
      this.owl.on('refreshed.owl.carousel', (e) => {
        this.owl.find('.owl-item').height(this.owl.find('.owl-stage').height());
      });
    }
    if(onChange) {
      this.owl.on('changed.owl.carousel', (e) => {
        onChange(e.page.index);
      });
    }
    if(onTranslate) {
      this.owl.on('translate.owl.carousel', (e) => {
        onTranslate();
      });
    }
    if(onDrag) {
      this.owl.on('drag.owl.carousel', (e) => {
        onDrag();
      });
    }
    if(active) {
      this.owl.trigger('to.owl.carousel', [active]);
    }
    if(onShift) {
      this.owl.on('changed.owl.carousel', (e) => {
        setTimeout(() => {
          if(this.isArrowClocked)
          {
            this.isArrowClocked = false;
            onShift(e.page.index);
          }
        }, 0);
      });
    }
    this.scrollListener = () => {
      this.setState({
        visible: isVisible(carousel)
      });
    };
    this.scrollListener();
    $(window).scroll(this.scrollListener);
  }
  componentDidUpdate(prevProps, prevState) {

    if(this.state.visible !== prevState.visible) {
      //TODO хак
      //play.owl.autoplay не работает
      this.owl.trigger('to.owl.carousel', [1, 0]);
      this.owl.trigger('to.owl.carousel', [0, 0]);
    }
  }
  componentWillUnmount() {
    this.owl.trigger('destroy.owl.carousel');
    $(window).unbind('scroll', this.scrollListener);
  }
  render() {
    const {className, items} = this.props;
    return (
      <div className={classNames(['b-carousel', className])}>
        <div className={classNames(['owl-carousel'])} ref={(ref) => {this.ref.carousel = ref;}}>
          {items}
        </div>
        <div className="b-carousel_arrows">
          <div className="b-carousel_arrow b-carousel_arrow--prev" onClick={() => { this.shift('prev'); }} />
          <div className="b-carousel_arrow b-carousel_arrow--next" onClick={() => { this.shift('next'); }} />
        </div>
      </div>
    )
  }
}

function isVisible(elem)
{
  const docViewTop = $(window).scrollTop();
  const docViewBottom = docViewTop + $(window).height();

  const elemTop = $(elem).offset().top;
  const elemBottom = elemTop + $(elem).height();

  return ((elemTop <= docViewBottom) && (elemBottom >= docViewTop));
}