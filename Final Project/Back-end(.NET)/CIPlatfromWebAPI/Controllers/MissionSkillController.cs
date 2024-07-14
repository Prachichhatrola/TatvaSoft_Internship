using BackEnd.BAL;
using Data_Access_Layer.Repository.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace Web_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MissionSkillController : ControllerBase
    {
        private readonly BALMissionSkill _balMissionSkill;

        public MissionSkillController(BALMissionSkill balMissionSkill)
        {
            _balMissionSkill = balMissionSkill;
        }

        [HttpGet]
        [Route("GetMissionSkillList")]
        [Authorize]
        public async Task<ActionResult<ResponseResult>> GetMissionSkillList()
        {
            try
            {
                var result = await _balMissionSkill.GetMissionSkillListAsync();
                return Ok(new ResponseResult { Data = result, Result = ResponseStatus.Success });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new ResponseResult { Result = ResponseStatus.Error, Message = ex.Message });
            }
        }

        [HttpGet]
        [Route("GetMissionSkillById/{id}")]
        [Authorize]
        public async Task<ActionResult<ResponseResult>> GetMissionSkillById(int id)
        {
            try
            {
                var result = await _balMissionSkill.GetMissionSkillByIdAsync(id);
                return Ok(new ResponseResult { Data = result, Result = ResponseStatus.Success });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new ResponseResult { Result = ResponseStatus.Error, Message = ex.Message });
            }
        }

        [HttpPost]
        [Route("AddMissionSkill")]
        [Authorize]
        public async Task<ActionResult<ResponseResult>> AddMissionSkill(MissionSkill missionSkill)
        {
            try
            {
                var result = await _balMissionSkill.AddMissionSkillAsync(missionSkill);
                return Ok(new ResponseResult { Data = result, Result = ResponseStatus.Success });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new ResponseResult { Result = ResponseStatus.Error, Message = ex.Message });
            }
        }

        [HttpPost]
        [Route("UpdateMissionSkill")]
        [Authorize]
        public async Task<ActionResult<ResponseResult>> UpdateMissionSkill(MissionSkill missionSkill)
        {
            try
            {
                var result = await _balMissionSkill.UpdateMissionSkillAsync(missionSkill);
                return Ok(new ResponseResult { Data = result, Result = ResponseStatus.Success });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new ResponseResult { Result = ResponseStatus.Error, Message = ex.Message });
            }
        }

        [HttpDelete]
        [Route("DeleteMissionSkill/{id}")]
        [Authorize]
        public async Task<ActionResult<ResponseResult>> DeleteMissionSkill(int id)
        {
            try
            {
                var result = await _balMissionSkill.DeleteMissionSkillAsync(id);
                return Ok(new ResponseResult { Data = result, Result = ResponseStatus.Success });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new ResponseResult { Result = ResponseStatus.Error, Message = ex.Message });
            }
        }
    }
}
