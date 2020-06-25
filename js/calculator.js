import { l } from "./helpers.js"

export default class Calculator {
    constructor(storage){
        this.storage = storage
    }

    get_result() {

        var storage = this.storage.get_all()
        l(this.storage)

        return '<div>100% - you\'re good!</div>'
    }
}