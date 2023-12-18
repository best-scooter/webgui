const API_URL = process.env.REACT_APP_API_URL

export async function postAdmin(user, pass) {
  console.log('url :', `${API_URL}admin/token`)
  console.log(JSON.stringify({ username: user, password: pass }))

  try {
    const response = await fetch(`${API_URL}admin/token`, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({ username: user, password: pass }),
    })
    if (!response.ok) {
      throw new Error('response error')
    }
    const result = response.json()
    if (result) {
      console.log(result)
      return result
    } else {
      console.log('Error response is empty')
    }
  } catch (error) {
    console.error('Error fetching authentication URL:', error.message)
  }
}
