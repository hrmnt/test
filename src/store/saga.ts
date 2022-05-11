import { eventChannel, EventChannel } from "redux-saga";
import { call, takeEvery, put, take, cancel } from "redux-saga/effects";
import { fetchBoard } from "./reducers";
import { sagaActions } from "./sagaActions";



function createWebSocketConnection() {
    return new Promise((resolve, reject) => {
        const socket = new WebSocket("wss://hometask.eg1236.com/game1/")

        socket.onopen = function () {
            resolve(socket);
        };

        socket.onerror = function (evt) {
            reject(evt);
        }
    });
}

export function* fetchBoardSaga(dispatch: any) {
    try {
        console.log(dispatch)

        yield put(fetchBoard(""));
    } catch (e) {
        yield put({ type: "TODO_FETCH_FAILED" });
    }
}

export default function* rootSaga() {
    yield takeEvery(sagaActions.FETCH_BOARD_SAGA, fetchBoardSaga);
}


let wsConnection: EventChannel<any> | null = null;

// create WS connection on first call
// reuse that connection in further calls
function getConnection(): EventChannel<any> | undefined {
    if (!wsConnection) {
        wsConnection = initWebsocket();
        return wsConnection;
    }

    function initWebsocket(): EventChannel<any> {
        return eventChannel((emitter) => {

            let id: string | undefined;
            let intervalId: number;

            const initConnection = () => {
                const connectionUrl: string = "ws://localhost:4000"

                let ws = new WebSocket(connectionUrl);

                ws.onopen = () => {
                    id && ws.send(JSON.stringify({ type: "GET_USER_ID", id }));

                    intervalId = window.setInterval(() => {
                        ws.send(JSON.stringify({ type: "PING" }))
                    }, 30000)
                };

                ws.onclose = (e) => {
                    console.log("Reconnect in 4s");
                    intervalId && clearInterval(intervalId);
                    id && setTimeout(initConnection, 4000);
                };
            };

            initConnection();

            return () => {
                console.log("Socket off");
            };
        });
    }
}