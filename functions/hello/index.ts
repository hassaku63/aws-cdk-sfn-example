import aws = require('aws-sdk');

/**
 * 何もしないfunction
 *
 * @export
 * @param {any} event イベント情報
 * @returns {Promise<any>}
 */
export async function handler(event: any): Promise<any> {
    const promise = new Promise(function(resolve, reject) {
        console.log('hello')
        resolve(event)
    })
    return promise;
}
