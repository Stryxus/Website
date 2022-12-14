using System;
using System.Threading.Tasks;

using SA.Web.Client.WebSockets;
using SA.Web.Client.Data.Json;

namespace SA.Web.Client.Data.States
{
    internal class InitializationState
    {
        internal event Action OnAppLoaded;
        private bool SingleAppLoadedLock;
        internal void CheckAppLoaded()
        {
            if (
                Services.Get<ClientState>().Settings != null &&
                Services.Get<ClientState>().NewsData != null &&
                Services.Get<ClientState>().RoadmapData != null &&
                Services.Get<ClientState>().PhotographyData != null &&
                !Services.Get<UIState>().FirstRender &&
                !SingleAppLoadedLock
                )
            {
                SingleAppLoadedLock = true;
                OnAppLoaded?.Invoke();
            }
        }

        private bool FirstRegisterPass { get; set; } = true;
        private bool FirstDataLoadPass { get; set; } = true;

        internal async Task Init()
        {
            if (FirstRegisterPass)
            {
                FirstRegisterPass = false;

                await Logger.LogInfo("Initializing Client State...");

                await Services.Get<JSInterface>().InitializeInterface(Services.Get<JSInterface.Runtime>(), "runtime");
                await Services.Get<JSInterface>().InitializeInterface(Services.Get<JSInterface.Cache>(), "cacheStorageInterface");
                await Services.Get<JSInterface>().InitializeInterface(Services.Get<JSInterface.LocalData>(), "localStorageInterface");
                await Services.Get<JSInterface>().InitializeInterface(Services.Get<JSInterface.AnimationManager>(), "animationInterface");

                OnAppLoaded += async () =>
                {
                    await Logger.LogInfo("Application has loaded successfully. Showing router.");
                    await Services.Get<JSInterface.AnimationManager>().ShowRouter();
                };

                await Services.Get<LocalStorageState>().GetLocalData<GlobalSettings>();

                Services.Get<WebSocketManagerMiddleware>().OnServerConnected += async () =>
                {
                    if (FirstDataLoadPass)
                    {
                        FirstDataLoadPass = false;
                        await Services.Get<ServerState>().RequestChangelogData(true);
                        await Services.Get<ServerState>().RequestNewsData(true);
                        await Services.Get<ServerState>().RequestRoadmapData(true);
                        await Services.Get<ServerState>().RequestPhotographyData(true);
                    }
                };
                Services.Get<WebSocketManagerMiddleware>().OnServerConnectionError += async () =>
                {
                    await Logger.LogInfo("Connection to the server cannot be established. Running in offline mode.");
                    await Services.Get<ServerState>().RequestChangelogData();
                    await Services.Get<ServerState>().RequestNewsData();
                    await Services.Get<ServerState>().RequestRoadmapData();
                    await Services.Get<ServerState>().RequestPhotographyData();
                };
                await Services.Get<WebSocketManagerMiddleware>().Connect(Services.Get<ClientState>());

                await Logger.LogInfo("Client State Initialized.");
            }
        }
    }
}
