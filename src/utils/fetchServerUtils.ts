export type DeviceType = {
  id: number;
  position: number;
  blink: boolean;
  calibrate: boolean;
};

export type DeviceInfoType = {
  id: number;
  ssid: string;
  ip: string;
  play: boolean;
  mode: boolean;
  devices: DeviceType[];
  frameWidth: number;
};

export const initDevice = {
  id: 0,
  ssid: "",
  ip: "",
  play: false,
  mode: false,
  devices: [
    { id: 0, position: 0, blink: false, calibrate: false },
    { id: 1, position: 1, blink: false, calibrate: false },
    { id: 2, position: 2, blink: false, calibrate: false },
    { id: 3, position: 3, blink: false, calibrate: false },
  ],

  frameWidth: 1,
};

export async function fetchDeviceData(): Promise<DeviceInfoType> {
  try {
    let res = await fetch("api/device-info");
    let result = await res.json();

    return {
      ...result,
      devices: result.devices.map((deviceId: number, index: number) => ({
        id: deviceId,
        position: index,
        blink: false,
        calibrate: false,
      })),
    };
  } catch (error) {
    console.log(error);
    return initDevice;
  }
}

export async function fetchScore(): Promise<number> {
  try {
    let res = await fetch("api/fetch-score");
    let result = await res.json();

    return result.score;
  } catch (error) {
    console.log(error);
    return 0;
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

export async function fetchFrames(): Promise<number[][]> {
  try {
    let res = await fetch("api/fetch-frames");
    let result = await res.json();

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

    const content = rawResponse.status;
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

    const content = rawResponse;
    console.log(content);
  } catch (error) {
    console.log(error);
  }
};

export const sendChangeArray = async (devices: DeviceType[]) => {
  try {
    const rawResponse = await fetch(`api/change-arrangement`, {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        a: devices.map((device) => device.id),
        b: devices.length,
      }),
    });

    const content = await rawResponse.json();
    console.log(content);
  } catch (error) {
    console.log(error);
  }
};

export const sendFrames = async (frames: number[][]) => {
  try {
    const rawResponse = await fetch(`api/save-frames`, {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        a: frames,
        b: frames.length,
        c: frames[0].length,
      }),
    });

    const content = rawResponse;
    console.log(content);
  } catch (error) {
    console.log(error);
  }
};

export const sendSave = async () => {
  try {
    const rawResponse = await fetch(`api/save`);

    const content = rawResponse.status;
    console.log(content);
  } catch (error) {
    console.log(error);
  }
};

export const sendPlay = async () => {
  try {
    const rawResponse = await fetch(`api/play`);

    const content = rawResponse.status;
    console.log(content);
  } catch (error) {
    console.log(error);
  }
};

export const sendPause = async () => {
  try {
    const rawResponse = await fetch(`api/pause`);

    const content = rawResponse.status;
    console.log(content);
  } catch (error) {
    console.log(error);
  }
};

export const sendFramesMode = async () => {
  try {
    const rawResponse = await fetch(`api/frames-mode`);

    const content = rawResponse.status;
    console.log(content);
  } catch (error) {
    console.log(error);
  }
};

export const sendGameMode = async () => {
  try {
    const rawResponse = await fetch(`api/game-mode`);

    const content = rawResponse.status;
    console.log(content);
  } catch (error) {
    console.log(error);
  }
};

export async function sendSpeedUp(): Promise<number> {
  try {
    const res = await fetch(`api/speed-up`);
    const response = await res.json();
    return response.speed;
  } catch (error) {
    console.log(error);
    return 0;
  }
}

export async function sendSlowDown(): Promise<number> {
  try {
    const res = await fetch(`api/slow-down`);
    const response = await res.json();
    return response.speed;
  } catch (error) {
    console.log(error);
    return 0;
  }
}

export const setColors = async (colors: number[]) => {
  try {
    const rawResponse = await fetch(`api/set-colors`, {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        a: colors,
        b: colors.length,
      }),
    });

    const content = rawResponse.status;
    console.log(content);
  } catch (error) {
    console.log(error);
  }
};
