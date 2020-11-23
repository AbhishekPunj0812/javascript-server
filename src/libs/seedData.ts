import UserRepository from '../repositories/user/UserRepository';

const userRepository: UserRepository = new UserRepository();
export default () => {
userRepository.count()
.then(res => {
    if ( res === 0 ) {
                console.log('Data sending in progress');
                userRepository.create({ name: 'Head-Trainer', role: 'head-trainer', email: 'head.trainer@sucessive.tech', password: 'fgfcgbvcgc'});
                userRepository.create({ name: 'Trainee', role: 'trainee', email: 'trainee@sucessive.tech', password: 'f566567576'});
}
})
.catch(err => console.log(err));
};