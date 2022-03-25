// var Calendar = tui.Calendar;

// var cal = new Calendar('#calendar', {
//     defaultView: 'month',
//     taskView: true,
//     useCreationPopup: true,
//     useDetailPopup: true,
//     template: {
//         monthDayname: function (dayname) {
//             return '<span class="calendar-week-dayname-name">' + dayname.label + '</span>';
//         }

//     }
// });
var CalendarList = [];

getCalendarsList();
createCalendarList();


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

function createCalendarList(data) {

    console.log("CalendarObj:", data);
    var calendar;
    // var id = 0;

    calendar = new CalendarInfo();
    // id += 1;
    calendar.id = data[0].id;
    calendar.name = data[0].cal_name;
    calendar.color = data[0].color;
    calendar.bgColor = data[0].bgColor;
    // calendar.dragBgColor = '#9e5fff';
    // calendar.borderColor = '#9e5fff';
    addCalendar(calendar);

    calendar = new CalendarInfo();
    // id += 1;
    calendar.id = data[1].id;
    calendar.name = data[1].cal_name;
    calendar.color = data[1].color;
    calendar.bgColor = data[1].bgColor;
    // calendar.dragBgColor = '#00a9ff';
    // calendar.borderColor = '#00a9ff';
    addCalendar(calendar);

    calendar = new CalendarInfo();
    // id += 1;
    calendar.id = data[2].id;
    calendar.name = data[2].cal_name;
    calendar.color = data[2].color;
    calendar.bgColor = data[2].bgColor;
    // calendar.dragBgColor = '#ff5583';
    // calendar.borderColor = '#ff5583';
    addCalendar(calendar);

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
        calendars: CalendarList
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


    cal.createSchedules([
        {
            id: '1',
            calendarId: '1',
            title: 'my schedule',
            category: 'time',
            dueDateClass: '',
            start: '2022-03-23T22:30:00+09:00',
            end: '2022-03-26T02:30:00+09:00'
        },
        {
            id: '2',
            calendarId: '1',
            title: 'second schedule',
            category: 'time',
            dueDateClass: '',
            start: '2022-03-20T17:30:00+09:00',
            end: '2022-03-21T17:31:00+09:00',
            isReadOnly: true    // schedule is read-only
        }
    ]);

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

    function saveNewSchedule(e) {
        console.log(e);
    }

};

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