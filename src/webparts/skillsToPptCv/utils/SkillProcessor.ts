export class SkillProcessor {

//Really messy way of mapping and ordering
//In reality we should be using Neumann's OrderedArray where we implement insertion sort and binary search.
  public static mapAndOrderSkills(skillList: object, skillNamesFilter: string[]): ISkill[] {

    let orderedSkills: ISkill[] = [];

    skillNamesFilter.forEach(function (value, index, array) {
      if (skillList[value] != undefined && skillList[value] != null) {
        let skill: ISkill = {SkillName : value, Level : skillList[value]};

        orderedSkills.push(skill);
      }

    });

    //Order by skill level
    orderedSkills.sort((a, b) => {
      if (a.Level < b.Level)
        return 1;
      if (a.Level > b.Level)
        return -1;
      return 0;
    });


    return orderedSkills;

  }
}

export interface ISkillList {
  Skills: ISkill[];
}
export interface ISkill {
  SkillName: string;
  Level: number;
}
