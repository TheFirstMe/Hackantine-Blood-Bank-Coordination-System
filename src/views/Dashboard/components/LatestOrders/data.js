import uuid from 'uuid/v1';

export default [
  {
    id: uuid(),
    ref: 'CDD1049',
    amount: 30.5,
    customer: {
      name: 'Ekaterina Tankova',
      age: 21,
      gender: 'M',
      weight: '54',
      bloodGroup: 'A+',

    },
    createdAt: 1555016400000,
    status: 'pending'
  },
  {
    id: uuid(),
    ref: 'CDD1048',
    amount: 25.1,
    customer: {
      name: 'Cao Yu',
      age: 21,
      gender: 'M',
      weight: '54',
      bloodGroup: 'A+'
    },
    createdAt: 1555016400000,
    status: 'delivered'
  },
  {
    id: uuid(),
    ref: 'CDD1047',
    amount: 10.99,
    customer: {
      name: 'Alexa Richardson',
      age: 21,
      gender: 'M',
      weight: '54',
      bloodGroup: 'A+'
    },
    createdAt: 1554930000000,
    status: 'refunded'
  },
  {
    id: uuid(),
    ref: 'CDD1046',
    amount: 96.43,
    customer: {
      name: 'Anje Keizer',
      age: 21,
      gender: 'M',
      weight: '54',
      bloodGroup: 'A+'
    },
    createdAt: 1554757200000,
    status: 'pending'
  },
  {
    id: uuid(),
    ref: 'CDD1045',
    amount: 32.54,
    customer: {
      name: 'Clarke Gillebert',
      age: 21,
      gender: 'M',
      weight: '54',
      bloodGroup: 'A+'
    },
    createdAt: 1554670800000,
    status: 'delivered'
  },
  {
    id: uuid(),
    ref: 'CDD1044',
    amount: 16.76,
    customer: {
      name: 'Adam Denisov',
      age: 21,
      gender: 'M',
      weight: '54',
      bloodGroup: 'A+'
    },
    createdAt: 1554670800000,
    status: 'delivered'
  }
];
