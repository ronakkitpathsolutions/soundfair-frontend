import { JwtPayload, jwtDecode } from 'jwt-decode'

export const isTokenActive = (token: string | null = null): boolean => {
  if (!token) return false
  try {
    const decoded: JwtPayload = jwtDecode(token)
    return decoded.exp > Date.now() / 1000
  } catch (error) {
    console.error('Invalid token:', error)
    return false
  }
}

export const decodeTokenValue = (token: string | null = null): JwtPayload => {
  if (!token) return {}
  const decoded: JwtPayload = jwtDecode(token)
  return decoded
}

export const mergeFileArrays = (existingFiles = [], incomingFiles = []) => {
  // Create a map from the existing files based on their name for quick lookup
  const fileMap = new Map()
  existingFiles.forEach((file) => {
    fileMap.set(file.name, file)
  })

  // Iterate over the incoming files and update the map
  incomingFiles.forEach((file) => {
    fileMap.set(file.name, file)
  })

  // Convert the map back to an array
  return Array.from(fileMap.values())
}
