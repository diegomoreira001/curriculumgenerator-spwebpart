"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SkillProcessor_1 = require("../utils/SkillProcessor");
var chai_1 = require("chai");
require("mocha");
describe('Webpart Tests', function () {
    it('Should return an ordered array of skills', function () {
        var skillList = {
            "Skill1": 5,
            "Skill2": 3,
            "Skill3": 5,
            "Skill4": 0,
            "Skill5": 1
        };
        var skillFilter = ['Skill1', 'Skill3', 'Skill2', 'Skill4', 'Skill5'];
        var orderedSkills = SkillProcessor_1.SkillProcessor.mapAndOrderSkills(skillList, skillFilter);
        console.log(orderedSkills);
        chai_1.expect(orderedSkills[0].SkillName).to.equal('Skill1');
        chai_1.expect(orderedSkills[1].SkillName).to.equal('Skill3');
        chai_1.expect(orderedSkills[2].SkillName).to.equal('Skill2');
    });
});
//# sourceMappingURL=SkillProcessor.test.js.map