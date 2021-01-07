import React from 'react';
import { connect } from 'dva';
import { PageLoading } from '@ant-design/pro-layout';
import { Redirect } from 'umi';
import { stringify } from 'querystring';
import Cookies from 'js-cookie';
class SecurityLayout extends React.Component {
  state = {
    isReady: false,
    isGuest: true
  };

  constructor(props){
    // console.log("Constructor security");
    super(props);
  }

  componentDidMount() {
    this.setState({
      isReady: false,
      isGuest: true
    });
    const { dispatch, currentUser } = this.props;
    const {isGuest} = this.state;
    let accessToken=Cookies.get('aToken')
    let refreshToken=Cookies.get('rfToken')
    let isLogin = localStorage.getItem("isLogin")
    isLogin = isLogin === null ? 'false' : isLogin
    // console.log(isLogin)
    // console.log(typeof(isLogin))
    // console.log(isLogin, accessToken, refreshToken)
    
    if(isLogin.includes("true")){
      if(typeof(refreshToken)=='undefined')
      dispatch({
        type: 'login/logoutHome',
      });
    }
    let userData = JSON.parse(localStorage.getItem("userData"))
    userData = userData === null ? null:userData
    if (dispatch && isLogin.includes("true")) {
      console.log('dsfkas',userData)
      dispatch({
        type: 'user/fetchCurrent',
        payload: userData
      });
      dispatch({ type: 'category/get' })
    }
  }

  render() {
    const { isGuest, isReady} = this.state;
    const { children, loading, currentUser } = this.props; // You can replace it to your authentication rule (such as check token exists)
    
    const isLogin = currentUser && currentUser.id;

    // console.log(isGuest);
    const queryString = stringify({
      redirect: window.location.href,
    });
    if(!isGuest){
      if ((!isLogin && loading) || !isReady) {
        return <PageLoading />;
      }

      if (!isLogin && window.location.pathname !== '/user/login') {
        return <Redirect to={`/user/login?${queryString}`} />;
      }

      return children;
  }else{
    return children;
  }

  }
}

export default connect(({ user, loading }) => ({
  currentUser: user.currentUser,
  loading: loading.models.user,
}))(SecurityLayout);
