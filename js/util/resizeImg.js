/**
 *
 * @param url
 * @param [max_width]
 * @param [max_height]
 * @param [quality]
 * @param [type]
 * @return {Promise} await
 */
export function resizeMe ({url, max_width = 1000, max_height = 1000, quality, type,} = {}) {
    const ToDataUrlType = "image/jpeg",
        isDefaultType = (type || ToDataUrlType) === ToDataUrlType;
    if (!isDefaultType && quality) console.warn(`resizeMe: params quality must use type is 'image/jpeg'`);
    return new Promise((resolve, reject) => {
        if (!url) return reject(new Error('url 不能为空'));
        let img = new Image();
        img.src = url;

        let canvas = document.createElement('canvas');
        let ctx = canvas.getContext("2d");
        img.onload = () => {
            let width = img.width;
            let height = img.height;

            if (width > height) {
                if (width > max_width) {
                    height = Math.round(height * max_width / width);
                    width = max_width;
                }
            } else {
                if (height > max_height) {
                    width = Math.round(width * max_height / height);
                    height = max_height;
                }
            }

            canvas.width = width;
            canvas.height = height;
            ctx.drawImage(img, 0, 0, width, height);
            let base64 = canvas.toDataURL(type || ToDataUrlType, quality);
            resolve(base64);

        };
    })

}
