import React, { useState } from 'react';
import { Alert, Card, Col, Row, Button, Slider, Space, InputNumber, Form } from 'antd';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const defaultPositionSize = 1;
const defaultPortfolioSize = 25;
const portfolioGoal = 250;
const winningChance = 60; 

const PositionSizingSimulator = () => {
	const [positionSize, setPositionSize] = useState(defaultPositionSize);
  const [portfolio, setPortfolio] = useState([defaultPortfolioSize]); 

  const handleResetClick = () => {
    setPositionSize(defaultPositionSize);
    setPortfolio([defaultPortfolioSize]);
  };

  const handlePositionSizeChange = value => {
    setPositionSize(value);
  };

  const updatePortfolio = (isWin) => {
    setPortfolio(prevPortfolio => {
      const prevPortfolioValue = prevPortfolio.slice(-1)[0];
      let portfolioValue;

      if (isWin) {
        portfolioValue = prevPortfolioValue + positionSize;
      } else {
        portfolioValue = Math.max(prevPortfolioValue - positionSize, 0);
      }

      return [...prevPortfolio, portfolioValue];
    });
  };

  const handleBetClick = (winPercentage) => {
    const randomNumber = Math.floor(Math.random() * 100) + 1;
    const isWin = winPercentage >= randomNumber;

    updatePortfolio(isWin);
  };

  const currentPortfolioValue = portfolio.slice(-1)[0];

  const chartData = {
    labels: portfolio.length > 10 ? portfolio.map((_, i) => i) : [...Array(10).keys()],
    datasets: [
      {
        label: 'Portfolio Value',
        data: portfolio,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: '',
      },
    },
    scales: {
      yAxis: {
        min: 0,
        max: Math.max(defaultPortfolioSize * 2, currentPortfolioValue + defaultPortfolioSize)
      },
    },
  };

  const betButtonDisabled = currentPortfolioValue === 0 || currentPortfolioValue >= portfolioGoal;

	return (
		<div>
			<Row align="middle">
        <Col span={6} offset={3}>
          <Row gutter={[16, 32]}>
            <Col span={24}>
              {`You have a coin that lands heads ${winningChance}% of the time and tails ${100 - winningChance}% of the time. You have $${defaultPortfolioSize}. Every time you guess right you double your bet, and every time you are wrong you lose it.`}
            </Col>
            <Col span={12} className="gutter-row">
              <Form.Item label="Bet in $" style={{ margin: 0 }}>
                <Slider
                  min={0.1}
                  max={currentPortfolioValue}
                  onChange={handlePositionSizeChange}
                  value={positionSize}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <InputNumber
                min={0.1}
                max={currentPortfolioValue}
                style={{ margin: '0 16px' }}
                value={positionSize}
                onChange={handlePositionSizeChange}
                type="number"
              />
            </Col>
            <Col span={8}>
              <Space>
                <Button
                  type="primary"
                  onClick={() => handleBetClick(winningChance)}
                  disabled={betButtonDisabled}
                >
                  Bet Heads 60%
                </Button>
                <Button
                  type="ghost"
                  onClick={() => handleBetClick(100 - winningChance)}
                  disabled={betButtonDisabled}
                >
                  Bet Tails 40%
                </Button>
                <Button type="default" onClick={handleResetClick}>
                  Reset
                </Button>
              </Space>
            </Col>
            <Col span={24}>
              <Card title="Portfolio Value" size="small">
                $ {currentPortfolioValue.toFixed(2)}
              </Card>
            </Col>
            {currentPortfolioValue === 0 && (
              <Col span={24}>
                <Alert
                  message="You lost all your money!"
                  type="error"
                  showIcon
                />
              </Col>
            )}
            {currentPortfolioValue >= portfolioGoal && (
              <Col span={24}>
                <Alert
                  message={`You reached the $${portfolioGoal} goal!`}
                  type="success"
                  showIcon
                />
              </Col>
            )}
          </Row>
        </Col>
        <Col offset={1} span={11}>
          <Line options={chartOptions} data={chartData} />
        </Col>
			</Row>
		</div>
	);
};

export default PositionSizingSimulator;
