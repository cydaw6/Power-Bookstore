
/* Personal db REST api  */


function c_db(isbn){
    return {
            isbn: isbn,
            rawdata :  function () {
                return $.ajax({
                url: "http://localhost:7045/books",
                dataType: "json"
                });
            },
            formatdata: async function(rawdata){
                let bookList = [];
                for(const book of rawdata){
                    if(book.isbn == this.isbn){
                        book.refOrigin = "already saved!";
                        bookList.push(book);
                    }
                }
                return bookList;
            }
    };
}

//http://isbn.mobpage.org/result.php?isbn=9789896800932