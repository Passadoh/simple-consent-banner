import { useState } from 'preact/hooks'

export default function useCookie(
  key,
  defaultValue,
) {

  // : [T, (value: T, options?: CookieOptions) => void, () => void] {
  const [value, setValue] = useState(() => {
    let match = document.cookie.match('(^|;) ?' + key + '=([^;]*)(;|$)')
    let value = match ? match[2] : defaultValue

    try {
      value = JSON.parse(value)
    } catch (_) { }

    return value
  })

  const setCookie = (value, options) => {
    let cookieOptions = {
      expires: 0,
      domain: '',
      path: '',
      secure: false,
      httpOnly: false,
      maxAge: 0,
      sameSite: '',
      ...options
    }

    setValue(value)

    // if value is an array or a plain object, convert to JSON
    if (Array.isArray(value) || Object.prototype.toString.call(value) === '[object Object]') {
      value = JSON.stringify(value)
    }

    let cookie = `${key}=${value}`

    if (cookieOptions.expires) {
      let date = new Date()
      date.setTime(date.getTime() + 1000 * cookieOptions.expires)
      cookie += `; Expires=${date.toUTCString()}`
    }

    if (cookieOptions.path) {
      cookie += `; Path=${cookieOptions.path}`
    }

    if (cookieOptions.domain) {
      cookie += `; Domain=${cookieOptions.domain}`
    }

    if (cookieOptions.maxAge) {
      cookie += `; Max-Age=${cookieOptions.maxAge}`
    }

    if (cookieOptions.sameSite) {
      cookie += `; SameSite=${cookieOptions.sameSite}`
    }

    if (cookieOptions.secure) {
      cookie += '; Secure'
    }

    if (cookieOptions.httpOnly) {
      cookie += '; HttpOnly'
    }

    document.cookie = cookie
  }

  const clearCookie = () => {
    setCookie('', { expires: -3600 })
    setValue(defaultValue)
  }

  return [value, setCookie, clearCookie]
}