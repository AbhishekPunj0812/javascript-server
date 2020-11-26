import UserRepository from '../repositories/user/UserRepository';
import * as bcrypt from 'bcrypt';
import config from '../config/configuration';


const userRepository: UserRepository = new UserRepository();
export default () => {
  userRepository.count()
    .then(res => {
      if (res === 0) {
        const saltRounds = 10;
        const password = config.Password;
        const salt = bcrypt.genSaltSync(saltRounds);
        const hash = bcrypt.hashSync(password, salt);
        console.log('data seeding in progress');
        userRepository.create({
          role: 'head-trainer',
          email: 'vinay.chaudhary@successive.tech',
          password: hash
        }, undefined);
        userRepository.create({
          name: 'Abhishek Punj',
          role: 'trainee',
          email: 'abhishek.punj@successive.tech',
          password: hash
        }, undefined);
        userRepository.create({
          name: 'Shreya Maggu',
          role: 'trainee',
          email: 'shreya.maggu@successive.tech',
          password: hash
        }, undefined);
        userRepository.create({
          name: 'Meraj Hussain',
          role: 'trainee',
          email: 'meraj.hussain@successive.tech',
          password: hash
        }, undefined);
        userRepository.create({
          name: 'Rohan Singh',
          role: 'trainee',
          email: 'rohan.singh@successive.tech',
          password: hash
        }, undefined);
      }
    })
    .catch(err => console.log(err));

};
