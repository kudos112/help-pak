import {io} from "socket.io-client";
import {baseUrl} from "~/repositories/genericRepository";

const socket = io(baseUrl);

export default socket;
