import { connect } from 'react-redux';
import { getLoginUser, resetToken } from '../Actions';
import App from '../App';

const mapDispatchToProps = dispatch => {
  return {
    loadUserFromToken: () => {
      const token = window.sessionStorage.getItem('jwtToken');
      if (!token || token === '') {
        return;
      }

      dispatch(getLoginUser(token));
    },
    resetMe: () => {
      window.sessionStorage.removeItem('jwtToken');
      dispatch(resetToken());
    }
  };
};

export default connect(
  null,
  mapDispatchToProps
)(App);
