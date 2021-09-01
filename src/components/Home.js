import React,{Component} from "react";
import { connect } from 'dva';
import {serverHost,port} from "../config";
import {homeSubRouters,MyRoute as Route} from '../routers'
import TeacherLoading from "./common/TeacherLoading";

class Home extends Component {
    constructor(props) {
        super(props);
        let tmp = window.sessionStorage.getItem('user') || '{"avatar":""}';
        let {avatar} = JSON.parse(tmp);
        this.state = {
            avatar:`${serverHost}:${port}${avatar}`,
        };
    }
    static defaultProps = {
        isLogin:true,
    };
    componentDidMount() {
       this.judgeLogin();
    }
    //判断是否登录
    judgeLogin(){
        this.props.dispatch({type:"teacherManager/judgeLogin",payload:{}});
    }
    //点击登录按钮
    goSignin(){
        window.location.href = '/signin';
    }

    //点击退出按钮
    signout(){
        this.props.dispatch({type:"teacherManager/signout",payload:{}})
    }
    //进入个人信息
    myMessage(){
        window.location.href = '/home/mine';
    }
    //进入编辑信息
    editMyMessage(){
        window.location.href = '/home/revise'
    }
    //进入教师管理
    teacherList(){
        window.location.href = '/home/list';
    }
    //进入课程信息
    courseMessage(){
        window.location.href = '/home/subject'
    }
    render(){
        let { avatar } = this.state;
        let { isLogin } = this.props;
        return (
            <React.Fragment>
                {isLogin ?
                    <div>
                    <div className="aside">

                        <div className="profile">

                            <div className="avatar img-circle">
                                <img src={avatar} alt=""/>
                            </div>
                        </div>
                        <div className="navs">
                            <ul className="list-unstyled">
                                <li>
                                    <a>
                                        <span className="glyphicon glyphicon-search" aria-hidden="true"/>
                                        <i className="fa fa-tasks"/>
                                        导航栏
                                    </a>

                                </li>
                                <li>
                                    <a onClick={e => this.myMessage()}>
                                        <i className="fa fa-user"/>
                                        个人中心
                                    </a>

                                </li>
                                <li>
                                    <a onClick={e => this.editMyMessage()}>
                                        <i className="fa fa-edit"/>
                                        修改信息
                                    </a>
                                </li>
                                <li>
                                    <a onClick={e => this.teacherList()}>
                                        <i className="fa fa-file-text-o"/>
                                        讲师管理
                                    </a>
                                </li>
                                <li>
                                    <a onClick={e => this.courseMessage()}>
                                        <i className="fa fa-cog"/>
                                        课程信息
                                    </a>
                                </li>
                                <li>
                                    <a>
                                        <i className="fa fa-cog"/>
                                        系统设置
                                        <i className="arrow fa fa-angle-right"/>
                                    </a>
                                    <ul className="list-unstyled">
                                        <li>
                                            <a>
                                                网站设置
                                            </a>
                                        </li>
                                        <li>
                                            <a>
                                                权限管理
                                            </a>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="main">
                        <div className="container-fluid">

                            <div className="header">
                                <nav className="navbar navbar-custom">
                                    <div className="navbar-header">
                                        <a className="navbar-brand">
                                            <i className="fa fa-navicon"/>
                                        </a>
                                    </div>
                                    <ul className="nav navbar-nav navbar-right">
                                        <li>
                                            <a>
                                                <i className="fa fa-bell"/>
                                                <span className="badge">8</span>
                                            </a>
                                        </li>
                                        <li>
                                            <a onClick={e => this.myMessage()}>
                                                <i className="fa fa-user"/>
                                                个人中心
                                            </a>
                                        </li>
                                        <li>
                                            <a onClick={e => this.goSignin()}>
                                                <i className="fa fa-sign-in"/>
                                                登录
                                            </a>
                                        </li>
                                        <li>
                                            <a onClick={e => this.signout()}>
                                                <i className="fa fa-sign-out"/>
                                                退出
                                            </a>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                            <TeacherLoading/>
                            {
                                homeSubRouters.map((route, i) => {
                                    return <Route key={i} path={route.path} component={route.component}/>
                                })
                            }
                        </div>
                    </div>
                </div>
                    :
                <div className="alert alert-warning" role="alert">
                    未登录，请先<a href="/signin" className="alert-link">登录</a>...
                </div>
                }
            </React.Fragment>
        )
    }
}

export default connect(state=>{
        return{
            isLogin:state.teacherManager.isLogin,
        };
    }

)(Home);