export const getApi = <T>(endpoint: string, options?: RequestInit): Promise<T> => {
  return makeRequest<T>(endpoint, { ...options, method: 'GET' })
}

export const postApi = <T, D>(endpoint: string, data?: D, options?: RequestInit): Promise<T> => {
  return makeRequest<T>(endpoint, {
    ...options,
    method: 'POST',
    body: data ? JSON.stringify(data) : undefined,
  })
}

export const putApi = <T, D>(endpoint: string, data?: D, options?: RequestInit): Promise<T> => {
  return makeRequest<T>(endpoint, {
    ...options,
    method: 'PUT',
    body: data ? JSON.stringify(data) : undefined,
  })
}

export const deleteApi = <T>(endpoint: string, options?: RequestInit): Promise<T> => {
  return makeRequest<T>(endpoint, { ...options, method: 'DELETE' })
}

export const patchApi = <T, D>(endpoint: string, data?: D, options?: RequestInit): Promise<T> => {
  return makeRequest<T>(endpoint, {
    ...options,
    method: 'PATCH',
    body: data ? JSON.stringify(data) : undefined,
  })
}

const makeRequest = <T>(endpoint: string, options?: RequestInit): Promise<T> => {
  const url = buildUrl(endpoint)
  console.log('API Base URL:', url)

  return fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(options?.headers || {}),
    },
  }).then((res) => {
    if (!res.ok) throw new ApiError(`HTTP ${res.status}: ${res.statusText}`, res.status, res)
    return res.json()
  })
}

const buildUrl = (endpoint: string): string => {
  if (endpoint.startsWith('http')) return endpoint

  const baseUrl = process.env.NEXT_PUBLIC_API_URI || 'http://localhost:8080'
  return `${baseUrl}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`
}

class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public response?: Response,
  ) {
    super(message)
    this.name = 'ApiError'
  }
}
