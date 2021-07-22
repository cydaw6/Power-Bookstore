

//----- STARTING -------//
window.localStorage.removeItem('bookhistory');
//


function updateForm(book){
    for(const field of Object.keys(book)){
        let input = document.getElementById(field);
        input.value = book[field] == null ? input.value: book[field];
    }
    
}



//-- Global --//
let bookShelf = []


function updateBookshelf(book){
    bookShelf.push(book);
    
    let div = document.getElementById('bookshelfContainer');
    div.innerHTML = "";
    for (let index = 0; index < bookShelf.length; index++) {

        for (var i = 0; i < 1; i++) {
            div.innerHTML += 
        '<div class="srchedBookBox test">'
            + bookShelf[index].title 

            +'<span class="tooltipBox">'
            + '<img alt="" src="" />'
                + '<div> ' +bookShelf[index].title + '</div>'
            +'</span>'
        + '</div>';
        }
        
    }

}


/** ----- FORM

    Format data from form, then add the book on the shelf
*/

$( "form" ).submit(function( event ) {

    try{
        let data = $(this).serializeArray();
        let book = {};
        for(const field of data){
            book[field.name] = field.value;
        }

        updateBookshelf(book); // On ajoute à la bibliothèque

    }catch(err){
        //console.log(err);
    }
    
    event.preventDefault();
    
});



/**  ----- ISBN finder 
*/

async function findReferences(isbn){
    // https://stackoverflow.com/questions/27612372/how-to-await-the-ajax-request
    try{
        let bookList = [];

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
                
                bookList.push(book);
            }
            console.log(book);
            /*
            isbn
            title 
            type
            authors
            language
            publisher
            publishedDate
            description
            keyWords
            purchasedPrice
            sellingPrice
            location
            pageCount
            image
            thumbnail
            personalNote
            condition

            */
            
    
        }
        
        // free api


        // add books data to localStorage
        window.localStorage.setItem('bookhistory', JSON.stringify(bookList));       

    } catch(err){
        //console.log(err);
    }
}


// Dynamic found books cards and tooltip

var tooltips =  document.querySelectorAll('.test span');

function search(obj){

    // loading animation
    document.getElementById('references').innerHTML = '<div style="text-align: center;"><div class="loader"></div></div>';

    findReferences(obj.value).then(function (){
        let foundReferences = JSON.parse(window.localStorage.getItem('bookhistory'));
        foundReferences = foundReferences ? foundReferences : [];

        if(foundReferences.length > 0){
            // fill up the div with books data
            let div = document.getElementById('references');
            div.innerHTML = "";
            for (let index = 0; index < foundReferences.length; index++) {

                for (var i = 0; i < 1; i++) {
                    div.innerHTML += 
                '<div class="srchedBookBox test" id="foundBook'+index+'">'
                    + foundReferences[index].title 

                    +'<span class="tooltipBox">'
                    + '<img alt="" src="" />'
                        + '<div> ' +foundReferences[index].title + '</div>'
                    +'</span>'
                + '</div>';
                }

                let currfoundBook = document.getElementById('foundBook'+index);

                addEventListener('click', event => {
                    updateForm(foundReferences[index]);
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
        

        tooltips =  document.querySelectorAll('.test span');
    });
    
    //window.localStorage.removeItem('bookhistory');
}




// http://jsfiddle.net/HJf8q/2/
window.onmousemove = function (e) {

    var x = (e.clientX + 20) + 'px',
        y = (e.clientY + 20) + 'px';
    for (var i = 0; i < tooltips.length; i++) {
        tooltips[i].style.top = y;
        tooltips[i].style.left = x;
    }
};


/* ----- End of book data finder functions ----- */
    

//search({value: 9782253168683})








//      9782253168683   2253168688


// console.log(getGoogleBook(''));  


/*

"isbn"

"titre" 

"type"

"auteurs"

"langue"

"editeur"

"annee"

"description"

"motscles"

"prixachat"

"prixvente"

"emplacement"

"nombreexmplaires"

"image"

"thumbnail"

"noteperso"





{
    isbn: 9782253168683,
    title: 'TEst',
    type: 'Livre', // Livre / Manuscrit / Livre électronique
    pages: 548,
    author : "Irvin D. Yalom, jean jacque", // Séparés par une virgules
    language: 'fr',
    editor: 'Librairie générale française',
    year: 2014,
    description: "Amsterdam, février 1941. Le Reichleiter Rosenberg, chargé de la confiscation des biens culturels des juifs dans les territoires occupés, fait main basse sur la bibliothèque de Baruch Spinoza. Qui était-il donc ce philosophe, excommunié en 1656 par la communauté juive d'Amsterdam et banni de sa propre famille, pour, trois siècles après sa mort, exercer une telle fascination sur l'idéologue du parti nazi Irvin Yalom, l'auteur de Et Nietzsche a pleuré, explore la vie intérieure de Spinoza, inventeur d'une éthique de la joie, qui influença des générations de penseurs. Il cherche aussi à comprendre Alfred Rosenberg qui joua un rôle décisif dans l'extermination des juifs d'Europe.",
    keywords: '',
    noteperso: '',
    purchaseprice: 8.10,
    sellingprice: 10,
    location: '', // where you store the book, its just a id of your choice. Could be for exemple S2R3, for Shelf 2 row 3
    img: '',
    thumbnail: 'https://books.google.fr/books/publisher/content?id=kpJVDwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&imgtk=AFLRE70NvTbMQDg7bs1wRBy9G1DN9w5OmdEaETndlRhASbfc069ZpuFkB7QykgIkTiJpv48DmOcxTx9yvVD6VAPAb_iJVT0d4oW-R7N_4dmaRKgXvmlXutYzhcamvMMmeDpoBMzEr1C0',
    imgfilename: '',
    thumbnailfilename:'',
    count: 1
},



*/