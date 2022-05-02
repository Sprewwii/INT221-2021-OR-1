import {reactive} from 'vue'
export const eventManager = reactive({
  eventList: [],
  getEvents: async function () {
    const res = await fetch("http://10.4.56.94:8080/api/events") 
    if (res.status === 200) {
      this.eventList = await res.json()
      console.log(this.eventList)
    } else {
      console.log("no data")
    }
  },
  test:[]
})


