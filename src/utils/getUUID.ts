import atob from "atob";
import log from "./logger";

export interface IUserPareToken {
  idusers: number;
  uuid: string;
  role: number;
}
const getUserUUID = async (token: string) => {
  try {
    const base64Url = token.split(".")[1];
    const tokenData: any = JSON.parse(atob(base64Url));
    const data: IUserPareToken = {
      idusers: tokenData.idusers,
      uuid: tokenData.uuid,
      role: tokenData.role,
    };

    return data as IUserPareToken;
  } catch (e: any) {
    log.error(e);
    throw new Error(e);
  }
};

export default getUserUUID;
