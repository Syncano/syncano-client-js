const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')
const fetchMock = require('fetch-mock')
const SyncanoClient = require('../src').default

chai.use(chaiAsPromised)

const { assert } = chai

describe('client', () => {
  const instanceName = 'test-instance'
  const instanceApiKey = 'test-api-key'
  let client
  let url

  beforeEach(() => {
    client = new SyncanoClient(instanceName, instanceApiKey)
    url = client.url.bind(client)
  })

  afterEach(() => fetchMock.restore())

  it('init without error', () => {
    assert.instanceOf(client, SyncanoClient)
  })

  it('has instanceName property', () => {
    assert.property(client, 'instanceName')
  })

  it('has baseUrl property', () => {
    assert.property(client, 'baseUrl')
  })

  it('has token property', () => {
    assert.property(client, 'token')
  })

  describe('#setToken', () => {
    it('exists in client instance', () => {
      assert.property(client, 'setToken')
    })

    it('changes client token', () => {
      const expected = 'new-api-key'

      client.setToken(expected)

      assert.equal(client.token, expected)
    })
  })

  describe('#get', () => {
    it('exists in client instance', () => {
      assert.property(client, 'get')
    })

    it('throws error if endpoint was not passed', () => {
      assert.throws(() => client.get(), /endpoint parameter is required/)
    })

    it('returns promise', () => {
      assert.instanceOf(client.get('users'), Promise)
    })

    it('resolves with valid output', () => {
      const expected = { hello: 'world' }

      fetchMock.get(url('users'), expected)

      return assert.becomes(client.get('users'), expected)
    })
  })
})
