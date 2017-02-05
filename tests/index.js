const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')
const fetchMock = require('fetch-mock')
const SyncanoClient = require('../src').default

chai.use(chaiAsPromised)

const { assert } = chai

describe('SyncanoClient', () => {
  const instanceName = 'test-instance'
  const instanceApiKey = 'test-api-key'
  let client
  let url

  beforeEach(() => {
    client = new SyncanoClient(instanceName, {
      token: instanceApiKey
    })

    url = client.url.bind(client)
  })

  afterEach(() => fetchMock.restore())

  describe('has property:', () => {
    it('instanceName', () => {
      assert.property(client, 'instanceName')
    })

    it('baseUrl', () => {
      assert.property(client, 'baseUrl')
    })

    it('token', () => {
      assert.property(client, 'token')
    })

    it('setTokenCallback', () => {
      assert.property(client, 'setTokenCallback')
    })
  })

  describe('client', () => {
    it('throws error if endpoint was not passed', () => {
      assert.throws(() => client(), /endpoint parameter is required/)
    })

    it('returns promise', () => {
      assert.instanceOf(client.get('users'), Promise)
    })

    it('resolves with valid output', () => {
      const expected = { hello: 'world' }

      fetchMock.post(url('users'), expected)

      return assert.becomes(client.get('users'), expected)
    })
  })

  describe('#url', () => {
    it('exists in client instance', () => {
      assert.property(client, 'url')
    })

    it('returns valid url', () => {
      const expected = 'https://test-instance.syncano.space/users/'

      assert.equal(url('users'), expected)
    })
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

  describe('#parseBody', () => {
    it('exists in client instance', () => {
      assert.property(client, 'parseBody')
    })

    it('return stringified object', () => {
      const result = client.parseBody({
        hello: 'world'
      })

      assert.isString(result)
    })
  })

  describe('#logout', () => {
    it('exists in client instance', () => {
      assert.property(client, 'logout')
    })

    it('removes client token', () => {
      client.logout()

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

      fetchMock.post(url('users'), expected)

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

      fetchMock.post(url('users'), expected)

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

      fetchMock.post(url('users'), expected)

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

    it('resolves with valid output', () => {
      const expected = { hello: 'world' }

      fetchMock.post(url('users'), expected)

      return assert.becomes(client.patch('users'), expected)
    })
  })

  describe('#subscribe', () => {
    it('exists in client instance', () => {
      assert.property(client, 'subscribe')
    })

    it('throws error if endpoint was not passed', () => {
      assert.throws(() => client.subscribe(), /endpoint parameter is required/)
    })

    it('throws error if callback was not passed', () => {
      assert.throws(() => client.subscribe('example-socket/example-endpoint'), /callback parameter is required/)
    })

    it('returns object', () => {
      assert.instanceOf(client.subscribe('example-socket/example-endpoint', () => {}), Object)
    })
  })
})
