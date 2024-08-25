interface Filter {
  id: number;
  name: string;
  disabled?: boolean;
}
export const Filters: Filter[] = [
  {
    id: 1337,
    name: "All Students",
  },
  {
    id: 1338,
    name: "Alumni",
    disabled: true,
  },
  {
    id: 6,
    name: "Jun Pool",
    disabled: true,
  },
  {
    id: 7,
    name: "Jul Pool",
    disabled: true,
  },
  {
    id: 8,
    name: "Aug Pool",
    disabled: true,
  },
];

// Campuses data
interface Campus {
  id: number;
  name: string;
  disabled?: boolean;
}
export const Campuses: Campus[] = [
  {
    id: 21,
    name: "Ben Guerir",
  },
  {
    id: 16,
    name: "Khouribga",
    disabled: true,
  },
  {
    id: 55,
    name: "Med",
    disabled: true,
  },
  {
    id: 75,
    name: "Rabat",
  },
];

// Promos data
// (-_-) A tmp solution, until i got real one for dynamic render each campus promos (TBD).
interface Promo {
  id: number;
  name: string;
  start_date: string;
  campus_start_dates?: { [campusId: number]: string };
  disabled?: boolean;
  Prm_color: string;
  sec_color: string;
}

export const Promos: Promo[] = [
  {
    id: 0,
    name: "2024",
    start_date: "2024-08-26T09:37:00.000Z",
    campus_start_dates: {
      21: "2024-08-26T09:37:00.000Z",
      16: "2024-08-26T09:37:00.000Z",
      55: "2024-08-26T09:37:00.000Z",
      75: "2024-08-26T09:37:00.000Z",
    },
    Prm_color: "#8891a1",
    sec_color: "#b2bbca",
  },
  {
    id: 1,
    name: "2023",
    start_date: "2023-10-30T08:37:00.000Z", // Default start date
    campus_start_dates: {
      21: "2023-10-30T08:37:00.000Z", // Ben Guerir (BG)
      16: "2023-10-30T08:37:00.000Z", // Khouribga (Kh)
      55: "2023-12-04T08:37:00.000Z", // Med
    },
    Prm_color: "#000000",
    sec_color: "#343434",
  },
  {
    id: 2,
    name: "2022",
    start_date: "2022-10-05T06:00:00.000Z", // Default start date
    campus_start_dates: {
      21: "2022-10-05T06:00:00.000Z", // Ben Guerir (BG)
      16: "2022-10-05T07:00:00.000Z", // Khouribga (Kh)
      55: "2022-09-28T07:00:00.000Z", // Med
    },
    Prm_color: "#E52B1D",
    sec_color: "#ff7638",
  },
  {
    id: 3,
    name: "2021",
    start_date: "2021-08-02T08:37:00.000Z", // Default start date
    campus_start_dates: {
      21: "2021-08-02T08:37:00.000Z", // Ben Guerir (BG)
      16: "2021-11-01T08:00:00.000Z", // Khouribga (Kh)
    },
    Prm_color: "#024325",
    sec_color: "#2ACF79",
    disabled: true,
  },
  {
    id: 4,
    name: "2019",
    start_date: "2019-07-01T07:37:00.000Z", // Default start date
    campus_start_dates: {
      21: "2019-07-01T07:37:00.000Z", // Ben Guerir (BG)
      16: "2019-10-16T08:37:00.000Z", // Khouribga (Kh)
      // Med and Rabat are not listed for 2019, add if needed
    },
    Prm_color: "#245aff",
    sec_color: "#4a76ff",
    disabled: true,
  },
  {
    id: 5,
    name: "2018",
    start_date: "2018-07-01T07:37:00.000Z",
    campus_start_dates: {
      16: "2018-07-01T07:37:00.000Z",
    },
    Prm_color: "#245aff",
    sec_color: "#4a76ff",
    disabled: true,
  },
];
