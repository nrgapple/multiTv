const path = require('path')
const { Application } = require('spectron')

const appPath = () => {
  switch (process.platform) {
    case 'darwin':
      return path.join(__dirname, '..', '.tmp', 'mac', 'MultiTv.app', 'Contents', 'MacOS', 'MultiTv')
    case 'linux':
      return path.join(__dirname, '..', '.tmp', 'linux', 'MultiTv')
    case 'win32':
      return path.join(__dirname, '..', '.tmp', 'win-unpacked', 'MultiTv.exe')
    default:
      throw Error(`Unsupported platform ${process.platform}`)
  }
}
global.app = new Application({ path: appPath() })
