import { atom } from "jotai";
type ProjectReqData = {
    postedByName: string,
    postedById: number,
}
const projectReqDataAtom = atom<ProjectReqData>({ postedByName: '', postedById: 0 })
export  {projectReqDataAtom}