export type Promo = {
  id: number;
  Name: string;
  start_date: string;
  campus_start_dates?: { [campusId: number]: string };
  disabled?: boolean;
  Prm_color: string;
  sec_color: string;
}

export type Cursuse = {
    CursusId: number,
    CursusName: string
}

export interface project {
    cursus_id           : number;
    final_make          : number;
    project_name        : string;
    finished_date       : string;
    is_marked           : boolean;
    is_validated        : boolean;
    status              : string;
}

export interface achievement {
    achievement_name : string;
    achievement_desc : string;
    achievement_img  : string;
}