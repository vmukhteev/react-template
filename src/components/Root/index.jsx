import './style';
import {Link, Route} from 'react-router-dom';

export default class extends React.Component {
  render() {
    return (
      <div>
        <Link to="/route1">route1 link</Link><br/>
        <Link to="/route2">route2 link</Link><br/><br/>

        <Route path="/route1" render={() => <div>route1</div>} />
        <Route path="/route2" render={() => <div>route2</div>} />
      </div>
    )
  }
}

