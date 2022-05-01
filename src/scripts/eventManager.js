import {reactive} from 'vue'
export const eventManager = reactive({
  eventList: [],
  getEvents: async function () {
    const res = await fetch("http://ip21or1.sit.kmutt.ac.th:8080/api/booking") 
    if (res.status === 200) {
      this.eventList = await res.json()
      console.log(this.eventList)
    } else {
      console.log("บ่มีจ้า")
    }
  },
  test:[]
})


