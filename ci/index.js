const ci = require('miniprogram-ci')
;(async () => {
  const BUILD_NUMBER = process.env.BUILD_NUMBER;
  const SCM_CHANGELOG = process.env.SCM_CHANGELOG;
  const project = new ci.Project({
    appid: 'wxac429285b3099f2e',
    type: 'miniProgram',
    projectPath: 'dist/build/mp-weixin',
    privateKeyPath: '/root/wechat_key/private.wxac429285b3099f2e.key',
    ignores: ['node_modules/**/*'],
  })
  const uploadResult = await ci.upload({
    project,
    version: `1.0.${BUILD_NUMBER}`,
    desc: `${SCM_CHANGELOG}`,
    onProgressUpdate: console.log,
  })
  console.log(uploadResult)
  const previewResult = await ci.preview({
    project,
    version: `1.0.${BUILD_NUMBER}`,
    desc: `${SCM_CHANGELOG}`,
    qrcodeFormat: 'image',
    qrcodeOutputDest: 'ci/destination.jpg',
    onProgressUpdate: console.log,
    // pagePath: 'pages/index/index', // 预览页面
    // searchQuery: 'a=1&b=2',  // 预览参数 [注意!]这里的`&`字符在命令行中应写成转义字符`\&`
  })
  console.log(previewResult)
})()