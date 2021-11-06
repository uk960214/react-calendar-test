import "./App.css";
import React, { useState } from "react";

import {
  CalendarArea,
  WeekDaysArea,
  DatesArea,
  DateItem,
  DateNum,
  MonthChangeArea,
  MonthChangeButton,
  TimeBlock,
  TimeBlockSection,
  SelectedDate,
} from "./App.elements";
import { timeData } from "./timeData";

function App() {
  const today = new Date();

  // states
  const [viewMonth, setMonth] = useState({
    year: today.getFullYear(),
    month: today.getMonth(),
  });
  const [datePick, setDatePick] = useState();
  const [timePick, setTimePick] = useState();

  // get dates to show
  const viewDates = [];

  const firstDate = new Date(viewMonth.year, viewMonth.month, 1);
  const beginDay = firstDate.getDay();

  const lastDate = new Date(viewMonth.year, viewMonth.month + 1, 0);
  const endDay = lastDate.getDay();

  for (let i = -1 * beginDay + 1; i <= 0; i++) {
    let prevDate = new Date(viewMonth.year, viewMonth.month, i);
    viewDates.push(prevDate);
  }

  for (let i = 1; i <= lastDate.getDate(); i++) {
    let currDate = new Date(viewMonth.year, viewMonth.month, i);
    viewDates.push(currDate);
  }

  for (let i = 1; endDay + i <= 6; i++) {
    let nextDate = new Date(
      viewMonth.year,
      viewMonth.month,
      lastDate.getDate() + i
    );
    viewDates.push(nextDate);
  }

  // date pick event
  const handleDatePick = (date) => {
    setDatePick(date);
    setTimePick(null);
  };

  // create dates
  const dates = viewDates.map((d, i) => {
    // 마지막 줄 여부 파악
    const last =
      Math.floor(viewDates.length / 7) - 1 === Math.floor(i / 7) ? true : false;
    let date = `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
    let wDay = d.getDay();
    return (
      <DateItem
        last={last}
        day={wDay}
        key={i}
        picked={date === datePick}
        onClick={(e) => handleDatePick(date)}
      >
        <DateNum day={wDay}>{d.getDate()}</DateNum>
      </DateItem>
    );
  });

  // change months

  const toPrevMonth = () => {
    const dayOne = new Date(viewMonth.year, viewMonth.month - 1, 1);

    setMonth({ year: dayOne.getFullYear(), month: dayOne.getMonth() });
  };

  const toNextMonth = () => {
    const dayOne = new Date(viewMonth.year, viewMonth.month + 1, 1);

    setMonth({ year: dayOne.getFullYear(), month: dayOne.getMonth() });
  };

  const handleTimePick = (i) => {
    setTimePick(i);
  };

  // add time blocks when date picked
  const dateKey = datePick;
  const times = timeData[dateKey];
  let timeBlocks = times
    ? times.map((x, i) => (
        <TimeBlock
          key={i}
          picked={i === timePick}
          onClick={(e) => handleTimePick(i)}
        >
          {x}
        </TimeBlock>
      ))
    : [];

  return (
    <>
      <CalendarArea>
        <MonthChangeArea>
          <MonthChangeButton onClick={() => toPrevMonth()}>
            지난 달
          </MonthChangeButton>
          {`${viewMonth.year} . ${viewMonth.month + 1}`}
          <MonthChangeButton onClick={() => toNextMonth()}>
            다음 달
          </MonthChangeButton>
        </MonthChangeArea>
        <WeekDaysArea>
          <p>일</p>
          <p>월</p>
          <p>화</p>
          <p>수</p>
          <p>목</p>
          <p>금</p>
          <p>토</p>
        </WeekDaysArea>
        <DatesArea rows={dates.length / 7}>{dates}</DatesArea>
      </CalendarArea>
      <TimeBlockSection>
        <SelectedDate>{datePick}</SelectedDate>
        {datePick ? timeBlocks : ""}
      </TimeBlockSection>
    </>
  );
}

export default App;
