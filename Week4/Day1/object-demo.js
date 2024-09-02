let book = {
	title : 'Node.js를 공부해 보자',
	price: 20000,
	description: '좋은책이다'
};

function print(obj) {
    console.log(book.title);
    console.log(book.price);
    console.log(book.description);
}
print(book);