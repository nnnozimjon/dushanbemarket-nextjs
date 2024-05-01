'use client'

export const usingAuth = (): string => {
  return localStorage.getItem('access_token') || ''
}
