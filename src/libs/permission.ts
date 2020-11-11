import { permissions } from './Constants';

function hasPermission(module: string, role: string, permissionType: string) {
const modulepermission = permissions[module];
    if (!modulepermission) {
    return false;
}
    if (modulepermission.all.includes(role)) {
    return true;
}
    if (modulepermission[permissionType] && modulepermission[permissionType].includes(role)) {
    return true;
}
    else {
    return false;
}
}
export { hasPermission };