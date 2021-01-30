import React from "react"
import { withAuthUser, AuthAction } from "next-firebase-auth"

const User = () => (
  <div>
    <h3>User</h3>
  </div>
)

export default withAuthUser({
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
})(User)
