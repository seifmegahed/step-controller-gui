export type DeviceDataType = {
  id: number;
  ssid?: string;
  ip?: string;
};

export type DeviceType = {
  id: number;
  position: number;
  blink: boolean;
  calibrate: boolean;
};

export async function fetchDeviceData(): Promise<DeviceDataType> {
  try {
    let res = await fetch("api/device-info");
    let result = await res.json();

    return result;
  } catch (error) {
    console.log(error);
    return {
      id: 0,
    };
  }
}

export async function fetchDevices(): Promise<DeviceType[]> {
  try {
    let res = await fetch("api/scan");
    let result = await res.json();

    return result.map((deviceId: number, index: number) => ({
      id: deviceId,
      position: index,
      blink: false,
      calibrate: false,
    }));
  } catch (error) {
    console.log(error);
    return [];
  }
}

export const sendData = async () => {
  try {
    const rawResponse = await fetch("api/data", {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ a: 1, b: "Textual content" }),
    });

    const content = await rawResponse.json();
    console.log(content);
  } catch (error) {
    console.log(error);
  }
};

export const sendBlink = async (deviceId: number, state: boolean) => {
  try {
    const rawResponse = await fetch(`api/${state ? "start" : `stop`}-blink`, {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ a: deviceId }),
    });

    const content = await rawResponse.json();
    console.log(content);
  } catch (error) {
    console.log(error);
  }
};

export const sendChangeArray = async (devices: DeviceDataType[]) => {
  try {
    const rawResponse = await fetch(`api/change-arrangement`, {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ a: devices.map((device) => device.id), b: devices.length }),
    });

    const content = await rawResponse.json();
    console.log(content);
  } catch (error) {
    console.log(error);
  }
};
