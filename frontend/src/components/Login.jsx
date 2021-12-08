import { Form, Input, Button } from 'antd';

const Login = (props) => {
  const onFinish = (values) => {
    // TODO: async api call
    if (values.code === '1234') {
      props.loggedIn(true);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className="formBox">
      <Form name="basic" wrapperCol={{ div: 16 }} onFinish={onFinish} onFinishFailed={onFinishFailed} autoComplete="off">
        <div style={{ fontWeight: 600, lineHeight: '2em', fontSize: '1.2em' }}>Enter Code</div>
        <Form.Item name="code" rules={[{ required: true, message: 'Please input the code to enter' }]}>
          <Input />
        </Form.Item>

        <Form.Item wrapperCol={{ div: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
