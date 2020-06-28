const { assert } = require('chai');
const { describe, it } = require('mocha');
const DomainSorter = require('../src');

describe('Class DomainSorter', () => {
  describe('Add new lines', () => {
    it('When add new lines, they are expected to be added to the sorted list', async () => {
      const mockLines = [
        'ETHAN.mccall2011@gmail.com:soulribbon1',
        'Jasonmontoya14@icloud.com:jason123eA',
        'ebbecor101@yahoo.com:Ebben129',
        'bhernArdo_escobedo@yahoo.com:Mixtli101',
        'ephkt.one@gmail.com:vanthing21',
        'ashasuarstalker@gmail.com:8698koliu',
        'chantsi@hotmail.com:mochi0822',
        'arasmith@hotmail.com:HerpaDerpa0009',
        'clawn14@gmail.com:Clawnkrimeric6',
        'arcander@gmail.com:l4ur4en4',
        'azeugirdor@hotmail.com:mays2505',
        'cinbad62490@hotmail.com:cml6327750',
        'christina.hagan@gmail.com:steelfloor63',
      ];

      const expected = new Map([
        [
          'gmail.com',
          new Set([
            'ethan.mccall2011@gmail.com:soulribbon1',
            'ephkt.one@gmail.com:vanthing21',
            'ashasuarstalker@gmail.com:8698koliu',
            'clawn14@gmail.com:Clawnkrimeric6',
            'arcander@gmail.com:l4ur4en4',
            'christina.hagan@gmail.com:steelfloor63',
          ]),
        ],
        ['icloud.com', new Set(['jasonmontoya14@icloud.com:jason123eA'])],
        [
          'yahoo.com',
          new Set([
            'ebbecor101@yahoo.com:Ebben129',
            'bhernardo_escobedo@yahoo.com:Mixtli101',
          ]),
        ],
        [
          'hotmail.com',
          new Set([
            'chantsi@hotmail.com:mochi0822',
            'arasmith@hotmail.com:HerpaDerpa0009',
            'azeugirdor@hotmail.com:mays2505',
            'cinbad62490@hotmail.com:cml6327750',
          ]),
        ],
      ]);

      const domainSorter = new DomainSorter();
      await domainSorter.addLines(mockLines);
      const sortResult = domainSorter.getResult();

      assert.deepEqual(expected, sortResult);
    });
  });

  describe('Clear state instance class', () => {
    it('When clear state instance class, then expected empty Map', async () => {
      const mockLines = [
        'ETHAN.mccall2011@gmail.com:soulribbon1',
        'Jasonmontoya14@icloud.com:jason123eA',
      ];

      const expected = new Map();

      const domainSorter = new DomainSorter();
      await domainSorter.addLines(mockLines);

      domainSorter.clear();
      const cleared = domainSorter.getResult();

      assert.deepEqual(expected, cleared);
    });
  });

  describe('Normalize valid line', () => {
    it('When a valid line is specified, then an object consisting of a domain and a normalized line is expected', async () => {
      const mockLine = 'ETHAN.mccall2011@Gmail.com:soulribbon1';
      const domainSorter = new DomainSorter();
      const normalizedLine = domainSorter.normalizeLine(mockLine);
      const expected = {
        domain: 'gmail.com',
        normalizedLine: 'ethan.mccall2011@gmail.com:soulribbon1',
      };

      assert.deepEqual(expected, normalizedLine);
    });
  });

  describe('Normalize not valid line', () => {
    it('When a not valid line is specified, then null is expected', async () => {
      const mockLine = 'ETHAN.mccall2011:soulribbon1';
      const domainSorter = new DomainSorter();
      const normalizedLine = domainSorter.normalizeLine(mockLine);
      const expected = null;

      assert.deepEqual(expected, normalizedLine);
    });
  });
});
