import { l } from "./helpers.js"

export default class Calculator {
    constructor(storage) {
        this.storage = storage
    }

    get_result() {

        let shows = this.storage.get("show")
        let gets = this.storage.get("get")
        let number_of_repeats = shows.length
        let number_of_digits = Object.values(shows[0])[0].length
        let counter = 0
        let describing = ""
        for (var i = 0; i < number_of_repeats; i++) {
            let show_vals = Object.values(shows[i])[0]
            describing += "<div><span>Shown as "+Object.keys(shows[i])[0]+": "+show_vals.join(" ")+"</span></div>"
            let get_vals = Object.values(gets[i])[0]
            describing += "<div><span>Your guess for "+Object.keys(shows[i])[0]+": "+get_vals.join(" ")+"</span></div>"
            for (var ind = 0; ind < number_of_digits; ind++) {
                if(show_vals[ind] == get_vals[ind])
                    counter++
            }
            describing +="<div><span>--------------------------</span></div>"
        }

        return '<div class="middle-width">Guessing right: '+counter*100/(number_of_digits*number_of_repeats)+'% \
                <div>'+describing+'</div></div>\
        '
    }
}