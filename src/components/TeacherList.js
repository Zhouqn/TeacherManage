import React,{Component} from 'react';
import {connect} from 'dva';
import { makeAge } from '../utils'
import Dialog from "./Dialog";
import IsDeleteDialog from "./IsDeleteDialog";


class TeacherList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page:1,
            count:5,
            q:'',
            isShow:false,
            teacher:{},
            isDelete:false,
        }
    }
    //加载老师列表
    componentDidMount() {
        this.loadByPage(this.state.page);
        this.getSubjects();
    }
    loadByPage(num) {
        let {q,page,count} = this.state;
        this.props.dispatch({type:'teacher/updateTeacher',payload:{
            query:q,
            count,
            page:num
        }});
        this.state.page = num;
    }
    //获取课程信息
    getSubjects() {
        this.props.dispatch({type:'subject/getSubjects',payload:{}});
    }
    //搜索教师
    search(e){
        e.preventDefault();
        this.props.dispatch({type:'teacher/search',payload:{ q:this.state.q } })
    }
    //教师信息查询
    showDialog(teacher){
        this.setState({
            isShow:true,
            teacher,
        });
    }
    //教师信息修改
    showEdit(t){
        this.props.dispatch({type:'teacher/showTeacher',payload:{
                _id : t.id,
            }});
    }
    //搜索框数据变化
    changeValue(e){
        let query = e.target.value;
        this.setState({
            page:1,
            count:5,
            q:query,
        });
        if(query === ''){
            this.props.dispatch({type:'teacher/change',payload:{ q:query } });
        }

    }
    //添加讲师
    addTeacher(){
        this.props.dispatch({type:'teacher/addTeacher',payload:{
                teacher:this.state.teacher
            }});
    }
    //显示添加页面
    addShow(){
        this.props.dispatch({type:'teacher/addShow',payload:{
                teacher:this.state.teacher
            }});
    }
    //删除
    deleteTeacher(teacher){
        this.setState({
            isDelete:true,
            teacher,
        });
    }

    render() {
        let {teachers,total} = this.props;
        const {page,q,isShow,teacher,isDelete} = this.state;
        total = Math.ceil(total / this.state.count);
        this.state.isShow = false;
        this.state.isDelete = false;

        return (
            <React.Fragment>
                <div className="body teacher-list">

                    <Dialog isShow={isShow} teacher={teacher}/>
                    <IsDeleteDialog isDelete={isDelete} teacher={teacher}/>

                    <ol className="breadcrumb">
                        <li className="active"><i className="fa fa-newspaper-o" ></i>讲师列表</li>
                    </ol>
                    <div className="page-title">
                        <a className="btn btn-success btn-sm pull-right" onClick={e=>this.addShow()}>添加讲师</a>
                    </div>
                    <div className="panel panel-default">
                        <div className="panel-body">
                            <form  className="form-inline"  onSubmit={e=>this.search(e)}>
                                <div className="teacherList">
                                    <input type="text" className="form-control input-sm" value={q} onChange={e=>this.changeValue(e)}/>
                                    <span className="input-group-btn">
                                    <button className="btn btn-success btn-sm" >搜索</button>
                                </span>
                                </div>
                            </form>
                        </div>
                        <table className="table table-striped table-bordered table-hover">
                            <thead>
                            <tr>
                                <th>编号</th>
                                <th>姓名</th>
                                <th>花名</th>
                                <th>年龄</th>
                                <th>性别</th>
                                <th>手机号码</th>
                                <th>操作</th>
                            </tr>
                            </thead>
                            <tbody id="list">
                            {
                                teachers && teachers.map((t,i)=>{
                                    return (
                                        <tr key={i}>
                                            <td>{t.code}</td>
                                            <td>{t.username}</td>
                                            <td>{t.nickname}</td>
                                            <td>{makeAge("birthDay",t.birthDay)}</td>
                                            <td>{t.gender == 1?'女':'男'}</td>
                                            <td>{t.phone}</td>
                                            <td>
                                                <a className="btn btn-info btn-xs" onClick={e=>this.showDialog(t)}>查 看</a>
                                                <a className="btn btn-info btn-xs" onClick={e=>this.showEdit(t)}>编 辑</a>
                                                <a className="btn btn-warning btn-xs" onClick={e=>this.deleteTeacher(t)}>删除 </a>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                            </tbody>
                        </table>
                        <button disabled={page===1} className="btn btn-primary" onClick={e=>this.loadByPage(page-1)}>上一页</button>
                        <button disabled={page===total} className="btn btn-primary" onClick={e=>this.loadByPage(page+1)}>下一页</button>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default connect(state=>{
    return {
        teachers:state.teacher.teachers,
        total:state.teacher.total,
    }
})(TeacherList)