import React, { Component } from "react";
import ReactDOM from "react-dom";

import "./styles.css";
let dates = new Array(28).fill(0);
let events = {};
events["2018-08-09"] = [
  {
    eventType: "appointment",
    description: "have an apointment at the dentist :(",
    title: "Dentist apointment",
    fullDateTimeString: "2018-08-09T23:19:34.834Z"
  }
];

// dateSting eg. "2018-08-09"
function findEventsForDay(dateString) {
  return events[dateString];
}

let today = new Date();
let tString = today.toISOString().split("T");
let eventsToday = findEventsForDay(tString[0]);
console.log("-------------- events today ---------", tString);
console.log(eventsToday);
const DateBox = ({ day, onClick }) => {
  return (
    <div className="date-box" onClick={() => onClick(day)}>
      {" "}
      {day}{" "}
    </div>
  );
};
class App extends Component {
  constructor(props) {
    super(props);
    this._calanderSevice = new CalenderService();
    this.handleBackClick = this.handleBackClick.bind(this);
    this.handleForwardClick = this.handleForwardClick.bind(this);
    this.handleDateBoxClick = this.handleDateBoxClick.bind(this);
    this.state = {
      daysInCurrentMonth: [],
      currentDay: this._calanderSevice.currentDay,
      currentYear: this._calanderSevice.currentYear,
      currentMonth: this._calanderSevice.currentMonth,
      currentDate: this._calanderSevice.currentDate,
      activeDay: this._calanderSevice.currentDay,
      activeYear: this._calanderSevice.currentYear,
      activeMonth: this._calanderSevice.currentMonth,
      activeDate: this._calanderSevice.currentDate
    };
  }
  componentWillMount() {
    let currentYear = this._calanderSevice.currentYear;
    let currentMonth = this._calanderSevice.currentMonth;
    let daysInMonth = this._calanderSevice.getDaysInMonth(
      currentMonth,
      currentYear
    );
    daysInMonth.map(m => console.log(m));
    console.log(daysInMonth);
    this.setState({ daysInCurrentMonth: daysInMonth });
  }

  handleBackClick() {
    let previousMonth = this.state.currentDate.getMonth() - 2;
    let daysInPreviousMonth = this._calanderSevice.getDaysArrForMonth(
      previousMonth,
      this.state.currentYear
    );
    this.setState({ daysInCurrentMonth: daysInPreviousMonth });
    console.log(" -- prev month ---", previousMonth, this.state.currentMonth);
  }

  handleForwardClick() {
    let nextMonth = this.state.currentDate.getMonth() + 2;
    let daysInNextMonth = this._calanderSevice.getDaysArrForMonth(
      nextMonth,
      this.state.currentYear
    );
    this.setState({ daysInCurrentMonth: daysInNextMonth });
    console.log(" -- next month ---", nextMonth, this.state.currentMonth);
  }

  handleDateBoxClick(day) {
    let daysDate = new Date(
      Number(this.state.activeYear),
      Number(this.stateactiveMonth),
      Number(this.state.activeDay)
    );
    alert(
      `${this.state.activeYear} , ${this.state.activeMonth} , ${
        this.state.activeDay
      }`
    );
    alert(daysDate);
    console.log(this._calanderSevice.currentYear);
  }
  render() {
    let ds = this.state.daysInCurrentMonth.map((d, i) => (
      <DateBox
        onClick={this.handleDateBoxClick}
        className="date-box"
        day={d.getDate()}
      />
    ));
    return (
      <div className="App">
        <h1> Month : {this._calanderSevice.currentMonth}</h1>
        <h1> Day : {this._calanderSevice.currentDay}</h1>
        <div>
          {" "}
          <span onClick={this.handleBackClick}> Back </span>{" "}
          <span onClick={this.handleForwardClick}> Forward </span>{" "}
        </div>

        {ds}
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);

function CalenderEventFactory(
  eventType,
  description,
  title,
  fullDateTimeString
) {
  return {
    eventType: eventType,
    description: description,
    title: title,
    fullDateTimeString: fullDateTimeString
  };
}
function CalenderService() {
  this.currentDate = new Date();
  this.currentYear = this.currentDate.getFullYear();
  this.currentMonth = this.currentDate.getMonth();
  this.currentDay = this.currentDate.getDay();

  this.dayNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];

  this.events = {
    "2018-08-09": [
      {
        eventType: "appointment",
        description: "have an apointment at the dentist :(",
        title: "Dentist apointment",
        fullDateTimeString: "2018-08-09T23:19:34.834Z"
      }
    ]
  };

  // this is one indexd

  this.getDaysInMonth = function getDaysInMonth(month, year) {
    var date = new Date(year, month, 1);
    var days = [];
    while (date.getMonth() === month) {
      days.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }
    return days;
  };
}

let myCs = new CalenderService();

console.log(myCs.getDaysInMonth(2, 2018));

let myDate = new Date();

console.log(myDate.getDay());
console.log(myCs.currentDate.getMonth());
