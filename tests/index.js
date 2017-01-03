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

  describe('#removeToken', () => {
    it('exists in client instance', () => {
      assert.property(client, 'removeToken')
    })

    it('removes client token', () => {
      client.removeToken()

      assert.equal(client.token, undefined)
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

  describe('#post', () => {
    it('exists in client instance', () => {
      assert.property(client, 'post')
    })

    it('throws error if endpoint was not passed', () => {
      assert.throws(() => client.post(), /endpoint parameter is required/)
    })

    it('returns promise', () => {
      assert.instanceOf(client.post('users'), Promise)
    })

    it('resolves with valid output', () => {
      const expected = { hello: 'world' }

      fetchMock.post(url('users'), expected)

      return assert.becomes(client.post('users'), expected)
    })
  })

  describe('#delete', () => {
    it('exists in client instance', () => {
      assert.property(client, 'delete')
    })

    it('throws error if endpoint was not passed', () => {
      assert.throws(() => client.delete(), /endpoint parameter is required/)
    })

    it('returns promise', () => {
      assert.instanceOf(client.delete('users'), Promise)
    })

    it('resolves with valid output', () => {
      const expected = { hello: 'world' }

      fetchMock.delete(url('users'), expected)

      return assert.becomes(client.delete('users'), expected)
    })
  })

  describe('#put', () => {
    it('exists in client instance', () => {
      assert.property(client, 'put')
    })

    it('throws error if endpoint was not passed', () => {
      assert.throws(() => client.put(), /endpoint parameter is required/)
    })

    it('returns promise', () => {
      assert.instanceOf(client.put('users'), Promise)
    })

    it('resolves with valid output', () => {
      const expected = { hello: 'world' }

      fetchMock.put(url('users'), expected)

      return assert.becomes(client.put('users'), expected)
    })
  })

  describe('#patch', () => {
    it('exists in client instance', () => {
      assert.property(client, 'patch')
    })

    it('throws error if endpoint was not passed', () => {
      assert.throws(() => client.patch(), /endpoint parameter is required/)
    })

    it('returns promise', () => {
      assert.instanceOf(client.patch('users'), Promise)
    })

    it('resolves with valid outpatch', () => {
      const expected = { hello: 'world' }

      fetchMock.patch(url('users'), expected)

      return assert.becomes(client.patch('users'), expected)
    })
  })
})
