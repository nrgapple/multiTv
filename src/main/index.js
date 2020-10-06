// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
import path from "path";
import { app, BrowserWindow, BrowserView } from "electron";

const numWindows = 2;

//Load Widevine Only On Mac - Castlab Electron is used for all other platforms
if (process.platform == "darwin") {
  require("electron-widevinecdm").load(app);
}

const createWindow = () => {
  //console.log(lastVersion);
  // if (null !== lastVersion) {
  //     console.log(
  //         "Widevine " +
  //             version +
  //             ", upgraded from " +
  //             lastVersion +
  //             ", is ready to be used!"
  //     );
  // } else {
  //     console.log("Widevine " + version + " is ready to be used!");
  // }

  // Create the browser window.
  let win = new BrowserWindow({
    title: CONFIG.name,
    width: CONFIG.width,
    height: CONFIG.height,
    webPreferences: {
      worldSafeExecuteJavaScript: true,
    },
  });

  const view = new BrowserView();
  const view2 = new BrowserView();
  win.addBrowserView(view);
  win.addBrowserView(view2);
  view.setBounds({
    x: 0,
    y: 0,
    width: CONFIG.width / 2,
    height: CONFIG.height,
  });
  view2.setBounds({
    x: CONFIG.width / 2,
    y: 0,
    width: CONFIG.width / 2,
    height: CONFIG.height,
  });
  view.webContents.loadURL("https://tv.youtube.com");
  view2.webContents.loadURL("https://tv.youtube.com");

  // and load the index.html of the app.
  //win.loadURL("https://tv.youtube.com");

  // // send data to renderer process
  // win.webContents.on("did-finish-load", () => {
  //     win.webContents.send("loaded", {
  //         appName: CONFIG.name,
  //         electronVersion: process.versions.electron,
  //         nodeVersion: process.versions.node,
  //         chromiumVersion: process.versions.chrome,
  //     });
  // });

  win.on("closed", () => {
    win = null;
  });

  win.on("resize", function () {
    var size = win.getSize();
    var width = size[0];
    var height = size[1];

    view.setBounds({
      x: 0,
      y: 0,
      width: Math.floor(width / numWindows),
      height: height,
    });
    view2.setBounds({
      x: Math.floor(width / numWindows),
      y: 0,
      width: Math.floor(width / numWindows),
      height: height,
    });
    console.log("width: " + width);
    console.log("height: " + height);
  });
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", createWindow);

// Quit when all windows are closed.
app.on("window-all-closed", () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// app.on("widevine-error", (error) => {
//     console.log("Widevine installation encountered an error: " + error);
//     //process.exit(1);
// });

// app.on('widevine-update-pending', (currentVersion, pendingVersion) => {
//     console.log('Widevine ' + currentVersion + ' is ready to be upgraded to ' + pendingVersion + '!')
//   })
