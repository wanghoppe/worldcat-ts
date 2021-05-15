import {HTMLElement} from 'node-html-parser';

export interface LinkItem {
  href: string,
  id: string,
  oclcnum: string,
  language: string,
}

export function parseTotalNum(dom: HTMLElement): number {
  return Number(dom.querySelector('label#all_fm_count strong').innerHTML);
}

export function parseLinkItemList(dom: HTMLElement): LinkItem[] {
  return dom.querySelectorAll('tr.menuElem').map((dom) => {
    return parseILinkItem(dom);
  })
}

function parseILinkItem(dom: HTMLElement): LinkItem {
  const href = dom.querySelector('a')?.getAttribute('href');
  const oclcnum = href?.match(/oclc\/(.+)&/)?.[1];
  return {
    id: dom.querySelector('td.num')?.innerText,
    href,
    oclcnum,
    language: dom.querySelector('span.itemLanguage')?.text,
  }
}

export function parseResponsibility(dom: HTMLElement): string {
  return dom.querySelector('tr#details-respon td')?.innerText;
}