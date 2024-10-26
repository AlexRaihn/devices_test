declare module Device {
  interface Device {
    id: number;
    name: string;
  }
  interface DeviceNode {
    id: number;
    name: string;
    device_id: number;
  }
}
