
/*		Book finder	*/
// http://isbn.mobpage.org/result.php?isbn=9789896800932


function c_book_finder(isbn){
    return {
            isbn: isbn,
            rawdata :  function () {
                return $.ajax({
                    url: "http://isbn.mobpage.org/result.php?isbn="+isbn,
                    headers: {
                        'access-Control-Allow-Origin': '*'
                    },
                    dataType: "json"
                    });
            },
            formatdata: async function(rawdata){
                console.log(rawdata)
                let bookList = [];
                let book = {};
                const vi = rawdata;

                book.isbn = vi.isbn_10;
                book.title = vi.title;
                book.type = null;
                book.language = null;
                book.publisher = vi.publishers[0];
                
                //-- Authors
                let ppl = [];
                for (let index = 0; index < vi.authors.length; index++) {
                    const element = vi.authors[index];
                    const curr_author = await this.rawauthor(element.key.substring(9));
                    ppl.push(curr_author.name);
                }
                book.authors = ppl.join(', ');
                //
                //-- Date format
                let date = vi.publish_date.split(',');
                let month = {
                                "Jan": '01',
                                "Feb": '02',
                                "Mar": '03',
                                "Apr": '04',
                                "May": '05',
                                "Jun": '06',
                                "Jul": '07',
                                "Aug": '08',
                                "Sep": '09',
                                "Oct": '10',
                                "Nov": '11',
                                "Dec": '12'
                            }[date[0].substring(0, 3)];
                let day = date[0].split(' ')[1];
                let year = date[1].trim();
                book.publishedDate = `${day}-${month}-${year}`;
                //

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
                book.ref_origin = "Open Library";

                return book;
            },
            rawauthor: function(code){
                return $.ajax({
                    url: "https://openlibrary.org/authors/"+code+".json",
                    method: "GET", 
                    dataType: "json"
                    });
            }
    };
}
