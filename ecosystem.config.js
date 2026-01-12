module.exports = {
  apps: [{
    name: 'sonos-media',
    script: 'npm',
    args: 'start',
    cwd: '/var/www/sonos-media',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    }
  }]
}
