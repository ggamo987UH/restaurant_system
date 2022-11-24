import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import axios from "axios";
import moment from "moment";
import styled from "@emotion/styled";

export const StyleWrapper = styled.div`
  .fc-event-title {
    /* will have fc-sticky on it */
    white-space: pre-line;
  }
  .fc-timegrid-slot {
    height: 65px !important;
  }
`;

const Calendar = () => {
  const [events, setEvents] = useState({});

  const defaultReservation = (id, startDate, endDate) => {
    return {
      id: id,
      title: `All Reservation are Open:
              1 Open for 8 Seater
              6 Open for 4 Seater
              4 Open for 4 Seater
              2 Open for 2 Seater
            `,
      start: startDate,
      end: endDate,
    };
  };

  const getEvents = async (startDate, endDate) => {
    const res = await axios.get(
      `http://localhost:3001/api/tabletracker/${startDate}/${endDate}`
    );

    let data = res.data;

    let eventsDBHash = {};
    for (let x in data) {
      let dateFormat = moment(data[x].date).format("YYYY-MM-DD");

      if (!eventsDBHash.hasOwnProperty(dateFormat)) {
        eventsDBHash[dateFormat] = [];
      }

      eventsDBHash[dateFormat].push(data[x]);
    }

    // console.log(eventsDBHash);

    let loop = new Date(startDate);
    endDate = new Date(endDate);
    loop.setDate(loop.getDate() + 1);
    endDate.setDate(endDate.getDate() + 1);

    let calendarEvents = [];
    let id = 1;
    while (loop <= new Date(endDate)) {
      let newLoopFormat = moment(loop).format("YYYY-MM-DD");

      if (eventsDBHash.hasOwnProperty(newLoopFormat)) {
        let index = 0;
        for (let x in eventsDBHash[newLoopFormat]) {
          let obj = eventsDBHash[newLoopFormat][x];
          let objLen = eventsDBHash[newLoopFormat].length - 1;
          let eventDate = moment(obj.date).format("YYYY-MM-DD");

          // IF NO RESERVATION START AT OPEN TIME, SET DEFAULT RESERVATION INFO TO NEXT RESERVATION TIME
          if (
            eventsDBHash[newLoopFormat][0].time !== "11:00:00" &&
            index === 0
          ) {
            calendarEvents.push(
              defaultReservation(
                id,
                `${newLoopFormat}T11:00:00`,
                `${eventDate}T${eventsDBHash[newLoopFormat][0].time}`
              )
            );
            id += 1;
          }

          // LAST RESERVATION TIME TO CLOSING TIME
          if (
            eventsDBHash[newLoopFormat][objLen].time !== "23:00:00" &&
            index === 0
          ) {
            let lastEventStartDate = `${newLoopFormat}T${eventsDBHash[newLoopFormat][objLen].time}`;
            calendarEvents.push(
              defaultReservation(
                id,
                moment(lastEventStartDate).add(1, "hours").toISOString(),
                `${newLoopFormat}T24:00:00`
              )
            );
            id += 1;
          }

          // SET DEFAULT RESERVATION IN BETWEEN OTHER RESERVATIONS ON CALENDAR
          if (eventsDBHash[newLoopFormat][index + 1] !== undefined) {
            calendarEvents.push(
              defaultReservation(
                id,
                moment(`${eventDate}T${obj.time}`)
                  .add(1, "hours")
                  .toISOString(),
                `${eventDate}T${eventsDBHash[newLoopFormat][index + 1].time}`
              )
            );
            id += 1;
          }

          calendarEvents.push({
            id: id,
            title: `All Reservation are Open:
              ${obj.eight_seat} Open for 8 Seater
              ${obj.six_seat} Open for 4 Seater
              ${obj.four_seat} Open for 4 Seater
              ${obj.two_seat} Open for 2 Seater
            `,
            start: `${eventDate}T${obj.time}`,
            end: moment(`${eventDate}T${obj.time}`)
              .add(1, "hours")
              .toISOString(),
          });
          id += 1;
          index += 1;
        }
      } else {
        calendarEvents.push(
          defaultReservation(
            id,
            `${newLoopFormat}T11:00:00`,
            `${newLoopFormat}T24:00:00`
          )
        );
      }
      let newDate = loop.setDate(loop.getDate() + 1);
      loop = new Date(newDate);
      id += 1;
    }

    setEvents(calendarEvents);
  };

  useEffect(() => {}, [events]);

  return (
    <div>
      <StyleWrapper>
        <h1>Calendar</h1>
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          headerToolbar={{
            center: "timeGridWeek,timeGridDay",
          }}
          datesSet={(arg) => {
            let startDate = moment(arg.start).format("YYYY-MM-DD");
            let endDate = moment(arg.end).format("YYYY-MM-DD");

            getEvents(startDate, endDate);
          }}
          events={events}
          initialView="timeGridWeek"
          slotMinTime="11:00:00"
          slotMaxTime="24:00:00"
          height="auto"
          contentHeight="auto"
        />
      </StyleWrapper>
    </div>
  );
};
export default Calendar;
