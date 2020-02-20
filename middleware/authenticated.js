export default function({ store, redirect, route }) {
  if (!store.state.auth.loginStatus && route.fullPath !== '/auth/signin') {
    return redirect('/auth/signin')
  }
}
