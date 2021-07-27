


const axios = require('axios');
require('./connectors/c_google.js')();
require('./connectors/c_open_library.js')();

async function getBook() {
  try {
    const google = c_google('2253168688');
    const g_rawdata = await google.rawdata();
    const g_formated_data = await google.formatdata(await g_rawdata.data);
    console.log(await g_formated_data);
    
    const open_library = c_open_library('2253168688');
    const o_rawdata = await open_library.rawdata();
    const o_formated_data = await open_library.formatdata(await o_rawdata.data);
    console.log(await o_formated_data);
    

  } catch (error) {
    console.error(error);
  }
}

getBook();


// https://zetcode.com/javascript/axios/
/* Autre manière de faire
axios.get('https://openlibrary.org/isbn/2253168688.json')
  .then(function (response) {
    // handle success
    console.log(response);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .then(function () {
    // always executed
  });
*/







//--------------
//const response = await axios.get('https://openlibrary.org/isbn/2253168688.json');
    
    
    //const response2 = await axios.get('https://www.googleapis.com/books/v1/volumes?q=isbn:2253168688');
    //console.log(JSON.stringify(response2.data.items[0].volumeInfo));
    /*
    const config = {
      url: "https://www.googleapis.com/books/v1/volumes?q=2253168688&key=AIzaSyBEtz_UVSzKQ6WcuwihRH0iy7JAkTXSM_w",
      method: "GET", 
      data: {'q' : 'isbn:'+2253168688, //Si on a une cl�, la mettre sur la ligne suivante
      'key' : 'AIzaSyBEtz_UVSzKQ6WcuwihRH0iy7JAkTXSM_w'
      },
      dataType: "json"
    }
    
    let res = await axios(config)
    console.log(res.data);
    */
