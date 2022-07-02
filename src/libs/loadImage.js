import defaultImage from "@/assets/no-image.webp"

export const loadImage = (fileSrc = "") => {
  if(!fileSrc) return defaultImage
  return process.env.VUE_APP_HOST_URL + "/" + fileSrc
}