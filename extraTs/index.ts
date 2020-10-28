import { createDiamondShape, createEquilateral } from './patterns';
import { hasPermission, validateUsers } from './utils';
import{ users } from './constants';
import{ permission } from './constants';
const {getUsers} = permission;
createDiamondShape(6);
createEquilateral(5);
console.log(hasPermission('getUsers', 'head-trainer', 'delete'));
validateUsers(users);