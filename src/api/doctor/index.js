import ajax from "../ajax";

// 新郑 标签
export const reqAddLabel = ({id,token,label}) => ajax('/api/doctor/list/add_labels',{id,token,label});
