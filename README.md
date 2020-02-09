A javascript parser for [todo.txt](https://github.com/todotxt/todo.txt)

Basically, it's a one-way tool. It provides methods to extract information such as projects, contexts, etc from a todo.txt text but not the other way round. Either use the various methods provided for information extraction, or use todoTextToDto method to extract everything into a Dto. The Dto object also contains the original text.

The Dto was made with immutability in mind. Once you change any part of it, the entire thing becomes invalid. To change anything, edit the original text and recreate the Dto.

Is it over-engineered? Yes! It is! But in my defence, the real reason for creating this package is to learn. I mean, there are a lot of good todo.txt parsers out there. This one is just for my learning purpose.
