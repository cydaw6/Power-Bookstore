


/*		GOOGLE			*/
function getGoogleBook(isbn) {
    console.log(isbn)
    return $.ajax({
    url: "https://www.googleapis.com/books/v1/volumes",
    method: "GET", 
    data: {'q' : 'isbn:'+isbn, //Si on a une clé, la mettre sur la ligne suivante
    'key' : 'AIzaSyBEtz_UVSzKQ6WcuwihRH0iy7JAkTXSM_w'
    },
    dataType: "json"
	});
}


function c_google(isbn){
    return {
            getdata :  function (isbn) {
                return $.ajax({
                url: "https://www.googleapis.com/books/v1/volumes",
                method: "GET", 
                data: {'q' : 'isbn:'+isbn, //Si on a une clé, la mettre sur la ligne suivante
                'key' : 'AIzaSyBEtz_UVSzKQ6WcuwihRH0iy7JAkTXSM_w'
                },
                dataType: "json"
                });
            },
            formatdata: function(){
                return this.getdata;
            }
    };
}