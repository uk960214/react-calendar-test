import "./App.css";
import React, { useState } from "react";

import {
  SectionTitle,
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
  SetTimeSection,
  WeekDayRow,
  RowLabel,
  TimeScroll,
  TimeScrollItem,
  TimeSelectBox,
  TimeIndex,
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
  const [availT, setAvailT] = useState({
    1: {},
    2: {},
    3: {},
    4: {},
    5: {},
  });

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

    setDatePick("");
  };

  const toNextMonth = () => {
    const dayOne = new Date(viewMonth.year, viewMonth.month + 1, 1);

    setMonth({ year: dayOne.getFullYear(), month: dayOne.getMonth() });

    setDatePick("");
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

  // create time scroll component

  const handleTimeSetClick = (day, hour) => {
    let newTObj = availT;
    newTObj[day][hour] = newTObj[day][hour] ? false : true;
    setAvailT({ ...newTObj });
  };

  let weekDays = { 1: "월", 2: "화", 3: "수", 4: "목", 5: "금" };
  let timeSettings = [];
  for (let i = 1; i < 6; i++) {
    let timeScrolls = [];
    for (let j = 9; j < 20; j++) {
      timeScrolls.push(
        <TimeScrollItem key={j}>
          <TimeIndex>{j}</TimeIndex>
          <TimeSelectBox
            onClick={(e) => handleTimeSetClick(i, j)}
            first={j === 9}
            selected={availT[i][j]}
          />
        </TimeScrollItem>
      );
    }
    timeSettings.push(
      <WeekDayRow key={i}>
        <RowLabel>{weekDays[i]}</RowLabel>
        <TimeScroll>{timeScrolls}</TimeScroll>
      </WeekDayRow>
    );
  }

  return (
    <>
      <SectionTitle>상담 예약하기</SectionTitle>
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

      <SectionTitle>상담가능 시간 선택하기</SectionTitle>
      <SetTimeSection>{timeSettings}</SetTimeSection>
    </>
  );
}

export default App;
