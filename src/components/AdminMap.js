import 'leaflet/dist/leaflet.css'
import 'react-toastify/dist/ReactToastify.css'
import './Map.css'

import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import L from 'leaflet'
// import iconUrl from 'leaflet/dist/images/marker-icon.png'
// import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png'
// import shadowUrl from 'leaflet/dist/images/marker-shadow.png'
import { useEffect, useState, useRef } from 'react'

import { filterZone, getZones } from '../functions/fetchZones'
import { getScooters } from '../functions/fetchScooters'

import { toast, ToastContainer } from 'react-toastify'

import {
  Paper,
  Typography,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material'

delete L.Icon.Default.prototype._getIconUrl

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
})

const Admin = () => {
  const [selectedCity, setSelectedCity] = useState('')
  const [Cities, setCities] = useState('')
  const [Focus, setFocus] = useState([])
  const [Scooters, setScooters] = useState([])
  const mapRef = useRef(null)

  //
  // TODO: kolla efter admin token annars blockera anslutning till sidan
  //

  useEffect(() => {
    const fetchZones = async () => {
      const zones = await getZones()
      filterCityZones(zones)
    }
    const filterCityZones = async (zones) => {
      const cityZones = filterZone(zones.data, 'city')
      setCities(cityZones)
    }
    const getAllScooters = async () => {
      const allScooters = await getScooters()
      const scooterData = allScooters.data
      console.log(scooterData)

      // filtrerar för att rädda min dator
      //const filteredScooters = scooterData.filter((_, index) => Math.random() > 0.5);
      const filteredScooters = scooterData.filter((scoot) => scoot.id === 2)
      console.log(filteredScooters)
      setScooters(filteredScooters)
    }

    fetchZones()
    getAllScooters()
  }, [])

  const handleChange = (event) => {
    // kind of redundant but it is what it is
    setSelectedCity(event.target.value)
    const thiscity = Cities.filter((zone) => zone.id === event.target.value)
    //get any point of the polygon and set camera to it
    const lat = thiscity[0].area[0][0]
    const lng = thiscity[0].area[0][1]
    setFocus([lat, lng])
  }

  const handleClick = (event) => {
    if (mapRef.current) {
      const map = mapRef.current
      if (Focus[0] && Focus[1]) {
        const newLocation = [Focus[0], Focus[1]]
        map.setView(newLocation, 13)
      } else {
        toast.error('Please select a city first')
      }
      console.log('hi', event)
    }
  }

  return (
    <div className="adminContainer">
      <ToastContainer position="top-center" />

      <Paper>
        <Typography variant="body1">hi</Typography>
        {Cities && Cities.length > 0 && (
          <FormControl fullWidth>
            <InputLabel id="simple-select-label">Go to City</InputLabel>
            <Select
              labelId="simple-select-label"
              id="simple-select"
              value={selectedCity}
              label="City"
              onChange={handleChange}
            >
              <MenuItem value="">None</MenuItem>
              {Cities.map((aCity) => (
                <MenuItem key={aCity.id} value={aCity.id}>
                  {aCity.name}
                </MenuItem>
              ))}
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
        )}
      </Paper>

      <MapContainer
        className="full-height-map"
        id="map"
        ref={mapRef}
        center={[100, 100]}
        zoom={6}
        minZoom={3}
        maxZoom={19}
        maxBounds={[
          [-85.06, -180],
          [85.06, 180],
        ]}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution="Openstreetmap"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <div className="map-overlay">
          <button className="map-button" onClick={() => handleClick()}>
            Focus
          </button>
        </div>

        {Cities &&
          Cities.length > 0 &&
          Cities.map((aCity) => (
            <Marker
              key={aCity.id}
              position={[aCity.area[0][0], aCity.area[0][1]]}
            >
              <Popup>{aCity.name}</Popup>
            </Marker>
          ))}
        {Scooters &&
          Scooters.length > 0 &&
          Scooters.map((scooter) => (
            <Marker
              key={scooter.id}
              position={[scooter.positionX, scooter.positionY]}
            >
              <Popup>{scooter.id}</Popup>
            </Marker>
          ))}
      </MapContainer>
    </div>
  )
}

export default Admin
