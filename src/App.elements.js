import styled from "styled-components";

const magenta = "#9E2B2F";
const magentaWithOpacity = "#9E2B2F55";

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
`;

export const TimeBlock = styled.div`
  border: 1px solid ${magenta};
  width: 70%;
  text-align: center;
  padding: 1vh 0;
  border-radius: 3px;
  margin: 1% auto;

  ${(p) => (p.picked ? `background-color: ${magentaWithOpacity}` : "")}
`;
