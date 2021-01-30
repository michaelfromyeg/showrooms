import { init } from "next-firebase-auth"

const initAuth = () => {
  init({
    authPageURL: "/auth",
    appPageURL: "/",
    loginAPIEndpoint: "/api/login",
    logoutAPIEndpoint: "/api/logout",
    firebaseAdminInitConfig: {
      credential: {
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY,
      },
    },
    firebaseClientInitConfig: {
      apiKey: "AIzaSyA4N2N8tqx8NQDHOuCsQQRDrjXgsqIzpgI",
      authDomain: "setups-by-bestbuy.firebaseapp.com",
      projectId: "setups-by-bestbuy",
    },
    cookies: {
      name: "SetupsByBestBuy",
      keys: [process.env.COOKIE_SECRET_CURRENT, process.env.COOKIE_SECRET_PREVIOUS],
      httpOnly: true,
      maxAge: 12 * 60 * 60 * 24 * 1000,
      overwrite: true,
      path: "/",
      sameSite: "strict",
      secure: true,
      signed: true,
    },
  })
}

export default initAuth
