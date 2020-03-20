import React,{Component} from "react";
import {connect} from "dva";

//点击删除按钮时确认删除的模态框
class IsDeleteDialog extends Component{
    constructor(props) {
        super(props);
        this.state = {
            notShow:false,
        }
    }
    static defaultProps = {
        isDelete:false,
        teacher:{},
    };
    //取消删除
    notDelete(e){
        this.setState((state,props) => ({
            notShow:true,
        }));
        window.location.href = '/home/list';
    }
    //确定删除
    sureDelete(e){
        let { id } = this.props.teacher;
        this.props.dispatch({type:'teacher/deleteTeacher',payload:{
                _id : id,
            }});
        this.setState((state,props) => ({
            notShow:true,
        }));
    }
    render() {
        const {notShow} = this.state;
        const {isDelete} = this.props;
        this.state.notShow = false;

        return(
            <div className={(!notShow && isDelete)?'':'modal fade show-modal'} id="DeleteDialog" >

                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title"></h4>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={e=>this.notDelete(e)}><span
                                aria-hidden="true">&times;</span></button>

                        </div>
                        <div className="modal-body">
                            <p>你当前在执行删除操作</p>
                            <p>确定删除吗?</p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary" data-dismiss="modal"  onClick={e=>this.notDelete(e)}>取消</button>
                            <button type="button" className="btn btn-default" data-dismiss="modal" onClick={e=>this.sureDelete(e)}>确定</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect()(IsDeleteDialog);
