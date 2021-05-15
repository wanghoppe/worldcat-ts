import {parse} from 'node-html-parser';
import * as fs from 'fs';
import {fetchCitation} from './request';
import axios from 'axios';

function test(): any {
  const test = `
  <tr  class="menuElem">



  <td class="num"><input type="checkbox" name="itemid" id="itemid_251670948" value="251670948"><label for="itemid_251670948" style="display:none">217. Klu kun tu dga' ba źes bya ba'i zlos gar</label></td>
     <td class="num">217.</td>

  <td class="coverart">
  <a href="/title/klu-kun-tu-dga-ba-zes-bya-bai-zlos-gar/oclc/251670948&referer=brief_results"> <img width="70" src="//coverart.oclc.org/ImageWebSvc/oclc/+-+394521607_70.jpg?SearchOrder=+-+OT,OS,TN,GO,FA"

                                title='Klu kun tu dga' ba źes bya ba'i zlos gar by Harṣadeva'
                                alt='Klu kun tu dga' ba źes bya ba'i zlos gar by Harṣadeva'


         /></a>

    </td>
  <td class="result details">
      <div class="oclc_number" data-source-collection="/XWC/">251670948</div>
      <div class="item_number">7</div>
  <div class="name">
     <a id="result-217" href="/title/klu-kun-tu-dga-ba-zes-bya-bai-zlos-gar/oclc/251670948&referer=brief_results"><strong>Klu kun tu dga' ba źes bya ba'i zlos gar</strong></a>
       </div>

  <div class="author">by Harṣadeva; Laxmi Kara;  Sor-ston;  RGyal-sras Thogs-med-dpal-bzaṅ-po</div><div class="type">
              <img class='icn' src='/wcpa/rel20210506/images/icon-bks.gif' alt=' ' height='16' width='16' >&nbsp;<span class='itemType'>Print book</span></div>
  <div class="publisher">Publisher: <span class="itemPublisher">Delhi Ladakh Inst. 1966</span></div><!-- collection: /z-wcorg/ -->
  <ul class="options">
    </ul>

    <div class="panel hidepanel" id="elpanel7"><p class="closepanel"><a href="javascript:void(0);" title="Close">Close</a></p></div>
   <div id="slice">
          <span class="Z3988" title="url_ver=Z39.88-2004&rft_val_fmt=info%3Aofi%2Ffmt%3Akev%3Amtx%3Abook&rft.genre=book&req_dat=%3Csessionid%3E&rfe_dat=%3Caccessionnumber%3E251670948%3C%2Faccessionnumber%3E&rft_id=info%3Aoclcnum%2F251670948&rft.aulast=Hars%CC%A3adeva&rft.aufirst=Laxmi&rft.title=Klu+kun+tu+dga%27+ba+z%CC%81es+bya+ba%27i+zlos+gar&rft.date=1966&rft.place=Delhi&rft.pub=Ladakh+Inst.&rft.genre=book&rft_dat=%7B%22stdrt1%22%3A%22Book%22%2C%22stdrt2%22%3A%22PrintBook%22%7D"></span>
  </div>
      <!-- Add "opacSaveMode" and "opacBypassMode" opts to Debug urls on the Brief
          results page.
      This helps with finding test records in WCLocal: Click on a lot of Debug
          links then grep the DR logs for your magic string in the saved opac
          response files.
   -->
  </td>
  </tr>
  `
  console.log(parse(test).querySelector('td.num')?.innerText);
}

test3()

function test2() {
  const dom = parse(fs.readFileSync('test_data/v0.html', 'utf-8'));
  console.log(dom.querySelector('label#all_fm_count strong').innerText);
}

async function test3() {
  console.log((await fetchCitation('253599637'))?.data?.cite)
}


async function saveHtml() {
  const writer = fs.createWriteStream('./test_data/v0.html');
  const response = await axios({
    method: 'get',
    url: 'https://www.worldcat.org/search?q=ti%3Anagananda%7Cnaganandam&fq=x0%3Abook&dblist=638&start=1&qt=page_number_link',
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