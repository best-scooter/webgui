const API_URL = process.env.REACT_APP_API_URL

export async function getCustomers() {
  const token = localStorage.getItem('oAuthToken')
  console.log(token)
  try {
    const response = await fetch(`${API_URL}customer`, {
      headers: {
        'Content-Type': 'application/json',
        'X-Access-Token': token,
      },
      method: 'GET',
    })

    if (response.ok) {
      const result = await response.json()
      return result
    } else {
      console.log('Error getting customers, response was not ok')
      throw new Error('Failed to fetch customers')
    }
  } catch (error) {
    console.error('Error getting customers', error)
    throw error
  }
}
