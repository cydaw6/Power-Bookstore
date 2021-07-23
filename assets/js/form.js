


/*  Form => book obj => bookshelf[] */
$( "form" ).submit(function( event ) {
    try{
        let data = $(this).serializeArray();
        let book = {};
        for(const field of data){
            book[field.name] = field.value;
        }
        // Add new created book from form to book list
        bookShelf.push(book);
        // reprint bookshelf
        updateBookshelf(true);
    }catch(err){
        console.log('Error during form serialization to book obj : ' + err);
    }
    // avoid reloading 
    event.preventDefault();
});

/*  Fill up the form with given book  */
function updateForm(book){
    for(const field of Object.keys(book)){
        let input = document.getElementById(field);
        try{
            input.value = book[field] == null ? input.value: book[field];
        }catch (err) {
            console.log(err);
        }
    }
}

