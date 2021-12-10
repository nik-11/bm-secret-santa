import { Form, Input, Button, notification } from 'antd';
import { useState } from 'react';
import * as axios from 'axios';

const Login = (props) => {
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    const response = await axios
      .post(
        'https://rhc8b8j4sb.execute-api.ap-southeast-2.amazonaws.com/prod/login',
        { ...values },
        {
          headers: {
            'X-Api-Key': 'wwIq1Wx3i07RvCW7v11d35hS22Ex4h0z57eDtOaY',
            'Content-Type': 'application/json',
          },
        },
      )
      .catch((err) => {
        console.log(err);
        notification.open({
          message: 'Something went wrong',
          description: `${err.response.data.message}`,
        });
      });
    setLoading(false);
    if (response?.status === 200) {
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
          <Button type="primary" htmlType="submit" loading={loading}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
