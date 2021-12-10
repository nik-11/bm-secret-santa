import { Form, Input, Button } from 'antd';
import { useState } from 'react';
import ConfettiExplosion from '@reonomy/react-confetti-explosion';

const confettiProps = {
  force: 0.5,
  duration: 4000,
  particleCount: 150,
  floorHeight: 1600,
  floorWidth: 1600,
};

const WalletDetails = (props) => {
  const [loading, setLoading] = useState(false);

  const onFinish = (values) => {
    // It should arrive in your account within 1 day
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div style={{ height: '100%', width: '100%', overflow: 'hidden' }}>
      <div style={{ width: '100%', display: 'flex', alignItems: 'start', justifyContent: 'space-between', padding: '0 25%' }}>
        <ConfettiExplosion {...confettiProps} />
        <ConfettiExplosion {...confettiProps} />
        <ConfettiExplosion {...confettiProps} />
      </div>
      <div className="formBox">
        <Form name="basic" wrapperCol={{ div: 16 }} onFinish={onFinish} onFinishFailed={onFinishFailed} autoComplete="off">
          <div style={{ fontWeight: 700, fontSize: '2em' }}>Congrats, you won!</div>
          <div style={{ fontWeight: 600, fontSize: '2em' }}>Please enter your BTC Wallet address to claim your secret santa gift :)</div>
          <div style={{ fontWeight: 600, lineHeight: '2em', fontSize: '1.2em' }}>BTC Wallet Address</div>
          <Form.Item name="code" rules={[{ required: true, message: 'Please input your BTC wallet address to claim your gift!' }]}>
            <Input />
          </Form.Item>

          <Form.Item wrapperCol={{ div: 16 }}>
            <Button type="primary" htmlType="submit" loading={loading}>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default WalletDetails;
