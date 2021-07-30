

async function search(isbn){
    /* 
       Await for querys to api(s) and push to localStorage, then update display
        https://stackoverflow.com/questions/27612372/how-to-await-the-ajax-request

        // https://www.programmableweb.com/news/10-most-popular-apis-books/brief/2020/01/26
        //https://blog.api.rakuten.net/top-10-best-books-apis/
        // cool project https://github.com/internetarchive/bookreader
    */

    // loading animation
    document.getElementById('references').innerHTML = '<div style="text-align: center;"><div class="loader"></div></div>';
    // clear cache
    window.localStorage.setItem('bookhistory', JSON.stringify([]));
    
    try{
        let xx= c_puppeteer(isbn);
        // add books data to localStorage
        window.localStorage.setItem('bookhistory', JSON.stringify( await xx.formatdata()));
        // refresh shown references  
        updateBookFinder();
    }catch(err){
        console.log(err);
    }
    
}



/* Dynamic found books cards and tooltip */

function updateBookFinder(){

    // retrieve cache
    let foundReferences = JSON.parse(window.localStorage.getItem('bookhistory'));
    foundReferences = foundReferences ? foundReferences : [];

    if(foundReferences.length > 0){
        
        let div = document.getElementById('references');
        div.innerHTML = "";
        /* fill up the div with books data */
        for (let index = 0; index < foundReferences.length; index++) {
            let book = foundReferences[index];

            let warning = '';
            if(book.refOrigin == 'already saved!'){
                warning = 'warning-box';
            }

            div.innerHTML += 
            `
            <div class="srchedBookBox foundBtooltip ${warning}" id="foundBook" box-id="${index}" thedata="${JSON.stringify(book)}">
                <div style="float: right; top: 0px; right: 0px; color: #b56357;">
                    ${book.ref_origin}
                </div>
                <div class="row">
                    ${book.title}
                </div>
                <div class="row" style="font-size: 0.8em; color: grey; padding-left: 1em;">
                    ${book.authors}
                </div>
                <div class="row" style="font-size: 0.8em; color: grey; padding-left: 1em;">
                    ${book.published_date}
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
                                <br>${book.published_date}
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </span>
            </div>
            `;
    }
        /*
         let xx = $(`foundBook${x}`).data('thedata');

                console.log(xx.ref_origin);

        */
        // add event on click to book cards to give index of current book in cache
        foundBookBoxes = document.querySelectorAll('#foundBook');
        for(const box of foundBookBoxes){
            box.addEventListener('click', event => {
                let dataIndex = box.getAttribute('box-id');
                console.log(books);
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
                                <p style="color: #bababa;" class="noselect">Aucune référence trouvée 🧐</p>
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
    
