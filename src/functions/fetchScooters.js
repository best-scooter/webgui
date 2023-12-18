const API_URL = process.env.REACT_APP_API_URL

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
      console.log('Error getting scooter, response was empty')
    }
  } catch (error) {
    console.error('Error getting scooter', error)
  }
}
