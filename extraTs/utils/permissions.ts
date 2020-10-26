// tslint:disable-next-line:one-line
export default function hasPermission(moduleName, role, permissionType){
    let type;
    const { all, read, write, Delete } = moduleName;
    // tslint:disable-next-line: triple-equals
    if (permissionType == 'all')
        type = all;
    // tslint:disable-next-line: triple-equals
    if (permissionType == 'read')
        type = read;
    // tslint:disable-next-line: triple-equals
    if (permissionType == 'write')
        type = write;
    // tslint:disable-next-line: triple-equals
    if (permissionType == 'Delete')
        type = Delete;
    // tslint:disable-next-line: triple-equals
    if (role == 'head-trainer') {
        return true;
    }
    else {
        if (type.includes(role))
            return true;
        else
            return false;
    }
  }