

export class StateValue {
    constructor() {
        if (typeof StateValue.instance === 'object') {
            return StateValue.instance;
        }
        this.UserRoles = [];
        StateValue.instance = this;
    }
}