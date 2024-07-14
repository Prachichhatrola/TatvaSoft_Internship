using Data_Access_Layer;
using Data_Access_Layer.Repository.Entities;

namespace Business_logic_Layer
{
    public class BALAdminUser
    {
        private readonly DALAdminUser _dalAdminUser;
        public BALAdminUser(DALAdminUser dalAdminUser)
        {
            _dalAdminUser = dalAdminUser;
        }

        public async Task<List<UserDetail>> UserDetailListAsync()
        {
            return await _dalAdminUser.UserDetailListAsync();
        }

        public async Task<string> DeleteUserAndUserDetailAsync(int userId)
        {
            return await _dalAdminUser.DeleteUserAndUserDetailAsync(userId);
        }
    }
}
