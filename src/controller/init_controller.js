
import {getRole} from "../database/role_db.js";
import {StateValue} from "../State/state_value.js"

export const initData = async() => {
 const userRoles = await getRole()
 var state = new StateValue()
 state.UserRoles = userRoles
}

