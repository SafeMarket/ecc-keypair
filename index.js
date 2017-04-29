const crypto = require('crypto')
const secp256k1 = require('secp256k1/elliptic')
const Amorph = require('amorph')
const arguguard = require('arguguard')
const amorphBufferPlugin = require('amorph-buffer')

Amorph.loadPlugin(amorphBufferPlugin)
Amorph.ready()

let privateKeyBuffer = crypto.randomBytes(32)
while (!secp256k1.privateKeyVerify(privateKeyBuffer)) {
  privateKeyBuffer = crypto.randomBytes(32)
}

function EccKeypair(privateKey) {
  arguguard('EccKeypair', ['Amorph'], arguments)
  this.privateKey = privateKey
  this.publicKey = privateKey.as('buffer', (privateKeyBuffer) => {
    return secp256k1.publicKeyCreate(privateKeyBuffer, false)
  })
  this.publicKeyCompressed = privateKey.as('buffer', (privateKeyBuffer) => {
    return secp256k1.publicKeyCreate(privateKeyBuffer, true)
  })
}

EccKeypair.generate = function generate() {
  arguguard('EccKeypair.generate', [], arguments)
  let privateKeyBuffer = crypto.randomBytes(32)
  while (!secp256k1.privateKeyVerify(privateKeyBuffer)) {
    privateKeyBuffer = crypto.randomBytes(32)
  }
  const privateKey = new Amorph(privateKeyBuffer, 'buffer')
  return new EccKeypair(privateKey)
}

module.exports = EccKeypair
