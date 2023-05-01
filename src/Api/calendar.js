import axios from './index.js'


export function getCalendar(idToken, CalendarPayload) {
    console.log("CalendarPayload", CalendarPayload);
    return axios.post('/calendar/getCalendar', CalendarPayload, {
      headers: {
        Authorization: `Bearer ${idToken}`
      }
    }).then(response => {
        return response.data;
     }).catch((e) => {
       console.error(e.message); // "oh, no!"
       return e.message;
    });
  
  }

export function replaceCalendar(idToken, CalendarPayload) {
    console.log("CalendarPayload", CalendarPayload);
    return axios.post('/calendar/replaceCalendar', CalendarPayload, {
      headers: {
        Authorization: `Bearer ${idToken}`
      }
    }).then(response => {
        return response.data;
     }).catch((e) => {
       console.error(e.message);
       return e.message;
    });
  }