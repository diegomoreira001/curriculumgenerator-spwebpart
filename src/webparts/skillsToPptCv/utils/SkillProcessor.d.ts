export declare class SkillProcessor {
    static mapAndOrderSkills(skillList: object, skillNamesFilter: string[]): ISkill[];
}
export interface ISkillList {
    Skills: ISkill[];
}
export interface ISkill {
    SkillName: string;
    Level: number;
}
