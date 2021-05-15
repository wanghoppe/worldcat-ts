import {HTMLElement, parse} from 'node-html-parser';

interface BookItem {
  title: string,
  author: string,
  url: string,
}

export function parseTotalNum(dom: HTMLElement): number {
  const str = dom.querySelector('div.resultsinfo table tr td strong').innerHTML;
  return Number(str.split('-')[1]);
}

export function parseItemList(dom: HTMLElement): BookItem[] {
  return [{title: '', author: '', url: ''}];
}

function parseBookItem(dom: any): any {
  const dom1 = parse(`



<td class="num"><input type="checkbox" name="itemid" id="itemid_66013968" value="66013968"><label for="itemid_66013968" style="display:none">215. The Nāgānanda of Śrīharṣa</label></td>
   <td class="num">215.</td>

<td class="coverart">
<a href="/title/nagananda-of-sriharsa/oclc/66013968&referer=brief_results"> <img width="70" src="//coverart.oclc.org/ImageWebSvc/oclc/+-+31486511_70.jpg?SearchOrder=+-+OT,OS,TN,GO,FA"

                              title='The Nāgānanda of Śrīharṣa by Harṣa'
                              alt='The Nāgānanda of Śrīharṣa by Harṣa'


       /></a>

  </td>
<td class="result details">
    <div class="oclc_number" data-source-collection="/XWC/">66013968</div>
    <div class="item_number">5</div>
<div class="name">
   <a id="result-215" href="/title/nagananda-of-sriharsa/oclc/66013968&referer=brief_results"><strong>The Nāgānanda of Śrīharṣa</strong></a>
     </div>

<div class="author">by Harṣa;  Maheśvara Ananta Karandīkara; Śailaja Karandīkara.</div><div class="type">
            <img class='icn' src='/wcpa/rel20210506/images/icon-bks.gif' alt=' ' height='16' width='16' >&nbsp;<span class='itemType'>Print book</span><a href="/title/nagananda-of-sriharsa/oclc/66013968/editions?editionsView=true&referer=br"
                       title="View all held editions and formats for this item"> View all formats and languages &raquo;</a>
                </div>
<div class="type language">Language: <span class="itemLanguage">Sanskrit</span> &nbsp;</div><div class="publisher">Publisher: <span class="itemPublisher">Bombay : New & second hand bookstall, [1953]</span></div><!-- collection: /z-wcorg/ -->
<ul class="options">
  <li> <a href="/title/nagananda-of-sriharsa/oclc/66013968/editions?editionsView=true&referer=br" title="View all held editions and formats for this item"> View all editions &raquo;</a></li>
        </ul>

	<div class="panel hidepanel" id="elpanel5"><p class="closepanel"><a href="javascript:void(0);" title="Close">Close</a></p></div>
 <div id="slice">
        <span class="Z3988" title="url_ver=Z39.88-2004&rft_val_fmt=info%3Aofi%2Ffmt%3Akev%3Amtx%3Abook&rft.genre=book&req_dat=%3Csessionid%3E&rfe_dat=%3Caccessionnumber%3E66013968%3C%2Faccessionnumber%3E&rft_id=info%3Aoclcnum%2F66013968&rft.aulast=Hars%CC%A3a&rft.title=The+Na%CC%84ga%CC%84nanda+of+S%CC%81ri%CC%84hars%CC%A3a&rft.date=1953&rft.place=Bombay&rft.pub=New+%26+second+hand+bookstall&rft.genre=book&rft_dat=%7B%22stdrt1%22%3A%22Book%22%2C%22stdrt2%22%3A%22PrintBook%22%7D"></span>
</div>
    <!-- Add "opacSaveMode" and "opacBypassMode" opts to Debug urls on the Brief
        results page.
    This helps with finding test records in WCLocal: Click on a lot of Debug
        links then grep the DR logs for your magic string in the saved opac
        response files.
 -->
</td>`)
  console.log(dom1.querySelector('a').getAttribute('href'));
  console.log(dom1.querySelector('span.itemLanguage')?.text);
}

parseBookItem(1);