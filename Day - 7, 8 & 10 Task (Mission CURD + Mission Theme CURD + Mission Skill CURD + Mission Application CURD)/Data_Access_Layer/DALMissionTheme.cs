using Data_Access_Layer.Repository;
using Data_Access_Layer.Repository.Entities;
using Microsoft.EntityFrameworkCore;

namespace Data_Access_Layer
{
    public class DALMissionTheme
    {
        private readonly AppDbContext _cIDbContext;

        public DALMissionTheme(AppDbContext cIDbContext)
        {
            _cIDbContext = cIDbContext;
        }

        public async Task<List<MissionTheme>> GetMissionThemeListAsync()
        {
            return await _cIDbContext.MissionTheme
                                     .Where(mt => !mt.IsDeleted)
                                     .ToListAsync();
        }

        public async Task<MissionTheme> GetMissionThemeByIdAsync(int id)
        {
            return await _cIDbContext.MissionTheme
                                     .Where(mt => mt.Id == id && !mt.IsDeleted)
                                     .FirstOrDefaultAsync();
        }

        public async Task<string> AddMissionThemeAsync(MissionTheme missionTheme)
        {
            try
            {
                int maxIdStr = _cIDbContext.MissionTheme.Max(ud => ud.Id);
                int maxId = 0;
                if (maxIdStr > maxId)
                {
                    maxId = maxIdStr;
                }
                int newmaxId = maxId + 1;
                var newMissionTheme = new MissionTheme
                {
                    Id = newmaxId,
                    ThemeName = missionTheme.ThemeName,
                    Status = missionTheme.Status,
                    IsDeleted = false

                };
                _cIDbContext.MissionTheme.Add(newMissionTheme);
                await _cIDbContext.SaveChangesAsync();
                return "Save Theme Detail Successfully..";
            }
            catch (Exception ex)
            {
                throw new Exception("Error in adding theme.", ex);
            }
        }

        public async Task<string> UpdateMissionThemeAsync(MissionTheme missionTheme)
        {
            try
            {
                var existingTheme = await _cIDbContext.MissionTheme.FirstOrDefaultAsync(mt => mt.Id == missionTheme.Id && !mt.IsDeleted);
                if (existingTheme != null)
                {
                    existingTheme.ThemeName = missionTheme.ThemeName;
                    existingTheme.Status = missionTheme.Status;
                    existingTheme.ModifiedDate = DateTime.UtcNow;

                    await _cIDbContext.SaveChangesAsync();
                    return "Update Mission Theme Successfully..";
                }
                else
                {
                    throw new Exception("Mission Theme not found.");
                }
            }
            catch (Exception ex)
            {
                throw new Exception("Error in updating mission theme.", ex);
            }
        }

        public async Task<string> DeleteMissionThemeAsync(int id)
        {
            try
            {
                var existingTheme = await _cIDbContext.MissionTheme.FirstOrDefaultAsync(mt => mt.Id == id && !mt.IsDeleted);
                if (existingTheme != null)
                {
                    existingTheme.IsDeleted = true;
                    await _cIDbContext.SaveChangesAsync();
                    return "Delete Mission Theme Successfully..";
                }
                else
                {
                    throw new Exception("Mission Theme not found.");
                }
            }
            catch (Exception ex)
            {
                throw new Exception("Error in deleting mission theme.", ex);
            }
        }
    }
}
