import {User} from "./model/user";
import {Hobby} from "./model/hobby";
import {Post} from "./model/post";
import {Comment} from "./model/comment";

const users = [{
    id: '1',
    name: 'Andrew',
    email: 'andrew@example.com',
    age: 27
}, {
    id: '2',
    name: 'Sarah',
    email: 'sarah@example.com'
}, {
    id: '3',
    name: 'Mike',
    email: 'mike@example.com'
}]

const hobbies: Hobby[] = [
    {
        id: '1',
        name: 'Swimming',
        user: '1'
    },
    {
        id: '2',
        name: 'Running',
        user: '1'
    },
    {
        id: '3',
        name: 'Jogging',
        user: '2'
    },
    {
        id: '4',
        name: 'Dancing',
        user: '3'
    },
    {
        id: '5',
        name: 'Singing',
        user: '2'
    },
    {
        id: '6',
        name: 'Swimming',
        user: '3'
    }
];

const posts = [{
    id: '10',
    title: 'GraphQL 101',
    body: 'This is how to use GraphQL...',
    published: true,
    author: '1'
}, {
    id: '11',
    title: 'GraphQL 201',
    body: 'This is an advanced GraphQL post...',
    published: false,
    author: '1'
}, {
    id: '12',
    title: 'Programming Music',
    body: '',
    published: true,
    author: '2'
},
    {
        id: '12',
        title: 'Programming JQuery',
        body: '',
        published: true,
        author: '3'
    }]

const comments = [{
    id: '102',
    text: 'This worked well for me. Thanks!',
    author: '3',
    post: '10'
}, {
    id: '103',
    text: 'Glad you enjoyed it.',
    author: '1',
    post: '10'
}, {
    id: '104',
    text: 'This did no work.',
    author: '2',
    post: '11'
}, {
    id: '105',
    text: 'Nevermind. I got it to work.',
    author: '1',
    post: '12'
}]

const DB: { users: User[], posts: Post[], comments: Comment[], hobbies: Hobby[] } = {
    users,
    posts,
    comments,
    hobbies
}

export {DB as default}
