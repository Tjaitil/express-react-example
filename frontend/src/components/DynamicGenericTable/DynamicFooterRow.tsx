interface DynamicFooterRowProps {
  children: React.ReactNode;
}

export const DynamicFooterRow = ({ children }: DynamicFooterRowProps) => {
  return <tr>{children}</tr>;
};
