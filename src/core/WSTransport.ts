import { EventBus } from './EventBus';

export enum WSEvents {
  Connected = 'connected',
  Error = 'error',
  Message = 'message',
  Close = 'close',
}

export default class WSTransport extends EventBus {
  private socket: Nullable<WebSocket> = null;

  private ping: Nullable<NodeJS.Timeout | number>;

  constructor(private url: string) {
    super();
  }

  public send(data: unknown) {
    if (!this.socket) {
      throw new Error('Socket is not connected');
    }

    this.socket.send(JSON.stringify(data));
  }

  public connect(): Promise<void> {
    this.socket = new WebSocket(this.url);

    this.subscribe(this.socket as WebSocket);

    this.setupPing();

    return new Promise((resolve) => {
      this.on(WSEvents.Connected, () => {
        resolve();
      });
    });
  }

  public close() {
    this.socket?.close();
  }

  private setupPing() {
    this.ping = setInterval(() => {
      this.send({ type: 'ping' });
    }, 5000);

    this.on(WSEvents.Close, () => {
      clearInterval(this.ping);

      this.ping = 0;
    });
  }

  private subscribe(socket: WebSocket) {
    socket.addEventListener('open', () => {
      this.emit(WSEvents.Connected);
    });
    socket.addEventListener('close', () => {
      this.emit(WSEvents.Close);
    });

    socket.addEventListener('error', (error) => {
      this.emit(WSEvents.Error, error);
    });

    socket.addEventListener('message', (message) => {
      const data = JSON.parse(message.data);

      if (data.type && data.type === 'pong') {
        return;
      }

      this.emit(WSEvents.Message, data);
    });
  }
}
