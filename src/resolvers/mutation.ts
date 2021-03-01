import {User} from "../model/user";
import {v4 as uuidv4} from 'uuid';
import {Post} from "../model/post";
import {Comment} from "../model/comment";

const _ = require('lodash');


const Mutation = {
    // @ts-ignore
    createUser: (parent, args, ctx, info) => {
        const {db} = ctx;
        const foundUser: User = _.find(db.users, (u: User) => {
            return u.email === args.data.email;
        });

        if (foundUser) {
            throw Error("User already exists with email")
        }

        const user: User = {
            id: uuidv4(),
            ...args.data
        };
        db.users.push(user)

        return user;
    },

    // @ts-ignore
    updateUser: (parent, args, ctx, info) => {
        const {db} = ctx;
        const {data} = args;
        const foundUser: User = _.find(db.users, (u: User) => {
            return u.id === args.id;
        });

        if (!foundUser) {
            throw Error("User doesn't exists with id")
        }

        if (!!data.email) {
            foundUser.email = data.email;
        }
        if (!!data.name) {
            foundUser.name = data.name;
        }

        if (!!data.age) {
            foundUser.age = data.age;
        }

        return foundUser;
    },

    // @ts-ignore
    deleteUser: (parent, args, ctx, info) => {
        const {db} = ctx;
        const foundUser: User = _.find(db.users, (u: User) => {
            return u.id === args.id;
        });

        if (!foundUser) {
            throw Error("User doesn't exists with id")
        }

        db.posts = db.posts.filter((p: Post) => p.author !== args.id);
        db.comments = db.comments.filter((p: Comment) => p.author !== args.id);
        db.users = db.users.filter((u: User) => u.id !== args.id);
        return foundUser;
    },

    // @ts-ignore
    createPost: (parent, args, ctx, info) => {
        const {db, pubsub} = ctx;

        const foundUser: User = _.find(db.users, (u: User) => {
            return u.id === args.data.author;
        });

        if (!foundUser) {
            throw Error("User doesn't exists with id")
        }

        const post: Post = {
            id: uuidv4(),
            ...args.data
        };
        db.posts.push(post)

        if (post.published) {
            pubsub.publish('post', {
                post: {
                    mutation: 'CREATED',
                    data: post
                }
            })
        }
        return post;
    },

    // @ts-ignore
    updatePost: (parent, args, ctx, info) => {
        const {db, pubsub} = ctx;
        const {data} = args;

        const foundPost: Post = _.find(db.posts, (u: Post) => {
            return u.id === args.id;
        });

        if (!foundPost) {
            throw Error("Post doesn't exists with id")
        }

        if (!!data.title) {
            foundPost.title = data.title;
        }
        if (!!data.name) {
            foundPost.body = data.body;
        }

        if (!data.published) {
            foundPost.published = data.published;
        }

        if (foundPost.published) {
            pubsub.publish('post', {
                post: {
                    mutation: 'UPDATED',
                    data: foundPost
                }
            })
        }

        return foundPost;
    },

    // @ts-ignore
    deletePost: (parent, args, ctx, info) => {
        const {db, pubsub} = ctx;
        const foundPost: Post = _.find(db.posts, (u: Post) => {
            return u.id === args.id;
        });

        if (!foundPost) {
            throw Error("Post doesn't exists with id")
        }

        db.comments = db.comments.filter((p: Comment) => p.post !== args.id);
        db.posts = db.posts.filter((p: Post) => p.id !== args.id);

        if (foundPost.published) {
            pubsub.publish('post', {
                post: {
                    mutation: 'DELETED',
                    data: foundPost
                }
            })
        }
        return foundPost;
    },

    // @ts-ignore
    createComment: (parent, args, ctx, info) => {
        const {db, pubsub} = ctx;

        const foundUser: User = _.find(db.users, (u: User) => {
            return u.id === args.data.author;
        });

        if (!foundUser) {
            throw Error("User doesn't exists with id")
        }

        const foundPost: Post = _.find(db.posts, (u: Post) => {
            return u.id === args.data.post;
        });

        if (!foundPost) {
            throw Error("Post doesn't exists with id")
        }

        const comment: Comment = {
            id: uuidv4(),
            ...args.data
        };
        db.comments.push(comment)


        pubsub.publish(`comment ${args.data.post}`, {
            comment: {
                mutation: 'CREATED',
                data: comment
            }
        })

        return comment;
    },

    // @ts-ignore
    deleteComment: (parent, args, ctx, info) => {
        const {db, pubsub} = ctx;
        const foundComment: Comment = _.find(db.comments, (u: Comment) => {
            return u.id === args.id;
        });

        if (!foundComment) {
            throw Error("Comment doesn't exists with id")
        }

        db.comments = db.comments.filter((p: Comment) => p.id !== args.id);

        pubsub.publish(`comment ${foundComment.post}`, {
            comment: {
                mutation: 'DELETED',
                data: foundComment
            }
        })

        return foundComment;
    },
};

export {Mutation as default};
