import 'leaflet/dist/leaflet.css'
import 'react-toastify/dist/ReactToastify.css'
import './Map.css'

import { MapContainer, Marker, Popup, TileLayer, Polygon } from 'react-leaflet'
import L from 'leaflet'

import { useEffect, useState, useRef } from 'react'

import { toast, ToastContainer } from 'react-toastify'

import { Paper, FormControl, InputLabel, MenuItem, Select } from '@mui/material'

import { checkAdmin } from '../functions/checkAdmin'
import { filterZone, getZones } from '../functions/fetchZones'

delete L.Icon.Default.prototype._getIconUrl

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
})

const scooterIconUrl = process.env.PUBLIC_URL + '/scooter-icon.svg'
const customerIconUrl = process.env.PUBLIC_URL + '/person-icon.svg'
const scooterIcon = new L.Icon({
  iconUrl: scooterIconUrl,
  iconRetinaUrl: scooterIconUrl,
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  shadowSize: [60, 60],
  shadowAnchor: [30, 61],
})
const customerIcon = new L.Icon({
  iconUrl: customerIconUrl,
  iconRetinaUrl: customerIconUrl,
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  shadowSize: [60, 60],
  shadowAnchor: [21, 58],
})

const Admin = () => {
  const [selectedCity, setSelectedCity] = useState('')
  const [Cities, setCities] = useState('')
  const [Zones, setZones] = useState([])
  const [Focus, setFocus] = useState([])
  const [Scooters, setScooters] = useState([])
  const [Customers, setCustomers] = useState([])
  // const [increment, setIncrement] = useState(0)

  const mapRef = useRef(null)
  const socketRef = useRef(null)

  useEffect(() => {
    checkAdmin()

    const fetchZones = async () => {
      const zones = await getZones()
      setZones(zones.data)
      filterCityZones(zones)
    }
    const filterCityZones = async (zones) => {
      const cityZones = filterZone(zones.data, 'city')
      setCities(cityZones)
    }

    fetchZones()
  }, [])

  useEffect(() => {
    const token = localStorage.getItem('oAuthToken')
    console.log(token)
    socketRef.current = new WebSocket('ws://localhost:8081', token)

    socketRef.current.onmessage = (event) => {
      const receivedData = JSON.parse(event.data)

      if (receivedData['remove'] === true) {
        setScooters((prevScooters) => {
          return prevScooters.filter(
            (scooter) => scooter.scooterId !== receivedData.scooterId,
          )
        })
        return
      }

      const evalInvalidPosition =
        receivedData['positionX'] === undefined ||
        receivedData['positionY'] === undefined

      if (evalInvalidPosition) {
        return
      }
      console.log('Received:', event.data)

      if (receivedData.message === 'scooter') {
        setScooters((prevScooters) => {
          const scooterIndex = prevScooters.findIndex(
            (scooter) => scooter.scooterId === receivedData.scooterId,
          )

          if (scooterIndex !== -1) {
            return prevScooters.map((scooter, index) =>
              index === scooterIndex
                ? {
                    ...scooter,
                    positionX: receivedData.positionX,
                    positionY: receivedData.positionY,
                    battery: receivedData.battery,
                  }
                : scooter,
            )
          } else {
            return [
              ...prevScooters,
              {
                scooterId: receivedData.scooterId,
                positionX: receivedData.positionX,
                positionY: receivedData.positionY,
                battery: receivedData.battery,
              },
            ]
          }
        })
      } else if (receivedData.message === 'customer') {
        setCustomers((prevCustomers) => {
          const customerIndex = prevCustomers.findIndex(
            (customer) => customer.customerId === receivedData.customerId,
          )

          if (customerIndex !== -1) {
            return prevCustomers.map((customer, index) =>
              index === customerIndex
                ? {
                    ...customer,
                    positionX: receivedData.positionX,
                    positionY: receivedData.positionY,
                  }
                : customer,
            )
          } else {
            return [
              ...prevCustomers,
              {
                customerId: receivedData.customerId,
                positionX: receivedData.positionX,
                positionY: receivedData.positionY,
              },
            ]
          }
        })
      }
    }

    socketRef.current.onerror = (error) => {
      console.error('WebSocket Error:', error)
    }

    socketRef.current.onopen = () => {
      console.log('WebSocket Connected')
      const data = {
        message: 'subscribe',
        subscriptions: ['scooter', 'customer'],
      }
      socketRef.current.send(JSON.stringify(data))
    }

    socketRef.current.onclose = () => {
      console.log('WebSocket Connection Closed')
    }

    return () => {
      console.log('Cleaning up WebSocket Connection')
      socketRef.current.close()
    }
  }, [])

  // const sendMessage = () => {
  //   // let num = 57
  //   let amount = 1000
  //   for (let i = 0; i <= amount; i++) {
  //     const rand = Math.floor(Math.random() * (10000 + amount)) + 1

  //     const offsetX = (Math.random() - 0.5) * 0.1
  //     const offsetY = (Math.random() - 0.5) * 0.1
  //     const positionX = 15 + offsetX
  //     const positionY = 57 + offsetY
  //     // console.log(positionY, positionX)
  //     const messageToSend = JSON.stringify({
  //       message: 'scooter',
  //       scooterId: rand,
  //       positionX,
  //       positionY,
  //     })
  //     console.log(messageToSend)
  //     socketRef.current.send(messageToSend)
  //   }
  // }

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
        console.log(newLocation)
        map.setView(newLocation, 13)
      } else {
        toast.error('Please select a city first')
      }
      console.log('hi', event)
    }
  }

  //const webSocketScooters = () => {}

  return (
    <div className="adminContainer">
      {/* <Button
        variant="contained"
        color="primary"
        size="large"
        onClick={sendMessage}
      >
        Send Message
      </Button> */}
      <ToastContainer position="top-center" />
      <Paper>
        {Cities && Cities.length > 0 && (
          <FormControl fullWidth variant="filled">
            <InputLabel id="simple-select-label" variant="filled">
              Go to City
            </InputLabel>
            <Select
              labelId="simple-select-label"
              id="simple-select"
              value={selectedCity}
              label="City"
              onChange={handleChange}
            >
              {Cities.map((aCity) => (
                <MenuItem key={aCity.id} value={aCity.id}>
                  {aCity.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
      </Paper>

      <MapContainer
        className="full-height-map"
        id="map"
        ref={mapRef}
        center={[57, 12]}
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

        {/* {Cities &&
          Cities.length > 0 &&
          Cities.map((aCity) => (
            <Marker
              key={aCity.id}
              position={[aCity.area[0][0], aCity.area[0][1]]}
            >
              <Popup>{aCity.name}</Popup>
            </Marker>
          ))} */}
        {Scooters &&
          Scooters.length > 0 &&
          Scooters.map((scooter, index) => (
            <Marker
              key={index}
              position={[scooter.positionY, scooter.positionX]}
              icon={scooterIcon}
            >
              <Popup>
                {`Scooter ${scooter.scooterId} battery ${scooter.battery}`}
              </Popup>
            </Marker>
          ))}
        {Customers &&
          Customers.length > 0 &&
          Customers.map((customer, index) => (
            <Marker
              key={index}
              position={[customer.positionY, customer.positionX]}
              icon={customerIcon}
              zIndexOffset="-1"
            >
              <Popup>{'Customer ' + customer.customerId}</Popup>
            </Marker>
          ))}
        {Zones &&
          Zones.length > 0 &&
          Zones.map((zone) => (
            <Polygon key={zone.id} positions={zone.area}></Polygon>
          ))}
      </MapContainer>
    </div>
  )
}

export default Admin
