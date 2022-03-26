
var CalendarList = [];
var schedulesList = [];

getSchedulesList();
// getCalendarsList();
// createCalendarList();

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

    console.log(CalendarList);

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
        console.log(i, "end date:", schedulesList[i].start);

        let str = schedulesList[i].start
        schedulesList[i].start = str.substr(0, 19);
        str = schedulesList[i].end
        schedulesList[i].end = str.substr(0, 19);

        console.log(i, "start date:", schedulesList[i].start);
        console.log(i, "end date:", schedulesList[i].end);
        schedulesList[i].category = 'time';
    }

    console.log("schedulesList:", schedulesList);
    // console.log("schedule_0:", schedulesList[0]);


    // cal.createSchedules([
    //     {
    //         id: schedulesList[0].id,
    //         calendarId: schedulesList[0].id_cal,
    //         title: schedulesList[0].event_name,
    //         category: 'time',
    //         dueDateClass: '',
    //         // start: schedulesList[0].start_date,
    //         start: '2022-03-23T02:30:00',
    //         // end: schedulesList[0].end_date
    //         end: '2022-03-26T22:30:00'
    //     },
    //     {
    //         id: '2',
    //         calendarId: '2',
    //         title: 'second schedule',
    //         category: 'time',
    //         dueDateClass: '',
    //         start: '2022-03-20T17:30:00+09:00',
    //         end: '2022-03-21T17:31:00+09:00',
    //         isReadOnly: true    // schedule is read-only
    //     }
    // ]);

    cal.createSchedules(schedulesList);



    // event handlers
    cal.on({
        'clickMore': function (e) {
            console.log('clickMore', e);
        },
        'clickSchedule': function (e) {
            console.log('clickSchedule', e);
        },
        'clickDayname': function (date) {
            console.log('clickDayname', date);
        },
        'beforeCreateSchedule': function (e) {
            console.log('beforeCreateSchedule', e);
            saveNewSchedule(e);
        },
        'beforeUpdateSchedule': function (e) {
            var schedule = e.schedule;
            var changes = e.changes;

            console.log('beforeUpdateSchedule', e);

            if (changes && !changes.isAllDay && schedule.category === 'allday') {
                changes.category = 'time';
            }

            cal.updateSchedule(schedule.id, schedule.calendarId, changes);
            refreshScheduleVisibility();
        },
        'beforeDeleteSchedule': function (e) {
            console.log('beforeDeleteSchedule', e);
            cal.deleteSchedule(e.schedule.id, e.schedule.calendarId);
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
// TODO  swap createCalendarList and createEventList
function createEventsList(schedulesList, cal) {
    console.log("schedulesList", schedulesList);
    cal.createSchedules([
        {
            id: '1',
            calendarId: '1',
            title: 'my schedule',
            category: 'time',
            dueDateClass: '',
            start: '2022-03-23',
            // start: '2022-03-23T22:30:00+09:00',
            end: '2022-03-26'
            // end: '2022-03-26T02:30:00+09:00'
        },
        {
            id: '2',
            calendarId: '2',
            title: 'second schedule',
            category: 'time',
            dueDateClass: '',
            start: '2022-03-20T17:30:00+09:00',
            end: '2022-03-21T17:31:00+09:00',
            isReadOnly: true    // schedule is read-only
        }
    ]);
}

function getCalendarsList() {

    // using fetch

    fetch('http://82.209.203.205:3055/calendars', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: ""
    })
        .then(res => res.json())
        .then(data => {
            // enter you logic when the fetch is successful
            console.log(data);
            createCalendarList(data);
        })
        .then(createCalendar)
        .catch(error => {
            // enter your logic for when there is an error (ex. error toast)
            console.log(error)
        })

}

function getSchedulesList() {

    // using fetch

    fetch('http://82.209.203.205:3055/events', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: ""
    })
        .then(res => res.json())
        .then(data => {
            // enter you logic when the fetch is successful
            schedulesList = data;
            console.log(data);
        })
        .then(getCalendarsList)
        .catch(error => {
            // enter your logic for when there is an error (ex. error toast)
            console.log(error)
        })

}

function saveNewSchedule(e) {
    console.log(e);
    fetch('http://82.209.203.205:3055/events', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: ""
    })
        .then(res => res.json())
        .then(data => {
            // enter you logic when the fetch is successful
            schedulesList = data;
            console.log(data);
        })
        .then(getCalendarsList)
        .catch(error => {
            // enter your logic for when there is an error (ex. error toast)
            console.log(error)
        })
}