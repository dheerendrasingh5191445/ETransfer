using E_TransferWebApi.Models;
using E_TransferWebApi.Repository;
using E_TransferWebApi.Services;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Routing;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
namespace E_TransferWebApi
{
    public partial class Startup
    {
        public Startup(IHostingEnvironment env)
        {
            var builder = new ConfigurationBuilder()
                .SetBasePath(env.ContentRootPath)
                .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
                .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true)
                .AddEnvironmentVariables();
            Configuration = builder.Build();
        }

        public IConfigurationRoot Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            // Add framework services.
           
            ConfigureJwtAuthService(services);
            services.AddDbContext<ETransferDbContext>(options => options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection")));
            services.AddSingleton<IAssetDetailsRepo, AssetDetailsRepo>();  
            services.AddSingleton<IRequestDetailsRepo, RequestDetailsRepo>();
            services.AddSingleton<ISupervisorService, SupervisorService>();
            services.AddSingleton<IHRService, HRService>();
            services.AddSingleton<IUserService, UserService>();
            services.AddSingleton<IAssetControllerService, AssetControllerService>();
            services.AddSingleton<ICsoService, CsoService>();
            services.AddSingleton<IAssetAssignedUserService, AssetAssignedUserService>();
            services.AddSingleton<IEmpDbService,EmpDbService>();
            services.AddSingleton<IAssetDbRepo,AssetDbRepo>();
            services.AddSingleton<IEmployeeDbRepo, EmployeeDbRepo>();
            services.AddSingleton<IAssetDbService, AssetDbService>();
            services.AddSingleton<IConfiguration>(Configuration);
            services.AddMvc()
                .AddJsonOptions(
                    options => options.SerializerSettings.ReferenceLoopHandling
                        = Newtonsoft.Json.ReferenceLoopHandling.Ignore);
            services.AddMvc();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {
            loggerFactory.AddConsole(Configuration.GetSection("Logging"));
            loggerFactory.AddDebug();
            app.UseCors(builder => builder.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod().AllowCredentials());

            app.UseAuthentication();
            app.UseMvc();

        }

        private void ConfigureRoutes(IRouteBuilder obj)
        {
            obj.MapRoute("default", "{controller}/{action?}");
            //obj.MapRoute()

        }
    }
}
