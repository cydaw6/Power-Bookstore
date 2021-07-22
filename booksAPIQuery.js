

function getGoogleBook(isbn) {
    return $.ajax({
    url: "https://www.googleapis.com/books/v1/volumes",
    method: "GET", 
    data: {'q' : 'isbn:'+isbn, //Si on a une clé, la mettre sur la ligne suivante
    'key' : 'AIzaSyBEtz_UVSzKQ6WcuwihRH0iy7JAkTXSM_w'
    },
    dataType: "json"
	});
    // FORMATER dans success
}


/*
function formatGoogle(data){
	try{
		let bookList = [];
	    	if(data){
	    		let book = {}
	            for(const bookData of data.items){
	            	let vi = bookData.volumeInfo;
	            	book.isbn = vi.industryIdentifiers[0]; //0 : ISBN 10 | 1: ISBN 13
	            	book.title = vi.title;
	            	book.type = null;
	            	book.authors = vi.authors;
	            	book.language = vi.language;
	            	book.publisher = vi.publisher;
	            	book.publishedDate = vi.publishedDate;
	            	book.description = vi.description;
	            	book.keyWords = null;
	            	book.purchasedPrice = null;
	            	book.sellingPrice = null;
	            	book.location = null;
	            	book.pageCount = vi.pageCount;
	            	book.image = vi.imageLinks.thumbnail;
	            	book.thumbnail = vi.imageLinks.smallThumbnail;
	            	book.personalNote = null;

	                bookList.push(book);
	            }
	        }
	        //console.log(bookList);
    	return bookList;

	}catch(err){
		// console.log(err)
	}
}
*/