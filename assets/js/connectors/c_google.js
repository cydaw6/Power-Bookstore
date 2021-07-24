


/*		GOOGLE 		*/

function c_google(isbn){
    return {
            isbn: isbn,
            rawdata :  function () {
                return $.ajax({
                url: "https://www.googleapis.com/books/v1/volumes",
                method: "GET", 
                data: {'q' : 'isbn:'+this.isbn, //Si on a une clé, la mettre sur la ligne suivante
                'key' : 'AIzaSyBEtz_UVSzKQ6WcuwihRH0iy7JAkTXSM_w'
                },
                dataType: "json"
                });
            },
            formatdata: function(rawdata){
                let bookList = [];
                let book = {}

                for(const bookData of rawdata.items){
                    let vi = bookData.volumeInfo;
                    book.isbn = vi.industryIdentifiers[0].identifier; //0 : ISBN 10 | 1: ISBN 13
                    book.title = vi.title;
                    book.type = null;
                    book.authors = vi.authors.join(', ');
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
                    book.condition = null;
                    
                    book.refOrigin = "Google";
                    
                    bookList.push(book);
                }

                return bookList;
            }
    };
}