import 'leaflet/dist/leaflet.css'
import {MapContainer, Marker, Popup, TileLayer} from 'react-leaflet'
import L from 'leaflet'
import MarkerClusterGroup from "react-leaflet-cluster";
import react, { useEffect} from 'react'
import './Map.css';


delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});


const Admin = () => {
    useEffect(() => {
        const mapContainer = document.getElementById('map');
        let map = null;

        if (mapContainer && !map) {
            map = L.map('map').setView([51.505, -0.09], 13);
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
        }

        return () => {
            if (map) {
                map.remove();
                map = null;
            }
        };
    }, []);

    const style = {
        container: {
            width: '100%',
        },
    };

    return (
        <div className="container" style={style.container}>
            <MapContainer
            className="full-height-map"
            center={[38, 139.69222]}
            zoom={6}
            minZoom={3}
            maxZoom={19}
            maxBounds={[[-85.06, -180], [85.06, 180]]}
            scrollWheelZoom={true}>
            <TileLayer
                attribution='&copy; <a href="https://stadiamaps.com/" target="_blank">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/about" target="_blank">OpenStreetMap</a> contributors'
                url="https://tiles.stadiamaps.com/tiles/outdoors/{z}/{x}/{y}{r}.png"
            />
            {
            /* Finns väldigt många olika maps om någon vill kolla
             *  https://docs.stadiamaps.com/themes/
             */
            }

            {/* TODO: markers */}
            </MapContainer>
        </div>
    );
};

export default Admin;
