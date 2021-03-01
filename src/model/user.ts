import {Post} from "./post";
import {Hobby} from "./hobby";

export interface User {
    id: String;
    name: String;
    email: String;
    age?: Number;
    posts?: Post[];
    hobbies?: Hobby[];
}
