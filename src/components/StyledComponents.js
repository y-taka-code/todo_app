import styled from 'styled-components';
import { motion } from 'framer-motion';

export const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: ${props => props.theme.spacing.lg};
  min-height: 100vh;
  
  @media (max-width: 768px) {
    padding: ${props => props.theme.spacing.md};
  }
  
  @media (max-width: 480px) {
    padding: ${props => props.theme.spacing.sm};
  }
`;

export const Header = styled.div`
  text-align: center;
  margin-bottom: ${props => props.theme.spacing.xl};
`;

export const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  color: ${props => props.theme.colors.text};
  margin-bottom: ${props => props.theme.spacing.md};
  background: linear-gradient(135deg, ${props => props.theme.colors.primary}, ${props => props.theme.colors.secondary});
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
  
  @media (max-width: 480px) {
    font-size: 1.5rem;
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
  padding: ${props => props.theme.spacing.sm};
  border: 2px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.md};
  background: ${props => props.theme.colors.surface};
  color: ${props => props.theme.colors.text};
  font-size: 1rem;
  
  &::placeholder {
    color: ${props => props.theme.colors.textSecondary};
  }
  
  @media (max-width: 768px) {
    min-width: unset;
  }
`;

export const Select = styled.select`
  padding: ${props => props.theme.spacing.sm};
  border: 2px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.md};
  background: ${props => props.theme.colors.surface};
  color: ${props => props.theme.colors.text};
  font-size: 1rem;
  cursor: pointer;
  
  &:focus {
    border-color: ${props => props.theme.colors.primary};
  }
`;

export const FormContainer = styled.form`
  display: flex;
  gap: ${props => props.theme.spacing.sm};
  margin-bottom: ${props => props.theme.spacing.lg};
  
  @media (max-width: 480px) {
    flex-direction: column;
  }
`;

export const FormInput = styled.input`
  flex: 1;
  padding: ${props => props.theme.spacing.md};
  border: 2px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.md};
  background: ${props => props.theme.colors.surface};
  color: ${props => props.theme.colors.text};
  font-size: 1rem;
  
  &::placeholder {
    color: ${props => props.theme.colors.textSecondary};
  }
`;

export const Button = styled(motion.button)`
  padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.lg};
  border: none;
  border-radius: ${props => props.theme.borderRadius.md};
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  box-shadow: ${props => props.theme.shadows.sm};
  
  &.primary {
    background: ${props => props.theme.colors.primary};
    color: white;
  }
  
  &.secondary {
    background: ${props => props.theme.colors.secondary};
    color: white;
  }
  
  &.danger {
    background: ${props => props.theme.colors.danger};
    color: white;
  }
  
  &.warning {
    background: ${props => props.theme.colors.warning};
    color: white;
  }
  
  &:hover {
    box-shadow: ${props => props.theme.shadows.md};
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
  gap: ${props => props.theme.spacing.sm};
  padding: ${props => props.theme.spacing.md};
  background: ${props => props.theme.colors.surface};
  border: 2px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.md};
  box-shadow: ${props => props.theme.shadows.sm};
  transition: all 0.2s ease;
  
  &.completed {
    background: ${props => props.theme.colors.background};
    opacity: 0.7;
  }
  
  &:hover {
    box-shadow: ${props => props.theme.shadows.md};
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
  padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.sm};
  border: none;
  border-radius: ${props => props.theme.borderRadius.sm};
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  
  &.primary {
    background: ${props => props.theme.colors.primary};
    color: white;
  }
  
  &.secondary {
    background: ${props => props.theme.colors.secondary};
    color: white;
  }
  
  &.danger {
    background: ${props => props.theme.colors.danger};
    color: white;
  }
`;
