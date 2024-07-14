using Data_Access_Layer;
using Data_Access_Layer.Repository.Entities;

namespace BackEnd.BAL
{
    public class BALMissionSkill
    {
        private readonly DALMissionSkill _dalMissionSkill;
        public BALMissionSkill(DALMissionSkill dalMissionSkill)
        {
            _dalMissionSkill = dalMissionSkill;
        }

        public async Task<List<MissionSkill>> GetMissionSkillListAsync()
        {
            return await _dalMissionSkill.GetMissionSkillListAsync();
        }
        public async Task<MissionSkill> GetMissionSkillByIdAsync(int id)
        {
            return await _dalMissionSkill.GetMissionSkillByIdAsync(id);
        }

        public async Task<string> AddMissionSkillAsync(MissionSkill missionSkill)
        {
            return await _dalMissionSkill.AddMissionSkillAsync(missionSkill);
        }
        public async Task<string> UpdateMissionSkillAsync(MissionSkill missionSkill)
        {
            return await _dalMissionSkill.UpdateMissionSkillAsync(missionSkill);
        }
        public async Task<string> DeleteMissionSkillAsync(int id)
        {
            return await _dalMissionSkill.DeleteMissionSkillAsync(id);
        }
    }
}
