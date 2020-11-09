import { permissions } from './Constants';

function hasPermission(getUser, role, permissionType) {
    if (!getUser.hasOwnProperty(permissionType)) {
        return false;
    }
    else if (getUser[permissionType].all.includes(role)) {
        return true;

    }
    else {
        return false;
    }
}
export { hasPermission };