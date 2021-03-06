/* global lucy, __webpack_hash__ */
import styles from '../../theme/styles/index.scss';
import CSSModules from 'react-css-modules';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import qs from 'qs';

class App extends React.Component {

	componentWillMount() {
		//Стираем неактуальные записи в storage при обновлении билда
    if(!localStorage.getItem("build") || localStorage.getItem("build") !== __webpack_hash__) {
      //localStorage.removeItem('item');
      localStorage.setItem("build", __webpack_hash__);
    }
	}

	render() {
		const {location} = this.props;

    const query = qs.parse(location.search.replace(/^\?/, ''));

		return (
			<div>
				Hello world!
			</div>
		);
	}
}

export default withRouter(connect(
  store => {
    return {
    }
  },
  dispatch => {
  	return {
		}
	}
)(
  CSSModules(
    App,
    styles,
    {
      allowMultiple: true,
      handleNotFoundStyleName: 'ignore'
    }
  )
));

