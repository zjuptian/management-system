import React, { Component } from 'react';
import './record-upload.less';
import API from "../../api/api";
import { Input, Icon, Button, Select, Table, Form, Radio, Upload, Page, DatePicker, Message, Drawer, Col, Modal } from "antd";
const { TextArea } = Input;
const { Option } = Select;
class RecordUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      doctorList: [],
      diseaseList: [],
      visible: false,
      fileList: [],
      loadingStatus: false,
      formData: {
        doctorId: 0,
        name: '',
        gender: '',
        birthday: '',
        weight: '',
        height: '',
        chfCmp: '',
        hisPreIll: '',
        hisTre: '',
        prvMedHis: '',
        perHis: '',
        famHis: '',
        treAdv: ''
      },
      ruleValidate: {
        name: [
          { required: true, message: '姓名不能为空', trigger: 'blur' }
        ],
        gender: [
          { required: true, message: '请选择性别', trigger: 'change' }
        ],
        birthday: [
          { required: true },
        ],
        height: [
          { required: true, type: 'number', message: '请输入身高', trigger: 'blur' },
          { type: 'number', min: 0, max: 220, message: '请输入正常身高范围', trigger: 'blur' }
        ],
        weight: [
          { required: true, type: 'number', message: '请输入体重', trigger: 'blur' },
          { type: 'number', min: 0, max: 500, message: '请输入正常体重范围', trigger: 'blur' }
        ],
        chfCmp: [
          { message: '请输入病例描述', trigger: 'blur' },
        ],
        hisPreIll: [
          { message: '请输入现病史', trigger: 'blur' },
        ],
        hisTre: [
          { message: '请输入治疗史', trigger: 'blur' }
        ],
        prvMedHis: [
          { message: '请输入既往史', trigger: 'blur' },
        ],
        perHis: [
          { message: '请输入个人史', trigger: 'blur' },
        ],
        famHis: [
          { message: '请输入家族史', trigger: 'blur' },
        ],
        treAdv: [
          { message: '请输入治疗意见', trigger: 'blur' },
        ]
      }
    }
  }
  componentDidMount() {
    this.getDoctors();
    this.getDiseases();
    // console.log(this.state.doctorList)
  }
  // 获取医生列表，并将form表单中doctor选择框赋值
  getDoctors = () => {
    API.getDoctors().
      then((response) => {
        let _code = response.code,
          _data = response.data;
        if (_code === "200") {
          let newDoctorList = []
          _data.forEach(item => {
            newDoctorList.push({
              "value": item.id,
              "label": item.department + ':' + item.name
            })

          })
          this.setState({
            doctorList: newDoctorList
          })
        }
      }).catch((err) => {
        console.log(err)
      })
  }
  getDiseases = () => {
    API.getDisease().
      then((response) => {
        let _code = response.code,
          _data = response.data;
        if (_code === "200") {
          let newDiseaseList = []
          _data.forEach(item => {
            newDiseaseList.push({
              "value": item.id,
              "label": item.disease
            })

          })
          this.setState({
            diseaseList: newDiseaseList
          })
        }
      }).catch((err) => {
        console.log(err)
      })
  }
  // 处理重置按钮
  handleReset = () => {
    this.props.form.resetFields();
  }
  // 处理提交按钮
  handleSubmit = () => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        let param = {
          recordId:values.recordId,
          doctorId: values.doctorId,
          name: values.name,
          gender: values.gender,
          birthday: values.birthday,
          weight: values.weight,
          height: values.height,
          chfCmp: values.chfCmp,
          hisPreIll: values.hisPreIll,
          hisTre: values.hisTre,
          prvMedHis: values.prvMedHis,
          perHis: values.perHis,
          famHis: values.famHis,
          treAdv: values.treAdv
        };
        API.uploadRecord(param).then((response) => {
          let _code = response.code,
            _msg = response.msg;
          Message.success(_msg);
          if (_code === "200") {
            Message.success('提交成功!');
            // setTimeout(() => {
            //     this.$router.push('/')
            // }, 500);
          }
        }).catch((err) => {
          console.log(err)
        })

      }
    });
  }
  // 渲染表单域
  renderForm = () => {
    const { form } = this.props;
    const { getFieldDecorator } = form;
    const options = this.state.doctorList.map(d => <Option key={d.value}>{d.label}</Option>);
    const disOptions = this.state.diseaseList.map(d => <Option key={d.value}>{d.label}</Option>);
    return (
      <Form layout="inline">
        <Form.Item label="病人id" style={{ marginLeft: 15 }}>
          {getFieldDecorator("recordId", {})(
            <Input
              style={{ width: 200, marginRight: 25 }}
              // prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="请输入病人id"
            />
          )}
        </Form.Item>
        <Form.Item label="姓名" >
          {getFieldDecorator("name", {})(
            <Input
              style={{ width: 200, marginRight: 25 }}
              // prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="请输入姓名"
            />
          )}
        </Form.Item>
        <Form.Item label="身高">
          {getFieldDecorator("height", {})(
            <Input
              style={{ width: 200, marginRight: 25 }}
              // prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="请输入身高"
            />
          )}
          <span style={{ marginRight: 25 }}>/cm</span>
        </Form.Item>
        <Form.Item label="体重">
          {getFieldDecorator("weight", {})(
            <Input
              style={{ width: 160, marginRight: 25 }}
              // prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="请输入体重"
            />
          )}
          <span style={{ marginRight: 25 }}>/kg</span>
        </Form.Item>
        <br/>
        <Form.Item label="医生姓名">
          {getFieldDecorator("doctorId", {})(
            <Select style={{ width: 200, marginRight: 25 }} placeholder="请选择" >
              {options}
            </Select>
          )}
        </Form.Item>
        <Form.Item label="生日">
          {getFieldDecorator("birthday", {})(
            <DatePicker
              style={{ width: 200, marginRight: 25 }}
              placeholder="请选择生日"
            />
          )}
        </Form.Item>
        <Form.Item label="性别" >
          {getFieldDecorator("gender", {})(
            <Radio.Group>
              <Radio value={1}>男</Radio>
              <Radio value={0}>女</Radio>
            </Radio.Group>
          )}
        </Form.Item>
        <Form.Item label="诊断" style={{ marginLeft: 165 }}>
          {getFieldDecorator("diagnosis", {})(
            <Select style={{ width: 200, marginRight: 25 }} placeholder="请选择" >
            {disOptions}
          </Select>
          )}
        </Form.Item>
        <Form.Item label="主诉" style={{ marginLeft: 27 }}>
          {getFieldDecorator("chfCmp", {})(
            <TextArea style={{ width: 350, height: 32, marginRight: 25 }} autoSize={{ minRows: 1, maxRows: 10 }}
              placeholder="请输入..." />
          )}
        </Form.Item>
        <Form.Item label="症状" style={{ marginLeft: 0 }}>
          {getFieldDecorator("perHis", {})(
            <TextArea style={{ width: 350, height: 32, marginRight: 25 }} autoSize={{ minRows: 1, maxRows: 10 }}
              placeholder="请输入..." />
          )}
        </Form.Item>
        <Form.Item label="中医证型" style={{ marginLeft: 0 }}>
          {getFieldDecorator("perHis", {})(
            <TextArea style={{ width: 200, height: 32 }} autoSize={{ minRows: 1, maxRows: 10 }}
              placeholder="请输入..." />
          )}
        </Form.Item>
        <Form.Item label="既往史" style={{ marginLeft: 15 }}>
          {getFieldDecorator("hisPreIll", {})(
            <TextArea style={{ width: 1100 }} autoSize={{ minRows: 2, maxRows: 10 }}
              placeholder="请输入..." />
          )}
        </Form.Item>
        <Form.Item label="现病史" style={{ marginLeft: 15 }}>
          {getFieldDecorator("hisTre", {})(
            <TextArea style={{ width: 1100 }} autoSize={{ minRows: 3, maxRows: 10 }}
              placeholder="请输入..." />
          )}
        </Form.Item>
        
        <Form.Item label="血液检查" style={{ marginLeft: 0 }}>
          {getFieldDecorator("bloodTest", {})(
            <TextArea style={{ width: 600 }} autoSize={{ minRows: 2, maxRows: 10 }}
              placeholder="请输入..." />
          )}
        </Form.Item>
        <Form.Item label="检查异常" style={{ marginLeft: 25 }}>
          {getFieldDecorator("bloodException", {})(
            <TextArea style={{ width: 400 }} autoSize={{ minRows: 2, maxRows: 10 }}
              placeholder="请输入..." />
          )}
        </Form.Item>
        <br/>
        <Form.Item label="红外热像" >
          {getFieldDecorator("infraFiles", {})(
            <Upload multiple={true}>
              <Button type="primary" icon="upload">选择要上传文件的文件</Button>
            </Upload>
          )}
        </Form.Item>
        <Form.Item label="描述" style={{ marginLeft: 0 }}>
          {getFieldDecorator("infraDesc", {})(
            <TextArea style={{ width: 400, height: 32 }} autoSize={{ minRows: 1, maxRows: 10 }}
              placeholder="请输入..." />
          )}
        </Form.Item>
        <Form.Item label="异常">
          {getFieldDecorator("infraException", {})(
            <TextArea style={{ width: 400, height: 32 }} autoSize={{ minRows: 1, maxRows: 10 }}
              placeholder="请输入..." />
          )}
        </Form.Item>
        <br />

        <Form.Item label="舌象图谱" >
          {getFieldDecorator("infraFiles", {})(
            <Upload multiple={true}>
              <Button type="primary" icon="upload">选择要上传文件的文件</Button>
            </Upload>
          )}
        </Form.Item>
        <Form.Item label="描述" style={{ marginLeft: 0 }}>
          {getFieldDecorator("tongueDesc", {})(
            <TextArea style={{ width: 400, height: 32 }} autoSize={{ minRows: 1, maxRows: 10 }}
              placeholder="请输入..." />
          )}
        </Form.Item>
        <Form.Item label="异常">
          {getFieldDecorator("tongueException", {})(
            <TextArea style={{ width: 400, height: 32 }} autoSize={{ minRows: 1, maxRows: 10 }}
              placeholder="请输入..." />
          )}
        </Form.Item>
        <br />

        <Form.Item label="脉象数据" >
          {getFieldDecorator("pulseFiles", {})(
            <Upload multiple={true}>
              <Button type="primary" icon="upload">选择要上传文件的文件</Button>
            </Upload>
          )}
        </Form.Item>
        <Form.Item label="描述" style={{ marginLeft: 0 }}>
          {getFieldDecorator("pulseDesc", {})(
            <TextArea style={{ width: 400, height: 32 }} autoSize={{ minRows: 1, maxRows: 10 }}
              placeholder="请输入..." />
          )}
        </Form.Item>
        <Form.Item label="异常">
          {getFieldDecorator("pulseException", {})(
            <TextArea style={{ width: 400, height: 32 }} autoSize={{ minRows: 1, maxRows: 10 }}
              placeholder="请输入..." />
          )}
        </Form.Item>
        <br />
        <Form.Item label="西医主药" style={{ marginLeft: 0 }}>
          {getFieldDecorator("mainMedicine", {})(
              <Select style={{ width: 400, marginRight: 20 }} placeholder="请选择" mode="multiple">
                {options}
              </Select>
            )}
        </Form.Item>
        <Form.Item label="中医辅药">
          {getFieldDecorator("auxMedicine", {})(
              <Select style={{ width: 600, marginRight: 25 }} placeholder="请选择" mode="multiple">
                {options}
              </Select>
            )}
        </Form.Item>
        <br/>
        <Form.Item>
          <Button type="primary" onClick={this.handleSubmit} style={{ marginLeft: 70 }}>
            提交
          </Button>
          <Button type="primary" onClick={this.handleReset} style={{ marginLeft: 10, backgroundColor: 'green', borderColor: 'green' }}>
            重置
          </Button>
        </Form.Item>
      </Form>
    )
  }

  // 渲染
  render() {
    return (
      <div className="main-content">
        {this.renderForm()}
      </div>
    );
  }
}

export default Form.create()(RecordUpload);