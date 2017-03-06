const fixtureFactory = require('fixture-factory');

// 'foobar'
const dummyPassword = '$2a$10$jqtfUwulMw6xqGUA.IsjkuAooNkAjPT3FJ9rRiUoSTsUpNTD8McxC';

let randomScope = null;
fixtureFactory.register('users', {
  id: 'random.number',
  createdAt: 'date.recent',
  scope: () => {
    randomScope = Math.random() > 0.5 ? 'expert' : 'teacher';
    return randomScope;
  },
  name: (fixtures, options, dataModel, faker) => (
    `${faker.name.firstName()} ${faker.name.lastName()}`
  ),
  email: 'internet.email',
  password: dummyPassword,
  locale: 'fi',
  description: 'lorem.sentence',

  title: 'name.jobTitle',
  address: 'address.streetAddress',
  phone: 'phone.phoneNumber',
  area: 'address.city',

  subjects: (fixtures, options, dataModel, faker) => {
    if (randomScope === 'expert') {
      return JSON.stringify([faker.random.word(), faker.random.word(), faker.random.word()]);
    }

    return null;
  },
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
  teacherId: 'random.number',
  expertId: 'random.number',
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
const testUser = Object.assign({}, fixtureFactory.generateOne('users'), {
  scope: 'admin',
  email: 'foo@bar.com',
});

exports.seed = knex => (
  knex('users')
    .insert(testUser)
    .then(() => knex.batchInsert('users', fixtureFactory.generate('users', 20)))
    .then(() => knex.batchInsert('lectures', fixtureFactory.generate('lectures', 50)))
    .then(() => knex.batchInsert('feedback', fixtureFactory.generate('feedback', 30)))
);
