import { IPuser } from './interfaces';
import { IUsers } from './interfaces';
export let permission: IPuser = {
    'getUsers': {
    all: ['head-trainer'],
    read : ['trainee', 'trainer'],
    write : ['trainer'],
    Delete: []
    } };
export let users: IUsers[] = [
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