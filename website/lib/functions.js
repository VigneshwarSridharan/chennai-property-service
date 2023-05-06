import { get } from "lodash"
import { MEDIA_BASE_URL } from "./constants"


export function getStrapiMedia(media) {
    const url = get(media, 'data.attributes.url','')
    const imageUrl = url.startsWith("/") ? `${MEDIA_BASE_URL}${url}` : url
    return imageUrl
  }
  