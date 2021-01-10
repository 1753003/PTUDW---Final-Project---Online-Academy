export function patchRoutes(routes) {
  if(JSON.parse(localStorage.getItem('isLogin'))=='true')
  if(JSON.parse(localStorage.getItem('antd-pro-authority'))[0]=='admin'|| JSON.parse(localStorage.getItem('antd-pro-authority'))[0]=='lecturer')
  routes[3].routes[1].routes[0] = {
    redirect: JSON.parse(localStorage.getItem('antd-pro-authority'))[0]
  }

}