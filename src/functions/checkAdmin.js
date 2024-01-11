const HOME_URL = process.env.REACT_APP_HOME_URL

/**
 * checks admin values are set, if not redirects user to common authorised page
 */
export function checkAdmin() {
  const token = localStorage.getItem('oAuthToken')
  const admin = localStorage.getItem('admin')

  if (admin && token) {
    return
  } else {
    window.location.href = `${HOME_URL}admin/login`
  }
}
