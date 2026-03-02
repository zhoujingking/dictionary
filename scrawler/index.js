import axios from 'axios';
import path from 'path';
import fs from 'fs';
// sort: time, alpha
const getWordList = async (sort = 'time') => {
  const cookie = 'i18n_redirected=zh; __yadk_uid=eJS55F77ajpXL9WwuB6ECsKbyPKC8grq; P_INFO=13521780276|1763007261|1|dict_logon|00&99|null&null&null#bej&null#10#0|&0||13521780276; DICT_PERS=v2|urs-phone-web||DICT||web||-1||1763007262487||223.104.3.154||urs-phoneyd.b90214f28ad34c2db@163.com||JBnLeSh4lERw4kMkE6M6F0QFnHl50LU5Rguh4T4hfQuRJF6LTuRMll0l5RMkMPLJS0U50HTBRMpz0U5nLwB0MO50; DICT_UT=urs-phoneyd.b90214f28ad34c2db@163.com; _uetvid=859dbe00972f11ef9949338d4895ee0c; OUTFOX_SEARCH_USER_ID_NCOO=192039685.7714988; OUTFOX_SEARCH_USER_ID=-768364022@39.144.79.192; DICT_SESS=v2|GCdtxJMAh0kfnfe4RLwz0e4kMTBOMTL0OY64kfO4wu0wBkMwynMkm0e4nLqB0HQuRJz0HUW64UMRJukfTzh4PyRpBRLlY0Hg4R; ___rl__test__cookies=1772420266166; DICT_LOGIN=3||1772420301548';
  const { data: res } = await axios.get('https://dict.youdao.com/wordbook/webapi/v2/word/list', {
    params: {
      limit: 10000,
      offset: 0,
      sort
    },
    headers: {
      Cookie: cookie
    }
  })
  return res.data?.itemList || [];
}
const saveJsonToFile = (json, fileName = 'dict.json') => {
  const jsonStr = JSON.stringify(json, null, 2);
  const filePath = path.join('public', fileName)
  fs.writeFile(filePath, jsonStr, (err) => {
      if (err) {
          console.error('Error writing file:', err);
      } else {
          console.log('File has been written successfully.');
      }
  });
}

const main = async () => {
  const timeWordList = await getWordList();
  saveJsonToFile(timeWordList);

  const alphaWordList = await getWordList('alpha');
  saveJsonToFile(alphaWordList, 'dict_alpha.json');
}
main();
