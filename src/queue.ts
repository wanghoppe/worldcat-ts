import axios, {AxiosRequestConfig, AxiosResponse} from 'axios';

export default class RequsetQueue {

  constructor(maxLen: number) {
    this.maxLen = maxLen
  }

  private maxLen: number;

  private _fetchingNum = 0;

  private queue: Function[] = [];

  private _wait() {
    return new Promise((release) => {
      this.queue.push(release);
      this._start();
    })
  }

  private _start() {
    if (this._fetchingNum < this.maxLen) {
      console.log(`[INFO] numer of queue left: ${this.queue.length}`)
      if (this.queue.length) {
        this.queue.shift()();
      }
    }
  }

  private _shiftQueue() {
    this._fetchingNum -= 1
    this._start();
  }

  public async request(config: AxiosRequestConfig): Promise<AxiosResponse> {
    const _ = await this._wait();
    let res = null;
    try {
      this._fetchingNum += 1;
      res = await axios(config);
    } catch(error) {
      console.log('[ERROR]', JSON.stringify({config, error}))
    } finally {
      this._shiftQueue();
    }
    return res;
  }
}