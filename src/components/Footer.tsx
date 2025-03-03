import React from 'react';
import { Box, Typography, Container, Link } from '@mui/material';

const Footer: React.FC = () => {
  return (
    <Box 
      component="footer" 
      sx={{ 
        py: 3, 
        mt: 'auto',
        backgroundColor: 'white',
        borderTop: '1px solid',
        borderColor: 'divider'
      }}
    >
      <Container maxWidth="lg">
        <Typography variant="body2" color="text.secondary" align="center">
          {'© '}
          {new Date().getFullYear()}
          {' 双色球号码生成器 | '}
          <Link color="inherit" href="#">
            免责声明
          </Link>
          {' | 仅供娱乐，祝您好运！'}
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer; 