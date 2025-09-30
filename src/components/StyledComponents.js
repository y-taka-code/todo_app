import styled from 'styled-components';
import { motion } from 'framer-motion';

export const Container = styled.div`
  max-width: 720px;
  margin: 0 auto;
  padding: ${props => props.theme.spacing.xl};
  min-height: 100vh;
  background: ${props => props.theme.colors.surface};
  border-radius: ${props => props.theme.borderRadius.lg};
  box-shadow: ${props => props.theme.shadows.xl};
  margin-top: ${props => props.theme.spacing.lg};
  margin-bottom: ${props => props.theme.spacing.lg};
  
  @media (max-width: 768px) {
    margin: ${props => props.theme.spacing.md};
    padding: ${props => props.theme.spacing.lg};
    border-radius: ${props => props.theme.borderRadius.md};
  }
  
  @media (max-width: 480px) {
    margin: ${props => props.theme.spacing.sm};
    padding: ${props => props.theme.spacing.md};
  }
`;

export const Header = styled.div`
  text-align: center;
  margin-bottom: ${props => props.theme.spacing.xl};
`;

export const Title = styled.h1`
  font-size: 3rem;
  font-weight: 700;
  color: ${props => props.theme.colors.primary};
  margin-bottom: ${props => props.theme.spacing.md};
  text-shadow: 0 2px 4px ${props => props.theme.colors.shadow};
  letter-spacing: -0.02em;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 4px;
    background: linear-gradient(90deg, ${props => props.theme.colors.primary}, ${props => props.theme.colors.accent});
    border-radius: 2px;
  }
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
  
  @media (max-width: 480px) {
    font-size: 2rem;
  }
`;

export const ThemeToggle = styled(motion.button)`
  background: ${props => props.theme.colors.surface};
  border: 2px solid ${props => props.theme.colors.border};
  color: ${props => props.theme.colors.text};
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  border-radius: ${props => props.theme.borderRadius.lg};
  font-size: 1rem;
  font-weight: 500;
  box-shadow: ${props => props.theme.shadows.sm};
  
  &:hover {
    background: ${props => props.theme.colors.border};
    box-shadow: ${props => props.theme.shadows.md};
  }
`;

export const ControlsContainer = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.sm};
  margin-bottom: ${props => props.theme.spacing.lg};
  flex-wrap: wrap;
  align-items: center;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

export const SearchInput = styled.input`
  flex: 1;
  min-width: 200px;
  padding: ${props => props.theme.spacing.md};
  border: 1px solid ${props => props.theme.colors.borderLight};
  border-radius: ${props => props.theme.borderRadius.lg};
  background: ${props => props.theme.colors.surface};
  color: ${props => props.theme.colors.text};
  font-size: 1rem;
  box-shadow: ${props => props.theme.shadows.sm};
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  
  &::placeholder {
    color: ${props => props.theme.colors.textMuted};
  }
  
  &:focus {
    border-color: ${props => props.theme.colors.primary};
    box-shadow: ${props => props.theme.shadows.md};
    transform: translateY(-1px);
  }
  
  @media (max-width: 768px) {
    min-width: unset;
  }
`;

export const Select = styled.select`
  padding: ${props => props.theme.spacing.md};
  border: 1px solid ${props => props.theme.colors.borderLight};
  border-radius: ${props => props.theme.borderRadius.lg};
  background: ${props => props.theme.colors.surface};
  color: ${props => props.theme.colors.text};
  font-size: 1rem;
  cursor: pointer;
  box-shadow: ${props => props.theme.shadows.sm};
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  
  &:focus {
    border-color: ${props => props.theme.colors.primary};
    box-shadow: ${props => props.theme.shadows.md};
    transform: translateY(-1px);
  }
`;

export const FormContainer = styled.form`
  display: flex;
  gap: ${props => props.theme.spacing.md};
  margin-bottom: ${props => props.theme.spacing.lg};
  
  @media (max-width: 480px) {
    flex-direction: column;
  }
`;

export const FormInput = styled.input`
  flex: 1;
  padding: ${props => props.theme.spacing.md};
  border: 1px solid ${props => props.theme.colors.borderLight};
  border-radius: ${props => props.theme.borderRadius.lg};
  background: ${props => props.theme.colors.surface};
  color: ${props => props.theme.colors.text};
  font-size: 1rem;
  box-shadow: ${props => props.theme.shadows.sm};
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  
  &::placeholder {
    color: ${props => props.theme.colors.textMuted};
  }
  
  &:focus {
    border-color: ${props => props.theme.colors.primary};
    box-shadow: ${props => props.theme.shadows.md};
    transform: translateY(-1px);
  }
`;

export const Button = styled(motion.button)`
  padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.xl};
  border: none;
  border-radius: ${props => props.theme.borderRadius.lg};
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  box-shadow: ${props => props.theme.shadows.md};
  position: relative;
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
    transition: left 0.5s;
  }
  
  &:hover::before {
    left: 100%;
  }
  
  &.primary {
    background: linear-gradient(135deg, ${props => props.theme.colors.primary}, ${props => props.theme.colors.secondary});
    color: white;
    border: 1px solid ${props => props.theme.colors.primary};
  }
  
  &.secondary {
    background: linear-gradient(135deg, ${props => props.theme.colors.secondary}, ${props => props.theme.colors.accent});
    color: white;
    border: 1px solid ${props => props.theme.colors.secondary};
  }
  
  &.danger {
    background: linear-gradient(135deg, ${props => props.theme.colors.danger}, #FF4757);
    color: white;
    border: 1px solid ${props => props.theme.colors.danger};
  }
  
  &.warning {
    background: linear-gradient(135deg, ${props => props.theme.colors.warning}, #FFA726);
    color: white;
    border: 1px solid ${props => props.theme.colors.warning};
  }
  
  &:hover {
    box-shadow: ${props => props.theme.shadows.lg};
    transform: translateY(-2px);
  }
`;

export const TodoList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.sm};
`;

export const TodoItem = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.md};
  padding: ${props => props.theme.spacing.lg};
  background: ${props => props.theme.colors.surface};
  border: 1px solid ${props => props.theme.colors.borderLight};
  border-radius: ${props => props.theme.borderRadius.lg};
  box-shadow: ${props => props.theme.shadows.sm};
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 4px;
    background: linear-gradient(180deg, ${props => props.theme.colors.primary}, ${props => props.theme.colors.accent});
    border-radius: 2px 0 0 2px;
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  &.completed {
    background: ${props => props.theme.colors.surfaceElevated};
    opacity: 0.8;
    border-color: ${props => props.theme.colors.border};
    
    &::before {
      opacity: 1;
    }
  }
  
  &:hover {
    box-shadow: ${props => props.theme.shadows.md};
    transform: translateY(-1px);
    border-color: ${props => props.theme.colors.border};
    
    &::before {
      opacity: 1;
    }
  }
`;

export const Checkbox = styled.input`
  width: 20px;
  height: 20px;
  cursor: pointer;
  accent-color: ${props => props.theme.colors.primary};
`;

export const TodoText = styled.span`
  flex: 1;
  color: ${props => props.theme.colors.text};
  font-size: 1rem;
  line-height: 1.5;
  
  &.completed {
    text-decoration: line-through;
    color: ${props => props.theme.colors.textSecondary};
  }
`;

export const EditInput = styled.input`
  flex: 1;
  padding: ${props => props.theme.spacing.sm};
  border: 2px solid ${props => props.theme.colors.primary};
  border-radius: ${props => props.theme.borderRadius.sm};
  background: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.text};
  font-size: 1rem;
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.xs};
  
  @media (max-width: 480px) {
    flex-direction: column;
  }
`;

export const SmallButton = styled(motion.button)`
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  border: none;
  border-radius: ${props => props.theme.borderRadius.md};
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  box-shadow: ${props => props.theme.shadows.sm};
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  
  &.primary {
    background: linear-gradient(135deg, ${props => props.theme.colors.primary}, ${props => props.theme.colors.secondary});
    color: white;
  }
  
  &.secondary {
    background: linear-gradient(135deg, ${props => props.theme.colors.secondary}, ${props => props.theme.colors.accent});
    color: white;
  }
  
  &.danger {
    background: linear-gradient(135deg, ${props => props.theme.colors.danger}, #FF4757);
    color: white;
  }
  
  &:hover {
    box-shadow: ${props => props.theme.shadows.md};
    transform: translateY(-1px);
  }
`;
