module.exports = {
  host: 'domain.com',
  user: 'dokku',
  passphrase: 'ssh-passphrase',
  key: require('fs').readFileSync('/path/to/your/private/key')
}
