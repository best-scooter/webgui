const API_URL = process.env.REACT_APP_API_URL

export async function getCustomers() {
  const token = localStorage.getItem('oAuthToken')
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

export async function putCustomerRequest(customerId, updateData) {
  const token = localStorage.getItem('oAuthToken')
  try {
    const response = await fetch(`${API_URL}customer/${customerId}`, {
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
      console.log('Error putting customers, response was not ok')
      throw new Error('Failed to put customers')
    }
  } catch (error) {
    console.error('Error putting customers', error)
    throw error
  }
}

export async function delCustomerRequest(customerId) {
  const token = localStorage.getItem('oAuthToken')
  try {
    const response = await fetch(`${API_URL}customer/${customerId}`, {
      headers: {
        'Content-Type': 'application/json',
        'X-Access-Token': token,
      },
      method: 'DELETE',
    })
    if (response.ok) {
      console.log('all okay')
    } else {
      console.log('Error del customers, response was not ok')
      throw new Error('Failed to del customers')
    }
  } catch (error) {
    console.error('Error del customers', error)
    throw error
  }
}
