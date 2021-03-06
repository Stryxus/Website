using System;
using System.Net.Http;
using System.Net.WebSockets;
using System.Threading.Tasks;

using Microsoft.AspNetCore.Components.WebAssembly.Hosting;
using Microsoft.AspNetCore.Components.WebAssembly.Authentication;
using Microsoft.Extensions.DependencyInjection;

using SA.Web.Client.WebSockets;
using SA.Web.Client.Data;
using SA.Web.Client.Data.States;
using SA.Web.Client.Data.States.Roadmap;
using SA.Web.Shared.WebSockets;

namespace SA.Web.Client
{
    public static class Startup
    {
        public static WebAssemblyHost Host { get; private set; }

        public static async Task Main(string[] args)
        {
            WebAssemblyHostBuilder HostBuilder = WebAssemblyHostBuilder.CreateDefault(args);
            HostBuilder.RootComponents.Add<App>("app");
            HostBuilder.Services.AddTransient<ConnectionManager<ClientWebSocket>>();
            HostBuilder.Services.AddScoped<StateSocketHandler>();
            HostBuilder.Services.AddScoped<ClientState>();
            HostBuilder.Services.AddScoped<InitializationState>();
            HostBuilder.Services.AddScoped<UIState>();
            HostBuilder.Services.AddScoped<RoadmapV1State>();
            HostBuilder.Services.AddScoped<ServerState>();
            HostBuilder.Services.AddScoped<LocalStorageState>();
            HostBuilder.Services.AddScoped<WebSocketManagerMiddleware>();

            HostBuilder.Services.AddScoped<JSInterface>();
            HostBuilder.Services.AddScoped<JSInterface.Runtime>();
            HostBuilder.Services.AddScoped<JSInterface.Cache>();
            HostBuilder.Services.AddScoped<JSInterface.LocalData>();
            HostBuilder.Services.AddScoped<JSInterface.AnimationManager>();

            HostBuilder.Services.AddHttpClient("SA.Web.ServerAPI", client => client.BaseAddress = new Uri(HostBuilder.HostEnvironment.BaseAddress)).AddHttpMessageHandler<BaseAddressAuthorizationMessageHandler>();
            HostBuilder.Services.AddScoped(sp => sp.GetRequiredService<IHttpClientFactory>().CreateClient("SA.Web.ServerAPI"));
            HostBuilder.Services.AddApiAuthorization();

            Host = HostBuilder.Build();
            Services.SetServiceProvider(Host.Services);
            await Host.RunAsync();
        }
    }
}
