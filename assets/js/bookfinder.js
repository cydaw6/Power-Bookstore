

async function search(isbn){
    /* 
       Await for querys to Apis and push to localStorage, then update display
        https://stackoverflow.com/questions/27612372/how-to-await-the-ajax-request 
    */

    // clear cache
    window.localStorage.setItem('bookhistory', JSON.stringify([]));
    let bookList = [];

    try{ // Google api
        
        const google = await (c_google(isbn));
        const g_rawdata = await google.rawdata();
        let g_formated_data = await google.formatdata(await g_rawdata);

        g_formated_data.forEach(book => {
            bookList.push(book)
        });
        
    }catch (err) {
        console.log(err);
    }
        
    try{ // Open Library api
        /*
            https://openlibrary.org/developers/api
            ISBN API https://openlibrary.org/dev/docs/api/books
        */
        const open_library = await c_open_library(isbn);
        const o_rawdata = await open_library.rawdata();
        let o_formated_data = await open_library.formatdata(await o_rawdata);
        bookList.push(o_formated_data);

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



/* Dynamic found books cards and tooltip */

function updateBookFinder(){
    // loading animation
    document.getElementById('references').innerHTML = '<div style="text-align: center;"><div class="loader"></div></div>';

    // retrieve cache
    let foundReferences = JSON.parse(window.localStorage.getItem('bookhistory'));
    foundReferences = foundReferences ? foundReferences : [];

    if(foundReferences.length > 0){
        
        let div = document.getElementById('references');
        div.innerHTML = "";
        /* fill up the div with books data */
        for (let index = 0; index < foundReferences.length; index++) {
            let book = foundReferences[index];

                div.innerHTML += 
                `
                <div class="srchedBookBox foundBtooltip" id="foundBook" box-id="${index}">
                    <div style="float: right; top: 0px; right: 0px; color: #b56357;">
                        ${book.refOrigin}
                    </div>
                    <div class="row">
                        ${book.title}
                    </div>
                    <div class="row" style="font-size: 0.8em; color: grey; padding-left: 1em;">
                        ${book.authors}
                    </div>
                    <div class="row" style="font-size: 0.8em; color: grey; padding-left: 1em;">
                        ${book.publishedDate.substring(0, 4)}
                    </div>
                    <span class="tooltipBox">
                        <table style="height: 100px;">
                            <tbody>
                            <tr>
                                <td class="align-middle"><img alt="" src="${book.image}" class="img-thumbnail"></td>
                                <td class="align-middle" style="text-align: left; padding-left: 1em;">
                                    <br>
                                    <b>${book.title}</b>
                                    <br>${book.authors}
                                    <br>${book.publishedDate}
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </span>
                </div>
                `;
        }

        // add event on click to book cards to give index of current book in cache
        foundBookBoxes = document.querySelectorAll('#foundBook');
        for(const box of foundBookBoxes){
            box.addEventListener('click', event => {
                let dataIndex = box.getAttribute('box-id');
                updateForm(JSON.parse(window.localStorage.getItem('bookhistory'))[dataIndex]);
            });
        }

    } else{ // Show "nothing found" message
            
            document.getElementById('references').innerHTML = 
            `
                <div class="container" align="center">
                <br>
                <br>
                <br>
                <table style="height: 4em;">
                    <tbody>
                        <tr>
                            <td class="align-middle">
                                <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" class="bi bi-search grey-filter" viewBox="0 0 16 16">'
                                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>'
                                </svg>
                            </td>
                                <td class="align-middle">
                                <p style="color: #bababa;">Aucune référence trouvée 🧐</p>
                            </td>
                        </tr>
                    </tbody>
                </table>
                </div>
            `;
    }

    // add found book cards to tooltips obj list
    tooltips =  document.querySelectorAll('.foundBtooltip span');
    
    //window.localStorage.removeItem('bookhistory');
}
    
