const API_URL = process.env.REACT_APP_API_URL

export async function getZones() {
  const token = localStorage.getItem('oAuthToken')
  try {
    const response = await fetch(`${API_URL}zone`, {
      headers: {
        'Content-Type': 'applications/json',
        'X-Access-Token': token,
      },
      method: 'GET',
    })
    const result = await response.json()
    if (result) {
      return result
    } else {
      console.log('Error getting zones, response was empty')
      throw new Error('Failed to fetch customers')
    }
  } catch (error) {
    console.error('Error getting zone', error)
    throw error
  }
}

export async function getScooters() {
  const token = localStorage.getItem('oAuthToken')
  try {
    //console.log(`${API_URL}zone`)
    const response = await fetch(`${API_URL}scooter`, {
      headers: {
        'Content-Type': 'applications/json',
        'X-Access-Token': token,
      },
      method: 'GET',
    })
    const result = response.json()
    if (result) {
      return result
    } else {
      console.log('Error getting zones, response was empty')
    }
  } catch (error) {
    console.error('Error getting zone', error)
  }
}

export function filterZone(zones, type) {
  const res = zones.filter((zone) => zone.type === type)
  return res
}
