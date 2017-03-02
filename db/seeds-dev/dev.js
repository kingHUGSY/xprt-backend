const fixtureFactory = require('fixture-factory');

// 'foobar'
const dummyPassword = '$2a$10$jqtfUwulMw6xqGUA.IsjkuAooNkAjPT3FJ9rRiUoSTsUpNTD8McxC';

fixtureFactory.register('experts', {
  id: 'random.number',
  createdAt: 'date.recent',
  photograph: (fixtures, options, dataModel, faker) => (
    `${faker.image.imageUrl()}?${faker.random.number()}`
  ),
  name: (fixtures, options, dataModel, faker) => (
    `${faker.name.firstName()} ${faker.name.lastName()}`
  ),
  title: 'name.jobTitle',
  description: 'lorem.sentence',
  subjects: (fixtures, options, dataModel, faker) => (
    JSON.stringify([faker.random.word(), faker.random.word(), faker.random.word()])
  ),
  area: 'address.city',
  password: dummyPassword,
  email: 'internet.email',
  phone: 'phone.phoneNumber',
});

fixtureFactory.register('teachers', {
  id: 'random.number',
  createdAt: 'date.recent',
  photograph: (fixtures, options, dataModel, faker) => (
    `${faker.image.imageUrl()}?${faker.random.number()}`
  ),
  name: (fixtures, options, dataModel, faker) => (
    `${faker.name.firstName()} ${faker.name.lastName()}`
  ),
  title: 'name.jobTitle',
  school: 'company.companyName',
  description: 'lorem.sentence',
  address: 'address.streetAddress',
  password: dummyPassword,
  email: 'internet.email',
  phone: 'phone.phoneNumber',
});

fixtureFactory.register('admins', {
  id: 'random.number',
  createdAt: 'date.recent',
  username: 'internet.userName',
  password: dummyPassword,
  email: 'internet.email',
});

fixtureFactory.register('lectures', {
  id: 'random.number',
  createdAt: 'date.recent',
  title: 'lorem.words',
  description: 'lorem.sentence',
  dates: 'date.future',
  teacherNote: 'lorem.sentence',
  expertNote: 'lorem.sentence',
  targetStudents: 'lorem.sentence',
  creatorId: 'random.number',
  creatorType: () => (
    Math.random() < 0.5 ? 'teacher' : 'expert'
  ),
  area: 'address.city',
});

fixtureFactory.register('feedback', {
  createdAt: 'date.recent',
  id: 'random.number',
  text: 'lorem.sentences',
  creatorType: () => (
    Math.random() < 0.5 ? 'teacher' : 'expert'
  ),
  email: 'internet.email',
});

// Generate one test admin user
const testUser = Object.assign({}, fixtureFactory.generateOne('admins'), {
  username: 'foobar',
  email: 'foo@bar.com',
  password: dummyPassword,
});

exports.seed = knex => (
  knex('admins')
    .insert(testUser)
    .then(() => knex.batchInsert('experts', fixtureFactory.generate('experts', 10)))
    .then(() => knex.batchInsert('teachers', fixtureFactory.generate('teachers', 10)))
    .then(() => knex.batchInsert('admins', fixtureFactory.generate('admins', 3)))
    .then(() => knex.batchInsert('feedback', fixtureFactory.generate('feedback', 30)))
);
