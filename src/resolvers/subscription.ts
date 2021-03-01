import {Post} from "../model/post";

const _ = require('lodash');
const Subscription = {
    post: {
        // @ts-ignore
        subscribe(parent, args, ctx, info) {
            const {pubsub} = ctx;
            return pubsub.asyncIterator('post')
        }
    },

    comment: {
        // @ts-ignore
        subscribe(parent, args, ctx, info) {
            const {pubsub, db} = ctx;
            const post = _.find(db.posts, (p: Post) => {
                return p.id === args.postId
            })
            if (!post) {
                throw new Error('Post not found')
            }

            return pubsub.asyncIterator(`comment ${args.postId}`)
        }
    }
}

export {Subscription as default}
