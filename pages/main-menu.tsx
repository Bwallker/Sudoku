import classNames from 'classnames';
import Button from 'react-bootstrap/Button';
import useWindowDimensions from '../util/useWindowDimensions';
import Link from 'next/link';
import CentralElement from '../components/CentralElement';

interface OptionProps {
  children: string;
}

const MainMenuOption = (props: OptionProps) => {
  const win = useWindowDimensions();
  const dynamicFontSize = computeDynamicFontSize(win.width);
  return (
    <div className='text-center justify-content-center my-5 mx-0 p-0'>
      <Link
        href={`./play?difficulty=${props.children.toLowerCase()}`}
        passHref={true}
      >
        <Button
          className='text-center align-items-center w-50 p-0 mx-0'
          variant='outline-danger'
        >
          <h1
            className={classNames('m-5 col-lg-6 mx-auto text')}
            style={{
              fontSize: dynamicFontSize,
              wordWrap: 'break-word',
            }}
          >
            {props.children}
          </h1>
        </Button>
      </Link>
    </div>
  );
};

const computeDynamicFontSize = (windowWidth: number): string => {
  if (windowWidth < 600) {
    return '1rem';
  }
  if (windowWidth < 1200) {
    return '1.5rem';
  }
  return '2rem';
};

const MainMenu = () => {
  const win = useWindowDimensions();
  return (
    <CentralElement>
      {win.height > 1000 ? (
        <h1
          className='w-100 text-center pt-5 mt-5 text-danger'
          style={{
            position: 'absolute',
            top: 0,
          }}
        >
          Sudoku
        </h1>
      ) : (
        <></>
      )}
      <div className='p-5 w-50'>
        <MainMenuOption>Easy</MainMenuOption>
        <MainMenuOption>Medium</MainMenuOption>
        <MainMenuOption>Hard</MainMenuOption>
      </div>
    </CentralElement>
  );
};
export default MainMenu;
