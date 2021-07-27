

const axios = require('axios');
require('./connectors/c_google.js')();
require('./connectors/c_open_library.js')();

/*                                          */
async function bookFinderSender(isbn, res) {
    try {
      let bookList = [];
      const google = c_google('2253168688');
      const g_rawdata = await google.rawdata();
      const g_formated_data = await google.formatdata(await g_rawdata.data);
      g_formated_data.forEach(book => {
          console.log()
          bookList.push(book)
      });
      
      const open_library = c_open_library('2253168688');
      const o_rawdata = await open_library.rawdata();
      const o_formated_data = await open_library.formatdata(await o_rawdata.data);
      bookList.push(o_formated_data);
      
      const personal_db = await Bookstore.find(null, function(err, x) {
                              if (err){
                                  throw err;
                              }
                              let books = [];
                              
                              return JSON.stringify(x, null, 4);
                              
                          });
  
      personal_db.forEach(book =>{
          bookList.push(book);
      })
  
      res.end((JSON.stringify(bookList, null, 4))); // output de l'api
  
    } catch (error) {
      console.error(error);
    }
  }