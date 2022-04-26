export const eventManager = {
    eventList: [],
    getEvents: async function () {
        const res = await fetch("http://localhost:3001/events");
        if(res.status === 200){
            this.eventList = await res.json()
        }
        else {
          console.log("ไม่มีข้อมูลอีเว้นนนนน");
        }
    }
}