let permission = {
    'getUsers': {
    all: ['head-trainer'],
    read : ['trainee', 'trainer'],
    write : ['trainer'],
    Delete: [],
    }

    }
    

function hasPermission(moduleName,role,permissionType){
    for(const [key,value] of Object.entries(permission)){
        if(key == moduleName){
            if(value.all.includes(role)){
                return true;
            }else{
                for(const[key1,value1] of Object.entries(value)){
                    if(key1 === permissionType){
                        if(value1.includes(role)){
                            return true;
                        }
                        return false;
                    }else{
                        continue;
                    }
                }
                }
        }else{
            continue;
        }
    }
}
const result =hasPermission("getUsers","head-trainer","delete");
    console.log(result);