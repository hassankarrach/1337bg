import { achievement, project } from "../FortyTwo/types";

export interface User {
    id                  : number;
    corrections_points  : number;
    full_name           : string;
    nickname            : string | null;
    bio                 : string | null;
    email               : string;  
    login               : string;
    level               : string;
    intra_link          : string;
    is_pooler           : boolean;
    img                 : string | undefined;
    location            : string;
    wallet              : number;
    // Admission status fields
    accepted            : string | boolean;
    reason              : string | null;
    isvalidated         : string | boolean;
    cheating            : boolean;
}