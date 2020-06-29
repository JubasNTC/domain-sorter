# domain-sorter - A module for sorting "email:pass" data by domain and normalization

[![NPM](https://nodei.co/npm/domain-sorter.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/domain-sorter/)

### Features

* Sort large volumes of data type **email:pass**.
* **Screening** of invalid data and other garbage.
* **Data normalization**

### Getting started

    $ npm install --save domain-sorter

### Usage
    const DomainSorter = require('domain-sorter');

    const lines = [
      'TEST1@gmail.com:soulribbon1',
      'test2@icloud.com:jason123eA',
      'teSt3@yahoo.com:Ebben129',
      'test4_asdyahoo.com:Mixtli101',
      'testdyahoo.comMixtli101',
      'test5@YAHOO.com:Mixtli101',
    ];

    const domainSorter = new DomainSorter();
    await domainSorter.addLines(lines);
    const sortResult = domainSorter.getResult();

    sortResult will contain:
    Map([
      'gmail.com', Set(['test1@gmail.com:soulribbon1']),
      'icloud.com', Set(['test2@icloud.com:jason123eA']),
      'yahoo.com', Set(['test3@yahoo.com:Ebben129', 'test5@yahoo.com:Mixtli101']),
    ])