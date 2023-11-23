import React, { useState } from 'react';
import { Layout, Row, Col, Button, Table, Typography } from 'antd';
import { WalletSelector } from '@aptos-labs/wallet-adapter-ant-design';
import '@aptos-labs/wallet-adapter-ant-design/dist/index.css';

const { Column } = Table;
const { Title } = Typography;

function Leaderboard({ leaderboardData }) {
  return (
    <>
      <Title level={3} style={{ color: 'darkblue', fontWeight: 'bold', marginTop: '20px', textAlign: 'center' }}>
        Leaderboard
      </Title>
      <Table dataSource={leaderboardData} pagination={false} bordered style={{ marginTop: '10px' }}>
        <Column title="User" dataIndex="user" key="user" />
        <Column title="Clicks" dataIndex="clicks" key="clicks" />
      </Table>
    </>
  );
}

function App() {
  const backgroundColor = '#e04a4f';
  const titleStyle = { color: 'darkblue', marginBottom: '20px', fontSize: '24px', fontWeight: 'bold' };
  const clickCountStyle = { fontSize: '48px', fontWeight: 'bold', color: 'white', textAlign: 'center', margin: '20px 0' };

  const buttonStyle = {
    borderRadius: '50%',
    width: '120px',
    height: '120px',
    fontSize: '16px',
  };

  const [clickCount, setClickCount] = useState(0);
  const [leaderboardData, setLeaderboardData] = useState([]);

  const handleButtonClick = () => {
    setClickCount(clickCount + 1);
  };

  const addToLeaderboard = () => {
    const updatedLeaderboard = [...leaderboardData, { user: `User ${leaderboardData.length + 1}`, clicks: clickCount }];
    updatedLeaderboard.sort((a, b) => b.clicks - a.clicks);
    const top10Leaderboard = updatedLeaderboard.slice(0, 10);
    setLeaderboardData(top10Leaderboard);
  };

  return (
    <>
      <Layout style={{ backgroundColor }}>
        <Row align="middle">
          <Col span={10} offset={2}>
            <h1 style={titleStyle}>APTERYX- AN ONCHAIN Game by APTOS</h1>
            <h2>supports Petra WALLET ADAPTER</h2>
            <p style={clickCountStyle}> Clicks: {clickCount}</p>
          </Col>
          <Col span={12} style={{ textAlign: 'right', paddingRight: '200px' }}>
            <WalletSelector />
          </Col>
        </Row>
        <Row justify="center" align="middle" style={{ height: '80vh' }}>
          <Col>
            <Button type="primary" style={buttonStyle} onClick={() => { handleButtonClick(); addToLeaderboard(); }}>
              Click Me
            </Button>
          </Col>
        </Row>
        <Leaderboard leaderboardData={leaderboardData} />
      </Layout>
    </>
  );
}

export default App;
