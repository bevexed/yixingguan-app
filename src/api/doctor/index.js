import ajax from "../ajax";

export const reqSeeks = title => ajax('/api/patient/home/seeks',{title},'POST');
