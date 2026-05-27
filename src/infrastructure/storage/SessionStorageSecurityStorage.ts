import type { ISecurityStorage } from '@domain/IPatterns'

export class SessionStorageSecurityStorage implements ISecurityStorage {
  async get(key: string): Promise<string | null> {
    try {
      return sessionStorage.getItem(key)
    } catch {
      return null
    }
  }

  async set(key: string, value: string): Promise<void> {
    sessionStorage.setItem(key, value)
  }

  async delete(key: string): Promise<void> {
    sessionStorage.removeItem(key)
  }

  async clear(): Promise<void> {
    sessionStorage.clear()
  }
}
