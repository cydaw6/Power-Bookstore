
/*		OPEN Library	*/
// https://openlibrary.org/dev/docs/api/books
function getOpenLibBook(isbn) {
    return $.ajax({
    url: "https://openlibrary.org/isbn/"+isbn+".json",
    method: "GET", 
    dataType: "json"
	});
}
