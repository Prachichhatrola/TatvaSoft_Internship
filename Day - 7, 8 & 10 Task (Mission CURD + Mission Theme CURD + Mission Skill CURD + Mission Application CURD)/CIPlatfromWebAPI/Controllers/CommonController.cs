using Business_logic_Layer;
using Data_Access_Layer;
using Data_Access_Layer.Common;
using Data_Access_Layer.Repository.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Net.Http.Headers;

namespace Web_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CommonController : ControllerBase
    {
        private readonly BALCommon _balCommon;
        private readonly BALMission _balMission;
        private readonly IWebHostEnvironment _hostingEnvironment;
        private readonly ILogger<AdminUserController> _logger;

        public CommonController(BALCommon balCommon, IWebHostEnvironment hostingEnvironment, ILogger<AdminUserController> logger, BALMission balMission)
        {
            _balCommon = balCommon;
            _hostingEnvironment = hostingEnvironment;
            _logger = logger;
            _balMission = balMission;
        }

        [HttpGet]
        [Route("CountryList")]
        [Authorize]
        public async Task<IActionResult> CountryList()
        {
            try
            {
                var result = await _balCommon.GetCountryListAsync();
                return Ok(new { status = "Success", data = result });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { status = "Error", message = ex.Message });
            }
        }

        [HttpGet]
        [Route("CityList/{countryId}")]
        [Authorize]
        public async Task<IActionResult> CityList(int countryId)
        {
            try
            {
                var result = await _balCommon.GetCityListAsync(countryId);
                return Ok(new { status = "Success", data = result });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { status = "Error", message = ex.Message });
            }
        }

        [HttpGet]
        [Route("MissionCountryList")]
        public async Task<IActionResult> MissionCountryList()
        {
            try
            {
                var result = await _balCommon.GetMissionCountryListAsync();
                return Ok(new { status = "Success", data = result });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { status = "Error", message = ex.Message });
            }
        }

        [HttpGet]
        [Route("MissionCityList")]
        public async Task<IActionResult> MissionCityList()
        {
            try
            {
                var result = await _balCommon.GetMissionCityListAsync();
                return Ok(new { status = "Success", data = result });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { status = "Error", message = ex.Message });
            }
        }

        [HttpGet]
        [Route("MissionThemeList")]
        public async Task<IActionResult> MissionThemeList()
        {
            try
            {
                var result = await _balCommon.GetMissionThemeListAsync();
                return Ok(new { status = "Success", data = result });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { status = "Error", message = ex.Message });
            }
        }

        [HttpGet]
        [Route("MissionSkillList")]
        public async Task<IActionResult> MissionSkillList()
        {
            try
            {
                var result = await _balCommon.GetMissionSkillListAsync();
                return Ok(new { status = "Success", data = result });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { status = "Error", message = ex.Message });
            }
        }

        [HttpGet]
        [Route("MissionTitleList")]
        public async Task<IActionResult> MissionTitleList()
        {
            try
            {
                var result = await _balCommon.GetMissionTitleListAsync();
                return Ok(new { status = "Success", data = result });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { status = "Error", message = ex.Message });
            }
        }

        [HttpPost]
        [Route("UploadImage")]
        [Authorize]
        public async Task<IActionResult> UploadImage([FromForm] UploadFile upload)
        {
            if (upload == null || Request.Form.Files == null || Request.Form.Files.Count == 0)
            {
                return BadRequest(new { success = false, message = "No file uploaded" });
            }

            // Log the initial state
            _logger.LogInformation("Starting file upload...");
            _logger.LogInformation($"ModuleName: {upload.ModuleName}");
            _logger.LogInformation($"WebRootPath: {_hostingEnvironment.WebRootPath}");

            string uploadFolder;
            try
            {
                uploadFolder = Path.Combine(_hostingEnvironment.WebRootPath, "UploadMissionImage", upload.ModuleName);
                _logger.LogInformation($"Upload folder path: {uploadFolder}");
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error combining paths: {ex.Message}");
                return StatusCode(500, new { success = false, message = "Error combining paths" });
            }

            if (!Directory.Exists(uploadFolder))
            {
                try
                {
                    Directory.CreateDirectory(uploadFolder);
                    _logger.LogInformation($"Created directory: {uploadFolder}");
                }
                catch (Exception ex)
                {
                    _logger.LogError($"Error creating directory: {ex.Message}");
                    return StatusCode(500, new { success = false, message = "Error creating directory" });
                }
            }

            List<string> fileList = new List<string>();

            foreach (var file in Request.Form.Files)
            {
                string fileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
                string name = Path.GetFileNameWithoutExtension(fileName);
                string extension = Path.GetExtension(fileName);
                string fullFileName = $"{name}_{DateTime.Now:yyyyMMddHHmmss}{extension}";
                string fullPath = Path.Combine(uploadFolder, fullFileName);

                try
                {
                    using (var stream = new FileStream(fullPath, FileMode.Create))
                    {
                        await file.CopyToAsync(stream);
                    }
                    fileList.Add(Path.Combine("UploadMissionImage", upload.ModuleName, fullFileName).Replace("\\", "/"));
                }
                catch (Exception ex)
                {
                    return StatusCode(500, new { success = false, message = $"Error uploading file: {ex.Message}" });
                }
            }

            return Ok(new { success = true, Data = fileList });
        }


        [HttpPost]
        [Route("AddMission")]
        [Authorize]
        public async Task<IActionResult> AddMission(Missions mission)
        {
            try
            {
                var result = await _balMission.AddMission(mission);
                return Ok(new { status = "Success", data = result });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { status = "Error", message = ex.Message });
            }
        }

        [HttpPost]
        [Route("ContactUs")]
        [Authorize]
        public async Task<IActionResult> ContactUs(ContactUs contactUs)
        {
            try
            {
                var result = await _balCommon.ContactUsAsync(contactUs);
                return Ok(new { status = "Success", data = result });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { status = "Error", message = ex.Message });
            }
        }

        [HttpPost]
        [Route("AddUserSkill")]
        [Authorize]
        public async Task<IActionResult> AddUserSkill(UserSkills userSkills)
        {
            try
            {
                var result = await _balCommon.AddUserSkillAsync(userSkills);
                return Ok(new { status = "Success", data = result });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { status = "Error", message = ex.Message });
            }
        }

        [HttpGet]
        [Route("GetUserSkill/{userId}")]
        [Authorize]
        public async Task<IActionResult> GetUserSkill(int userId)
        {
            try
            {
                var result = await _balCommon.GetUserSkillAsync(userId);
                return Ok(new { status = "Success", data = result });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { status = "Error", message = ex.Message });
            }
        }
    }
}
