<script>
import { defineComponent } from "vue";
import "@fullcalendar/core/vdom"; // solve problem with Vite
import FullCalendar from "@fullcalendar/vue3";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { INITIAL_EVENTS, createEventId } from "./event-utils";
import esLocale from '@fullcalendar/core/locales/es'

const Demo = defineComponent({
  name: "CalendarFull",
  components: {
    FullCalendar,
  },
  props: {
    initialEvents: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      calendarOptions: {
        plugins: [
          dayGridPlugin,
          timeGridPlugin,
          interactionPlugin, // needed for dateClick
        ],
        headerToolbar: {
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        },
        initialView: "dayGridMonth",
        initialEvents: this.initialEvents, // alternatively, use the `events` setting to fetch from a feed
        editable: false,
        selectable: false,
        selectMirror: false,
        dayMaxEvents: false,
        weekends: true,
        select: this.handleDateSelect,
        eventClick: this.handleEventClick,
        eventsSet: this.handleEvents,
        locales: [ esLocale ],
        locale: 'es'
      },
      currentEvents: [],
    };
  },
  methods: {
    handleWeekendsToggle() {
      this.calendarOptions.weekends = !this.calendarOptions.weekends; // update a property
    },
    handleDateSelect(selectInfo) {
      let title = prompt("Please enter a new title for your event");
      let calendarApi = selectInfo.view.calendar;

      calendarApi.unselect(); // clear date selection

      if (title) {
        calendarApi.addEvent({
          id: createEventId(),
          title,
          start: selectInfo.startStr,
          end: selectInfo.endStr,
          allDay: selectInfo.allDay,
        });
      }
    },
    handleEventClick(clickInfo) {
      this.$emit("eventClicked", clickInfo.event)
      /* if (
        confirm(
          `Are you sure you want to delete the event '${clickInfo.event.title}'`
        )
      ) {
        clickInfo.event.remove();
      } */
    },
    handleEvents(events) {
      this.currentEvents = events;
    },
  },
});
export default Demo;
</script>

<template>
  <FullCalendar
    class="app-calendar"
    :options="calendarOptions"
  >
    <template #eventContent="arg">
      <b>{{ arg.timeText }}</b>
      <i>{{ arg.event.title }}</i>
    </template>
  </FullCalendar>
</template>

<style lang="scss">
.app-calendar {
  max-height: 80vh;
  @media screen and (max-width: 600px){
    max-height: 700px;
    min-height: 70vh;
  }
}
.fc .fc-button .fc-icon {
  display: flex;
  align-items: center;
}

@media screen and (max-width: 900px) {
  .fc .fc-toolbar {
    .fc-toolbar-title {
      font-size: 1.4rem !important;
    }
    flex-wrap: wrap;
  }
}
@media screen and (max-width: 600px) {
  .fc .fc-button {
    padding: 0.25em 0.45em;
    font-size: 0.88rem;
  }
  .fc .fc-toolbar {
    margin-bottom: 10px !important;
    .fc-toolbar-title {
      margin-top: 10px;
      font-size: 1.1rem !important;
    }
    flex-wrap: wrap;
    justify-content: space-between;
    & > div:first-child {
      flex-basis: 50%;
    }
    & > div:nth-child(2n) {
      order: 4;
    }
    & > div:last-child {
      flex-basis: 50%;
      order: 2;
      display: flex;
      justify-content: flex-end;
    }
  }
}

@media screen and (max-width: 355px) {
  .fc .fc-toolbar {
    .fc-toolbar-title {
      font-size: .92rem !important;
      margin-top: 0 !important;
    }
    & > div:first-child {
      display: flex;
      justify-content: space-between;
      flex-basis: 100%;
      order: 2;
    }
    & > div:nth-child(2n) {
      order: 1;
      margin-top: 0 !important;
      margin-bottom: 6px;
    }
    & > div:last-child {
      order: 4;
      flex-basis: 100%;
      margin-top: 6px;
      justify-content: flex-end;
    }
  }
}
</style>
