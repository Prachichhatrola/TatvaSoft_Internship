using Data_Access_Layer.Repository;
using Data_Access_Layer.Repository.Entities;
using Microsoft.EntityFrameworkCore;

namespace Data_Access_Layer
{
    public class DALMissionSkill
    {
        private readonly AppDbContext _cIDbContext;

        public DALMissionSkill(AppDbContext cIDbContext)
        {
            _cIDbContext = cIDbContext;
        }

        public async Task<List<MissionSkill>> GetMissionSkillListAsync()
        {
            return await _cIDbContext.MissionSkill
                                     .Where(ms => !ms.IsDeleted)
                                     .ToListAsync();
        }

        public async Task<MissionSkill> GetMissionSkillByIdAsync(int id)
        {
            return await _cIDbContext.MissionSkill
                                     .Where(ms => ms.Id == id && !ms.IsDeleted)
                                     .FirstOrDefaultAsync();
        }

        public async Task<string> AddMissionSkillAsync(MissionSkill missionSkill)
        {
            try
            {
                int maxIdStr = _cIDbContext.MissionSkill.Max(ud => ud.Id);
                int maxId = 0;
                if (maxIdStr > maxId)
                {
                    maxId = maxIdStr;
                }
                int newmaxId = maxId + 1;
                var newMissionSkill = new MissionSkill
                {
                    Id = newmaxId,
                    SkillName = missionSkill.SkillName,
                    Status = missionSkill.Status,
                    IsDeleted = false

                };
                _cIDbContext.MissionSkill.Add(newMissionSkill);
                await _cIDbContext.SaveChangesAsync();
                return "Save Skill Successfully..";
            }
            catch (Exception ex)
            {
                throw new Exception("Error in adding skill.", ex);
            }
        }

        public async Task<string> UpdateMissionSkillAsync(MissionSkill missionSkill)
        {
            try
            {
                var existingSkill = await _cIDbContext.MissionSkill.FirstOrDefaultAsync(ms => ms.Id == missionSkill.Id && !ms.IsDeleted);
                if (existingSkill != null)
                {
                    existingSkill.SkillName = missionSkill.SkillName;
                    existingSkill.Status = missionSkill.Status;
                    existingSkill.ModifiedDate = DateTime.UtcNow;

                    await _cIDbContext.SaveChangesAsync();
                    return "Update Mission Skill Successfully..";
                }
                else
                {
                    throw new Exception("Mission Skill not found.");
                }
            }
            catch (Exception ex)
            {
                throw new Exception("Error in updating mission skill.", ex);
            }
        }

        public async Task<string> DeleteMissionSkillAsync(int id)
        {
            try
            {
                var existingSkill = await _cIDbContext.MissionSkill.FirstOrDefaultAsync(ms => ms.Id == id && !ms.IsDeleted);
                if (existingSkill != null)
                {
                    existingSkill.IsDeleted = true;
                    await _cIDbContext.SaveChangesAsync();
                    return "Delete Mission Skill Successfully..";
                }
                else
                {
                    throw new Exception("Mission Skill not found.");
                }
            }
            catch (Exception ex)
            {
                throw new Exception("Error in deleting mission skill.", ex);
            }
        }
    }
}
