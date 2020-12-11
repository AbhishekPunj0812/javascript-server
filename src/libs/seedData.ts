import UserRepository from '../repositories/user/UserRepository';
import * as bcrypt from 'bcrypt';

import config  from '../config/configuration';
import { query } from 'express';


const userRepository: UserRepository = new UserRepository();
export default () => {
  userRepository.count(query)
    .then(res => {
      if (res === 0) {

        console.log('data seeding in progress');
        userRepository.create({
          role: 'head-trainer',
          email: 'vinay.chaudhary@successive.tech',
          password: config.Password
        }, undefined);
        userRepository.create({
          name: 'Abhishek Punj',
          role: 'trainee',
          email: 'abhishek.punj@successive.tech',
          password: config.Password
        }, undefined);
      }
    })
    .catch(err => console.log(err));
    };