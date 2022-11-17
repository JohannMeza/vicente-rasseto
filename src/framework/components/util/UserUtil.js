
export class UserUtil{

    static getUserId(){
        if(sessionStorage.getItem('AUTH_USER') != '') {
            const auth = sessionStorage.getItem('AUTH_USER');
            const user = JSON.parse(auth);
            return user[0].userId;
        } else {
            return null;
        }
    }

    static getKey(){
        return (Math.random() + 1).toString(36).substring(7);
    }

    static getUserAuth(){
        if(sessionStorage.getItem('AUTH_USER') != '') {
            const auth = sessionStorage.getItem('AUTH_USER');
            const user = JSON.parse(auth);
            return user[0];
        } else {
            return null;
        }
    }

    static newId() {
        return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
          (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
        ).toString(16);
      }

}