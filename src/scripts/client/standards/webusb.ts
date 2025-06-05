/*

import { getPermission, Perms } from "~/lib/standards/permissions";

class DeviceFilter implements USBDeviceFilter {}

export const AndroidVendorIDs: DeviceFilter[] = [
    { vendorId: 0x18d1 }, // Google
    { vendorId: 8921 }, // OnePlus
];

export class WebUSBDevice {
    device: USBDevice | undefined;

    constructor() {
        this.device = undefined;
    }

    async connect() {
        try {
            this.device = await navigator.usb.requestDevice({ filters: AndroidVendorIDs });
            await this.device.open();
            await this.device.selectConfiguration(1);
            await this.device.claimInterface(0);
            console.log(`Connected to [${this.device.manufacturerName}]:${this.device.productName}:${this.device.productId}` + "\n" +
                `   USB Version: ${this.device.usbVersionMajor}.${this.device.usbVersionMinor}.${this.device.usbVersionSubminor}` + "\n" + // This is the kernel version? Perhaps just being reported incorrectly?
                `   Device Version: ${this.device.deviceVersionMajor}.${this.device.deviceVersionMinor}.${this.device.deviceVersionSubminor}` + "\n" + 
                `   Device Class: ${this.device.deviceClass} Sub: ${this.device.deviceSubclass}` + "\n" +
                `   Device Protocol: ${this.device.deviceProtocol}` + "\n" +
                `   Device VendorID: (${this.device.vendorId})`);
            return true;
        } catch (error) {
            console.error("USB Connection failed:", error);
            return false;
        }
    }

    async disconnect() {
        if (this.device) {
            await this.device.close();
            await this.device.forget();
            this.device = undefined;
        } else {
            console.error("No device is connected, you cant disconnect nothing...");
        }
    }
}

export function isWebUSBSupported() {
    return "usb" in navigator;
}

*/
