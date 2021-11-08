import styled from "styled-components";

const magenta = "#9E2B2F";
const magentaWithOpacity = "#9E2B2F55";

export const SectionTitle = styled.p`
  margin: 10% 0;
  text-align: center;
  font-size: 1.5rem;
`;

export const CalendarArea = styled.div`
  width: 80%;
  margin: auto;

  & > * {
    margin: 5% 0;
  }
`;

export const MonthChangeArea = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const MonthChangeButton = styled.button`
  margin: 0 5%;

  border: none;
  border-bottom: 1px solid #000000;
  background-color: #00000000;

  cursor: pointer;

  font-size: 0.8rem;

  &:hover {
    color: #cccccc;
    border-bottom: 1px solid #cccccc;
  }
`;

export const WeekDaysArea = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);

  text-align: center;
  font-size: 0.8rem;

  p:first-child {
    color: #ff8d8d;
  }

  p:last-child {
    color: #56a4ff;
  }
`;

export const DatesArea = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: ${(p) => `repeat(${p.rows}, 8vh);`};
`;

export const DateItem = styled.div`
  display: flex;
  flex-direction: column;

  padding: 0.3rem 0.1rem;

  border-top: 1px solid ${magenta};
  border-right: 1px solid ${magenta};
  ${(p) => (p.day === 0 ? `border-left: 1px solid ${magenta};` : "")}
  ${(p) => (p.last ? `border-bottom: 1px solid ${magenta};` : "")}

  position: relative;

  ${(p) => (p.picked ? `background-color: ${magentaWithOpacity};` : "")}

  transition: all 300ms ease-in;
  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 5;
  }
`;

export const DateNum = styled.p`
  margin-bottom: 5%;

  color: ${(props) =>
    props.day === 0 ? "#FF8D8D" : props.day === 6 ? "#56A4FF" : "#000"};
  text-align: center;
  font-size: 0.7rem;
`;

export const SelectedDate = styled.p`
  text-align: center;
  margin: 3% 0;
`;

export const TimeBlockSection = styled.section`
  display: flex;
  flex-direction: column;
  margin: 5% 0;
`;

export const TimeBlock = styled.div`
  border: 1px solid ${magenta};
  width: 70%;
  text-align: center;
  padding: 1vh 0;
  border-radius: 3px;
  margin: 1% auto;
  transition: all 300ms ease-in;

  ${(p) => (p.picked ? `background-color: ${magentaWithOpacity}` : "")}
`;

export const SetTimeSection = styled.div`
  width: 80%;
  margin: auto;
`;

export const WeekDayRow = styled.div`
  margin: 3vh 0;
  display: flex;
  align-items: center;
  gap: 5%;
`;

export const RowLabel = styled.p`
  border-right: 1px solid #000;
  padding-right: 3vw;
`;

export const TimeScroll = styled.div`
  display: grid;
  grid-template-columns: repeat(11, 10vw);
  grid-template-rows: repeat(1, 15vw);
  overflow: scroll;
  position: relative;
  z-index: 1;
  padding-left: 3vw;
`;

export const TimeScrollItem = styled.div`
  text-align: center;
`;

export const TimeIndex = styled.div`
  transform: translateX(-50%);
  position: relative;
  z-index: 5;
  font-size: 0.5rem;
  margin-bottom: 1vh;
`;

export const TimeSelectBox = styled.div`
  height: 8vw;
  padding: 2vw;
  border-right: 1px solid ${magenta};
  border-top: 1px solid ${magenta};
  border-bottom: 1px solid ${magenta};

  transition: all 300ms ease-in;
  ${(p) =>
    p.first
      ? `
    border-left: 1px solid ${magenta};`
      : ""}

  ${(p) => (p.selected ? `background-color: ${magentaWithOpacity}` : "")}
`;
