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

export async function delScooter(bikeId) {
  const token = localStorage.getItem('oAuthToken')
  try {
    //console.log(`${API_URL}zone`)
    const response = await fetch(`${API_URL}scooter/${bikeId}`, {
      headers: {
        'Content-Type': 'applications/json',
        'X-Access-Token': token,
      },
      method: 'DELETE',
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

export async function putScooter(customerId, updateData) {
  const token = localStorage.getItem('oAuthToken')
  try {
    const response = await fetch(`${API_URL}scooter/${customerId}`, {
      headers: {
        'Content-Type': 'application/json',
        'X-Access-Token': token,
      },
      method: 'PUT',
      body: JSON.stringify(updateData),
    })
    console.log('here')
    console.log(JSON.stringify(updateData))

    if (response.ok) {
      console.log('all okay')
    } else {
      console.log('Error putting scooter, response was not ok')
      throw new Error('Failed to put scooter')
    }
  } catch (error) {
    console.error('Error putting scooter', error)
    throw error
  }
}
