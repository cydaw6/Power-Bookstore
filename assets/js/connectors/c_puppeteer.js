


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
                console.log(rawdata)
                let bookList = [];
                for(const elem of rawdata){
                    if(elem != null){
                        bookList.concat(elem);
                    }
                }
                console.log(bookList)
                return bookList;
            }

    };
}