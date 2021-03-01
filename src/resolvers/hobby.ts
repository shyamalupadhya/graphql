import {User} from "../model/user";
import {Hobby as h} from "../model/hobby";

const _ = require('lodash');

const Hobby = {
    // @ts-ignore
    users: (parent, args, ctx, info) => {
        let result: User[] = [];
        const {db} = ctx;
        const hobbies: h[] = _.filter(db.hobbies, (u: h) => {
            return u.name === parent.name;
        })
        if (hobbies) {
            _.each(hobbies, (h: h) => {
                return _.each(db.users, (p: User) => {
                    h.user === p.id ? result.push(p) : ''
                })
            });
        }
        return result;
    }
}


export {Hobby as default}
