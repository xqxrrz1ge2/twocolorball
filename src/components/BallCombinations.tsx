import React from 'react';
import { 
  Box, 
  Grid, 
  Paper, 
  Typography, 
  Divider,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { motion } from 'framer-motion';
import { BallCombination } from '../App';

interface BallCombinationsProps {
  combinations: BallCombination[];
}

const BallCombinations: React.FC<BallCombinationsProps> = ({ combinations }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // 如果没有组合，显示提示信息
  if (combinations.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', py: 8 }}>
        <Typography variant="h6" color="text.secondary">
          点击"立即生成"按钮生成双色球号码组合
        </Typography>
      </Box>
    );
  }

  // 容器动画变体
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  // 项目动画变体
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 12
      }
    }
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h3" component="h2" gutterBottom sx={{ mb: 3, fontWeight: 'bold' }}>
        生成结果
      </Typography>
      
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <Grid container spacing={3}>
          {combinations.map((combination) => (
            <Grid item xs={12} sm={6} md={4} key={combination.id}>
              <motion.div variants={itemVariants}>
                <Paper 
                  className="combination-card"
                  elevation={0} 
                  sx={{ 
                    p: 3, 
                    borderRadius: 3,
                    border: '1px solid',
                    borderColor: 'divider',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column'
                  }}
                >
                  <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 2 }}>
                    组合 #{combinations.indexOf(combination) + 1}
                  </Typography>
                  
                  <Divider sx={{ mb: 2 }} />
                  
                  <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        红球:
                      </Typography>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', mb: 1 }}>
                        {combination.redBalls.map((ball, index) => (
                          <motion.div
                            key={index}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <Box 
                              className="ball red-ball" 
                              sx={{ 
                                mb: isMobile ? 1 : 2,
                                fontSize: '0.9rem'
                              }}
                            >
                              {ball < 10 ? `0${ball}` : ball}
                            </Box>
                          </motion.div>
                        ))}
                      </Box>
                    </Box>
                    
                    <Box>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        蓝球:
                      </Typography>
                      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <motion.div
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Box 
                            className="ball blue-ball" 
                            sx={{ fontSize: '0.9rem' }}
                          >
                            {combination.blueBall < 10 ? `0${combination.blueBall}` : combination.blueBall}
                          </Box>
                        </motion.div>
                      </Box>
                    </Box>
                  </Box>
                </Paper>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </motion.div>
    </Box>
  );
};

export default BallCombinations; 