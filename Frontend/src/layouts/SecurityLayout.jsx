import React from 'react';
import { connect } from 'dva';
import { PageLoading } from '@ant-design/pro-layout';
import { Redirect } from 'umi';
import { stringify } from 'querystring';

class SecurityLayout extends React.Component {
  state = {
    isReady: false,
    isGuest: true
  };

  constructor(props){
    super(props);
    if(!localStorage.getItem("userData")){
      localStorage.setItem("userData",JSON.stringify({currentAuthority:'guest'}))
      localStorage.setItem('antd-pro-authority',JSON.stringify(['guest']))
    }
  }
  componentDidMount() {
    this.setState({
      isReady: false,
      isGuest: true
    });

    const { dispatch, currentUser } = this.props;
    const {isGuest} = this.state;
    if (dispatch && !isGuest) {
      dispatch({
        type: 'user/fetchCurrent',
        payload: JSON.parse(localStorage.getItem("userData"))
      });
    }
  }

  render() {
    const { isGuest, isReady} = this.state;

    const { children, loading, currentUser } = this.props; // You can replace it to your authentication rule (such as check token exists)
    const isLogin = currentUser && currentUser.id;
    if(isLogin){
        isGuest: false
    }
    
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
