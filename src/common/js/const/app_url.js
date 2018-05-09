import { isGuiHua, isTalicai, isTimi, isJiJinDou } from '../utils/ua'

const APP_URL_GUIHUA = {
  SHARE: 'guihua://open/share',
  SHARE_PICURL: 'guihua://open/share_pic'
}

const APP_URL_TALICAI = {
  SHARE: 'action://share',
  SHARE_PICURL: 'action://share?sharePic='
}

const APP_URL_TIMI = {
  SHARE: 'guihua://open/share', // 分享拦截
  SHARE_PICURL: 'guihua://open/share_pic'
}

const APP_URL_JIJINDOU = {
  SHARE: 'guihua://open/share', // 分享拦截
  SHARE_PICURL: 'guihua://open/share_pic'
}

export default (() => {
  if (isGuiHua()) {
    return APP_URL_GUIHUA
  }
  if (isTalicai()) {
    return APP_URL_TALICAI
  }
  if (isTimi()) {
    return APP_URL_TIMI
  }
  if (isJiJinDou()) {
    return APP_URL_JIJINDOU
  }
})()
