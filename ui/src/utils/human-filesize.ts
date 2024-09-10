import filesize from 'filesize.js'

export const humanFileSize = (size: number) => {
  // @ts-ignore
  return filesize(size, { spacer: '', round: 0 }).toLowerCase()
}
