import {User} from "../model/user";
import {Hobby} from "../model/hobby";
import {Post} from "../model/post";
import {Comment} from "../model/comment";

const _ = require('lodash');

const Query = {
    // @ts-ignore
    user: (parent, args, ctx, info) => {
        const {db} = ctx;
        return _.find(db.users, (u: User) => {
            return u.name === args.name;
        })
    },
    // @ts-ignore
    hobby: (parent, args, ctx, info) => {
        const {db} = ctx;
        return _.find(db.hobbies, (u: Hobby) => {
            return u.name === args.name;
        })
    },
    // @ts-ignore
    post: (parent, args, ctx, info) => {
        const {db} = ctx;
        return _.find(db.posts, (u: Post) => {
            return u.id === args.id;
        })
    },
    // @ts-ignore
    comment: (parent, args, ctx, info) => {
        const {db} = ctx;
        return _.find(db.comments, (u: Comment) => {
            return u.id === args.id;
        })
    },
}

export {Query as default}
