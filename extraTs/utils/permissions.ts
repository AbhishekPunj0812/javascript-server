import { permission } from '../constants';

export default function hasPermission ( moduleName: string , role: string , permissionType: string): boolean {
    for ( const [ key, value ] of Object.entries ( permission )) {
        if ( key === moduleName ) {
            if ( value.all.includes ( role )) {
                return true;
            }
            else {
                for ( const [ key1, value1 ] of Object.entries( value )) {
                    if ( key1 === permissionType ) {
                        if ( Object.values( value1 ).includes( role )) {
                            return true;
                        }
                        return false;
                    }
                    else {
                        continue;
                    }

                }
            }
        }
        else {
            continue;
        }

    }
}