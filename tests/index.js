const { assert } = require('chai')
const SyncanoClient = require('../src').default

describe('client', () => {
  const instanceName = 'test-instance'
  const instanceApiKey = 'test-api-key'
  let client

  beforeEach(() => {
    client = new SyncanoClient(instanceName, instanceApiKey)
  })

  it('init without error', () => {
    assert.instanceOf(client, SyncanoClient)
  })

  describe('#post', () => {
    it('exists in client instance', () => {
      assert.property(client, 'post', '[message]')
    })
  })
})
