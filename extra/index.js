import {createDimondShape,createEquilateral} from './patterns'
import {hasPermission,validateUsers} from './utils'
let users = [
    {
    traineeEmail: 'trainee1@successive.tech',
    reviewerEmail: 'reviewer1@successive.te',
    },
    {
    traineeEmail: 'trainee2@successive.tech',
    reviewerEmail: 'reviewer2@sucssive.tech',
    },
    {
        traineeEmail: 'trainee2@successive.tech',
        reviewerEmail: 'reviewer2@successive.tech',
    }
    ];

createDimondShape(6);
createEquilateral(5);

console.log(hasPermission("getUsers","head-trainer","delete"));
validateUsers(users);
