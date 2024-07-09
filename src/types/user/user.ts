import { achievement, project } from "../FortyTwo/types";

export interface User {
    id                  : number;
    corrections_points  : number;
    full_name           : string;
    email               : string;  
    login               : string;
    level               : string;
    intra_link          : string;
    is_pooler           : boolean;
    img                 : string | undefined;
    location            : string;
    wallet              : number;
}
