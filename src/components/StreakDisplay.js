import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const StreakContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.xs};
  padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.sm};
  border-radius: ${props => props.theme.borderRadius.md};
  background: ${props => {
    if (props.streak === 0) return props.theme.colors.surface;
    if (props.streak < 3) return 'linear-gradient(135deg, #ffecb3, #ffc107)';
    if (props.streak < 7) return 'linear-gradient(135deg, #ffcc80, #ff9800)';
    if (props.streak < 30) return 'linear-gradient(135deg, #ffab91, #ff5722)';
    if (props.streak < 100) return 'linear-gradient(135deg, #f8bbd9, #e91e63)';
    return 'linear-gradient(135deg, #d1c4e9, #9c27b0)';
  }};
  border: 2px solid ${props => {
    if (props.streak === 0) return props.theme.colors.border;
    if (props.streak < 3) return '#ffc107';
    if (props.streak < 7) return '#ff9800';
    if (props.streak < 30) return '#ff5722';
    if (props.streak < 100) return '#e91e63';
    return '#9c27b0';
  }};
  box-shadow: ${props => props.streak > 0 ? props.theme.shadows.md : 'none'};
  transition: all 0.3s ease;
  
  &:hover {
    transform: ${props => props.streak > 0 ? 'translateY(-2px)' : 'none'};
    box-shadow: ${props => props.streak > 0 ? props.theme.shadows.lg : 'none'};
  }
`;

const StreakNumber = styled(motion.span)`
  font-size: 1.2rem;
  font-weight: 700;
  color: ${props => props.theme.colors.text};
  text-shadow: ${props => props.streak > 0 ? '0 1px 2px rgba(0,0,0,0.1)' : 'none'};
`;

const StreakEmoji = styled(motion.span)`
  font-size: 1rem;
  filter: ${props => props.streak > 0 ? 'drop-shadow(0 1px 2px rgba(0,0,0,0.2))' : 'none'};
`;

const StreakMessage = styled.span`
  font-size: 0.75rem;
  font-weight: 500;
  color: ${props => props.theme.colors.text};
  opacity: 0.8;
`;

const NextMilestone = styled.div`
  font-size: 0.7rem;
  color: ${props => props.theme.colors.textSecondary};
  font-weight: 400;
  margin-top: 2px;
`;

function StreakDisplay({ streak, nextMilestone, status }) {
  const getStreakText = () => {
    if (streak === 0) return '0';
    if (streak === 1) return '1';
    return `${streak}`;
  };

  const getEmojis = () => {
    if (streak === 0) return '🔥';
    if (streak < 3) return '🔥';
    if (streak < 7) return '🔥🔥';
    if (streak < 30) return '🔥🔥🔥';
    if (streak < 100) return '🔥🔥🔥🔥';
    return '🔥🔥🔥🔥🔥';
  };

  return (
    <StreakContainer streak={streak}>
      <StreakEmoji
        streak={streak}
        animate={{ 
          scale: streak > 0 ? [1, 1.1, 1] : 1,
          rotate: streak > 0 ? [0, 5, -5, 0] : 0
        }}
        transition={{ 
          duration: 2,
          repeat: Infinity,
          repeatDelay: 3
        }}
      >
        {getEmojis()}
      </StreakEmoji>
      
      <div>
        <StreakNumber
          streak={streak}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ 
            type: "spring", 
            stiffness: 500, 
            damping: 15 
          }}
        >
          {getStreakText()}
        </StreakNumber>
        
        {streak > 0 && (
          <StreakMessage>
            {status.message}
          </StreakMessage>
        )}
        
        {nextMilestone && nextMilestone.daysLeft > 0 && (
          <NextMilestone>
            {nextMilestone.message}
          </NextMilestone>
        )}
      </div>
    </StreakContainer>
  );
}

export default StreakDisplay;
