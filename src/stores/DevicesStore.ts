import { defineStore } from 'pinia'

export const DevicesStore = defineStore('DevicesStore', {
  state: () => {
    return {
      devices: [] as Device.Device[],
      // по хорошему, узлы нужно получать либо с бека, вместе с устройством, либо отдельным запросом
      // но т.к у меня нет бека, то я сделаю массив узлов и с ним буду работать в этом же сторе
      devices_node: [
        {
          id: 1,
          name: 'Узел 1',
          device_id: 1,
        },
        {
          id: 2,
          name: 'Узел 2',
          device_id: 2,
        },
        {
          id: 3,
          name: 'Узел 3',
          device_id: 1,
        },
      ] as Device.DeviceNode[],
    }
  },
  actions: {
    async getDevices() {
      try {
        this.devices = [
          {
            id: 1,
            name: 'Устройсво 1'
          },
          {
            id: 2,
            name: 'Устройсво 2'
          },
          {
            id: 3,
            name: 'Устройсво 3'
          }
        ] as Device.Device[]
      } catch (err) {
        console.log(err)
      }
    },
    async editDevice(device: Device.Device) {
      this.devices.forEach(item => {
        if(item.id === device.id) {
          Object.assign(item, device)
        }
      })
    },
    async deleteDevice(id: number) {
      this.devices = this.devices.filter(device => device.id !== id)
    },
    async getDeviceNodes(id: number) {
      return this.devices_node.filter(device => device.device_id === id)
    },
    async setDeviceNode(device_id: number) {
      const newId = this.devices_node.length ? Math.max(...this.devices_node.map(device => device.id)) + 1 : 0;
      this.devices_node.push({id: newId, name: `Узел ${newId}`, device_id: device_id});
    },
    async deleteDeviceNode(id: number) {
      this.devices_node = this.devices_node.filter(device => device.id != id)
    },
    async editDeviceNode(node: Device.DeviceNode) {
      this.devices_node.forEach(item => {
        if(item.id === node.id) {
          Object.assign(item, node)
        }
      })
    }
  }
})
