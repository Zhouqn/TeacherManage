import React,{Component} from 'react';
import {connect} from 'dva';


class Subject extends Component {
    constructor(props) {
        super(props);
        this.state = {
            query:'',
        }

    }

    static defaultProps =  {
        subjects:[{
            id:'',
            course:'',
            decCourse:'',
        }]
    };
    //加载课程信息
    componentDidMount() {
        this.getSubjects();
    }
    getSubjects() {
        this.props.dispatch({type:'subject/getSubjects',payload:{}});
    }

    //搜索课程
    search(e){
        e.preventDefault();
        this.props.dispatch({type:'subject/searchSubject',payload:{ query:this.state.query } })
    }
    //输入框值的改变
    changeValue(e){
        this.setState({
           query:e.target.value,
        })
    }

    render() {
        let {subjects} = this.props;
        let {query} = this.state;
        return (
            <React.Fragment>
                <div className="body teacher-list">
                    <ol className="breadcrumb">
                    <li className="active"><i className="fa fa-newspaper-o" ></i>课程信息</li>
                    </ol>
                    <form  className="form-inline searchSubjects"  onSubmit={e=>this.search(e)} >
                            <input type="text" className="form-control input-sm" value={query} onChange={e=>this.changeValue(e)}/>
                            <span className="input-group-btn">
                                    <button className="btn btn-success btn-sm" >搜索课程名称</button>
                            </span>
                            <span className="input-group-btn allSubjects">
                                <button className="btn btn-success btn-sm" onClick={e=>this.setState({query:''})}>全部课程</button>
                            </span>
                    </form>

                    <form className="form-horizontal" id="subjects">
                            {
                                subjects && subjects.map((subject,i)=>{
                                    return(

                                        <div className="form-group" key={i}>
                                            <p id="signSubject">{i+1}</p>
                                            <div className='subject'>
                                                <label className="col-sm-2 control-label">课程编号<i className = "fa fa-info-circle"></i></label>
                                                <div className="col-sm-10">
                                                <p className="form-control-static">{subject.code}</p>
                                                </div>
                                            </div >
                                            <div className ='subject'>
                                                <label className="col-sm-2 control-label">课程名称<i className = "fa fa-book"></i></label>
                                                <div className="col-sm-10">
                                                <p className="form-control-static">{subject.course}</p>
                                                </div>
                                            </div>
                                            <div className ='subject'>
                                                <label className="col-sm-2 control-label">所修学年<i className = "fa fa-calendar"></i></label>
                                                <div className="col-sm-10">
                                                    <p className="form-control-static">{subject.whichYear}</p>
                                                </div>
                                            </div>
                                                <div className ='subject'>
                                                <label className="col-sm-2 control-label">所属院系<i className = "fa fa-home"></i></label>
                                                <div className="col-sm-10">
                                                    <p className="form-control-static">{subject.faculty}</p>
                                                </div>
                                            </div>
                                                <div className ='subject'>
                                                <label className="col-sm-2 control-label">学分<i className = "fa fa-bar-chart"></i></label>
                                                <div className="col-sm-10">
                                                    <p className="form-control-static">{subject.score}</p>
                                                </div>
                                            </div>
                                                <div className ='subject'>
                                                <label className="col-sm-2 control-label">课程描述<i className = "fa fa-commenting-o"></i></label>
                                                <div className="col-sm-10">
                                                <p className="form-control-static">{subject.decCourse}</p>
                                                </div>
                                            </div>
                                        </div>

                                    )
                                })
                            }
                    </form>
            </div>
            </React.Fragment>
        )
    }
}

export default connect(state=>{
    return {
        subjects:state.subject.subjects,
    }
})(Subject)