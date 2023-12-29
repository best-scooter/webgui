const API_URL = process.env.REACT_APP_API_URL

export async function getParking() {
  const token = localStorage.getItem('oAuthToken')
  try {
    const response = await fetch(`${API_URL}parking`, {
      headers: {
        'Content-Type': 'Applications/json',
        'X-Access-Token': token,
      },
      method: 'GET',
    })
    const result = await response.json()

    if (result) {
      console.log('all ok')
      return result
    } else {
      throw new Error('Error getting parking response')
    }
  } catch (error) {
    console.error('Error gettign parkings ', error)
  }
}
