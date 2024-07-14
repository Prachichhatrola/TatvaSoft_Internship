using Data_Access_Layer;
using Data_Access_Layer.Repository.Entities;
namespace BackEnd.BAL
{
    public class BALMissionTheme
    {
        private readonly DALMissionTheme _dalMissionTheme;
        public BALMissionTheme(DALMissionTheme dalMissionTheme)
        {
            _dalMissionTheme = dalMissionTheme;
        }

        public async Task<List<MissionTheme>> GetMissionThemeListAsync()
        {
            return await _dalMissionTheme.GetMissionThemeListAsync();
        }
        public async Task<MissionTheme> GetMissionThemeByIdAsync(int id)
        {
            return await _dalMissionTheme.GetMissionThemeByIdAsync(id);
        }

        public async Task<string> AddMissionThemeAsync(MissionTheme missionTheme)
        {
            return await _dalMissionTheme.AddMissionThemeAsync(missionTheme);
        }
        public async Task<string> UpdateMissionThemeAsync(MissionTheme missionTheme)
        {
            return await _dalMissionTheme.UpdateMissionThemeAsync(missionTheme);
        }
        public async Task<string> DeleteMissionThemeAsync(int id)
        {
            return await _dalMissionTheme.DeleteMissionThemeAsync(id);
        }
    }
}
