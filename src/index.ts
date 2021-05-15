import axios from 'axios'
import * as fs from 'fs';
import * as parser from 'node-html-parser';
import {parseTotalNum} from './parser';

const BASE_URL = 'https://www.worldcat.org/';
const SEARCH_URL = BASE_URL + 'search?q=ti%3Anagananda%7Cnaganandam&fq=x0%3Abook&dblist=638&qt=page_number_link';

async function saveHtml() {
  const writer = fs.createWriteStream('./test_data/v1.html');
  const response = await axios({
    method: 'get',
    url: 'https://www.worldcat.org/search?q=ti%3Anagananda%7Cnaganandam&fq=x0%3Abook&dblist=638&start=211&qt=page_number_link',
    responseType: 'stream',
  });
  response.data.pipe(writer);
}

async function parseContent() {
  const html = fs.readFileSync('./test_data/v1.html', 'utf-8');
  const dom = parser.parse(html);
  const num = parseTotalNum(dom);
  // console.log(
    dom.querySelectorAll('tr.menuElem').forEach((item) => {
      console.log(item.innerHTML);
  });
  // );
}

function main() {

}


parseContent();