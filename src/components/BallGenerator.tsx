import React, { useState } from 'react';
import { 
  Box, 
  Button, 
  TextField, 
  Paper, 
  Typography, 
  Slider, 
  InputAdornment,
  useTheme
} from '@mui/material';
import { motion } from 'framer-motion';

interface BallGeneratorProps {
  onGenerate: (count: number) => void;
}

const BallGenerator: React.FC<BallGeneratorProps> = ({ onGenerate }) => {
  const theme = useTheme();
  const [count, setCount] = useState<number>(5);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);

  const handleCountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value);
    if (!isNaN(value) && value > 0 && value <= 100) {
      setCount(value);
    }
  };

  const handleSliderChange = (_event: Event, newValue: number | number[]) => {
    setCount(newValue as number);
  };

  const handleGenerate = () => {
    setIsGenerating(true);
    
    // 添加一点延迟，以便显示动画效果
    setTimeout(() => {
      onGenerate(count);
      setIsGenerating(false);
    }, 800);
  };

  return (
    <Paper 
      elevation={0} 
      sx={{ 
        p: 3, 
        borderRadius: 4, 
        maxWidth: 600, 
        mx: 'auto',
        border: '1px solid',
        borderColor: 'divider'
      }}
    >
      <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
        生成号码组合
      </Typography>
      
      <Box sx={{ my: 3 }}>
        <Typography gutterBottom>
          生成组合数量: {count}
        </Typography>
        <Slider
          value={count}
          onChange={handleSliderChange}
          aria-labelledby="count-slider"
          valueLabelDisplay="auto"
          step={1}
          marks
          min={1}
          max={20}
          sx={{
            color: theme.palette.primary.main,
            '& .MuiSlider-thumb': {
              '&:hover, &.Mui-focusVisible': {
                boxShadow: `0px 0px 0px 8px ${theme.palette.primary.main}20`,
              },
            },
          }}
        />
      </Box>
      
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <TextField
          label="自定义数量"
          type="number"
          value={count}
          onChange={handleCountChange}
          InputProps={{
            inputProps: { min: 1, max: 100 },
            endAdornment: <InputAdornment position="end">组</InputAdornment>,
          }}
          variant="outlined"
          size="small"
          sx={{ width: 150 }}
        />
        
        <motion.div
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          style={{ marginLeft: 'auto' }}
        >
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={handleGenerate}
            disabled={isGenerating}
            sx={{ 
              px: 4,
              py: 1.2,
              fontWeight: 'bold',
              boxShadow: '0 8px 16px rgba(229, 57, 53, 0.3)',
              '&:hover': {
                boxShadow: '0 12px 20px rgba(229, 57, 53, 0.4)',
              }
            }}
          >
            {isGenerating ? '生成中...' : '立即生成'}
          </Button>
        </motion.div>
      </Box>
      
      <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic' }}>
        提示: 每组号码包含6个红球(1-33)和1个蓝球(1-16)，红球按照从小到大排序。
      </Typography>
    </Paper>
  );
};

export default BallGenerator; 