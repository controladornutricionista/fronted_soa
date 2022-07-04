import store from "@/store";
import { iatKey, sessionKey, storage } from "@/store/keys"
import { decAtob } from "@/libs/base64"

export default async function (to, from, next) {

  const token = storage.getItem(sessionKey) ?? ""
  const iat = storage.getItem(iatKey) ?? ""
  const haveSessionCredentials = token.length > 0 && iat.length > 0
  const isAuthenticated = store.getters.getIsAuthenticated
  const isFullAuthenticated = isAuthenticated && haveSessionCredentials

  if(to.name === "AuthLogin" && haveSessionCredentials) {

    next({ name: "Home" })

  } else if(to.name === "VistaLogin" && !isFullAuthenticated) {
    
    return next()

  } else if(to.name !== 'AuthLogin' && !isAuthenticated && !haveSessionCredentials) {

    return next({ name: 'AuthLogin' })

  } else if(to.name !== 'AuthLogin' && haveSessionCredentials && !isAuthenticated) {
    console.log( decAtob(token));
    store.commit("setSession", {
      accessToken: decAtob(token),
      expiredIn: decAtob(iat)
    })

    let user = null
    if(!store.getters.getIsAuthenticated) {
      user = await store.dispatch("me")
    }
    return next()
    
  }  else if(to.name === 'AuthLogin' && isFullAuthenticated) {

    return next({ name: 'Home' })

  } else {
    next()
  }
}