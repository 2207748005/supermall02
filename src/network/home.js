import { request } from "./request"

export function getHomeMultidata() {
    return request({
        url: '/home/Multidata'
    })

}

export function getHomeGoods(type, page) {
    return request({
        url: '/home/data',
        // 参数
        params: {
            type,
            page
        }
    })
}