

const API: string = 'https://helminthoid-clumsily-xuan.ngrok-free.dev'

const SKIP_NGROK: Record<string, string> = {
  'ngrok-skip-browser-warning': 'true',
}
  
// --- TYPES & INTERFACES ---

export interface AuthData {
  username: string
  password: string
}

export interface TokenResponse {
  access_token: string
  token_type: string
}

export interface ErrorResponse {
  detail?: string
  [key: string]: any
}

// Generic API response type
type ApiResponse<T> = T | ErrorResponse

// --- HELPERS ---

function getInputValue(id: string): string {
  const el = document.getElementById(id) as HTMLInputElement | null
  return el?.value || ''
}

function getData(): AuthData {
  return {
    username: getInputValue('username'),
    password: getInputValue('password'),
  }
}

function setResult(data: unknown): void {
  const el = document.getElementById('result')
  if (el) {
    el.innerText =
      typeof data === 'string' ? data : JSON.stringify(data, null, 2)
  }
}

// --- GENERIC FETCH FUNCTION ---

async function request<T>(
  url: string,
  options: RequestInit,
): Promise<ApiResponse<T>> {
  try {
    const res = await fetch(url, options)
    return (await res.json()) as ApiResponse<T>
  } catch (err) {
    return { detail: 'Network error' }
  }
}

// --- REGISTER ---

export interface IRequestResult {
  id: number
  hashPassword: string
}

async function register(): Promise<void> {
  const username = getInputValue('username')
  const password = getInputValue('password')

  if (!username || !password) {
    setResult('Username va parol kiriting!')
    return
  }

  const res = await fetch(`${API}/user/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...SKIP_NGROK },
    body: JSON.stringify({ username, password }),
  })
  const data = await res.json()
  setResult(data)
}

// --- LOGIN ---

async function login(): Promise<void> {
  const data = getData()

  const params = new URLSearchParams()
  params.append('username', data.username)
  params.append('password', data.password)

  const result = await request<TokenResponse>(`${API}/user/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      ...SKIP_NGROK,
    },
    body: params,
  })

  if ('access_token' in result) {
    localStorage.setItem('token', result.access_token)
    setResult('Login muvaffaqiyatli. Token saqlandi.')
  } else {
    setResult(result)
  }
}

// --- GET ME ---

export interface User {
  id: number
  username: string
}

async function getMe(): Promise<void> {
  const token = localStorage.getItem('token')

  if (!token) {
    setResult('Token topilmadi. Avval login qiling.')
    return
  }

  const result = await request<User>(`${API}/user/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
      ...SKIP_NGROK,
    },
  })

  setResult(result)
}

// --- LOGOUT ---

function logout(): void {
  localStorage.removeItem('token')
  setResult('Logged out.')
}

// @ts-ignore
window.register = register
// @ts-ignore
window.login = login
// @ts-ignore
window.getMe = getMe
// @ts-ignore
window.logout = logout