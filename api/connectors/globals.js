


module.exports = function (){
    this.BookShell = () => {
        return {
            isbn_10             : null,
            isbn_13             : null,
            title               : null,
            authors             : null,
            language            : null,
            publisher           : null,
            published_date      : null,
            description         : null,
            page_count          : null,
            image               : null,
            thumbnail           : null,
            type                : null,
            k_words             : null,
            purchase_price      : null,
            selling_price       : null,
            used_prices         : null,
                /* used_prices : {
                    organised: {Good: [...prices], Bad: [...prices]},
                    recap: {min:/, max:/, avg:avgofusedprices, number://howmanybooks}
                }
                */
            location            : null,
            p_note              : null,
            condition           : null,
            other_info          : null,
                /*
                    other_info : {
                        whatever: {name : "", value: ""},
                        whatever2: {name : "", value: ""},
                    }
                */
            new_price           : null,
            ref_origin          : null,
        }
    } 

}