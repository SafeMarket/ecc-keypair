const EccKeypair = require('./')
const chai = require('chai')
const chaiAmorph = require('chai-amorph')

chai.use(chaiAmorph)
chai.should()

describe('EccKeypair', () => {
  let eccKeypair
  let eccKeypair1
  it('should generate', () => {
    eccKeypair = EccKeypair.generate()
  })
  describe('eccKeypair', () => {
    it('should be instance of EccKeypair', () => {
      eccKeypair.should.be.instanceof(EccKeypair)
    })
    it('should have privateKey and publicKey', () => {
      eccKeypair.should.have.keys(['privateKey', 'publicKey', 'publicKeyCompressed'])
    })
    it('privateKey should be 32 bytes long', () => {
      eccKeypair.privateKey.to('array').should.have.length(32)
    })
    it('publicKey should be 65 bytes long', () => {
      eccKeypair.publicKey.to('array').should.have.length(65)
    })
    it('publicKeyCompressed should be 33 bytes long', () => {
      eccKeypair.publicKeyCompressed.to('array').should.have.length(33)
    })
  })
  describe('eccKeypair1 (from privateKey)', () => {
    it('should instantiate', () => {
      eccKeypair1 = new EccKeypair(eccKeypair.privateKey)
    })
    it('should have the same values', () => {
      eccKeypair.privateKey.should.amorphEqual(eccKeypair1.privateKey)
      eccKeypair.publicKey.should.amorphEqual(eccKeypair1.publicKey)
      eccKeypair.publicKeyCompressed.should.amorphEqual(eccKeypair1.publicKeyCompressed)
    })
  })
})
