
import UserRepository from '../repositories/user/UserRepository';

const userRepository: UserRepository = new UserRepository();
export default () => {
    userRepository.count()
        .then(res => {
            if (res === 0) {
                console.log('data seeding in progress');
                userRepository.create({
                    name: 'Head Trainer',
                    role: 'head-trainer',
                    email: 'headtrainer@successive.tech',
                    password: '12345'
                }, undefined);
                userRepository.create({
                    name: 'Trainee',
                    role: 'trainee',
                    email: 'trainee@successive.tech',
                    password: '98765'
                }, undefined);
            }
        })
        .catch(err => console.log(err));
};