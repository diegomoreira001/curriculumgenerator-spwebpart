
import {ISkill, SkillProcessor} from '../utils/SkillProcessor';
import {expect} from 'chai';
import 'mocha'

describe('Webpart Tests', () => {

  it('Should return an ordered array of skills',() => {

    let skillList = {
      "Skill1" : 5,
      "Skill2" : 3,
      "Skill3" : 5,
      "Skill4" : 0,
      "Skill5" : 1
    };

    let skillFilter = ['Skill1', 'Skill3', 'Skill2', 'Skill4', 'Skill5'];
    let orderedSkills = SkillProcessor.mapAndOrderSkills(skillList, skillFilter);

    console.log(orderedSkills);
    expect(orderedSkills[0].SkillName).to.equal('Skill1');
    expect(orderedSkills[1].SkillName).to.equal('Skill3');
    expect(orderedSkills[2].SkillName).to.equal('Skill2');

  });

});
