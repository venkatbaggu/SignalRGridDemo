namespace SignalRGridDemo.Migrations
{
    using SignalRGridDemo.Models;
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;

    internal sealed class Configuration : DbMigrationsConfiguration<SignalRGridDemo.Models.SignalRGridDemoContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = false;
        }

        protected override void Seed(SignalRGridDemo.Models.SignalRGridDemoContext context)
        {
                context.Employees.AddOrUpdate(
                  e => e.Name,
                  new Employee { Name = "Andrew Peters", Email = "sam@microsoft.com ", Salary= 1},
                  new Employee { Name = "Brice Lambson", Email = "sam@microsoft.com ", Salary = 1 },
                  new Employee { Name = "Rowan Miller", Email = "sam@microsoft.com ", Salary = 1 }
                );
            
        }
    }
}
