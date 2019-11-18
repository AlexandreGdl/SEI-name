import Home from '../components/home'
import { connect } from 'react-redux'
import * as actions from '../actions/action'
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom'

    const mapDispatchToProps = dispatch => ({
        actions: bindActionCreators(actions, dispatch)
    })

    const mapStateToProps = state => ({
        data: state.data,
        table: state.table,
        column: state.column,
        token: state.token,
        column_id: state.column_id,
        user: state.user,
        userToShow: state.userToShow,
        chat: state.chat
    });


    
    const AccessTable = withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
    )(Home))

    export default AccessTable