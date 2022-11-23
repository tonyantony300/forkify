
import { TIMEOUT_SEC } from './config'

const timeout = function (s) {
    return new Promise(function (_, reject) {
      setTimeout(function () {
        reject(new Error(`Request took too long! Timeout after ${s} second`));
      }, s * 1000);
    });
  };



export const getJSON = async function(url){
    try{
        const fetchPro = fetch(url)
        const resp = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)])
        const data = await resp.json()
        if(!resp.ok) throw new Error(`${data.message} (${resp.status})`)
        return data
    }catch(err){
       throw err;
       //rethrowing the error method
    }
}