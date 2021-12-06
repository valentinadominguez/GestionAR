import MockAdapter from 'axios-mock-adapter';
import { axios } from '../config/axiosConfig';
import { GRADES, SUBJECTS } from '../utils/constants';

export const mock = new MockAdapter(axios);

mock.onGet('/grades/').reply(200, GRADES);

mock.onGet('/subjects/').reply(200, SUBJECTS);

mock.onGet(/students\/\d+/).reply(200, {
  firstName: 'Pedro',
  lastName: 'Lopez',
  dni: '1241241',
  birth_date: '1231241',
  registration_number: '1241241',
  grade_id: {
    shift: '1241',
    section: '14214',
    level: '41241',
  },
  phone: '12412',
  address: '12412',
  neighborhood: '12412',
  student_tutors: [
    {
      lastName: 'Lopez',
      firstName: 'Agustin',
      dni: '13412',
      phone: '13412',
      educational_level: '12412',
      other_info: '1241',
    },
    {
      lastName: 'Martinez',
      firstName: 'Gabriel',
      dni: '12412',
      phone: '1241',
      educational_level: '12412',
      other_info: '141241',
    },
  ],
  school_dining: true,
  milk_cup: false,
  repeating_quantity: 0,
});

mock.onGet('/students/', { params: { grade_id: '1' } }).reply(200, [
  {
    id: '1',
    lastName: 'Jorge',
    firstName: 'Lopez',
    registration_number: '12441241',
    section: '3',
    shift: 'M',
  },
]);

mock.onGet('/students/', { params: { grade_id: '2' } }).reply(200, [
  {
    id: '1',
    lastName: 'Jorge',
    firstName: 'Lopez',
    registration_number: '12441241',
    section: '3',
    shift: 'M',
  },
]);
mock.onGet('/students/', { params: { grade_id: '3' } }).reply(200, [
  {
    id: '1',
    lastName: 'Jorge',
    firstName: 'Lopez',
    registration_number: '12441241',
    section: '3',
    shift: 'M',
  },
]);
mock.onGet('/students/', { params: { grade_id: '4' } }).reply(200, [
  {
    id: '1',
    lastName: 'Jorge',
    firstName: 'Lopez',
    registration_number: '12441241',
    section: '3',
    shift: 'M',
  },
]);
mock.onGet('/students/', { params: { grade_id: '5' } }).reply(200, [
  {
    id: '1',
    lastName: 'Jorge',
    firstName: 'Lopez',
    registration_number: '12441241',
    section: '3',
    shift: 'M',
  },
]);
mock.onGet('/students/', { params: { grade_id: '6' } }).reply(200, [
  {
    id: '1',
    lastName: 'Jorge',
    firstName: 'Lopez',
    registration_number: '12441241',
    section: '3',
    shift: 'M',
  },
]);
mock.onGet('/students/', { params: { grade_id: '7' } }).reply(200, [
  {
    id: '1',
    lastName: 'Jorge',
    firstName: 'Lopez',
    registration_number: '12441241',
    section: '3',
    shift: 'M',
  },
]);

mock.onPost('/auth/signIn').reply(200);

mock.onPost('/attendances/add').reply(200);
