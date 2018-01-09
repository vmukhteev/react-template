import './style.scss';
import { withRouter, Link } from 'react-router-dom';
import qs from 'qs';

class LinkM extends React.Component {
  componentDidMount() {

  }

  render() {
    const {onClick, offset = 0, toQuery, location, to, staticContext, history, match, ...props} = this.props;

    const _to =
      toQuery ? `${location.pathname}?${qs.stringify({
      ...qs.parse(location.search.replace(/^\?/, '')),
      ...toQuery
       })}` :
      to.match(/^#/) ? `${location.pathname}${location.search}${to}` : //хэш ссылки получают некорректный href при использовании basename
      this.props.to;

    return (
      <Link {...props} to={_to} onClick={(e) => {
        if(to && to.match(/^#/)) {
          let body = $("html, body");

          const anchor = $(to);
          anchor.length && body.stop().animate({scrollTop: anchor.offset().top - offset}, 300, 'swing');
        }
        onClick && onClick(e);
      }}>
        {this.props.children}
      </Link>
    )
  }

}

export default withRouter(LinkM);