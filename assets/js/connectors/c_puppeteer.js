


function c_puppeteer(isbn){
    return {
            isbn: isbn,
            rawdata :  function () {
                return $.ajax({
                //url: "http://localhost:7045/books",
                url: `https://cydaw6-power-bookstore-56jqp6pqh7qw6-7046.githubpreview.dev/isbn/${isbn}`,
                dataType: "json"
                });
            },
            formatdata: async function(){
                let rawdata = await this.rawdata();
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