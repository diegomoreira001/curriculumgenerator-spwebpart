"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SkillProcessor = /** @class */ (function () {
    function SkillProcessor() {
    }
    //Really messy way of mapping and ordering
    //In reality we should be using Neumann's OrderedArray where we implement insertion sort and binary search.
    SkillProcessor.mapAndOrderSkills = function (skillList, skillNamesFilter) {
        var orderedSkills = [];
        skillNamesFilter.forEach(function (value, index, array) {
            if (skillList[value] != undefined && skillList[value] != null) {
                var skill = { SkillName: value, Level: skillList[value] };
                orderedSkills.push(skill);
            }
        });
        //Order by skill level
        orderedSkills.sort(function (a, b) {
            if (a.Level < b.Level)
                return 1;
            if (a.Level > b.Level)
                return -1;
            return 0;
        });
        return orderedSkills;
    };
    return SkillProcessor;
}());
exports.SkillProcessor = SkillProcessor;
//# sourceMappingURL=SkillProcessor.js.map