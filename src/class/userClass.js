export default class {
    constructor(userId){
        this.user_id = userId;
      //  this.user_password = password;

    }

    get(itemTp){
        return this[itemTp];
    }

    set(itemTp,val){
        this[itemTp] = val;
    }

}