export default function hasPermission(moduleName: { all: string; read: string; write: string; Delete: string; }, role: string, permissionType: string): boolean {
    let type: string ;
    const { all, read, write, Delete } = moduleName;
    if (permissionType === 'all')
        type = all;
    if (permissionType === 'read')
        type = read;
    if (permissionType === 'write')
        type = write;
    if (permissionType === 'Delete')
        type = Delete;
    if (role === 'head-trainer') {
        return true;
    }
    else {
        if (type.includes(role))
            return true;
        else
            return false;
    }
  }