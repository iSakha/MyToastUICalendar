
var CalendarList = [];
var schedulesList = [];
var selectedEvent = {};

getSchedulesList();

function CalendarInfo() {
    this.id = null;
    this.name = null;
    this.checked = true;
    this.color = null;
    this.bgColor = null;
    this.borderColor = null;
    this.dragBgColor = null;
}

function addCalendar(calendar) {
    CalendarList.push(calendar);
}

function createCalendarList(dataFromServer) {

    // console.log("CalendarObj:", data);
    var calendar;

    for (let i = 0; i < dataFromServer.length; i++) {
        calendar = new CalendarInfo();
        calendar.id = dataFromServer[i].id;
        calendar.name = dataFromServer[i].cal_name;
        calendar.color = dataFromServer[i].color;
        calendar.bgColor = dataFromServer[i].bgColor;

        addCalendar(calendar);
    }

    return CalendarList;

};


// *********************************************************
function createCalendar(window, Calendar) {

    // console.log(CalendarList);

    var Calendar = tui.Calendar;


    var cal, resizeThrottled;
    var useCreationPopup = true;
    var useDetailPopup = true;
    var datePicker, selectedCalendar;

    cal = new Calendar('#calendar', {
        defaultView: 'month',
        useCreationPopup: useCreationPopup,
        useDetailPopup: useDetailPopup,
        calendars: CalendarList,
        // template: {
        //     milestone: function (model) {
        //         return '<span class="calendar-font-icon ic-milestone-b"></span> <span style="background-color: ' + model.bgColor + '">' + model.title + '</span>';
        //     },
        //     allday: function (schedule) {
        //         return getTimeTemplate(schedule, true);
        //     },
        //     time: function (schedule) {
        //         return getTimeTemplate(schedule, false);
        //     }
        // }
    });

    // *********************************************************



    for (let i = 0; i < schedulesList.length; i++) {
        console.log(i, "start date:", schedulesList[i].start);
        schedulesList[i].category = 'time';
    }

    cal.createSchedules(schedulesList);



    // event handlers
    cal.on({
        'clickMore': function (e) {
            console.log('clickMore', e);
        },
        'clickSchedule': function (e) {
            console.log('clickSchedule', e);
            setCurrentEvent(e.schedule);
        },
        'clickDayname': function (date) {
            console.log('clickDayname', date);

        },
        'beforeCreateSchedule': function (e) {
            // console.log('beforeCreateSchedule', e);
            saveNewSchedule(e);
        },
        'beforeUpdateSchedule': function (e) {
            var schedule = e.schedule;
            var changes = e.changes;

            console.log('beforeUpdateSchedule', e);

            if (changes && !changes.isAllDay && schedule.category === 'allday') {
                changes.category = 'time';
            }

            updateSchedule(e);
            // refreshScheduleVisibility();
        },
        'beforeDeleteSchedule': function (e) {
            console.log('beforeDeleteSchedule', e);
            deleteSchedule(e.schedule.id);
            // cal.deleteSchedule(e.schedule.id, e.schedule.calendarId);
        },
        'afterRenderSchedule': function (e) {
            var schedule = e.schedule;
            // var element = cal.getElement(schedule.id, schedule.calendarId);
            // console.log('afterRenderSchedule', element);
        },
        'clickTimezonesCollapseBtn': function (timezonesCollapsed) {
            console.log('timezonesCollapsed', timezonesCollapsed);

            if (timezonesCollapsed) {
                cal.setTheme({
                    'week.daygridLeft.width': '77px',
                    'week.timegridLeft.width': '77px'
                });
            } else {
                cal.setTheme({
                    'week.daygridLeft.width': '60px',
                    'week.timegridLeft.width': '60px'
                });
            }

            return true;
        }
    });
};

function getCalendarsList() {
    fetch('http://82.209.203.205:3055/calendars')
        .then(res => res.json())
        .then(data => {
            // enter you logic when the fetch is successful
            console.log("calendarList:", data);
            createCalendarList(data);
        })
        .then(createCalendar)
        .catch(error => {
            // enter your logic for when there is an error (ex. error toast)
            console.log(error)
        })
};

function getSchedulesList() {

    // using fetch

    fetch('http://82.209.203.205:3055/events')
        .then(res => res.json())
        .then(data => {
            // enter you logic when the fetch is successful
            schedulesList = data;
            console.log("schedulesList:", data);
        })
        .then(getCalendarsList)
        .catch(error => {
            // enter your logic for when there is an error (ex. error toast)
            console.log(error)
        })

}

function saveNewSchedule(e) {
    // console.log(e);
    let event = {};
    event.calendarId = e.calendarId;
    event.title = e.title;
    event.start = e.start._date;
    event.end = e.end._date;
    event.location = e.location;
    console.log(event);
    fetch('http://82.209.203.205:3055/events', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(event)
    })
        .then(res => res.json())
        .then(data => {
            getSchedulesList();
            console.log("data:", data);
        })
        .then(refresh)
        .catch(error => {
            // enter your logic for when there is an error (ex. error toast)
            console.log(error)
        })
}

function deleteSchedule(e) {
    // console.log(e);
    let data = {};
    data.id = e;
    fetch('http://82.209.203.205:3055/events', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
        .then(res => res.json())
        .then(data => {
            getSchedulesList();
            console.log("data:", data);
        })
        .then(refresh)
        .catch(error => {
            // enter your logic for when there is an error (ex. error toast)
            console.log(error)
        })
}

function setCurrentEvent(e) {
    selectedEvent.id = e.id;
    selectedEvent.calendarId = e.calendarId;
    selectedEvent.title = e.title;
    selectedEvent.start = e.start._date;
    selectedEvent.end = e.end._date;
    selectedEvent.location = e.location;
    console.log("currentEvent:", selectedEvent);
}
function updateSchedule(e) {

    let objChanges = {};
    objChanges = e.changes;
    console.log("Changes:", objChanges);
    let arrChanges = Object.keys(objChanges);
    console.log("arrChanges:", arrChanges);

    console.log("selectedEvent:", selectedEvent);
    console.log("objChanges:", objChanges);

    let updatedEvent = {};
    updatedEvent = selectedEvent;
    let arrUpdatedEvent = Object.keys(updatedEvent);
    console.log("updatedEvent:", updatedEvent);
    console.log("arrUpdatedEvent:", arrUpdatedEvent);

    for (let i = 0; i < arrChanges.length; i++) {
        let keyToChange = arrChanges[i];
        console.log("keyToChange:", keyToChange);

        if (keyToChange !== "state") {

            if (keyToChange === "start" || keyToChange === "end") {

                let val = objChanges[keyToChange];
                let time = val._date;
                console.log("time:", time);
                updatedEvent[keyToChange] = time;
            } else {
                updatedEvent[keyToChange] = objChanges[keyToChange];
            }

        }
    }
    console.log("updatedEvent:", updatedEvent);

    fetch('http://82.209.203.205:3055/events', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedEvent)
    })
        .then(res => res.json())
        .then(data => {
            getSchedulesList();
            console.log("data:", data);
        })
        .then(refresh)
        .catch(error => {
            // enter your logic for when there is an error (ex. error toast)
            console.log(error)
        })
}


function refresh() {
    location.reload();
}