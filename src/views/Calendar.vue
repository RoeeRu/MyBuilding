<template>
	<v-app id="dayspan" v-cloak>
  
	  <ds-calendar-app ref="app"
		:calendar="calendar"
		:read-only="readOnly"
		@change="saveState">
		
  
		<template slot="title">
		  Domos
		</template>
  
  
		<template slot="eventPopover" slot-scope="slotData">
		   <ds-calendar-event-popover
			v-bind="slotData"
			:read-only="readOnly"
			@finish="saveState"
		  ></ds-calendar-event-popover>
		</template>
  
		<template slot="eventCreatePopover" slot-scope="{placeholder, calendar, close}">
		  <ds-calendar-event-create-popover
			:calendar-event="placeholder"
			:calendar="calendar"
			:close="$refs.app.$refs.calendar.clearPlaceholder"
			@create-edit="$refs.app.editPlaceholder"
			@create-popover-closed="saveState"
		  ></ds-calendar-event-create-popover>
		</template>
  
		<template slot="eventTimeTitle" slot-scope="{calendarEvent, details}">
		  <div>
			<v-icon class="ds-ev-icon"
			  v-if="details.icon"
			  size="14"
			  :style="{color: details.forecolor}">
			  {{ details.icon }}
			</v-icon>
			<strong class="ds-ev-title">{{ details.title }}</strong>
		  </div>
		  <div class="ds-ev-description">{{ getCalendarTime( calendarEvent ) }}</div>
		</template>
  
		
  
	  </ds-calendar-app>
  
	</v-app>
  </template>
  
  <script>
  import { Calendar, Weekday, Month } from 'dayspan';
  import Vue from 'vue';
  import { mapState, mapActions  } from 'vuex';
  
  
  export default {
  
	name: 'app',
  
	data: () => ({
	  storeKey: 'dayspanState',
	  calendar: Calendar.months(),
	  readOnly: false,
	}),
	computed: {
			...mapState(
				{ calendarEvents: state => state.calendar.calendarEvents,
				BuildingID: state => state.auth.user.building_id }),
		},
  
	async mounted()
	{
		
		window.analytics.page('Calendar')
		await this.getCalendar({building_id: this.BuildingID});
  
		await this.loadState();
  
  
	},
  
	methods:
	{
		...mapActions({
			getCalendar: 'calendar/getCalendar',
			replaceCalendar: 'calendar/replaceCalendar',
		}),
  
	  getCalendarTime(calendarEvent)
	  {
		let sa = calendarEvent.start.format('a');
		let ea = calendarEvent.end.format('a');
		let sh = calendarEvent.start.format('h');
		let eh = calendarEvent.end.format('h');
  
		if (calendarEvent.start.minute !== 0)
		{
		  sh += calendarEvent.start.format(':mm');
		}
  
		if (calendarEvent.end.minute !== 0)
		{
		  eh += calendarEvent.end.format(':mm');
		}
  
		return (sa === ea) ? (sh + ' - ' + eh + ea) : (sh + sa + ' - ' + eh + ea);
	  },
  
	  saveState()
	  {
		let state = this.calendar.toInput(true);
  
		this.replaceCalendar({newCalendar: state, building_id: this.BuildingID});
		
	  },
  
	  loadState()
	  {
		let state = {};
		try
		{
		  if (this.calendarEvents)
		  {
			console.log("this.calendarEvents", this.calendarEvents[0])
			state = this.calendarEvents[0];
			state.preferToday = false;
			console.log("state", state)
		  }
		}
		catch (e)
		{
		  // eslint-disable-next-line
		  console.log( e );
		}
  
		if (!state.events || !state.events.length)
		{
		  state.events = [] // this.defaultEvents;
		}
  
		state.events.forEach(ev =>
		{
		  let defaults = this.$dayspan.getDefaultEventDetails();
  
		  ev.data = Vue.util.extend( defaults, ev.data );
		});
  
		this.$refs.app.setState( state );
	  }
	}
  }
  </script>
  
  <style>
  
  body, html, #app, #dayspan {
	font-family: Roboto, sans-serif !important;
	width: 100%;
	height: 100%;
  }
  
  .v-btn--flat,
  .v-text-field--solo .v-input__slot {
	background-color: #f5f5f5 !important;
	margin-bottom: 8px !important;
  }


.layout-default .ant-layout-content {
  padding-top: 0px;
}

.v-content{
	padding: 0px !important; ;
}

.v-navigation-drawer {
	visibility: hidden;
}

.v-toolbar__title {
	visibility: hidden;
}

.v-toolbar__content {
	border-bottom: 0px !important;

}

.v-menu__content {
	  background-color: #491919 !important;
	  top: 20% !important;
	  right: 2% !important;
	  left: auto !important;
}

.ds-app-calendar-toolbar {
	background-color: transparent !important;
	margin-top: 77px !important;
}

  
  </style>
  