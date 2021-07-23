



function updateBookshelf(newbookadded=false){
    // newbookadded true if updating because of new book in bookshelf
    
    let div = document.getElementById('bookshelfContainer');
    div.innerHTML = "";
    for (let index = bookShelf.length-1; index >= 0 ; index--) {
        let book = bookShelf[index];
        let animation = "";
        if(newbookadded && (index == bookShelf.length-1)) {
            animation= 'lastAddedbookBox';
        
        }

        div.innerHTML += `
        <div class="addedBookBox ${animation}" style="position: relative;">
            <div style="position: absolute; top: 0.5em; right: 0.5em; color: #6ebf11;"><i class="bi bi-pencil-fill addBookAction"></i></div>
            <div style="position: absolute; bottom: 0.5em; right: 0.5em; color: #b56357;"><i class="bi bi-trash-fill addBookAction"></i></div>

            <div class="row ">
                <div class="col imgForCard" style="max-height: 100%;">
                    <img alt="" src="${book.image}">
                </div>
                <div class="col-8">
                    <div>${book.title}</div>
                </div>
            </div>
        </div>
        `;
    }

    //-- Animate latest added book to bookshelf
    let tl = anime.timeline({
      easing: 'easeOutExpo',
      duration: 0
    });
    // set origin to be invisible on left
    tl.add({
      targets: '.lastAddedbookBox',
      translateX: -260,
    })
    // animation to 0 position
    tl.add({
        
      targets: '.lastAddedbookBox',
      duration: 1000,
      translateX: 0,
    })




    
    document.getElementById('bookshelfCount').innerHTML = bookShelf.length;

}