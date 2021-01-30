import React from 'react'
import { withAuthUser } from 'next-firebase-auth'

const Setups = () => (
  <div>
    <h3>Setups</h3>
  </div>
)

export default withAuthUser({
  // whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
})(Setups)
