export default {
    currentDevice(state) {
        const { order, currentDeviceId: deviceId } = state;
        return order && deviceId ? order.devices.find((device) => device.id === deviceId) : null;
    }
};
