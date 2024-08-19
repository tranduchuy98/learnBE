

import {getRole} from "../database/role_db.js";
import NodeCache from 'node-cache'

var cache = new NodeCache()

export const initData = async() => {
 const userRoles = await getRole()
 cache.set( "roles-user", userRoles );
}

export function getRoles(){ 
    const value = cache.get( "roles-user");
    return value
}