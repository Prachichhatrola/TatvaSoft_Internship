using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data_Access_Layer.Repository.Entities
{
    public class User : BaseEntity
    {
        [Key]
        public int? Id { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? PhoneNumber { get; set; }
        public string? EmailAddress { get; set; }
        public string? UserType { get; set; }
        public string? Password { get; set; }
        [NotMapped]
        public string? ConfirmPassword { get; set; }     
        [NotMapped]
        public string? Uid { get; set; }
        [NotMapped]
        public string? Message { get; set; }
        [NotMapped]
        public string? UserImage { get; set; } = "";
        [NotMapped]
        public string? UserFullName { get; set; }
    }

    public class UserDetail : BaseEntity
    {
        [Key]        
        public int Id { get; set; }
        public int UserId { get; set; }
        public string? Name { get; set; }
        public string? Surname { get; set; }
        public string? EmployeeId { get; set; }
        public string? Manager { get; set; }
        public string? Title { get; set; }
        public string? Department { get; set; }
        public string? MyProfile { get; set; }
        public string? WhyIVolunteer { get; set; }
        public int CountryId { get; set; }
        public int CityId { get; set; }
        public string? Avilability { get; set; }
        public string? LinkdInUrl { get; set; }
        public string? MySkills { get; set; }
        public string? UserImage { get; set; }
        public bool Status { get; set; }
        [NotMapped]
        public int UId { get; set; }
        [NotMapped]
        public string? FirstName { get; set; }
        [NotMapped]
        public string? LastName { get; set; }
        [NotMapped]
        public string? PhoneNumber { get; set; }
        [NotMapped]
        public string? EmailAddress { get; set; }
        [NotMapped]
        public string? UserType { get; set; }
    }

    public class ForgotPassword
    {
        [Key]
        [NotMapped]
        public int TempId { get; set; }
        public string? Id { get; set; }
        public int UserId { get; set; }
        public DateTime RequestDateTime { get; set; }
        [NotMapped]
        public string? EmailAddress { get; set; }
        [NotMapped]
        public string? baseUrl { get; set; }
    }

    public class ChangePassword
    {
        public int UserId { get; set; }
        public string? OldPassword { get; set; }
        public string? NewPassword { get; set; }
        public string? ConfirmPassword { get; set; }
    }
}

