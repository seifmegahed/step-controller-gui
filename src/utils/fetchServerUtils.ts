export type DeviceDataType = {
  status: string;
  ssid?: string;
  ip?: string;
};

export type DeviceType = {
  id: string;
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
      status: "Internal Error",
    };
  }
}

export async function fetchDevices(): Promise<any[]> {
  try {
    let res = await fetch("api/scan");
    let result = await res.json();

    console.log(result);
    return result;
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
