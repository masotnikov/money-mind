import "leaflet/dist/leaflet.css"
import {MapContainer, Marker, Popup, TileLayer} from 'react-leaflet'
import {Icon} from "leaflet";
// @ts-ignore
const LeafletMap = ({popupName, latitude, longitude}) => {

  const customIcon = new Icon({
    iconUrl: 'https://img.icons8.com/color/marker',
    iconSize: [38, 38],
    iconAnchor: [19, 38],
  })

  return (
    <MapContainer center={[latitude, longitude]} zoom={14} scrollWheelZoom={false}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker icon={customIcon} position={[latitude, longitude]}>
        <Popup>
          {popupName}
        </Popup>
      </Marker>
    </MapContainer>
  )
}


export default LeafletMap;