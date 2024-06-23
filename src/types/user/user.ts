import { achievement } from "../FortyTwo/achievement";
import { project } from "../FortyTwo/project";


export interface User {
    id                  : number;
    corrections_points  : number;
    full_name           : string;
    email               : string;  
    login               : string;
    level               : string;
    img                 : string | undefined;
    location            : string;
    wallet              : number;
    projects            : project[];
    achievements        : achievement[];
}
