import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electron', {
  ipcRenderer: {
    send: (channel: string, ...args: any[]) => ipcRenderer.send(channel, ...args),
    on: (channel: string, func: (...args: any[]) => void) =>
      ipcRenderer.on(channel, (event, ...args) => func(...args)),
    once: (channel: string, func: (...args: any[]) => void) =>
      ipcRenderer.once(channel, (event, ...args) => func(...args)),
    removeListener: (channel: string, func: (...args: any[]) => void) =>
      ipcRenderer.removeListener(channel, func),
  },
  app: {
    name: 'ChaLo AI',
    version: '1.0.0',
  },
});
