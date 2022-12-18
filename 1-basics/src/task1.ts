

process.stdin.on('data', data => {
  const reversedStr = data
    .toString()
    .slice(0, -1) // removing \n just for the formatting sake
    .split('')
    .reverse()
    .join('') + '\n';
  process.stdout.write(reversedStr);
});