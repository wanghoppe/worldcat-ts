import {AxiosPromise} from 'axios';
import RequsetQueue from './queue';

const requestQueue = new RequsetQueue(10);

const BASE_URL = 'https://www.worldcat.org';
const SEARCH_URL = BASE_URL + '/search?q=ti%3Anagananda%7Cnaganandam&fq=x0%3Abook&dblist=638&qt=page_number_link'; //&start=1
const CHIGAFO_URL = BASE_URL + '/wcpa/servlet/org.oclc.lac.ui.ajax.ServiceServlet?serviceCommand=getCitation&style=CHICAGO' //&oclcnum=253599637
const DETAIL_URL = BASE_URL + '/title/sul-dramma-nagananda-o-il-giubilo-dei-serpenti/oclc/'

export function fetchSearchPage(pageNum: number = 1): AxiosPromise {
  return requestQueue.request({
    method: 'get',
    url: SEARCH_URL + `&start=${pageNum}`
  });
}

export function fetchDetailPage(oclcnum: string): AxiosPromise {
  return requestQueue.request({
    method: 'get',
    url: DETAIL_URL + oclcnum + '&referer=brief_results',
  });
}

export function fetchCitation(oclcnum: string): AxiosPromise {
  return requestQueue.request({
    method: 'get',
    url: CHIGAFO_URL + `&oclcnum=${oclcnum}`,
  });
}