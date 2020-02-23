A javascript parser for [todo.txt](https://github.com/todotxt/todo.txt)

Is it over-engineered? Yes! It is! But in my defence, the real reason for creating this package is to learn. I mean, there are a lot of good todo.txt parsers out there. This one is just for my learning purpose.

```
npm i @ochuzor/todo.txt-parser
```
The library provides a few functions for working with todo.txt formatted strings. To convert a todo.txt text into a javascript object, use:

```typescript
import {textToDto} from '@ochuzor/todo.txt-parser';
const todo = textToDto('x work on the new +projectMakeOver @home');
```

The returned object has the following properties:

```typescript
interface IDoc {
    id?: string | number;
}

interface TagDto {
    name: string;
    value: string;
}

interface TodoDto extends IDoc {
    description: string;
    isCompleted: boolean;
    priority: string;
    dateOfCreation: string;
    dateOfCompletion: string;
    projects: string[];
    contexts: string[];
    tags: TagDto[];
}
```
Another function provided is todoDtoToText. It converts an object from the above function into a todo.txt string. Here's how to use it:
```typescript
import {todoDtoToText} from '@ochuzor/todo.txt-parser';

const todo = {
    description: 'write a new documentation',
    isCompleted: true,
    priority: '(A)',
    ...
};

const todoTxt = todoDtoToText(todo);
// returns "x (A) write a new documentation"
```
The priority ranges from (A) to (E). The implementation follows the format on [todo.txt](https://github.com/todotxt/todo.txt). The third function is textToIndexDto. It is similar to textToDto above except that every field is a string, including the "isCompleted", which is then either "true" or "false". The projects list is now a space separated list of projects. Same applies to the contexts field as well. The tags field is a space separated list of tagName:tagValue strings. I made this function, for cases where you want to index documents but make all the fields searchable strings.

Finally, I made this library for learning purposes. Check out the code and tests.
