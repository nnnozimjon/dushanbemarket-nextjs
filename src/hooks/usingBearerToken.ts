
import { usingAuth } from './usingAuth'

export const usingBearerToken = (): string => {
  const token = usingAuth()
  return `Bearer ${token}`
}
