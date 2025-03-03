import React, { useState } from 'react';
import { ThemeProvider, createTheme, CssBaseline, Container, Box, Typography } from '@mui/material';
import BallGenerator from './components/BallGenerator';
import BallCombinations from './components/BallCombinations';
import Header from './components/Header';
import Footer from './components/Footer';
import './styles/App.css';

// 定义应用的主题
const theme = createTheme({
  palette: {
    primary: {
      main: '#e53935', // 红色主题
    },
    secondary: {
      main: '#1e88e5', // 蓝色主题
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
    },
    h3: {
      fontSize: '1.5rem',
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 600,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.08)',
        },
      },
    },
  },
});

// 定义球的组合类型
export interface BallCombination {
  id: number;
  redBalls: number[];
  blueBall: number;
}

function App() {
  // 状态管理：存储生成的球组合
  const [combinations, setCombinations] = useState<BallCombination[]>([]);

  // 生成新的球组合
  const generateCombinations = (count: number) => {
    const newCombinations: BallCombination[] = [];
    
    for (let i = 0; i < count; i++) {
      // 生成红球：从1-33中随机选择6个不重复的数字
      const redBalls: number[] = [];
      while (redBalls.length < 6) {
        const randomNumber = Math.floor(Math.random() * 33) + 1;
        if (!redBalls.includes(randomNumber)) {
          redBalls.push(randomNumber);
        }
      }
      
      // 对红球进行排序
      redBalls.sort((a, b) => a - b);
      
      // 生成蓝球：从1-16中随机选择1个数字
      const blueBall = Math.floor(Math.random() * 16) + 1;
      
      // 添加到组合列表
      newCombinations.push({
        id: Date.now() + i, // 使用时间戳+索引作为唯一ID
        redBalls,
        blueBall
      });
    }
    
    // 更新状态
    setCombinations([...newCombinations]);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box className="app-container">
        <Header />
        <Container maxWidth="lg" sx={{ py: 4 }}>
          <Box sx={{ mb: 4, textAlign: 'center' }}>
            <Typography variant="h1" component="h1" gutterBottom>
              双色球号码生成器
            </Typography>
            <Typography variant="h5" component="p" color="text.secondary" sx={{ mb: 4 }}>
              随机生成双色球号码组合，6个红球(1-33) + 1个蓝球(1-16)
            </Typography>
            
            <BallGenerator onGenerate={generateCombinations} />
          </Box>
          
          <BallCombinations combinations={combinations} />
        </Container>
        <Footer />
      </Box>
    </ThemeProvider>
  );
}

export default App; 