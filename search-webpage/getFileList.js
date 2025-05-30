const fs = require('fs');
const { get } = require('http');
const path = require('path');

function getFileList() {
  const apiClientFiles = getHtmlFiles(path.join(__dirname, '../api_client'), 'api_client/');
  const apiServerFiles = getHtmlFiles(path.join(__dirname, '../api_server'), 'api_server/');
  const files = apiClientFiles.concat(apiServerFiles);

  // files 배열을 log 파일로 저장
  fs.writeFileSync('filelist.log', JSON.stringify(files, null, 2), 'utf8');
  console.log('filelist.log 파일이 생성되었습니다.');
  return files;
}

function getHtmlFiles(dir, prefix) {
  let results = [];
  fs.readdirSync(dir).forEach(file => {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      if (stat && stat.isDirectory()) {
        results = results.concat(getHtmlFiles(filePath, prefix + file + '/'));
      } else if (file.endsWith('.html')) {
        results.push(prefix + file);
      }
  });
  return results;
}

getFileList();