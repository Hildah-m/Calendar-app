const events = [
    {
      title: "Conference",
      date: new Date("2024-04-15"),
      location: "City Hall",
      attendees: new Set(["Alice", "Bob"]),
    },
    {
      title: "Workshop",
      date: new Date("2024-04-17"),
      location: "Community Center",
      attendees: new Set(["Charlie", "David", "Eve"]),
    },
    {
      title: "Meeting",
      date: new Date("2024-04-20"),
      location: "Office",
      attendees: new Set(["Frank", "Grace"]),
    }
  ];
  
  // WeakMap to store organizers
  const organizers = new WeakMap();
  organizers.set(events[0].title, "John");
  organizers.set(events[1].title, "Mary");
  organizers.set(events[2].title, "Alex");
  
  // Function to add a new event
  function addEvent() {
    const title = prompt("Enter event title:");
    const date = new Date(prompt("Enter event date (YYYY-MM-DD):"));
    const location = prompt("Enter event location:");
    const newEvent = { title, date, location, attendees: new Set() };
    events.push(newEvent);
    displayEvents();
  }

  //function to add event listener to "Add Event" button
  document.getElementById("add-event-btn").addEventListener("click,addEvent");

  //Function to add event listener to delete event buttons
  function addDeleteEventListeners(){
    const deleteButtons =
    document.querySelectorAll(".delete-btn");
    deleteButtons.forEach(button => {
       button.addEventListener("click",function(){
        const eventTitle =this.dataset.title;
        deleteEvent(eventTitle);
       }) ;
    });
  }
  // Function to display events
  function displayEvents() {
    const eventList = document.getElementById("event-list");
    eventList.innerHTML = "";
    events.forEach(event => {
      const row = document.createElement("tr");
      const { title, date, location } = event;
      row.innerHTML = `<td>${title}</td><td>${date.toLocaleDateString()}</td><td>${location}</td>`;
      eventList.appendChild(row);
      eventList.appendChild(row)
    });
    addDeleteEventListeners();
  }
  
  // Function to add attendee to an event
  function addAttendee(eventTitle, attendeeName) {
    const event = events.find(event => event.title === eventTitle);
    if (event) {
      event.attendees.add(attendeeName);
      console.log(`${attendeeName} added to ${eventTitle}.`);
    } else {
      console.log("Event not found.");
    }
  }
  
  // Function to convert event array to JSON string
  function eventsToJSON() {
    return JSON.stringify(events, (key, value) => {
      if (key === 'date') {
        return value.toLocaleDateString('en-US');
      }
      return value;
    });
  }
  
  // Function to display properties and values of the first event object
  function displayFirstEventProperties() {
    const firstEvent = events[0];
    console.log("Keys:", Object.keys(firstEvent));
    console.log("Values:", Object.values(firstEvent));
    console.log("Entries:", Object.entries(firstEvent));
  }
  
  // Function to delete event by title
  function deleteEvent(eventTitle) {
    const index = events.findIndex(event => event.title === eventTitle);
    if (index !== -1) {
      events.splice(index, 1);
      console.log(`${eventTitle} deleted successfully.`);
      displayEvents();
    } else {
      console.log("Event not found.");
    }
  }
  
  // Function to find event with most attendees
  function eventWithMostAttendees() {
    const event = events.reduce((prev, current) => {
      return prev.attendees.size > current.attendees.size ? prev : current;
    });
    console.log(`Event with most attendees: ${event.title}`);
  }
  
  // Initial display of events
  displayEvents();
  