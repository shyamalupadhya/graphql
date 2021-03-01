import {Post} from "../model/post";
import {User} from "../model/user";
import {Comment} from "../model/comment";
import {Hobby} from "../model/hobby";

const _ = require('lodash');

const User = {
    // @ts-ignore
    posts: (parent, args, ctx, info) => {
        const {db} = ctx;
        const user: User = _.find(db.users, (u: User) => {
            return u.name === parent.name;
        })
        if (user) {
            return _.filter(db.posts, (p: Post) => {
                return p.author === user.id
            })
        } else return [];
    },
    // @ts-ignore
    comments: (parent, args, ctx, info) => {
        const {db} = ctx;
        const user: User = _.find(db.users, (u: User) => {
            return u.name === parent.name;
        })
        if (user) {
            return _.filter(db.comments, (p: Comment) => {
                return p.author === user.id
            })
        } else return [];
    },
    // @ts-ignore
    hobbies: (parent, args, ctx, info) => {
        const {db} = ctx;
        const user: User = _.find(db.users, (u: User) => {
            return u.name === parent.name;
        })
        if (user) {
            return _.filter(db.hobbies, (p: Hobby) => {
                return p.user === user.id
            })
        } else return [];
    }
}


export {User as default}
