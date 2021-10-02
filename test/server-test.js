const waitPort = require('wait-port');
const {expect} = require('chai');

describe('Server listening', () => {
    it('should be listening', async () => {
     require('../server.js');
     const isOpen = await waitPort({port: 3000});
     expect(isOpen).to.be.true;
    });
});