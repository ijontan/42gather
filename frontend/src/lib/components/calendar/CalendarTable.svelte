<script >
// @ts-nocheck


	import Calendar from "./Calendar.svelte";
	import { createEventDispatcher } from 'svelte';
	import { onMount } from 'svelte';
  
	// Constants for day and month names
	const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
	const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  
	// Variables
	let headers = dayNames;
	// @ts-ignore
	let year, month, eventText;
	// @ts-ignore
	let days = [];
	// @ts-ignore
	let items = [];
  
	// Event dispatcher for communication between components
	// @ts-ignore
	const dispatch = createEventDispatcher();
  
	// Initialize the current year and month
	onMount(() => {
	  const now = new Date();
	  year = now.getFullYear();
	  month = now.getMonth();
	  initContent();
	});
  
	// Initialize the content of the calendar
	function initContent() {
	  initMonth();
	  initMonthItems();
	}
  
	// Initialize the month-specific items
	function initMonthItems() {
	  // @ts-ignore
	  for (let i of items) {
		let rc = findRowCol(i.date);
		if (rc === null) {
		  console.log('Did not find date for ', i);
		  console.log(i.date);
		  // @ts-ignore
		  console.log(days);
		  i.startCol = i.startRow = 0;
		} else {
		  i.startCol = rc.col;
		  i.startRow = rc.row;
		}
	  }
	}
  
	// Choose what date/day gets displayed in each date box
	function initMonth() {
	  days = [];
	  // @ts-ignore
	  const monthAbbrev = monthNames[month].slice(0, 3);
	  // @ts-ignore
	  const nextMonthAbbrev = monthNames[(month + 1) % 12].slice(0, 3);
	  // @ts-ignore
	  const firstDay = new Date(year, month, 1).getDay();
	  // @ts-ignore
	  const daysInThisMonth = new Date(year, month + 1, 0).getDate();
	  // @ts-ignore
	  const daysInLastMonth = new Date(year, month, 0).getDate();
	  // @ts-ignore
	  const prevMonth = month === 0 ? 11 : month - 1;
  
	  // Show the days before the start of this month (disabled) - always less than 7
	  for (let i = daysInLastMonth - firstDay; i < daysInLastMonth; i++) {
		// @ts-ignore
		let d = new Date(prevMonth === 11 ? year - 1 : year, prevMonth, i + 1);
		days.push({ name: '' + (i + 1), enabled: false, date: d });
	  }
  
	  // Show the days in this month (enabled) - always 28 - 31
	  for (let i = 0; i < daysInThisMonth; i++) {
		// @ts-ignore
		let d = new Date(year, month, i + 1);
		if (i === 0) days.push({ name: monthAbbrev + ' ' + (i + 1), enabled: true, date: d });
		else days.push({ name: '' + (i + 1), enabled: true, date: d });
	  }
  
	  // Show any days to fill up the last row (disabled) - always less than 7
	  for (let i = 0; days.length % 7; i++) {
		// @ts-ignore
		let d = new Date((month === 11 ? year + 1 : year), (month + 1) % 12, i + 1);
		if (i === 0) days.push({ name: nextMonthAbbrev + ' ' + (i + 1), enabled: false, date: d });
		else days.push({ name: '' + (i + 1), enabled: false, date: d });
	  }
	}
  
	// Find the row and column for a given date
	// @ts-ignore
	function findRowCol(dt) {
	  for (let i = 0; i < days.length; i++) {
		// @ts-ignore
		let d = days[i].date;
		if (
		  d.getYear() === dt.getYear() &&
		  d.getMonth() === dt.getMonth() &&
		  d.getDate() === dt.getDate()
		) {
		  return { row: Math.floor(i / 7) + 2, col: i % 7 + 1 };
		}
	  }
	  return null;
	}
  
	// Handle item click
	// @ts-ignore
	function itemClick(e) {
	  eventText = `Item Click: ${JSON.stringify(e)}`;
	}
  
	// Handle day click
	// @ts-ignore
	function dayClick(e) {
	  eventText = `Day Click: ${JSON.stringify(e)}`;
	}
  
	// Handle header click
	// @ts-ignore
	function headerClick(e) {
	  eventText = `Header Click: ${JSON.stringify(e)}`;
	}
  
	// Navigate to the next month
	function next() {
	  // @ts-ignore
	  if (month === 11) {
		// @ts-ignore
		year++;
		month = 0;
	  } else {
		// @ts-ignore
		month++;
	  }
	  initContent();
	}
  
	// Navigate to the previous month
	function prev() {
	  // @ts-ignore
	  if (month === 0) {
		// @ts-ignore
		year--;
		month = 11;
	  } else {
		// @ts-ignore
		month--;
	  }
	  initContent();
	}
  </script>
  
  <div class="calendar-container">
	<div class="calendar-header">
	  <h1>
		<button on:click={prev}>&lt;</button>
		{monthNames[month]} {year}
		<button on:click={next}>&gt;</button>
	  </h1>
	</div>
  
	<Calendar
	  {headers}
	  {days}
	  {items}
	  on:dayClick={e => dayClick(e.detail)}
	  on:itemClick={e => itemClick(e.detail)}
	  on:headerClick={e => headerClick(e.detail)}
	/>
  </div>
  
  <style>
	.calendar-container {
	  width: 90%;
	  margin: auto;
	  overflow: hidden;
	  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
	  border-radius: 10px;
	  background: #fff;
	  max-width: 1200px;
	}
  
	.calendar-header {
	  text-align: center;
	  padding: 20px 0;
	  background: #eef;
	  border-bottom: 1px solid rgba(166, 168, 179, 0.12);
	}
  
	.calendar-header h1 {
	  margin: 0;
	  font-size: 18px;
	}
  
	.calendar-header button {
	  background: #eef;
	  border: 1px;
	  padding: 6px;
	  color: rgba(81, 86, 93, 0.7);
	  cursor: pointer;
	  outline: 0;
	}
  </style>
  