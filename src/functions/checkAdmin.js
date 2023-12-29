/**
 * checks admin values are set, if not redirects user to common authorised page
 */
export function checkAdmin() {
  const token = localStorage.getItem('oAuthToken')
  const admin = localStorage.getItem('admin')

  if (admin && token) {
    return
  } else {
    window.location.href = 'http://localhost:3000/login'
  }
}
