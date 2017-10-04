using System.Net.Http;
using System.Web.Http;
using System.Web.Http.ModelBinding;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.Owin;
using Web_Development_Server.Core;
using Web_Development_Server.Models;

namespace Web_Development_Server.Controllers
{
    public class BaseApiController : ApiController
    {

        private ModelFactory _modelFactory;
        private readonly ApplicationUserManager _appUserManager = null;

        private readonly ApplicationRoleManager _appRoleManager = null;

        protected ApplicationRoleManager AppRoleManager => _appRoleManager ?? Request.GetOwinContext().GetUserManager<ApplicationRoleManager>();

        protected ApplicationUserManager AppUserManager => _appUserManager ?? Request.GetOwinContext().GetUserManager<ApplicationUserManager>();

        public BaseApiController()
        {
        }

        protected ModelFactory TheModelFactory => _modelFactory ?? (_modelFactory = new ModelFactory(this.Request, this.AppUserManager));

        protected IHttpActionResult GetErrorResult(IdentityResult result)
        {
            if (result == null)
            {
                return InternalServerError();
            }

            if (result.Succeeded) return null;
            if (result.Errors != null)
            {
                foreach (string error in result.Errors)
                {
                    ModelState.AddModelError("", error);
                }
            }

            if (ModelState.IsValid)
            {
                // No ModelState errors are available to send, so just return an empty BadRequest.
                return BadRequest();
            }

            return BadRequest(ModelState);
        }
    }


}