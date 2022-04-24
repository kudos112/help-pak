export const days = [
  {
    value: 0,
    label: "Sunday",
  },
  {
    value: 1,
    label: "Monday",
  },
  {
    value: 2,
    label: "Tuesday",
  },
  {
    value: 3,
    label: "Wednesday",
  },
  {
    value: 4,
    label: "Thuresday",
  },
  {
    value: 5,
    label: "Friday",
  },
  {
    value: 6,
    label: "Saturday",
  },
];

export const getDayNames = (array) => {
  return array ? array.map((day) => days[day].label) : [];
};
