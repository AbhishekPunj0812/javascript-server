import UserRepository from '../repositories/user/UserRepository';

const userRepository: UserRepository = new UserRepository();
export default () => {

                console.log('Data sending in progress');
                userRepository.create({ name: 'Head-Trainer', role: 'head-trainer', email: 'head.trainer@sucessive.tedch', password: 'fgfcgbvcgc'});
                userRepository.create({ name: 'Trainee', role: 'trainee', email: 'trainee@sucessive.tedch', password: 'f566567576'});
};