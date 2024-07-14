using BackEnd.BAL;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Data_Access_Layer.Repository.Entities;

namespace Web_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MissionThemeController : ControllerBase
    {
        private readonly BALMissionTheme _balMissionTheme;

        public MissionThemeController(BALMissionTheme balMissionTheme)
        {
            _balMissionTheme = balMissionTheme;
        }

        [HttpGet]
        [Route("GetMissionThemeList")]
        [Authorize]
        public async Task<ActionResult<ResponseResult>> GetMissionThemeList()
        {
            try
            {
                var result = await _balMissionTheme.GetMissionThemeListAsync();
                return Ok(new ResponseResult { Data = result, Result = ResponseStatus.Success });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new ResponseResult { Result = ResponseStatus.Error, Message = ex.Message });
            }
        }

        [HttpGet]
        [Route("GetMissionThemeById/{id}")]
        [Authorize]
        public async Task<ActionResult<ResponseResult>> GetMissionThemeById(int id)
        {
            try
            {
                var result = await _balMissionTheme.GetMissionThemeByIdAsync(id);
                return Ok(new ResponseResult { Data = result, Result = ResponseStatus.Success });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new ResponseResult { Result = ResponseStatus.Error, Message = ex.Message });
            }
        }

        [HttpPost]
        [Route("AddMissionTheme")]
        [Authorize]
        public async Task<ActionResult<ResponseResult>> AddMissionTheme(MissionTheme missionTheme)
        {
            try
            {
                var result = await _balMissionTheme.AddMissionThemeAsync(missionTheme);
                return Ok(new ResponseResult { Data = result, Result = ResponseStatus.Success });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new ResponseResult { Result = ResponseStatus.Error, Message = ex.Message });
            }
        }

        [HttpPost]
        [Route("UpdateMissionTheme")]
        [Authorize]
        public async Task<ActionResult<ResponseResult>> UpdateMissionTheme(MissionTheme missionTheme)
        {
            try
            {
                var result = await _balMissionTheme.UpdateMissionThemeAsync(missionTheme);
                return Ok(new ResponseResult { Data = result, Result = ResponseStatus.Success });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new ResponseResult { Result = ResponseStatus.Error, Message = ex.Message });
            }
        }

        [HttpDelete]
        [Route("DeleteMissionTheme/{id}")]
        [Authorize]
        public async Task<ActionResult<ResponseResult>> DeleteMissionTheme(int id)
        {
            try
            {
                var result = await _balMissionTheme.DeleteMissionThemeAsync(id);
                return Ok(new ResponseResult { Data = result, Result = ResponseStatus.Success });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new ResponseResult { Result = ResponseStatus.Error, Message = ex.Message });
            }
        }
    }
}
