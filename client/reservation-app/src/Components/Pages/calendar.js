import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

const events = [
  {
    id: 1,
    title: "Reservation: Nick",
    start: "2022-11-09T13:00:00",
    end: "2022-11-09T18:00:00",
  },
  {
    id: 2,
    title: "Reservation: Iliyan",
    start: "2022-11-11T13:00:00",
    end: "2022-11-11T18:00:00",
  },
];

function calendar() {
  return (
    <div>
      <h1>Calendar</h1>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        headerToolbar={{
          center: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        events={events}
        initialView="dayGridMonth"
      />
    </div>
  );
}
export default calendar;
