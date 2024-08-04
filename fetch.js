fetch('https://00.00pingxuan.cn/huodong2/index/pltp.html', {
  method: 'POST',
  headers: {
    'Host': '00.00pingxuan.cn',
    'Connection': 'keep-alive',
    'Content-Length': '56',
    'sec-ch-ua': '"Not/A)Brand";v="8", "Chromium";v="126", "Android WebView";v="126"',
    'Accept': 'application/json, text/plain, */*',
    'Content-Type': 'application/json;charset=UTF-8',
    'X-Requested-With': 'XMLHttpRequest',
    'sec-ch-ua-mobile': '?1',
    'User-Agent':
      'Mozilla/5.0 (Linux; Android 14; 23113RKC6C Build/UKQ1.230804.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/126.0.6478.188 Mobile Safari/537.36 XWEB/1260079 MMWEBSDK/20240404 MMWEBID/6874 MicroMessenger/8.0.49.2600(0x2800315A) WeChat/arm64 Weixin NetType/WIFI Language/zh_CN ABI/arm64',
    'sec-ch-ua-platform': '"Android"',
    'Origin': 'https://00.00pingxuan.cn',
    'Sec-Fetch-Site': 'same-origin',
    'Sec-Fetch-Mode': 'cors',
    'Sec-Fetch-Dest': 'empty',
    'Referer':
      'https://00.00pingxuan.cn/details/48354877?token=LP5y2qA&code=021jKvGa1t64UH0NyMIa1UnMJa1jKvGK&state=STATE',
    'Accept-Encoding': 'gzip, deflate, br, zstd',
    'Accept-Language': 'zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7',
    'Cookie':
      'PHPSESSID=6oraaj4ik0ea034ivrepj8co2e; gdxidpyhxdE=6eN7ubKawHKp4JsMmTErydWIE%5CYVCCo%2F1wg7nGiOgw%2BqxWu14dnrd1muSoLBAsL8YnQQKCuJ%5C9tga2T2sQOaKSPa7I29Q4NcjYKtJ4BMAq76L3ZMLJeCEASrWfxWk77LgsAjLKOnNq%2BoOTonJibR5eQ8CPSEhhPNQir5%2B%2FlyAMrxgohk%3A1722767096396',
  },
  body: JSON.stringify({
    u: '',
    dizhi: [],
    player_id: ['48354877'],
    yundun: '',
  }),
})
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => console.error('Error:', error))
