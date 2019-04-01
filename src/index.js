const { app, BrowserWindow, Menu } = require('electron');
const url = require('url');
const path = require('path');

let mainWindow, pruebaVentana;

app.on("ready", () => {
    mainWindow = new BrowserWindow({
        width: 5000,
        height: 5000
    });
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'views/index.html'),
        protocol: 'file',
        slashes: true
    }));
    const mainMenu = Menu.buildFromTemplate(menu);
    Menu.setApplicationMenu(mainMenu);
});

const menu = [
    {
        label: 'Herramientas',
        submenu: [
            {
                label: 'Generar Matriz Adyascencia',
                accelerator: 'Ctrl+A',
                click() {
                    crearVentanaPrueba();
                }
            }
        ]
    }
];

function crearVentanaPrueba() {
    pruebaVentana = new BrowserWindow({
        width: 5000,
        height: 5000,
        title: 'Matriz de Adyascencia'
    });
    pruebaVentana.setMenuBarVisibility(false);
    pruebaVentana.loadURL(url.format({
        pathname: path.join(__dirname, 'views/matrizA.html'),
        protocol: 'file',
        slashes: true
    }));
}