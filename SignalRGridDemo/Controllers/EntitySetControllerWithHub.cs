using Microsoft.AspNet.SignalR;
using Microsoft.AspNet.SignalR.Hubs;
using SignalRDemo.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http.OData;

namespace SignalRDemo.Controllers
{
    public class EntitySetControllerWithHub<THub> : EntitySetController<Employee, int>
        where THub : IHub {
        Lazy<IHubContext> hub = new Lazy<IHubContext>(
            () => GlobalHost.ConnectionManager.GetHubContext<THub>()
        );

        protected IHubContext Hub {
            get { return hub.Value; }
        }
    }
}
