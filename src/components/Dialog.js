import React,{Component} from "react";
import {makeAge} from '../utils'

class Dialog extends Component{
    constructor(props) {
        super(props);
        this.state = {
            notShow:false,
        }
    }
    static defaultProps = {
        isShow:false,
        teacher:{},
    };
    closeDialog(e){
        this.setState((state,props) => ({
            notShow:true,
        }));
    }
    render() {
        const {notShow} = this.state;
        const {isShow,teacher} = this.props;
        this.state.notShow = false;

        return(
            <div className={(!notShow && isShow)?'':'modal fade show-modal'} id="teacherModal"  >

                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title"><i className="fa fa-drivers-license-o"></i>讲师信息</h4>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={e=>this.closeDialog(e)}><span
                                    aria-hidden="true">&times;</span></button>

                            </div>
                            <div className="modal-body">
                                <table  className="table table-bordered table-condensed diaTable">
                                                    <tbody >
                                                    <tr>
                                                        <th>姓名:</th>
                                                        <td colSpan="3">{teacher.username}</td>
                                                        <th >所教科目:</th>
                                                        <td colSpan="3">{teacher.subject}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>花名:</th>
                                                        <td colSpan="3">{teacher.nickname}</td>
                                                        <th>性别:</th>
                                                        <td colSpan="3">{teacher.gender==0?'男':'女'}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>出生日期:</th>
                                                        <td colSpan="3">{teacher.birthDay}</td>
                                                        <th>年龄:</th>
                                                        <td colSpan="3">{makeAge("birthDay",teacher.birthDay)}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>入职日期:</th>
                                                        <td colSpan="3">{teacher.joinDate}</td>
                                                        <th>工龄:</th>
                                                        <td colSpan="3">{makeAge("joinDate",teacher.joinDate)}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>手机号码:</th>
                                                        <td colSpan="3">{teacher.phone}</td>
                                                        <th>邮箱:</th>
                                                        <td colSpan="3">{teacher.email}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>籍贯:</th>
                                                        <td colSpan="8">{teacher.address}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>描述:</th>
                                                        <td colSpan="8">
                                                            <div className="introduce">
                                                                {teacher.decTeacher}
                                                            </div>
                                                        </td>
                                                    </tr>
                                                    </tbody>
                                                </table>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-default" data-dismiss="modal"  onClick={e=>this.closeDialog(e)}>Close</button>
                            </div>
                        </div>
                    </div>
            </div>
        )
    }
}

export default Dialog;
