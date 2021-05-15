import axios from 'axios'
import * as fs from 'fs';
import {parse} from 'node-html-parser';
import {parseTotalNum, parseLinkItemList, parseResponsibility, LinkItem} from './parser';
import {fetchCitation, fetchSearchPage, fetchDetailPage} from './request';

interface BookItem {
  oclcnum?: string,
  citation?: string,
  language?: string,
  responsibility?: string,
}

interface BookMap {
  [Key: string]: BookItem,
}

async function getPageNumList(): Promise<number[]> {
  const data = await fetchSearchPage();
  const dom = parse(data.data);
  const num = parseTotalNum(dom);
  return new Array(Math.ceil(num/10)).fill(0).map((_, i) => (i * 10 +1));
}

async function processPage(pageNum: number, bookMap: BookMap): Promise<any> {
  console.log(`[INFO] processPage: ${pageNum}`);
  const data = await fetchSearchPage(pageNum);
  const dom = parse(data.data);
  const linkItemList = parseLinkItemList(dom);
  return Promise.all(linkItemList.map((item) => insertRecord(item, bookMap)));
}

async function insertRecord(linkItem: LinkItem, bookMap: BookMap): Promise<any> {
  bookMap[linkItem.oclcnum] = {
    language: linkItem.language,
    oclcnum: linkItem.oclcnum,
  }
  const citationPromise = fetchCitation(linkItem.oclcnum);
  const detailPromise = fetchDetailPage(linkItem.oclcnum);
  return Promise.all([citationPromise, detailPromise]).then(([resCite, resDetail]) => {
    const citation = resCite.data?.cite;
    const responsibility = parseResponsibility(parse(resDetail.data));
    bookMap[linkItem.oclcnum] = {
      ...bookMap[linkItem.oclcnum],
      citation,
      responsibility,
    }
  })
}

async function main() {
  const pageList = await getPageNumList();
  const bookMap: BookMap = {}
  await Promise.all(pageList.map((page) => processPage(page, bookMap)));
  fs.writeFileSync('test_data/result.json', JSON.stringify(bookMap));
}

main().then(()=>console.log("exit"));