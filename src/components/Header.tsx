import React from 'react';
import { AppBar, Toolbar, Typography, Box, useTheme } from '@mui/material';
import { motion } from 'framer-motion';

const Header: React.FC = () => {
  const theme = useTheme();

  return (
    <AppBar position="static" color="transparent" elevation={0} sx={{ bgcolor: 'white' }}>
      <Toolbar>
        <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', mr: 1 }}>
              <Box 
                className="red-ball" 
                sx={{ 
                  width: 30, 
                  height: 30, 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  mr: 0.5
                }}
              >
                <Typography variant="body2" sx={{ fontWeight: 'bold', color: 'white' }}>6</Typography>
              </Box>
              <Box 
                className="blue-ball" 
                sx={{ 
                  width: 30, 
                  height: 30, 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center' 
                }}
              >
                <Typography variant="body2" sx={{ fontWeight: 'bold', color: 'white' }}>1</Typography>
              </Box>
            </Box>
          </motion.div>
          <Typography 
            variant="h6" 
            component="div" 
            sx={{ 
              fontWeight: 'bold',
              background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              ml: 1
            }}
          >
            双色球生成器
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header; 