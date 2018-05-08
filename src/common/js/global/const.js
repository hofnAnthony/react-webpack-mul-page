import { isDev } from '../utils'

const DEV_BASE_URL = 'http://h5.haoguihua.cn'


let ALL_URLS = {
  // 通用接口地址
  URLS: {
    GET_WXCONFIG_URL: '/j/utils/share',                      // 获取微信的token
    GET_WXUSERINFO_URL: '/j/h5/share/weixin/mine',           // 获取微信用户信息
    IS_LOGIN_URL: '/j/utils/is_login',                       // 从接口获取是否登录
    TOTAL_DATA: '/j/stat/total_data',                        // 规划总投资、收益、用户量
    ACCOUNT_REGISTER: '/j/h5/account/register',              // 获取短信验证码
    ACCOUNT_VERIFY: '/j/h5/account/register/verify',         // 注册接口
    ACCOUNT_LOGIN: '/j/h5/account/login'                     // 登录接口
  },
  WEB_URL: {
    // LOGIN: '/accounts/login?next=',                       // 主站的注册登录，已改成新版注册登录
    // REGISTER: '/accounts/register?next=',
    LOGIN: '/h5/accounts/index.html?view=login&next=',
    REGISTER: '/h5/accounts/index.html?view=register&next=',
    DOWNLOAD: 'https://lkme.cc/ogC/yHvYiwbxI',                                              // app下载页
    DOWNLOAD_PRODUCT_LIST: 'https://lkme.cc/ogC/YrTzcZoyI',                                 // APP 下载，已经下载打开产品列表
    DOWNLOAD_WELFARE: 'https://lkme.cc/ogC/MRs60gtUJ',                                      // 我的福利中心
    DOWNLOAD_ASSET: 'https://lkme.cc/ogC/OjIWqgtUJ',                                        // 我的页面
    PRODUCT_LIST: '/savings/mine/',                                                         // 产品列表页
    APP_STORE: 'http://app.qq.com/#id=detail&appid=1104745707'                              // APP商店页面
  },
  // APP页面的跳转链接
  GUIHUA_URL: {
    CLOSE_WEBVIEW: 'gh://web/close',                                                  // 关闭webview
    GOBACK_WEBVIEW: 'gh://web/goback',                                                  // 关闭webview
    OPEN_PRODUCT_LIST: 'guihua://open/product_list',                                        // 产品列表
    SHARE: 'guihua://open/share',                                                           // 分享拦截
    SHARE_PICURL: 'guihua://open/share_pic',                                                // 分享大图拦截
    OPEN_SHARE: 'guihua://open/share',                                                      // 主动触发分享
    WELFARE_INDEX: 'guihua://open/welfare_index',                                           // 新的福利中心
    OPEN_FUND: 'guihua://open/product_list_fund',                                           // 产品列表的基金
    OPEN_INS: 'gh://pdt_list_ins',                                                          // 产品列表的保险
    OPEN_DEFAULT: 'guihua://open/login',                                                    // 默认登陆
    OPEN_LOGIN: 'guihua://open/login?view=login',                                           // 登陆
    OPEN_REGISTER: 'guihua://open/login?view=register',                                     // 注册
    IDENTITY: 'guihua://open/identity_verification',                                        // 身份绑定
    IDENTITY_NEW: 'gh://identity',                                                          // 身份绑定
    ADD_BANKCARD: 'guihua://open/add_bankcard',                                             // 添加银行卡
    OPEN_URL: 'guihua://open/link',                                                         // url拦截
    OPEN_INVITATION: 'guihua://open/invitation',                                            // 邀请
    OPEN_NOTIFICATION: 'guihua://open/notification',                                        // 通知
    TOKEN_EXPIRED: 'guihua://refresh_token',                                                // 更新Token
    RISK_ASSESS: 'guihua://risk-assess',                                                    // 风险评测
    OPEN_COUPON: 'guihua://open/coupon',                                                    // 礼券拦截
    OPEN_RED: 'guihua://open/redpacket',                                                    // 红包拦截
    OPEN_SAVINGRECORDS: 'guihua://open/savings_records',                                    // 攒钱未到期
    OPEN_SAVINGRECORDALL: 'guihua://open/savings_records_all',                              // 攒钱全部
    OPEN_WALLETRECORDSSXB: 'guihua://open/wallet_records_suixinzan',                        // 零钱包的随心攒
    OPEN_WALLET: 'guihua://open/wallet',                                                    // 零钱包随心攒账户页面
    OPEN_WEIXINDIALOG: 'guihua://open/weixin_dialog',                                       // weixin
    OPEN_TPOINTCENTER: 'guihua://open/point_center',                                        // 积分中心
    FUND_DETAIL: 'guihua://open/fund_detail?code=',                                         // 跳转基金详情界面
    SMILEP_LANINTRODUCTION: 'guihua://open/fund_smileplan_introduction',                    // 打开微笑计划详情页的url
    MY_SMILEP_LANINTRODUCTION: 'guihua://open/fund_smileplan',                              // 我的微笑定投
    FUND_SMILEP_LANAUTOINVESTSETTING: 'guihua://open/fund_smileplan_auto_invest_setting',   // 设置定投
    PAY_ZQPRODUCT: 'guihua://open/hoarder/buy',                                             // 跳转攒钱助手购买界面
    PAY_ZQPRODUCTDESCRIPTION: 'guihua://open/hoarder/detail',                               // 跳转攒钱助手购买详情界面 params:product_id & partner
    FUND_DETAILS: 'guihua://open/fund_detail',                                              // 基金详情 code=xxxxx&fixed_amount=xxxx  基金代码，固定金额
    FUND_FOF: 'guihua://open/fund_fof',                                                     // 资产详情
    FUND_INTRO: 'guihua://open/fund_fof_intro_',                                            // 计划详情 guihua://open/fund_fof_intro_haitou  guihua://open/fund_fof_intro_wenna guihua://open/fund_fof_intro_bailing
    FUND_RECORDS: 'guihua://open/fund_fof_records_',                                        // 基金记录  基金记录type参数: transactions, dividends, switches 分别对应：交易，分红，转换
    LINK: 'guihua://open/external_link',                                                    // web 跳转外部的
    MINE: 'gh://asset',                                                                     // 我的页面
    SUPER_CRAH: 'gh://supercash/asset',                                                     // 超级现金宝链接
    NEW_USER_SPECIAL: 'gh://recommend'                                                      // 新手专享|推荐页面，根据用户身份显示不同产品
  }
}

if (isDev()) {
  for (const key in ALL_URLS.URLS) {
    if (ALL_URLS.URLS.hasOwnProperty(key)) {
      ALL_URLS.URLS[key] = `${DEV_BASE_URL}${ALL_URLS.URLS[key]}`
    }
  }
  // for (const key in ALL_URLS.WEB_URL) {
  //   if (ALL_URLS.WEB_URL.hasOwnProperty(key) && ALL_URLS.WEB_URL[key].indexOf('http') === -1) {
  //     ALL_URLS.WEB_URL[key] = `${DEV_BASE_URL}${ALL_URLS.WEB_URL[key]}`
  //   }
  // }
}

export default ALL_URLS
