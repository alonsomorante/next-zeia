import { getToken } from "./auth"
import { baseUrl, baseUrlAmbiental } from "./constant"

export async function fetchWithAuth(url: string, options: RequestInit = {}) {
  const token = await getToken()
  if (!token) {
    throw new Error('No authentication token available')
  }

  const headers = new Headers(options.headers)
  headers.set('Authorization', `token ${token}`)

  const response = await fetch(`${baseUrl}${url}`, { ...options, headers })
  if (!response.ok) {
    throw new Error('API request failed')
  }

  const contentType = response.headers.get('Content-Type');
  if (contentType && contentType.includes('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')) {
    return response.blob();
  }

  return response.json()
}
export async function fetchWithAuthAmbiental(url: string, options: RequestInit = {}) {
  const token = await getToken()
  if (!token) {
    throw new Error('No authentication token available')
  }

  const headers = new Headers(options.headers)
  headers.set('Authorization', `token ${token}`)

  const response = await fetch(`${baseUrlAmbiental}${url}`, { ...options, headers })
  if (!response.ok) {
    throw new Error('API request failed')
  }

  const contentType = response.headers.get('Content-Type');
  if (contentType && contentType.includes('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')) {
    return response.blob();
  }

  return response.json()
}


