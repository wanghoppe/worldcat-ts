import axios, {AxiosRequestConfig, AxiosPromise} from 'axios';

interface queueItem {
  config: AxiosRequestConfig,
  cb: Function,
}

export class RequsetQueue {

  constructor(maxLen: number) {
    this.maxLen = maxLen
  }

  private maxLen: number;

  private queue: queueItem[] = [];

  private _start() {
    if (this.queue.length < this.maxLen) {
      const {config, cb} = this.queue.shift();
      this._request(config, cb);
    }
  }

  private _request(config: AxiosRequestConfig, cb: Function): any {
    const res = axios(config).then((data) => cb(data));
    if (this.queue.length) {
      const {config, cb} = this.queue.shift();
      this._request(config, cb);
    }
  }

  public queueRequest(config: AxiosRequestConfig): AxiosPromise {
    return new Promise((res, rej) => {
      this.queue.push({
        config,
        cb: res
      });
      this._start();
    });
  }

  private _await() {
    return new Promise((release) => {
      this.queue.push(release);
      this._start();
    })
  }

  private _start() {
    if (this.queue.length < this.maxLen) {
      this.queue.shift()();
    }
  }

  private _shiftQueue() {
    if (this.queue.length) {
      this.queue.shift()();
    }
  }

  public async queueRequest1(config: AxiosRequestConfig): AxiosPromise {
    await this._wait();
    const res = await axios(config);
    this._shiftQueue();
    return res;
  }
}