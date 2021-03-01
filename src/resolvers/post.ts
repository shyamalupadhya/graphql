import {Post} from "../model/post";
import {User} from "../model/user";

const _ = require('lodash');

const Post = {
    // @ts-ignore
    author: (parent, args, ctx, info) => {
        const {db} = ctx;
        const user: User = _.find(db.users, (u: User) => {
            return u.id === parent.author;
        })
        return user;
    }
}


export {Post as default}
