using Data_Access_Layer.Repository;
using Data_Access_Layer.Repository.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace Data_Access_Layer.Common
{
    public class DALCommon
    {
        private readonly AppDbContext _cIDbContext;

        public DALCommon(AppDbContext cIDbContext)
        {
            _cIDbContext = cIDbContext;
        }

        public async Task<List<DropDown>> CountryListAsync()
        {
            return await _cIDbContext.Country
                .OrderBy(c => c.CountryName)
                .Select(c => new DropDown { Value = c.Id, Text = c.CountryName })
                .ToListAsync();
        }

        public async Task<List<DropDown>> CityListAsync(int countryId)
        {
            return await _cIDbContext.City
                .Where(c => c.CountryId == countryId)
                .OrderBy(c => c.CityName)
                .Select(c => new DropDown { Value = c.Id, Text = c.CityName })
                .ToListAsync();
        }

        public async Task<List<DropDown>> MissionCountryListAsync()
        {
            return await _cIDbContext.Missions
                .Include(m => m.CountryName)
                .Select(m => new DropDown { Value = m.CountryId, Text = m.CountryName })
                .Distinct()
                .ToListAsync();
        }

        public async Task<List<DropDown>> MissionCityListAsync()
        {
            return await _cIDbContext.Missions
                .Include(m => m.CityName)
                .Select(m => new DropDown { Value = m.CityId, Text = m.CityName })
                .Distinct()
                .ToListAsync();
        }

        public async Task<List<DropDown>> MissionThemeListAsync()
        {
            return await _cIDbContext.MissionTheme
                .Where(mt => !mt.IsDeleted)
                .Select(mt => new DropDown { Value = mt.Id, Text = mt.ThemeName })
                .Distinct()
                .ToListAsync();
        }

        public async Task<List<DropDown>> MissionSkillListAsync()
        {
            return await _cIDbContext.MissionSkill
                .Where(ms => !ms.IsDeleted)
                .Select(ms => new DropDown { Value = ms.Id, Text = ms.SkillName })
                .Distinct()
                .ToListAsync();
        }

        public async Task<List<DropDown>> MissionTitleListAsync()
        {
            return await _cIDbContext.Missions
                .Where(m => !m.IsDeleted)
                .Select(m => new DropDown { Value = m.Id, Text = m.MissionTitle })
                .ToListAsync();
        }

        public async Task<string> ContactUsAsync(ContactUs contactUs)
        {
            try
            {
                _cIDbContext.ContactUs.Add(contactUs);
                await _cIDbContext.SaveChangesAsync();
                return "Success";
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<string> AddUserSkillAsync(UserSkills userSkills)
        {
            try
            {
                _cIDbContext.UserSkills.Add(userSkills);
                await _cIDbContext.SaveChangesAsync();
                return "Success";
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<List<DropDown>> GetUserSkillAsync(int userId)
        {
            return await _cIDbContext.UserSkills
                .Where(us => us.UserId == userId)
                .Select(us => new DropDown { Value = us.Id, Text = us.Skill })
                .ToListAsync();
        }

    }
}
