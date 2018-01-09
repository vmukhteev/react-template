export default class Menu extends React.Component {
  state = {
    isExpanded: false,
    isRestExpanded: false
  };
  componentDidMount() {
    this.fParams = this.f(); //нужно удалять обработчкий resize и menuCopy при обновлении компонента

    $(document).click(() => {
      setTimeout(() => {
        if(this.isOpening) {
          this.isOpening = false;
        }
        else {
          if(this.state.isExpanded || this.state.isRestExpanded) {
            this.setState({
              isExpanded: false,
              isRestExpanded: false
            })
          }
        }
      }, 0);
    })
  }
  componentDidUpdate(oldProps) {
    if(this.props.items && oldProps.items !== this.props.items) {
      this.fParams.$menuCopy && this.fParams.$menuCopy.remove();
      this.fParams.resize && $(window).unbind('resize', this.fParams.resize);
      this.fParams = this.f();
    }
  }
  render() {
    const {className, items, active} = this.props;
    const {isExpanded, isRestExpanded} = this.state;
    return (
      <div className={classNames([className, 'sectionMenu', isExpanded ? 'sectionMenu--expanded' : ''])} ref='menu'>
        <div className='sectionMenu_btn acc-btn' onClick={() => { this.isOpening = true; this.setState({isExpanded : !isExpanded})}}>
          {items && items[active] && items[active].name}
        </div>
        <div className="sectionMenu_content">
          {
            items && items.map((ItemLink, key) => (
              <ItemLink className={classNames(['sectionMenu_item', key === active ?'sectionMenu_item--active':''])} key={key} />
            ))
          }
          {
            items &&
            <div className={classNames([
              className,
              'sectionMenu_item',
              'sectionMenu_item--rest',
              isRestExpanded?'sectionMenu_item--expanded':'',
              this.isRestActive && 'sectionMenu_item--active'
            ])} style={{display: items.length?'':'none'}}
                 onMouseOver={() => { this.isOpening = true; this.setState({isRestExpanded : true})}}
                 onMouseOut={() => { this.isOpening = true; this.setState({isRestExpanded : false})}}
            >
              <div className='sectionMenu_rest-btn'>
                Еще <span className='sectionMenu_rest-num'/>
                <span className='sectionMenu_rest-arrow'/>
              </div>
              <div className='sectionMenu_rest'>
                {
                  items && items.map((ItemLink, key) => (
                    <ItemLink className={classNames(['sectionMenu_item', key === active ?'sectionMenu_item--active':''])} key={key} />
                  ))
                }
              </div>
            </div>
          }
        </div>
      </div>
    )
  }
  f = () => {
    const $menu = $(this.refs.menu).find(".sectionMenu_content");
    const $restItem = $menu.find(".sectionMenu_item--rest");
    const $items = $menu.find("> .sectionMenu_item:not(.sectionMenu_item--rest):not(.sectionMenu_item--only-phone)");
    const $restItems = $menu.find(".sectionMenu_rest .sectionMenu_item:not(.sectionMenu_item--only-phone)");
    if(!$items.length) return {};
    const $menuCopy = $menu
      .clone()
      .insertBefore($menu)
      .addClass('sectionMenu_content sectionMenu_content--copy');

    const $itemsCopy = $menuCopy.find("> .sectionMenu_item:not(.sectionMenu_item--rest):not(.sectionMenu_item--only-phone)");
    const $restBtnCopy = $menuCopy.find(".sectionMenu_item--rest");
    $itemsCopy.each(function() {
      this.style.display = '';
    });
    $restBtnCopy.get(0).style.display = '';

    const resize = () => {
      const isMobile = window.innerWidth < 768;
      let contentWidth = $menuCopy.width();
      //определяем нужна ли кнопка "еще"
      let menuItemsWidth = 0;
      for(let i = 0; i < $itemsCopy.length; i++) {
        menuItemsWidth += $itemsCopy.eq(i).outerWidth();
      }
      if(menuItemsWidth > contentWidth) {
        //задаем максимальное значение количества элементов для вычисления ширины .rest_btn
        $restBtnCopy.find('.sectionMenu_rest-num').html(99);
        contentWidth -= $restBtnCopy.outerWidth();
        $restItem.get(0).style.display = '';
      }
      else {
        $restItem.get(0).style.display = 'none';
      }

      //считаем количество скрытых пунктов меню
      menuItemsWidth = 0;
      $items.each(function() {
        this.style.display = 'none';
      });
      $restItems.each(function() {
        this.style.display = '';
      });
      let restItemsNum = $items.length;
      for(let i = 0; i < $itemsCopy.length; i++) {
        menuItemsWidth += $itemsCopy.eq(i).outerWidth();
        if(menuItemsWidth < contentWidth || isMobile ) {
          $items.get(i).style.display = '';
          $restItems.get(i).style.display = 'none';
          restItemsNum--;
        }
      }
      $restItem.find('.sectionMenu_rest-num').html(restItemsNum);
      if(this.props.items.length - restItemsNum < this.props.active + 1) {
        $restItem.addClass('sectionMenu_item--active');
        this.isRestActive = true;
      }
      else {
        $restItem.removeClass('sectionMenu_item--active');
        this.isRestActive = false;
      }
    };
    resize();
    $(window).resize(resize);

    return {
      $menuCopy, resize
    }
  };
}

