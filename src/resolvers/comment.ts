import {Post} from "../model/post";
import {User} from "../model/user";
import {Comment} from "../model/comment";
import {Hobby} from "../model/hobby";

const _ = require('lodash');

const Comment = {
    // @ts-ignore
    post: (parent, args, ctx, info) => {
        const {db} = ctx;
        const post: Post = _.find(db.posts, (u: Post) => {
            return u.id === parent.post;
        })
        return post;
    },
    // @ts-ignore
    author: (parent, args, ctx, info) => {
        const {db} = ctx;
        const user: User = _.find(db.users, (u: User) => {
            return u.id === parent.author;
        })
        return user;
    }
}


export {Comment as default}
