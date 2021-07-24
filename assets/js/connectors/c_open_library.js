
/*		OPEN Library	*/
// https://openlibrary.org/dev/docs/api/books


function c_open_library(isbn){
    return {
            isbn: isbn,
            rawdata :  function () {
                return $.ajax({
                    url: "https://openlibrary.org/isbn/"+isbn+".json",
                    method: "GET", 
                    dataType: "json"
                    });
            },
            formatdata: function(rawdata){
                let bookList = [];
                let book = {};
                let vi = rawdata;

                book.isbn = vi.isbn_10;
                book.title = vi.title;
                book.type = null;
                book.authors = null
                book.language = null;
                book.publisher = vi.publishers[0];
                book.publishedDate = vi.publish_date;
                book.description = vi.description ? vi.description : null;
                book.keyWords = null;
                book.purchasedPrice = null;
                book.sellingPrice = null;
                book.location = null;
                book.pageCount = vi.number_of_pages;
                book.image = vi.covers.length > 0 ? 'https://covers.openlibrary.org/b/id/'+vi.covers[0]+'-M.jpg' : null;
                book.thumbnail = vi.covers.length > 0 ? 'https://covers.openlibrary.org/b/id/'+vi.covers[0]+'-M.jpg' : null;
                book.personalNote = null;
                book.condition = null;
                book.refOrigin = "Open Library";

                return book;
            }
    };
}
