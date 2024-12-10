import { useContext } from 'react';
import { OurFinancialProject } from './OurFinancialProject';
import { TerminalContext } from './TerminalProvider';

export const ProjectWindow = () => {
  const { projectToShow } = useContext(TerminalContext);

  if (!projectToShow) return undefined;

  if (projectToShow === 'our_financial') return <OurFinancialProject />;
};
