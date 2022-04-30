import {reactive} from 'vue'
export const eventManager = reactive({
  eventList: [],
  getEvents: async function () {
    const res = await fetch("http://172.17.0.3:8080/api/booking") 
    if (res.status === 200) {
      this.eventList = await res.json()
      console.log(this.eventList)
    } else {
      console.log("ไม่มีข้อมูลอีเว้นนนนน")
    }
  },
  test:[]
})


