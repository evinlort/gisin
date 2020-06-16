import { l } from './helpers.js'
import { Queue } from './queue.js'
import { CustScene1, CustScene2, CustScene3 } from './custom_scenes.js'


(() => {

    var sc1 = new CustScene1("init")
    var sc2 = new CustScene2("middle")
    var sc3 = new CustScene3("end")
    var queue = new Queue()

    queue.add(sc1, sc2, sc3)

    queue.run()

})()