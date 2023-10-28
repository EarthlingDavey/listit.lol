interface ButtonProps extends React.HTMLProps<HTMLButtonElement> {
  /**
   * Is this the principal call to action on the page?
   */
  primary?: boolean;
  /**
   * What background color to use
   */
  backgroundColor?: string;
  /**
   * How large should the button be?
   */
  mySize?: 'small' | 'medium' | 'large';
  /**
   * Optional click handler
   */
  onClick?: () => void;
  /**
   * And accept children
   */
  children?: React.ReactNode;
}

export const MyButton = ({
  primary = false,
  mySize = 'medium',
  backgroundColor,
  label,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={`${
        primary
          ? `bg-green-500 hover:bg-green-700`
          : `bg-blue-500 hover:bg-blue-700`
      } text-white font-bold py-2 px-4 rounded`}
    >
      {props.children}
    </button>
  );
};
