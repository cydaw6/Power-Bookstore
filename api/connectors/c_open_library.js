const axios = require('axios');
require('./globals')();

module.exports = function() {
    this.c_open_library = function(isbn){
        return {
                isbn: isbn,
                rawdata :  function () {
                  return axios.get('https://openlibrary.org/isbn/'+isbn+'.json');
                },
                formatdata: async function(){
                    let rawdata = await this.rawdata();
                    let bookList = [];
                    let book = BookShell();
                    const vi = rawdata.data;
    
                    //-- Authors
                    let ppl = [];
                    for (let index = 0; index < vi.authors.length; index++) {
                        const element = vi.authors[index];
                        
                        const curr_author = await this.rawauthor(element.key.substring(9));
                        ppl.push(curr_author.data.name);
                    }

                    book.authors = ppl;
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
                    book.publishedDate              = `${day}-${month}-${year}`;

                    book.isbn_10                    = vi.isbn_10.join();
                    book.isbn_13                    = vi.isbn_13.join();
                    book.title                      = vi.title;
                    book.publisher                  = vi.publishers[0];
                    book.page_count                 = vi.number_of_pages;
                    book.image                      = vi.covers.length > 0 ? 'https://covers.openlibrary.org/b/id/'+vi.covers[0]+'-M.jpg' : null;
                    book.thumbnail                  = vi.covers.length > 0 ? 'https://covers.openlibrary.org/b/id/'+vi.covers[0]+'-M.jpg' : null;
                    book.description                = vi.description ? vi.description : null;
                    book.ref_origin                 = "Open Library";
    
                    return book;
                },
                rawauthor: function(code){
                    return axios.get('https://openlibrary.org/authors/'+code+'.json');
                }
        };
    }

}