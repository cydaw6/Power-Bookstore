
async function search(isbn){
    /* https://stackoverflow.com/questions/27612372/how-to-await-the-ajax-request */

    window.localStorage.setItem('bookhistory', JSON.stringify([])); //clear cache
    
    let bookList = [];

    try{
        
        // Google api
        const response = await getGoogleBook(isbn);
        if(response){
            let book = {}
            for(const bookData of response.items){
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
        }
    }catch (err) {
        console.log(err);
    }
        
    try{
        // Open Library
        // https://openlibrary.org/developers/api
        // ISBN API https://openlibrary.org/dev/docs/api/books
        const openLibResponse = await getOpenLibBook(isbn);
        if(openLibResponse){
            let book = {}
            let vi = openLibResponse;
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

            bookList.push(book);            
        }

    } catch(err){
        console.log(err);
    }


    // free api
    // https://www.programmableweb.com/news/10-most-popular-apis-books/brief/2020/01/26
    //https://blog.api.rakuten.net/top-10-best-books-apis/
    // cool project https://github.com/internetarchive/bookreader


    // add books data to localStorage
    window.localStorage.setItem('bookhistory', JSON.stringify(bookList));
    // refresh shown references  
    updateBookFinder(); 

    
}



// Dynamic found books cards and tooltip

function updateBookFinder(){
    // loading animation
    document.getElementById('references').innerHTML = '<div style="text-align: center;"><div class="loader"></div></div>';

    
    let foundReferences = JSON.parse(window.localStorage.getItem('bookhistory'));
    foundReferences = foundReferences ? foundReferences : [];

    if(foundReferences.length > 0){
        // fill up the div with books data
        let div = document.getElementById('references');
        div.innerHTML = "";
        for (let index = 0; index < foundReferences.length; index++) {

            let book = foundReferences[index];

            for (var i = 0; i < 1; i++) {
                div.innerHTML += 
            '<div class="srchedBookBox foundBtooltip" id="foundBook" box-id="'+index+'">'
                + '<div style="float: right; top: 0px; right: 0px; color: #b56357;">'+book.refOrigin+'</div>'
                + '<div class="row">'
                    + book.title
                + '</div>'
                + '<div class="row" style="font-size: 0.8em; color: grey; padding-left: 1em;">'
                    + book.authors
                + '</div>'
                + '<div class="row" style="font-size: 0.8em; color: grey; padding-left: 1em;">'
                    + book.publishedDate.substring(0, 4)
                + '</div>'
                +'<span class="tooltipBox">'
                + '<table style="height: 100px;">'
                        +'<tbody>'
                        +'<tr>'
                            +'<td class="align-middle"><img alt="" src="'+book.image+'" class="img-thumbnail"></td>'
                            +'<td class="align-middle" style="text-align: left; padding-left: 1em;">'
                            + '<br><b>' +book.title + '</b>'
                            + '<br>' +book.authors + ''
                            + '<br> ' +book.publishedDate + ''
                            +'</td>'
                        +'</tr>'
                        +'</tbody>'
                    +'</table>'
                + ''
                    + ''
                +'</span>'
            + '</div>';
            }

        }

        foundBookBoxes = document.querySelectorAll('#foundBook');
        for(const box of foundBookBoxes){
            box.addEventListener('click', event => {
                let dataIndex = box.getAttribute('box-id');
                updateForm(JSON.parse(window.localStorage.getItem('bookhistory'))[dataIndex]);
            });
        }
    } else{
            document.getElementById('references').innerHTML = 
            '<div class="container" align="center">'
            +'<br>'
            +'<br>'
            +'<br>'
            +'<table style="height: 4em;">'
                +'<tbody>'
                +'<tr>'
                    +'<td class="align-middle">'
                    +'<svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" class="bi bi-search grey-filter" viewBox="0 0 16 16">'
                        +'<path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>'
                    +'</svg>'
                    +'</td>'
                    +'<td class="align-middle"><p style="color: #bababa;">Aucune référence trouvée 🧐</p></td>'
                +'</tr>'
                +'</tbody>'
            +'</table>'
            +'</div>';

    }
    
    tooltips =  document.querySelectorAll('.foundBtooltip span');
    
    
    //window.localStorage.removeItem('bookhistory');
}
    
