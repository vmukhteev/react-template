import './style.scss';
import { withGoogleMap, GoogleMap, Marker } from "react-google-maps";
import withScriptjs from "react-google-maps/lib/async/withScriptjs";

const Map = withScriptjs(withGoogleMap(
  props => (
    <GoogleMap
      ref={props.onMapLoad}
      defaultOptions={{
        ...props.options,
        center: {lat: props.center[0], lng: props.center[1]}
      }}
      defaultZoom={ props.zoom || 3}
      defaultCenter={{ lat: -25.363882, lng: 131.044922 }}
      onClick={props.onMapClick}
    >
      {
        props.markers && props.markers.map((marker, key) => {
          return (
            <Marker
              key={key}
              position={{ lat: marker.position[0], lng: marker.position[1] }}
              icon={{
                url: marker.icon,
                scaledSize: new google.maps.Size(marker.size[0], marker.size[1])
              }}
            />
          )
        })
      }
    </GoogleMap>
  )
));

export default class extends React.Component {
  componentDidMount() {

  }
  handleMapLoad = () => {};
  handleMapClick = () => {};
  handleMarkerRightClick = () => {};
  render() {
    const {className, markers, options, center, zoom, lang} = this.props;
    return (
      <Map
        className={classNames([className])}
        googleMapURL={`https://maps.googleapis.com/maps/api/js?${lang && ('language=' + lang + '&')}&key=AIzaSyBmD_laZErYDcDW94i6G75sm7RKg5z3jg0&v=3.exp`}
        loadingElement={
          <div></div>
        }
        containerElement={
          <div style={{ height: `100%` }} />
        }
        mapElement={
          <div style={{ height: `100%` }} />
        }
        markers={markers}
        options={options}
        center={center}
        zoom={zoom}
        onMapLoad={this.handleMapLoad}
        onMapClick={this.handleMapClick}
        onMarkerRightClick={this.handleMarkerRightClick}
      />
    )
  }
}


