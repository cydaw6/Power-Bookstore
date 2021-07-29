/*		GOOGLE 		*/
const axios = require('axios');
require('./globals')();

module.exports = function() {
    this.c_google = function(isbn){
        return {
                isbn: isbn,
                rawdata :  function () {
                    return axios.get('https://www.googleapis.com/books/v1/volumes?q=isbn:'+isbn);
                },
                formatdata: function(rawdata){
                    let bookList = [];
                    let book = new BookShell();
    
                    for(const bookData of rawdata.data.items){
                        let vi = bookData.volumeInfo;

                        book.isbn_10           = vi.industryIdentifiers[0].identifier;
                        book.isbn_13           = vi.industryIdentifiers[1].identifier;
                        book.title             = vi.title;
                        book.authors           = vi.authors;
                        book.language          = vi.language;
                        book.publisher         = vi.publisher;
                        book.published_date    = vi.publishedDate.split('-').reverse().join('-');
                        book.description       = vi.description;
                        book.page_count        = vi.pageCount;
                        book.image             = vi.imageLinks.thumbnail;
                        book.thumbnail         = vi.imageLinks.smallThumbnail;
                        book.ref_origin        = "Google";
                        
                        
                        bookList.push(book);
                    }
                    return bookList;
                }
        };
    }

}