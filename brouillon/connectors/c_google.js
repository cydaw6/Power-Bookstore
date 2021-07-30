


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
            formatdata: async function(){
                let rawdata = await this.rawdata();
                let bookList = [];
                let book = {}

                for(const bookData of rawdata.items){
                    
                    let vi = bookData.volumeInfo;
                    book.isbn = vi.industryIdentifiers[0].identifier; //0 : ISBN 10 | 1: ISBN 13
                    book.title = vi.title;
                    book.authors = vi.authors.join(', ');
                    book.language = vi.language;
                    book.publisher = vi.publisher;
                    book.publishedDate = vi.publishedDate.split('-').reverse().join('-');
                    book.description = vi.description;
                    book.pageCount = vi.pageCount;
                    book.image = vi.imageLinks == undefined ? null : vi.imageLinks.thumbnail;
                    book.thumbnail = vi.imageLinks == undefined  ? null : vi.imageLinks.smallThumbnail;
                    book.type = null;
                    book.keyWords = null;
                    book.purchasedPrice = null;
                    book.sellingPrice = null;
                    book.location = null;
                    
                    book.personalNote = null;
                    book.condition = null;
                    
                    book.refOrigin = "Google";
                    
                    bookList.push(book);
                }

                return bookList;
            }
    };
}