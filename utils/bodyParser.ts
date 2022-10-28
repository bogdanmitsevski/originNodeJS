import {parse} from 'querystring';
const prepareBody = (parser:Function)=>(req:any) => new Promise<any>((res, rej) => {
    let body = '';
    req.on('data', (chunk: { toString: () => string; }) => {
      body += chunk.toString();
    })
  
    req.on('end', () => {
      try {
        const parsed = parser(body)
        res(parsed)
      } catch (e) {
        rej(e)
      }
    })
  })
  const parseJSON = prepareBody(JSON.parse);
  const parseParams = prepareBody(parse);
  export {parseJSON, parseParams};