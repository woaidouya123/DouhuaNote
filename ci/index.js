const ci = require('miniprogram-ci')
const path = require('path')
;(async () => {
  const BUILD_NUMBER = process.env.BUILD_NUMBER;
  const GIT_COMMITTER_NAME = process.env.GIT_COMMITTER_NAME;
  console.log(BUILD_NUMBER,GIT_COMMITTER_NAME,path.join(__dirname,'dist/build/mp-weixin'))
  const project = new ci.Project({
    appid: 'wxac429285b3099f2e',
    type: 'miniProgram',
    projectPath: path.join(__dirname,'dist/build/mp-weixin'),
    privateKeyPath: '/root/wechat_key/private.wxac429285b3099f2e.key',
    ignores: ['node_modules/**/*'],
  })
  const uploadResult = await ci.upload({
    project,
    version: `1.0.${BUILD_NUMBER}`,
    desc: `${GIT_COMMITTER_NAME}`,
    onProgressUpdate: console.log,
  })
  console.log(uploadResult)
  const previewResult = await ci.preview({
    project,
    version: `1.0.${BUILD_NUMBER}`,
    desc: `${GIT_COMMITTER_NAME}`,
    qrcodeFormat: 'image',
    qrcodeOutputDest: 'ci/destination.jpg',
    onProgressUpdate: console.log,
    // pagePath: 'pages/index/index', // 预览页面
    // searchQuery: 'a=1&b=2',  // 预览参数 [注意!]这里的`&`字符在命令行中应写成转义字符`\&`
  })
  console.log(previewResult)
})()